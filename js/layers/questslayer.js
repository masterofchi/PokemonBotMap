(function (layers) {
    layers.QuestsLayer = function (name, source, map) {
        this.name = name;
        this.source = source;
        this.map = map;
        this.features = [];

        this.createFeatures = function (quests, templates) {
            this.features = quests
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
                            'popupContent': templates.questPopup.render(quest),
                            'icon': quest.icon,
                            'applicableFilters': getApplicableFilters(quest),
                            'searchString': getSearchString(quest)
                        }
                    }
                });
        };

        let prepareQuestForRendering = (function (quest) {
            switch (quest.quest_reward_type) {
                case('2'): {
                    quest.reward_amount = quest.quest_item_amount + 'x ';
                    quest.reward_image = 'buidl/quests/quest_reward_' + quest.quest_item_id + '.png';
                    quest.reward_name = pogomap.Translator.get('ITEM_' + quest.quest_item_id);
                    break;
                }
                case('3'): {
                    quest.reward_amount = quest.quest_stardust + ' ';
                    quest.reward_image = 'buidl/quests/quest_reward_stardust.png';
                    quest.reward_name = pogomap.Translator.get('STARDUST');
                    break;
                }
                case('7'): {
                    quest.reward_amount = '';
                    quest.reward_image = 'buidl/' + constants.map_icon_pack + '/id_' + quest.quest_pokemon_id + '.png';
                    quest.reward_name = quest.quest_pokemon_name;
                    break;
                }
            }

            quest.icon = pogomap.IconLoader.loadQuestIcon(quest, this.map);
            return quest;
        }).bind(this);

        let getApplicableFilters = function (quest) {
            let filters = [];

            switch (quest.quest_reward_type) {
                case('2'): {
                    filters.push('questsItems');
                    break;
                }
                case('3'): {
                    filters.push('questsStardust');
                    break;
                }
                case('7'): {
                    filters.push('questsPokemon');
                    break;
                }
            }

            return filters;
        };

        let getSearchString = function (quest) {
            return quest.name + ' ' + quest.quest_task + ' ' + quest.reward_name;
        };
    };
}(window.layers = window.layers || {}));