<?php
//Use same config as bot
require_once("config.php");

// Establish mysql connection.
$dbh = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASSWORD, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
$dbh->setAttribute(PDO::ATTR_ORACLE_NULLS, PDO::NULL_EMPTY_STRING);

$rows = array();
try {

    $sql = "SELECT 
                pokemon_sightings.pokemon_id,
                pokemon_sightings.tth,
                pokemon_sightings.lat,
                pokemon_sightings.lon,
                pokemon_i18n.pokemon_name
            FROM
                pokemon_sightings
                LEFT JOIN pokemon_i18n on pokemon_i18n.pokedex_id = pokemon_sightings.pokemon_id AND pokemon_i18n.language = '" . LANGUAGE . "'";
    $result = $dbh->query($sql);

    while ($pokemon = $result->fetch(PDO::FETCH_ASSOC)) {

        $rows[] = $pokemon;
    }
} catch (PDOException $exception) {

    error_log($exception->getMessage());
    $dbh = null;
    exit;
}

print json_encode($rows);

$dbh = null;
?>