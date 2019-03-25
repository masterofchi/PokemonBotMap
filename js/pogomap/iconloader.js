(function (pogomap) {
    pogomap.IconLoader = pogomap.IconLoader || {};

    pogomap.IconLoader.loadedImages = [];

    pogomap.IconLoader.loadPokemonIcon = function (pokedex_id, map) {
        const name = 'icon_pokedex_' + pokedex_id;
        const url = 'buidl/' + constants.map_icon_pack + '/id_' + pokedex_id + '.png';
        pogomap.IconLoader.loadIcon(name, url, map);
        return name;
    };

    pogomap.IconLoader.loadTeamIcon = function (team, map) {
        let name = 'gym';
        let url = 'buidl/gym.png';

        switch (team) {
            case '1':
            case 'mystic': {
                name = 'mystic';
                url = 'buidl/mystic.png';
                break;
            }
            case '2':
            case 'valor': {
                name = 'valor';
                url = 'buidl/valor.png';
                break;
            }
            case '3':
            case 'instinct': {
                name = 'instinct';
                url = 'buidl/instinct.png';
                break;
            }
        }

        pogomap.IconLoader.loadIcon(name, url, map);
        return name;
    };

    pogomap.IconLoader.loadQuestIcon = function (quest, map) {
        const pokestop_name = 'quest_pokestop';
        const pokestop_url = 'buidl/quests/pokestop.png';
        let name = '';
        let url = '';

        switch (quest.quest_reward_type) {
            case('2'): {
                name = 'reward_item_' + quest.quest_item_id;
                url = 'buidl/quests/quest_reward_' + quest.quest_item_id + '.png';
                break;
            }
            case('3'): {
                name = 'reward_stardust';
                url = 'buidl/quests/quest_reward_stardust.png';
                break;
            }
            case('7'): {
                name = 'reward_pokemon_' + quest.quest_pokemon_id;
                url = 'buidl/' + constants.map_icon_pack + '/id_' + quest.quest_pokemon_id + '.png';
                break;
            }
        }

        name = pokestop_name + '-' + name;
        pogomap.IconLoader.mergeIcons(name, url, pokestop_url, map);
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

    pogomap.IconLoader.mergeIcons = function (name, image_fg, image_bg, map) {
        if (!pogomap.IconLoader.loadedImages.includes(name)) {
            pogomap.IconLoader.loadedImages.push(name);
            const c = document.createElement('canvas');
            c.width = 128;
            c.height = 128;
            const ctx = c.getContext("2d");
            const imageObj1 = new Image();
            const imageObj2 = new Image();
            imageObj1.src = image_bg;

            imageObj1.onload = function () {
                ctx.drawImage(imageObj1, 0, 0);
                imageObj2.src = image_fg;
                imageObj2.onload = function () {
                    if (!map.hasImage(name)) {
                        ctx.drawImage(imageObj2, 0, 0);
                        map.addImage(name, ctx.getImageData(0, 0, 128, 128));
                    }
                }
            };
        }
    }
}(window.pogomap = window.pogomap || {}));