var allStyles = [
	{
		'name': 'streets',
		'style': 'streets-v10',
		'label': 'Stra&szlig;en'
	},
	{
		'name': 'outdoors',
		'style': 'outdoors-v10',
		'label': 'Stra&szlig;en und Wege'
	},
	{
		'name': 'light',
		'style': 'light-v9',
		'label': 'Hell'
	},
	{
		'name': 'dark',
		'style': 'dark-v9',
		'label': 'Dunkel'
	},
	{
		'name': 'satellite',
		'style': 'satellite-v9',
		'label': 'Satellit'
	},
	{
		'name': 'satellite_streets',
		'style': 'satellite-streets-v10',
		'label': 'Satellit und Stra&szlig;en'
	}
];

var allLayers = [
	{
		'name': 'raids',
		'class': 'RaidsLayer',
		'label': 'Raids',
		'source': 'getraids.php'
	},
	{
		'name': 'gyms',
		'class': 'GymsLayer',
		'label': 'Arenen',
		'source': 'getgyms.php'
	},
	{
		'name': 'quests',
		'class': 'QuestsLayer',
		'label': 'Feldforschungen',
		'source': 'getquest.php'
	},
	{
		'name': 'pokemon',
		'class': 'PokemonLayer',
		'label': 'Pok&eacute;mon',
		'source': 'getpokemon.php'
	}
];

var allFilters = [
	{
		'layer': 'raids',
		'label': 'Raids',
		'filters': [
			{
				'name': 'raidsX',
				'label': 'Ex-Raids'
			},
			{
				'name': 'raids1',
				'label': 'Level 1 Raids'
			},
			{
				'name': 'raids2',
				'label': 'Level 2 Raids'
			},
			{
				'name': 'raids3',
				'label': 'Level 3 Raids'
			},
			{
				'name': 'raids4',
				'label': 'Level 4 Raids'
			},
			{
				'name': 'raids5',
				'label': 'Level 5 Raids'
			}
		]
	},
	{
		'layer': 'gyms',
		'label': 'Arenen',
		'filters': [
			{
				'name': 'gymsX',
				'label': 'Ex-Raid Arenen'
			},
			{
				'name': 'gymsOther',
				'label': 'andere Arenen'
			},
			{
				'name': 'gymsFull',
				'label': 'volle Arenen'
			},
			{
				'name': 'gymsMystic',
				'label': 'Team Weisheit'
			},
			{
				'name': 'gymsValor',
				'label': 'Team Wagemut'
			},
			{
				'name': 'gymsInstinct',
				'label': 'Team Intuition'
			}		
		]
	},
	{
		'layer': 'quests',
		'label': 'Feldforschungen',
		'filters': [
			{
				'name': 'questsItems',
				'label': 'Item Belohnung'
			},
			{
				'name': 'questsStardust',
				'label': 'Sternenstaub Belohnung'
			},
			{
				'name': 'questsPokemon',
				'label': 'Pokémon Belohnung'
			}
		]
	},
	{
		'layer': 'pokemon',
		'label': 'Pokémon',
		'filters': [
			{
				'name': 'pokemonUrgent',
				'label': 'Unter 5 Minuten'
			}
		]
	}
];

var controls = {
	'navigation': 'top-left',
	'geolocation': 'top-left',
	'layersmenu': 'top-right',
	'filtermenu': 'top-center'
};

var templates = [
	{
		'name': 'raidPopup',
		'url': 'templates/raid_popup.html'
	},
	{
		'name': 'gymPopup',
		'url': 'templates/gym_popup.html'
	},
	{
		'name': 'pokemonPopup',
		'url': 'templates/pokemon_popup.html'
	},
	{
		'name': 'raidAttendance',
		'url': 'templates/raid_attendance.html'
	},
	{
		'name': 'questPopup',
		'url': 'templates/quest_popup.html'
	}
];

var settings = new pogomap.Settings(constants.mapbox_map_center, constants.mapbox_starting_zoom);
var map = new pogomap.Map(settings, allStyles, allLayers, allFilters);

document.addEventListener('DOMContentLoaded', event => {
	map.init('map');	
	map.registerControlPosition('top-center');
	map.addControls(controls);
	map.loadTemplates(templates).then(() => {	
		map.load();
	});
});

/*
    
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
		'pokemon': null,
		'quests': null
    };   
    
    var updateData = function(){
    	if(lastUpdateTime !== null && Date.now() < lastUpdateTime + (constants.map_refresh_rate * 1000)){
    		window.setTimeout(updateData, 100);
    		return;
    	}
    	else{
    		lastUpdateTime = Date.now();
    	}
    	
    	var promises = [];
    	
	   	var gymsPromise = function(){ return pogomap.Ajax.getJSON('getgyms.php'); };
	   	var raidPromise = function(){ return pogomap.Ajax.getJSON('getraids.php'); };
	   	var pokemonPromise = function(){ return pogomap.Ajax.getJSON('getpokemon.php'); };
	   	var questsPromise = function(){ return pogomap.Ajax.getJSON('getquest.php'); };
	   	
	   	if(settings.hasGymLayers()){
	   		promises.push(gymsPromise());
	   	}
	   	
	   	if(settings.hasRaidLayers()){
	   		promises.push(raidPromise());
	   	}
	   	
	   	if(settings.hasLayer('pokemon')){
	   		promises.push(pokemonPromise());
	   	}
	   	
	   	if(settings.hasLayer('quests')){
	   		promises.push(questsPromise());
	   	}
	   	
	   	Promise.all(promises).then(data => {
	   		var index = 0;
	   		var gym_data = [], raid_data = [], pokemon_data = [], quests_data = [];
	   		
	   		if(settings.hasGymLayers()){
	   			gym_data = data[index++];
	   		}
	   		
	   		if(settings.hasRaidLayers()){
	   			raid_data = data[index++];
	   		}
	   		
	   		if(settings.hasLayer('pokemon')){
	   			pokemon_data = data[index++];
	   		}
	   		
	   		if(settings.hasLayer('quests')){
	   			quests_data = data[index++];
	   		}
	   		
	   		mapData.exraids = settings.hasLayer('raidsX') ? buildRaidLayerJson(raid_data.filter(raid => raid.raid_level == 'X')) : null;
	   		mapData.raids5 = settings.hasLayer('raids5') ? buildRaidLayerJson(raid_data.filter(raid => raid.raid_level == 5)) : null;
	   		mapData.raids4 = settings.hasLayer('raids4') ? buildRaidLayerJson(raid_data.filter(raid => raid.raid_level == 4)) : null;
	   		mapData.raids3 = settings.hasLayer('raids3') ? buildRaidLayerJson(raid_data.filter(raid => raid.raid_level == 3)) : null;
	   		mapData.raids2 = settings.hasLayer('raids2') ? buildRaidLayerJson(raid_data.filter(raid => raid.raid_level == 2)) : null;
	   		mapData.raids1 = settings.hasLayer('raids1') ? buildRaidLayerJson(raid_data.filter(raid => raid.raid_level == 1)) : null;
	   		
	   		mapData.exgyms = settings.hasLayer('gymsX') ? buildGymLayerJson(filterGyms(gym_data, raid_data, true)) : null;
	   		mapData.gyms = settings.hasLayer('gyms') ? buildGymLayerJson(filterGyms(gym_data, raid_data, false)) : null;
	   		
	   		mapData.pokemon = settings.hasLayer('pokemon') ? buildPokemonLayerJson(pokemon_data) : null;
	   		
	   		mapData.quests = settings.hasLayer('quests') ? buildQuestsLayerJson(quests_data) : null;
	   		
	   		updateMap();
	   	});
	   	
	   	window.setTimeout(updateData, constants.map_refresh_rate * 1000);
    };
    
    var filterGyms = function(gyms, raids, filterForExGyms){
        var result = gyms;
        var show_raid_levels = settings.getLayers().map(layer => layer.substr(layer.length - 1, layer.length));
        
        if(filterForExGyms){
            result = gyms.filter(gym => gym.ex_gym == 1)
        }
        else{
            result = gyms.filter(gym => gym.ex_gym == 0);
        }        
            
        return result.filter(gym => raids.filter(raid => show_raid_levels.includes(raid.raid_level) && raid.gym_id == gym.id).length == 0);
    };
    
    var buildRaidLayerJson = function(raids){
    	return raids
            .map(raid => prepareRaidForRendering(raid))
            .map(raid => {
        		return {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [raid.lon, raid.lat]
                    },
                    'properties': {
                        'title': raid.pokemon_name,
                        'description': renderTemplate(raidPopupHtml, raid),
                        'icon': loadPokemonIcon(raid.pokedex_id),
                        'raid_level': raid.raid_level == 'X' ? 'EX RAID' : '\u272A'.repeat(raid.raid_level),
                        'attendees': raid.raiders != null ? Object.keys(raid.raiders).map(key => { return raid.raiders[key].reduce(function(total, raider){ return total + Number(raider.raiders)}, 0); }).reduce(function(total, num){ return total + num; }, 0) : ''
                    }
        		}
        	});
    };
    
    var prepareRaidForRendering = function(raid) {
        raid.ts_start_string = new Date(raid.ts_start * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        raid.ts_end_string = new Date(raid.ts_end * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        var remaining = [];
        
        if(raid.t_left > 3600){
            var hours = Math.floor(raid.t_left / 3600);
            remaining.push(hours + ' Stunde' + (hours != 1 ? 'n' : ''));
            raid.t_left -= hours * 3600;
        }
        
        if(raid.t_left > 60){
            var minutes = Math.floor(raid.t_left / 60);
            remaining.push(minutes + ' Minute' + (minutes != 1 ? 'n' : ''));
            raid.t_left -= minutes * 60;
        }
        
        var seconds = raid.t_left;
        remaining.push(seconds + ' Sekunde' + (seconds != 1 ? 'n' : ''));
        
        raid.t_left_string = remaining.join(', ');
        
        if(raid.raiders == null){
            raid.raiders_set = 0;
        }
        else{
            raid.raiders_set = 1;            
            raid.raiders_string = '';
            
            for (const key in raid.raiders) {
                raid.raiders_string += raid.raiders[key].reduce(function(result, attendence) { 
                	return result + renderTemplate(attendanceHtml, attendence); 
                }, '');
            };
        }
        
        if(raid.move_1 != null && raid.move_2 != null){
            raid.raid_moves_present = 1;
        }
        else{
            raid.raid_moves_present = 0;
        }
        
        return raid;
    };
    
    var buildGymLayerJson = function(gyms) {
		return gyms.map(gym => { 
			return {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [gym.lon, gym.lat]
                },
                'properties': {
                    'title': gym.gym_name,
                    'description': renderTemplate(gymPopupHtml, gym),
                    'icon': loadTeamIcon(gym.team)
                }
  			}
		});
    };
    
    var buildPokemonLayerJson = function(pokemons){
		return pokemons
            .map(pokemon => {
                var timeParts = pokemon.tth.split(':');
                var tthParts = [];
                
                if(timeParts[0] > 0){
                    tthParts.push(Number(timeParts[0]) + ' Stunde' + (timeParts[0] != 1 ? 'n' : ''));
                }
                
                tthParts.push(Number(timeParts[1]) + ' Minute' + (timeParts[1] != 1 ? 'n' : ''))
                
                if(timeParts[0] == 0 && timeParts[1] < 5){
                	pokemon.urgent = 1;
                	pokemon.tth_string = 'Unter 5 Minuten'
                }
                else{
                	pokemon.urgent = 0;                
                    pokemon.tth_string = 'Noch ' + tthParts.join(', ');
                }
                	
                return pokemon;
            })
            .map(pokemon => { 
    			return {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [pokemon.lon, pokemon.lat]
                    },
                    'properties': {
                        'title': pokemon.pokemon_name,
                        'description': renderTemplate(pokemonPopupHtml, pokemon),
                        'icon': loadPokemonIcon(pokemon.pokemon_id)
                    }
      			}
    		});
    };
    
    var buildQuestsLayerJson = function(quests){
    	return quests
	        .map(quest => prepareQuestForRendering(quest))
	        .map(quest => {
	    		return {
	    			'type': 'Feature',
	                'geometry': {
	                    'type': 'Point',
	                    'coordinates': [quest.lon, quest.lat]
	                },
	                'properties': {
	                    'title': quest.quest_task,
	                    'description': renderTemplate(questPopupHtml, quest),
	                    'icon': quest.icon
	                }
	    		}
	    	});
    };
    
    var prepareQuestForRendering = function(quest){    	
    	switch(quest.quest_reward_type){
			case('2'):{
				quest.reward_amount = quest.quest_item_amount + 'x ';
				quest.reward_image = 'buidl/quests/quest_reward_' + quest.quest_item_id + '.png';
				break;
			}
			case('3'):{
				quest.reward_amount = quest.quest_stardust + ' '; 
				quest.reward_image = 'buidl/quests/quest_reward_stardust.png';
				break;
			}
			case('7'):{
				quest.reward_amount = '';
				quest.reward_image = 'buidl/' + constants.map_icon_pack + '/id_' + quest.quest_pokemon_id + '.png';
				break;
			}    		
		}
    	
    	quest.icon = loadQuestIcon(quest);    	
    	return quest;
    };
    
    var renderTemplate = function(template, obj){
    	var result = template;
    	
    	for (const key in obj){
    		result = result.split('##' + key + '##').join(obj[key]);
    	}
    	
    	return result;
    };
    
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
				              'text-field': '{raid_level} {attendees}',
                              'icon-anchor': 'bottom',
                              'text-anchor': 'center',                              
	    					  'icon-image': '{icon}',
	    					  'icon-size': 0.5,
	    					  'icon-allow-overlap': true,
	    					  'text-allow-overlap': true
	    				  },
                          'paint': {
                            'text-opacity': 0.5
                          }
					  });
    			  }
    			  else{
        			  map.getSource(key).setData({ 'type': 'FeatureCollection', 'features': value});
    			  }
    		  }
    	}
    };
    
    var loadedImages = [];
    
    var loadTeamIcon = function(team) {
    	var name = 'gym';
    	var url = 'buidl/gym.png';
    	
    	switch(team){
	    	case '1':
	    	case 'mystic':{
	    		name = 'mystic';
	    		url = 'buidl/mystic.png';
	    		break;
	    	}
	    	case '2':
	    	case 'valor':{
				name = 'valor';
				url = 'buidl/valor.png';
				break;
	    	}
	    	case '3':
	    	case 'instinct':{
				name = 'instinct';
				url = 'buidl/instinct.png';
				break;
	    	}
    	}
    	
    	loadImage(name, url);
        return name;
    };
    
    var loadPokemonIcon = function(pokedex_id) {    	
    	var name = 'icon_pokedex_' + pokedex_id;
    	var url = 'buidl/' + constants.map_icon_pack + '/id_' + pokedex_id + '.png';
    	loadImage(name, url);    	
    	return name;
    };
    
    var loadQuestIcon = function(quest){
    	var pokestop_name = 'quest_pokestop';
    	var pokestop_url = 'buidl/quests/pokestop.png';
    	
    	switch(quest.quest_reward_type){
			case('2'):{
				name = 'reward_item_' + quest.quest_item_id;
				url = 'buidl/quests/quest_reward_' + quest.quest_item_id + '.png';
				break;
			}
			case('3'):{
				name = 'reward_stardust';
				url = 'buidl/quests/quest_reward_stardust.png';
				break;
			}
    		case('7'):{
    			name = 'reward_pokemon_' + quest.quest_pokemon_id;
    			url = 'buidl/' + constants.map_icon_pack + '/id_' + quest.quest_pokemon_id + '.png';
    			break;
    		}    		
    	}
    	
    	name = pokestop_name + '-' + name;
    	mergeIcons(name, url, pokestop_url);
    	
    	return name;
    }
    
    var loadImage = function(name, url){
    	if(!loadedImages.includes(name)){
        	loadedImages.push(name);
        	
        	map.loadImage(url, function(error, image){
	        	map.addImage(name, image);
        	});
        }
    }
    
    map.on('load', function () {        
        for (const key in mapData) {
    	   	 map.on('click', key, function(e) { handleClick(e); });
    		 map.on('mouseenter', key, function() { handleMouseEnter(); });
    		 map.on('mouseleave', key, function() { handleMouseLeave(); });
        };
    });
    
    map.on('style.load', function() {  
        loadedImages = [];
    	lastUpdateTime = null;    
    	updateData();
    });
    
    map.on('moveend', function(){
    	var location = map.getCenter();
    	settings.setLocation([ location.lng, location.lat ]);
    });
    
    map.on('zoomend', function(){
    	settings.setZoom(map.getZoom());
    });
			 
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
	 
	 var mergeIcons = function(name, image_fg, image_bg) {
    	if(!loadedImages.includes(name)){
	        loadedImages.push(name);
			var c = document.createElement('canvas');
			c.width = 128;
			c.height = 128;
			var ctx=c.getContext("2d");
			var imageObj1 = new Image();
			var imageObj2 = new Image();
			imageObj1.src = image_bg;
			 
			imageObj1.onload = function() {
			    ctx.drawImage(imageObj1, 0, 0);
			    imageObj2.src = image_fg;
			    imageObj2.onload = function() {
			       ctx.drawImage(imageObj2, 0, 0);			       
			       map.addImage(name, ctx.getImageData(0, 0, 128, 128));
			    }
			};
    	}
	 }
});*/