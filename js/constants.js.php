<?php require_once('../config.php'); ?>

var constants = {
    'mapbox_api_key': '<?= MAP_TOKEN ?>',
    'mapbox_map_center': [<?= MAP_CENTRE ?>],
    'mapbox_starting_zoom': <?= MAP_STARTING_ZOOM ?>
}