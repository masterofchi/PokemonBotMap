(function (pogomap) {
    pogomap.IconLoader = pogomap.IconLoader || {};

    pogomap.IconLoader.loadedImages = [];

    pogomap.IconLoader.loadPokemonIcon = function (pokedex_id, map) {
        const name = 'icon_pokedex_' + pokedex_id;
        const url = 'buidl/' + constants.map_icon_pack + '/id_' + pokedex_id + '.png';
        pogomap.IconLoader.loadIcon(name, url, map);
        return name;
    };
    
    pogomap.IconLoader.loadTeamIcon = function(team, map) {
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
    	
    	pogomap.IconLoader.loadIcon(name, url, map);
        return name;
    };

    pogomap.IconLoader.loadIcon = function (name, url, map) {
        if (!pogomap.IconLoader.loadedImages.includes(name)) {
            pogomap.IconLoader.loadedImages.push(name);

            map.loadImage(url, function (error, image) {
                if (!map.hasImage(name)) {
                    map.addImage(name, image);
                }
            });
        }
    };
}(window.pogomap = window.pogomap || {}));