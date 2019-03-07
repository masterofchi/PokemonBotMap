var settings = $.cookie('pogoraidmap_settings') != null ? JSON.parse($.cookie('pogoraidmap_settings')) : null;

if(settings == null){
	settings = {
		'location': constants.mapbox_map_center,
		'zoom': constants.mapbox_starting_zoom,
		'style': 'streets-v10',
		'layers': [
			'show_exraids',
			'show_raids5',
			'show_raids4',
			'show_raids3',
			'show_raids2',
			'show_raids1',
			'show_exgyms',
			'show_gyms'
		]
	};
}
	 
$(document).ready(function(){	 
    mapboxgl.accessToken = constants.mapbox_api_key;
    
    // Instantiate the map
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/' + settings.style, // initial style
        center: settings.location, // starting position
        zoom: settings.zoom // starting zoom
    });
    
    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl(), 'top-left');
    
    // Add geolocate control to the map.
    map.addControl(new mapboxgl.GeolocateControl({ positionOptions: { enableHighAccuracy: true }, trackUserLocation: true }), 'top-left');
        
    // Preload popup HTML templates
    var raidPopupHtml;
    var gymPopupHtml;
    
    var raidPopupPromise = $.get('templates/raid_popup.html');
    var gymPopupPromise = $.get('templates/gym_popup.html');

    $.when(raidPopupPromise, gymPopupPromise).done(function(raidData, gymData) {
		raidPopupHtml = raidData[0];
		gymPopupHtml = gymData[0];
    });
    
    // Setup style settings
    $('#layer_settings ul li input:radio[value="' + settings.style + '"]').prop('checked', 'checked');
    
    // Handle style switches
    $('#layer_settings ul li input:radio[name="style"]').click(function() {
    	map.setStyle('mapbox://styles/mapbox/' + $(this).attr('value'));
    	settings.style = $(this).attr('value');    
    });
    
    // Setup layer settings
    $('#layer_settings ul li input:checkbox').each(function(){
    	if(settings.layers.includes($(this).attr('value'))){
    		$(this).prop('checked', 'checked');
    	}
    	else{
    		$(this).removeAttr('checked');
    	}
    });
    
    // Handle layer switches
    $('#layer_settings ul li input:checkbox').click(function() {
    	if($(this).is(':checked')){
    		if(!settings.layers.includes($(this).attr('value'))){
	    		settings.layers.push($(this).attr('value'));
	    	}
    	}
    	else{
    		settings.layers = settings.layers.filter(layer => layer != $(this).attr('value'));
    	}
    	
    	updateData();
    }); 
    
    // Setup map data object
    var mapData = {
    		'exraids': null,
    		'raids5': null,
 			'raids4': null,
 			'raids3': null,
 			'raids2': null,
 			'raids1': null,
 			'exgyms': null,
 			'gyms': null,
			'pokemon': null
	   };   
    
    var updateData = function(){	
	   	var gymsPromise = $.getJSON('getgyms.php');
	   	var raidPromise = $.getJSON('getraids.php');
	   	var pokemonPromise = $.getJSON('getpokemon.php');
	   	
	   	$.when(gymsPromise, raidPromise, pokemonPromise).done(function(gym_data, raid_data, pokemon_data){
	   		mapData.exraids = settings.layers.includes('show_exraids') ? buildRaidLayerJson(raid_data[0].filter(raid => raid.raid_level == 0)) : null;
	   		mapData.raids5 = settings.layers.includes('show_raids5') ? buildRaidLayerJson(raid_data[0].filter(raid => raid.raid_level == 5)) : null;
	   		mapData.raids4 = settings.layers.includes('show_raids4') ? buildRaidLayerJson(raid_data[0].filter(raid => raid.raid_level == 4)) : null;
	   		mapData.raids3 = settings.layers.includes('show_raids3') ? buildRaidLayerJson(raid_data[0].filter(raid => raid.raid_level == 3)) : null;
	   		mapData.raids2 = settings.layers.includes('show_raids2') ? buildRaidLayerJson(raid_data[0].filter(raid => raid.raid_level == 2)) : null;
	   		mapData.raids1 = settings.layers.includes('show_raids1') ? buildRaidLayerJson(raid_data[0].filter(raid => raid.raid_level == 1)) : null;
	   		
	   		mapData.exgyms = settings.layers.includes('show_exgyms') ? buildGymLayerJson(gym_data[0].filter(gym => gym.ex_gym == 1), raid_data[0].filter(raid => raid.raid_level == 0), settings.layers.includes('show_exraids') ? ['0'] : []) : null;
	   		mapData.gyms = settings.layers.includes('show_gyms') ? buildGymLayerJson(gym_data[0].filter(gym => gym.ex_gym == 0), raid_data[0].filter(raid => raid.raid_level != 0), settings.layers.filter(layer => layer.startsWith('show_raids')).map(layer => layer.substr(layer.length - 1, layer.length))) : null;
	   		mapData.pokemon = settings.layers.includes('show_pokemon') ? buildPokemonLayerJson(pokemon_data[0]) : null;
	   		
	   		updateMap();
	   	});
	   	
	   	window.setTimeout(updateData, 60000);
    };
    
    var buildRaidLayerJson = function(raids){
    	return raids.map(function(raid){
    		return {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [raid.lon, raid.lat]
                },
                'properties': {
                    'title': raid.pokemon_name,
                    'description': renderPopup(raidPopupHtml, raid),
                    'icon': loadPokemonIcon(raid.pokedex_id, raid.raid_level)
                }
    		}
    	});
    }
    
    var buildGymLayerJson = function(gyms, raids, raid_levels){
    	return gyms
    			.filter(gym => raids.filter(raid => raid.gym_id == gym.id && raid_levels.includes(raid.raid_level)).length == 0)
    			.map(function(gym){ 
    				return {
	                    'type': 'Feature',
	                    'geometry': {
	                        'type': 'Point',
	                        'coordinates': [gym.lon, gym.lat]
	                    },
	                    'properties': {
	                        'title': gym.gym_name,
	                        'description': renderPopup(gymPopupHtml, gym),
	                        'icon': (gym.team == 1 ? 'mystic' : (gym.team == 2 ? 'valor' : 'instinct'))
	                    }
    				}
				});
    }
    
    var buildPokemonLayerJson = function(pokemon){
    	return pokemon;
    }
    
    var renderPopup = function(template, obj){
    	var result = template;
    	
    	for (const key in obj){
    		result = result.split('##' + key + '##').join(obj[key]);
    	}
    	
    	return result;
    }
    
    var updateMap = function(){
    	if(!map.isStyleLoaded()){
    		window.setTimeout(updateMap, 100);
    		return;
    	}
    	
    	for (const key in mapData) {
    		  var value = mapData[key];
    		  
    		  if(value == null){	  
    			  if (map.getLayer(key) !== undefined) {
    				  map.removeLayer(key);
    			  }
    			  
    			  if(map.getSource(key) !== undefined){
    				  map.removeSource(key);
    			  }
    		  }
    		  else{    		
    			  if(!map.getSource(key)){
    				  map.addSource(key, { type: 'geojson', data: { 'type': 'FeatureCollection', 'features': value} });
    			  }
    			  
    			  if (!map.getLayer(key)) {    				  
    				  map.addLayer({
	    				  'id': key,
	    				  'type': 'symbol',
	    				  'source': key,
	    				  'layout': {
	    					  'icon-image': '{icon}',
	    					  'icon-size': 0.4,
	    					  'icon-allow-overlap': true
	    				  }
					  });
    			  }
    			  else{
        			  map.getSource(key).setData({ 'type': 'FeatureCollection', 'features': value});
    			  }
    		  }
    	}
    }
    
    var loadImages = function() {
    	var icons = [
    		{
    			'name' : 'instinct',
    			'src' : 'buidl/instinct64x.png'
    		},
    		{
    			'name' : 'mystic',
    			'src' : 'buidl/mystic64x.png'
    		},
    		{
    			'name' : 'valor',
    			'src' : 'buidl/valor64x.png'
    		}
    	];
    	
    	icons.forEach(icon => {
            map.loadImage(icon.src, function(error, image){
            	map.addImage(icon.name, image);
            });
    	});
    }
    
    var loadPokemonIcon = function(pokedex_id, raid_level) {    	
    	var name = 'icon_pokedex_' + pokedex_id;
    	var url = 'buidl/pogoassets/id_' + pokedex_id + '.png';
    	
    	if(pokedex_id > 9990){
    		if(raid_level > 0){
				name = 'icon_egg_l' + raid_level;
				url = 'buidl/egg_L' + raid_level + '.png';
    		}
    		else{
				name = 'icon_egg_X';
				url = 'buidl/egg_X.png';   			
    		}
    	}
    	
    	if(!map.hasImage(name)){
	    	map.loadImage(url, function(error, image){
	        	map.addImage(name, image);
	        });
    	}
    	
    	return name;
    }
    
    map.on('load', function () {
    	updateData();
    });
    
    map.on('style.load', function() {  
    	loadImages();
    	updateData();
    });
    
    map.on('moveend', function(){
    	var location = map.getCenter();
    	settings.location = [ location.lng, location.lat ];
    });
    
    map.on('zoomend', function(){
    	settings.zoom = map.getZoom();
    });
    
    for (const key in mapData) {
	   	 map.on('click', key, function(e) { handleClick(e); });
		 map.on('mouseenter', key, function() { handleMouseEnter(); });
		 map.on('mouseleave', key, function() { handleMouseLeave(); });
    }
			 
	var handleClick = function (e) {
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
	 };
			 
	var handleMouseEnter = function () {
		 map.getCanvas().style.cursor = 'pointer';
	 };
	  
			 
	var handleMouseLeave = function () {
		 map.getCanvas().style.cursor = '';
	 };
});
 
$(window).on('unload', function(){		 
		 $.cookie('pogoraidmap_settings', JSON.stringify(settings), { expires: 30 });
});