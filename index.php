<?php require_once('./config.php'); ?>
	
<html>
	<head>
    <meta charset='utf-8' />
    <title>Raid Map</title>
    <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
    <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.48.0/mapbox-gl.js'></script>
    <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.48.0/mapbox-gl.css' rel='stylesheet' />

<link href="./css/style.css" rel="stylesheet">

	</head>
	
	<body>

<div id='map'></div>


<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script>
mapboxgl.accessToken = '<?php echo(MAP_TOKEN); ?>';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'style.json',
    center: [<?php echo(MAP_CENTRE); ?>], // starting position
    zoom: 13 // starting zoom
    
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl(), 'top-left');

// Add geolocate control to the map.
map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
}), 'top-left');


var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
    var layerId = layer.target.id;
    //map.setStyle('mapbox://styles/mapbox/' + layerId + '-v9');
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}

map.on('load', function() {
 
    map.addLayer({
        "id": "gyms",
        "type": "symbol",
        "source": {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [
                    <?php 
                    ob_start();
                    include "getgyms.php";
                    $json = ob_get_clean();
                    $data = json_decode( $json );
                    foreach( $data as $item ) {
                        $icon = 'gym';
                        if( stripos( $item->gym_name, MAP_EX_IDENT ) !== false ){
                            $icon = 'ex' . $icon;
                        }
                        $gym_info = "<div style='font-size: 18px; color: #0078A8;'>" . htmlspecialchars($item->gym_name) . "</div>";
						$gym_info .= "<div style='font-size: 12px;'><a href='https://www.google.com/maps/search/?api=1&query=$item->lat,$item->lon' target='_blank' title='Click to find " . htmlspecialchars( $item->gym_name ) . " on Google Maps'>$item->address</a></div>&nbsp;<br />";
						
						$no_raids = "<div style='font-size: 12px;'>Geen raid bekend op deze gym<br/>Zie je een raid, meld hem aan.<br/>via de telegram bot.</div>";
						
						$output = "<div style='text-align: center; margin-left: auto; margin-right: auto;'>$gym_info $no_raids</div>";
                        echo '
                            {
                                "type": "Feature",
                                "geometry": {
                                    "type": "Point",
                                    "coordinates": [' . $item->lon . ', ' . $item->lat . ' ]
                                },
                                "properties": {
                                    "description": "' . $output . '",
                                    "icon": "' . $icon . '"
                                }
                            },
                        ';
                    } ?>
                ]
            }
        },
        "layout": {
            "icon-image": "{icon}",
            "text-field": "{title}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.6],
            "text-anchor": "top"
        }
    });
    
    map.addLayer({
        "id": "stops",
        "type": "symbol",
        "source": {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [
                    <?php 
                    ob_start();
                    include "getpokestop.php";
                    $json = ob_get_clean();
                    $data = json_decode( $json );
                    foreach( $data as $item ) {
                        $pokename = htmlspecialchars($item->pokestop_name);
						$stop_info = "<div style='font-size: 18px; color: #0078A8;'>" . htmlspecialchars($item->pokestop_name) . "</div>";
						$stop_info .= "<div style='font-size: 12px;'><a href='https://www.google.com/maps/search/?api=1&query=$item->lat,$item->lon' target='_blank' title='Click to find " . htmlspecialchars( $item->pokestop_name ) . " on Google Maps'>$item->address</a></div>&nbsp;<br />";
						
						$no_quests = "<div style='font-size: 12px;'>Geen quest bekend op deze Pokestop<br/>Zie je een quest, meld hem aan.<br/>via de telegram bot.</div>";
						
						$output = "<div style='text-align: center; margin-left: auto; margin-right: auto;'>$stop_info $no_quests</div>";
                        echo '
                            {
                                "type": "Feature",
                                "geometry": {
                                    "type": "Point",
                                    "coordinates": [' . $item->lon . ', ' . $item->lat . ' ]
                                },
                                "properties": {
                                    "description": "' . $output . '",
                                    "icon": "poke"
                                }
                            },
                        ';
                    } ?>
                ]
            }
        },
        "layout": {
            "icon-image": "{icon}",
            "text-field": "{title}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.6],
            "text-anchor": "top"
        }
    });
    
    map.on('click', 'gyms', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });
    
    
    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'gyms', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'gyms', function () {
        map.getCanvas().style.cursor = '';
    });
    
    map.on('click', 'stops', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });
    
    
    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'stops', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'stops', function () {
        map.getCanvas().style.cursor = '';
    });
    
});

var toggleableLayerIds = [ 'gyms', 'stops' ];

for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
}


</script>

</body>
</html>
