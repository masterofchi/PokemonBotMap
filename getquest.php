<?php
// Use same config as bot
require_once("config.php");

// Establish mysql connection.
$dbh = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASSWORD, array(
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
));
$dbh->setAttribute(PDO::ATTR_ORACLE_NULLS, PDO::NULL_EMPTY_STRING);

$sql = "
      SELECT
        mapadroid.pokestops.lat,
        mapadroid.pokestops.lon,
        mapadroid.trs_quest.quest_stardust,
        mapadroid.trs_quest.quest_pokemon_id,
        mapadroid.trs_quest.quest_reward_type,
        mapadroid.trs_quest.quest_item_id,
        mapadroid.trs_quest.quest_item_amount,
        replace(mapadroid.pokestops.name,'\"','') as name,
        mapadroid.pokestops.url,
        mapadroid.trs_quest.quest_task,
        pogoraidbot.pokemon_i18n.pokemon_name as quest_pokemon_name
    FROM
        mapadroid.pokestops
        INNER JOIN
            mapadroid.trs_quest ON (mapadroid.pokestops.external_id COLLATE utf8mb4_general_ci) = mapadroid.trs_quest.GUID
        LEFT JOIN 
            pogoraidbot.pokemon_i18n on pogoraidbot.pokemon_i18n.pokedex_id = mapadroid.trs_quest.quest_pokemon_id and pogoraidbot.pokemon_i18n.language = '" . LANGUAGE . "'
    WHERE
        DATE(FROM_UNIXTIME(mapadroid.trs_quest.quest_timestamp,'%Y-%m-%d')) = CURDATE()
  ";

$rows = array();
try {

    $result = $dbh->query($sql);
    while ($stops = $result->fetch(PDO::FETCH_ASSOC)) {

        $rows[] = $stops;
    }
} catch (PDOException $exception) {

    error_log($exception->getMessage());
    $dbh = null;
    exit();
}

if (defined('USE_GEO_BOUNDARY') && USE_GEO_BOUNDARY && !empty($_GET['geoBoundary'])) {
    require_once('geoboundary.php');

    $boundary = json_decode($_GET['geoBoundary']);
    $result = getItemsInBoundary($rows, $boundary);
} else {
    $result = $rows;
}

print json_encode($result);

$dbh = null;
?>