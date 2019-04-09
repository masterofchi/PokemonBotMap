<?php
require_once("config.php");

$validSources = [
    'gyms' => 'getgyms.php',
    'pokemon' => 'getpokemon.php',
    'quests' => 'getquest.php',
    'raids' => 'getraids.php'
];

$request = json_decode(file_get_contents('php://input'));
$source = $_GET['layer'];

if (array_key_exists($source, $validSources)) {
    if (defined('USE_GEO_BOUNDARY') && USE_GEO_BOUNDARY && !empty($request->geoBoundary)) {
        define('PRINT_DATA', false);
        require_once($validSources[$source]);
        require_once('geoboundary.php');
        $filtered_rows = getItemsInBoundary($rows, $request->geoBoundary);
        print(json_encode($filtered_rows));
    } else {
        define('PRINT_DATA', true);
        require_once($validSources[$source]);
    }
}
