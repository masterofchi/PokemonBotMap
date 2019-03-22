let settings = new pogomap.Settings(constants.mapbox_map_center, constants.mapbox_starting_zoom);
let map = new pogomap.Map(settings, allStyles, allLayers, allFilters);

document.addEventListener('DOMContentLoaded', () => {
    map.init('map');
    map.registerControlPosition('top-center');
    map.addControls(controls);
    map.loadTemplates(templates).then(() => {
        map.loadFeatures();
    });
});

/*
    
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