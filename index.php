<?php require_once('./config.php'); ?>
	
<html>
	<head>
		<meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		
		<link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"
			integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ==" crossorigin=""/>
   
		<title>Raid Map</title>
      
    	<script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"
			integrity="sha512-/Nsx9X4HebavoBvEBuyp3I7od5tA0UzAxs+j83KgC8PU0kgB4XiK4Lfe4y4cgBtaRJQEIFCW+oC506aPT2L1zw==" crossorigin=""></script>
   
		<script src='https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/Leaflet.fullscreen.min.js'></script>
		<link href='https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/leaflet.fullscreen.css' rel='stylesheet' />
   
		<style type="text/css">
            html { height: 100% }
            body { height: 100%; margin: 0; padding: 0;}
            #map { height: 100% }
        </style>

	</head>
	
	<body>

		<div id="map"></div>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
		<script type="text/javascript">
		
			var defaultCentre = new L.LatLng(<?php echo(MAP_CENTRE); ?>); 
			var mapToken = '<?php echo(MAP_TOKEN); ?>'; 
			var autoLocate = <?php echo(MAP_AUTOLOCATE); ?>; 
			var exIdentifier = '<?php echo(MAP_EX_IDENT); ?>';
		
			var map, tiles, darkTiles, outdoorsTiles, satelliteTiles, raids1, raids2, raids3, raids4, raids5, raidsX, gyms, gymsEX, questpoke, questitem, pokemon;
			var firstLoad=true;
			var pokemonIcon = [];
			
			var eggIcon = L.Icon.extend({
				options: {
					iconSize:     [32, 40],
					iconAnchor:   [16, 20], 
					popupAnchor:  [0, -10] 
				}
			});
			
			var raidIcon = L.Icon.extend({
				options: {
					iconSize:     [64, 64],
					iconAnchor:   [32, 32],
					popupAnchor:  [-3, -10] 			
				}
			});

			var pokemonIcon = L.Icon.extend({
				options: {
					iconSize:     [64, 64],
					iconAnchor:   [32, 32],
					popupAnchor:  [-3, -10] 			
				}
			});
			
			var gymIconGrey = L.icon({
				iconSize:     [20, 20], 
				iconAnchor:   [10, 17],
				popupAnchor:  [-3, -10],		
				iconUrl: 'buidl/gym.png'
			});

			var gymIconBlue = L.icon({
				iconSize:     [20, 20], 
				iconAnchor:   [10, 17],
				popupAnchor:  [-3, -10],		
				iconUrl: 'buidl/mystic64x.png'
			});
			
			var gymIconRed = L.icon({
				iconSize:     [20, 20], 
				iconAnchor:   [10, 17],
				popupAnchor:  [-3, -10],		
				iconUrl: 'buidl/valor64x.png'
			});
			
			var gymIconYellow = L.icon({
				iconSize:     [20, 20], 
				iconAnchor:   [10, 17],
				popupAnchor:  [-3, -10],		
				iconUrl: 'buidl/instinct64x.png'
			});
	
			var exGymIcon = L.icon({
				iconSize:     [20, 20],
				iconAnchor:   [10, 17], 
				popupAnchor:  [-3, -10],	
				iconUrl: 'buidl/gymEX.png'
			});

			var questPokeIcon = L.Icon.extend({
				options: {
					iconSize:     [32, 32],
					iconAnchor:   [24, 24],
					popupAnchor:  [0, -0],
					shadowUrl: 'buidl/quests/pokestop.png',
					shadowSize:   [32, 32],
					shadowAnchor: [24, 24]
				}
			});

			var questItemIcon = L.Icon.extend({
				options: {
					iconSize:     [32, 32],
					iconAnchor:   [24, 24],
					popupAnchor:  [0, 0],
					shadowUrl: 'buidl/quests/pokestop.png',		
					shadowSize:   [32, 32],
					shadowAnchor: [24, 24]					
				}
			});		
			
			(function () {
				//Separate layers for raid levels to allow toggle on/off of levels
				gyms = new L.FeatureGroup();
				gymsEX = new L.FeatureGroup();
				raids1 = new L.FeatureGroup();
				raids2 = new L.FeatureGroup();
				raids3 = new L.FeatureGroup();
				raids4 = new L.FeatureGroup();
				raids5 = new L.FeatureGroup();
				raidsX = new L.FeatureGroup();
				questpoke = new L.FeatureGroup();
				questitem = new L.FeatureGroup();
				pokemon = new L.FeatureGroup();
				
				tiles = new L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
				 attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a> | <a href="http://mapbox.com">Mapbox</a>',
				 maxZoom: 20,
					id: 'mapbox.streets',
					accessToken: mapToken
				});
				
				darkTiles = new L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
					attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a> | <a href="http://mapbox.com">Mapbox</a>',
					maxZoom: 20,
					id: 'mapbox.dark',
					accessToken: mapToken
				});
				
				outdoorsTiles = new L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
					attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a> | <a href="http://mapbox.com">Mapbox</a>',
					maxZoom: 20,
					id: 'mapbox.outdoors',
					accessToken: mapToken
				});
				
				satelliteTiles = new L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
					attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a> | <a href="http://mapbox.com">Mapbox</a>',
					maxZoom: 20,
					id: 'mapbox.satellite',
					accessToken: mapToken
				});		
				
				map = L.map('map', {
					center: defaultCentre, 
					zoom: 13,
					layers: [tiles, gyms, raidsX, raids1, raids2, raids3, raids4, raids5],
					fullscreenControl: true
				});
				
				if(autoLocate == true) {
					map.locate({setView: true, maxZoom: 14});

				}
		
				var baseMap = {
					"Light Map": tiles,
					"Dark Map": darkTiles,
					"Outdoors" : outdoorsTiles,
					"Satellite" : satelliteTiles
				};
				
				var overlayMaps = {
					"EX Raids": raidsX,
					"Level 5": raids5,
					"Level 4": raids4,
					"Level 3": raids3,
					"Level 2": raids2,
					"Level 1": raids1,
					<?php 
						if (MAP_SHOW_QUESTS) {
							echo('"Quests Pokemon": questpoke,
							        "Quests Item": questitem,
							       		'); 
						}
					
						if (MAP_SHOW_GYMS) {
							echo('"EX Gyms": gymsEX,
							"Other Gyms": gyms,');
							
						}
						if (MAP_SHOW_POKEMON) {
						    echo '"Pokemon": pokemon';
						}
					?>
				};
				
				L.control.layers(baseMap, overlayMaps, {hideSingleBase: true}).addTo(map);
				map.addControl(new L.Control.Scale());
					
			})();
            
            var localized_pokemon_names; 			
				
			$(document).ready(function() {
			  $.ajaxSetup({cache:false});
                getLocalizedPokemonNames()
				updateRaids();
			});
            
            function getLocalizedPokemonNames(){
                $.getJSON('tr/pokemon_<?php echo(strtolower(LANGUAGE)) ?>.json', function(data){ 
                    localized_pokemon_names = ["Pokemon egal"]; 
                    localized_pokemon_names = localized_pokemon_names.concat(data); 
                });
            }
			
			function updateRaids() {
				raids1.clearLayers();
				raids2.clearLayers();
				raids3.clearLayers();
				raids4.clearLayers();
				raids5.clearLayers();
				questpoke.clearLayers();
				questitem.clearLayers();
				pokemon.clearLayers();
				gyms.clearLayers();
				gymsEX.clearLayers();
				getGyms();
				getRaids();
				getPokemon();
				timeOut=setTimeout("updateRaids()",60000);
			}

			function getGyms() {
				$.getJSON("getgyms.php", function (data) {
					for (var i = 0; i < data.length; i++) {
						var location = new L.LatLng(data[i].lat, data[i].lon),
							gym_name = data[i].gym_name,
							address = data[i].address;
							ex_gym = data[i].ex_gym;
							team = data[i].team;
							slots_available = data[i].slots_available;
							since = data[i].since;
							image_link = data[i].image_link
							if(ex_gym == 1) {
								//Is EX Gym
								var EX=true;
							} else { 
								var EX=false; 
							}

							var gym_image ="<img src=" + image_link + " alt=" + gym_name + " height=\"64\" width=\"64\" style=\"border-radius: 50%;\">";

    						var gym_info = "<div style='font-size: 18px; color: #0078A8;'>"+ gym_name +"</div>";
    						gym_info += "<div style='font-size: 12px;'><a href='https://www.google.com/maps/search/?api=1&query=" + data[i].lat + "," + data[i].lon + "' target='_blank' title='Click to find " + gym_name + " on Google Maps'>" + address + "</a></div>&nbsp;<br />";

    						var slots_occupied = 6 - parseInt(slots_available);
    						
    						var slots_info = "<div style='font-size: 12px;'>" + "Plätze belegt:  "+ slots_occupied + "/6" + "</div><br />";
    						
    						var gym_footer = "<div style='font-size: 12px;'><?php if (defined('MAP_GYM_FOOTER') && !empty(MAP_GYM_FOOTER)) { echo(MAP_GYM_FOOTER); } ?></div>";
    						
    						var details = "<div style='text-align: center; margin-left: auto; margin-right: auto;'>" + gym_image + gym_info + slots_info + gym_footer + "</div>";
    						
    						if(EX) {
    							var marker = new L.Marker(location, {icon: exGymIcon}, { title: name });
    							marker.bindPopup(details, {maxWidth: '400'});
    							gymsEX.addLayer(marker);
    						} else {
    							switch(team){
    								case "0":
    									var marker = new L.Marker(location, {icon: gymIconGrey}, { title: slots_info });
    									break;
    								case "1":
    									var marker = new L.Marker(location, {icon: gymIconBlue}, { title: slots_info });
    									break;
    								case "2":
    									var marker = new L.Marker(location, {icon: gymIconRed}, { title: slots_info });
    									break;
    								case "3":
    									var marker = new L.Marker(location, {icon: gymIconYellow}, { title: slots_info });
    									break;
    							}
    							marker.bindPopup(details, {maxWidth: '400'});
    							gyms.addLayer(marker);							
    						}
    						
    	
    					}
				});
			}
					
			function getRaids() {
				$.getJSON("getraids.php", function (data) {
				  for (var i = 0; i < data.length; i++) {
					//Get vars from JSON data
					var location = new L.LatLng(data[i].lat, data[i].lon),
						gym_name = data[i].gym_name,
						address = data[i].address,
						pokemon_name = data[i].pokemon_name,
						pokedex_id = data[i].pokedex_id,
						pokemon_form = data[i].pokemon_form,
						level = data[i].raid_level,
						start_time = new Date((data[i].start_time).replace(/-/g,"/")),
						end_time = new Date((data[i].end_time).replace(/-/g,"/")),
						remaining = Math.floor(data[i].t_left / 60),
						interest = data[i].interest,
						raiders = parseInt(data[i].count),
						extras = parseInt(data[i].total_extras);
					    move_1 = data[i].move_1;
					    move_2 = data[i].move_2;
					    attendees = data[i].raiders;
                        
                    if(localized_pokemon_names.length > 0){
                        pokemon_name = localized_pokemon_names[pokedex_id];
                    }

					var attendance = ""; 
				    if(typeof attendees !==undefined){
				    	for(var value in attendees) {
				    	   var attendance_pokemon = attendees[value].pokemon_name;
                           
				    	   if(localized_pokemon_names.length > 0){
				    	       attendance_pokemon = localized_pokemon_names[attendees[value].pokedex_id];
				    	   }
                           
				    		attendance += "<div style='font-size: 12px;'>" + attendance_pokemon + "&#10551;" + attendees[value].attend_time + " / " +  + " / Teilnehmer: "+ attendees[value].raiders +"</div>";
			    		}
					}
						
					var gym_info = "<div style='font-size: 18px; color: #0078A8;'>"+ gym_name +"</div>";
						gym_info += "<div style='font-size: 12px;'><a href='https://www.google.com/maps/search/?api=1&query=" + data[i].lat + "," + data[i].lon + "' target='_blank' title='Click to find " + gym_name + " on Google Maps'>Zeig mir den Weg dorthin</a></div>&nbsp;<br />";
					var pokemon = "<div style='font-size: 18px;'><strong>" + pokemon_name + "</strong></div>";
					var moves = "";
					if(move_1){
						moves += "<div style='font-size: 12px;'>"+ move_1 +"/"+ move_2 +"</div>&nbsp;<br />";
					}
					
					var times = "<div style='font-size: 14px;" + ((remaining < 20) ? " color: red;" : "") + "'>";
					times += (level == "X") ? "<strong>" + start_time.toLocaleDateString() + "</strong><br>" : "";
					times += String.fromCodePoint(0x23F0) + start_time.getHours() + ":" + (start_time.getMinutes()<10?'0':'') + start_time.getMinutes() + " - " + end_time.getHours() + ":" + (end_time.getMinutes()<10?'0':'') + end_time.getMinutes();
					times += ((remaining < 45) ? " (" + remaining + "m left)</div>" : "</div>");
					
					if (level > 0) {
						var stars = "<div style='font-size: 16px;'>";
						for (var j =0; j < level; j++) {
							//stars += String.fromCodePoint(0x2B50) + " "; //Use star emoji for level
							stars += "<img src='buidl/level.png'> "; //Use Rhydon head
						}
						stars += "</div>";
					} else {
						stars = "";
					}
					
					var attending = "";
					if (interest) { 
						attending += "<div style='font-size: 14px;'>" + String.fromCodePoint(0x1f465) + " Interessenten: ";
					}
					
					var raid_footer = "";
					if (level == "X") {
						raid_footer += "<div style='font-size: 12px;'><?php if (defined('MAP_EX_RAID_FOOTER') && !empty(MAP_EX_RAID_FOOTER)) { echo('<br>');echo(MAP_EX_RAID_FOOTER); } ?></div>";
					} else {
						raid_footer += "<div style='font-size: 12px;'><?php if (defined('MAP_RAID_FOOTER') && !empty(MAP_RAID_FOOTER)) { echo('<br>');echo(MAP_RAID_FOOTER); } ?></div>";
					}

					var raidID = "<div style='font-size: 10px;'><br/>[Raid ID: " + data[i].id + "]</div>";
					
					var details = "<div style='text-align: center; margin-left: auto; margin-right: auto;'>"+ gym_info + pokemon + moves + stars + times + attending + attendance + raid_footer + raidID + "</div>";
					
					if (level == 5) {
						if (pokedex_id == 9995) {
							var marker = new L.Marker(location, {icon: new eggIcon({iconUrl: 'buidl/egg_L5.png' })}, { title: name });
						} else {
							pokemonIcon[i] = new raidIcon({iconUrl: 'buidl<?php echo("/" . MAP_ICONPACK); ?>/id_' + pokedex_id +'.png'})
							var marker = new L.Marker(location, {icon: pokemonIcon[i] }, { title: name });
						}
						marker.bindPopup(details, {maxWidth: '400'});
						raids5.addLayer(marker);
					} else if (level == 4) {
						if (pokedex_id == 9994) {
							var marker = new L.Marker(location, {icon: new eggIcon({iconUrl: 'buidl/egg_L4.png' })}, { title: name });	
						} else {
							pokemonIcon[i] = new raidIcon({iconUrl: 'buidl<?php echo("/" . MAP_ICONPACK); ?>/id_' + pokedex_id +'.png'})
							var marker = new L.Marker(location, {icon: pokemonIcon[i] }, { title: name });
						}
						marker.bindPopup(details, {maxWidth: '400'});
						raids4.addLayer(marker);
					} else if (level == 3) {
						if (pokedex_id == 9993) {
							var marker = new L.Marker(location, {icon: new eggIcon({iconUrl: 'buidl/egg_L3.png' })}, { title: name });	
						} else {
							pokemonIcon[i] = new raidIcon({iconUrl: 'buidl<?php echo("/" . MAP_ICONPACK); ?>/id_' + pokedex_id +'.png'})
							var marker = new L.Marker(location, {icon: pokemonIcon[i] }, { title: name });
						}
						marker.bindPopup(details, {maxWidth: '400'});
						raids3.addLayer(marker);
					} else if (level == 2) {
						if (pokedex_id == 9992) {
							var marker = new L.Marker(location, {icon: new eggIcon({iconUrl: 'buidl/egg_L2.png' })}, { title: name });	
						} else {
							pokemonIcon[i] = new raidIcon({iconUrl: 'buidl<?php echo("/" . MAP_ICONPACK); ?>/id_' + pokedex_id +'.png'})
							var marker = new L.Marker(location, {icon: pokemonIcon[i] }, { title: name });
						}
						marker.bindPopup(details, {maxWidth: '400'});
						raids2.addLayer(marker);
					} else if (level == 1){
						if (pokedex_id == 9991) {
							var marker = new L.Marker(location, {icon: new eggIcon({iconUrl: 'buidl/egg_L1.png' })}, { title: name });	
						} else {
							pokemonIcon[i] = new raidIcon({iconUrl: 'buidl<?php echo("/" . MAP_ICONPACK); ?>/id_' + pokedex_id +'.png'})
							var marker = new L.Marker(location, {icon: pokemonIcon[i] }, { title: name });
						}
						marker.bindPopup(details, {maxWidth: '400'});
						raids1.addLayer(marker);
					} else {
						//Level is X 
						if (remaining > 44) {
							var marker = new L.Marker(location, {icon: new eggIcon({iconUrl: 'buidl/egg_X.png' })}, { title: name });	
						} else {
							pokemonIcon[i] = new raidIcon({iconUrl: 'buidl<?php echo("/" . MAP_ICONPACK); ?>/id_' + pokedex_id +'.png'})
							var marker = new L.Marker(location, {icon: pokemonIcon[i] }, { title: name });
						}
						marker.bindPopup(details, {maxWidth: '400'});
						raidsX.addLayer(marker);
					}
					
				  }
				});
			}		
			
			
			
			function getQuestPoke() {
			    
			    $.getJSON("getquest.php", function (data) {
			        
					for (var i = 0; i < data['stops'].length; i++) {
						var location = new L.LatLng(data['stops'][i].lat, data['stops'][i].lon),
							pokestop_name = data['stops'][i].pokestop_name,
							pokemon_name = data['stops'][i].pokemon_name,
							pokedex_id = data['stops'][i].pokedex_ids,
						    address = data['stops'][i].address,
							quest_id = data['stops'][i].quest_id,
							reward_id = data['stops'][i].reward_id,
							quest_type = data['stops'][i].quest_type,
							quest_quantity = data['stops'][i].quest_quantity,
							quest_action = data['stops'][i].quest_action,
							reward_type = data['stops'][i].reward_type,
							reward_quantity = data['stops'][i].reward_quantity;
							
							if( pokedex_id ){
    							pokedex_id = pokedex_id.split(',');
    							pokedex_id = pokedex_id[0];
							}
							
						var pokestop_info = "<div style='font-size: 18px; color: #0078A8;'>"+ pokestop_name +"</div>";
						
						pokestop_info += "<div style='font-size: 12px;'><a href='https://www.google.com/maps/search/?api=1&query=" + data['stops'][i].lat + "," + data['stops'][i].lon + "' target='_blank' title='Click to find " + pokestop_name + " on Google Maps'>" + address + "</a></div>&nbsp;<br />";
						
						var q_type      = data['translations']['quest_type_' + quest_type].<?php echo LANGUAGE; ?>,
						    dat_action  = data['translations']['quest_action_' + quest_action].<?php echo LANGUAGE; ?>;
						    arr_action  = dat_action.split(':');
						    q_action    = ( ( quest_quantity == 1 ) ? arr_action[0] : arr_action[1] );
						    
						var r_type      = data['translations']['reward_type_' + reward_type].<?php echo LANGUAGE; ?>;
						    dat_r_type  = r_type.split(':');
						    r_type      = ( ( reward_quantity == 1 ) ? dat_r_type[0] : dat_r_type[1] );
						
						var quest_info = "<div style='font-size: 14px;'>"+ q_type + ' ' + quest_quantity + ' ' + q_action +"<br>"+ reward_quantity + ' ' + r_type +"		</div>";
						
						var quest_footer = "<div style='font-size: 12px;'><?php if (defined('MAP_QUEST_FOOTER') && !empty(MAP_QUEST_FOOTER)) { echo('<br>');echo(MAP_QUEST_FOOTER); } ?></div>";

						var questID = "<div style='font-size: 10px;'><br/>[Quest ID: " + data['stops'][i].id + "]</div>";

						var details = "<div style='text-align: center; margin-left: auto; margin-right: auto;'>"+ pokestop_info  + quest_info + quest_footer + questID + "</div>";
						
					if( pokedex_id && reward_type == 1 ){
					    
						    pokemonIcon[i] = new questPokeIcon({iconUrl: 'buidl<?php echo("/" . MAP_ICONPACK); ?>/id_' + pokedex_id +'.png'});
					var marker = new L.Marker(location, {icon: pokemonIcon[i] }, { title: name });
						marker.bindPopup(details, {maxWidth: '400'});
						questpoke.addLayer(marker);
				
						}else{
						    
					pokemonIcon[i] = new questItemIcon({iconUrl: 'buidl/quests/reward_type_' + reward_type + '.png'});
					var marker = new L.Marker(location, {icon: pokemonIcon[i] }, { title: name });
						marker.bindPopup(details, {maxWidth: '400'});
						questitem.addLayer(marker);
						}
						
						

					}
				});
			}

			function getPokemon() {
				$.getJSON("getpokemon.php", function (data) {
					for (var i = 0; i < data.length; i++) {
						var location = new L.LatLng(data[i].lat, data[i].lon),
							pokemon_id = data[i].pokemon_id,
							tth = data[i].tth;
    						
    						var details = "<div style='text-align: center; margin-left: auto; margin-right: auto;'>"+ "Noch "+ tth +"</div>";
    						pokemonIcon[i] = new pokemonIcon({iconUrl: 'buidl<?php echo("/" . MAP_ICONPACK); ?>/id_' + pokemon_id +'.png'})
							var marker = new L.Marker(location, {icon: pokemonIcon[i] }, { title: name });
							marker.bindPopup(details, {maxWidth: '400'});
							pokemon.addLayer(marker);						
    					}
				});
			}
			


		</script>
	</body>
</html>
