const allStyles = [
    {
        'name': 'streets',
        'style': 'streets-v10',
        'label': '??STREETS??'
    },
    {
        'name': 'outdoors',
        'style': 'outdoors-v10',
        'label': '??OUTDOORS??'
    },
    {
        'name': 'light',
        'style': 'light-v9',
        'label': '??LIGHT??'
    },
    {
        'name': 'dark',
        'style': 'dark-v9',
        'label': '??DARK??'
    },
    {
        'name': 'satellite',
        'style': 'satellite-v9',
        'label': '??SATELLITE??'
    },
    {
        'name': 'satellite_streets',
        'style': 'satellite-streets-v10',
        'label': '??SATELLITE_STREETS??'
    }
];

const allLayers = [
    {
        'name': 'raids',
        'class': 'RaidsLayer',
        'label': '??RAIDS??',
        'source': 'getraids.php',
        'zIndex': 1
    },
    {
        'name': 'gyms',
        'class': 'GymsLayer',
        'label': '??GYMS??',
        'source': 'getgyms.php',
        'zIndex': 0
    },
    {
        'name': 'quests',
        'class': 'QuestsLayer',
        'label': '??QUESTS??',
        'source': 'getquest.php',
        'zIndex': 0
    },
    {
        'name': 'pokemon',
        'class': 'PokemonLayer',
        'label': '??POKEMON??',
        'source': 'getpokemon.php',
        'zIndex': 0
    }
];

const allFilters = [
    {
        'layer': 'raids',
        'label': '??RAIDS??',
        'filters': [
            {
                'name': 'raidsX',
                'label': '??EX_RAIDS??'
            },
            {
                'name': 'raids1',
                'label': '??LEVEL_1_RAIDS??'
            },
            {
                'name': 'raids2',
                'label': '??LEVEL_2_RAIDS??'
            },
            {
                'name': 'raids3',
                'label': '??LEVEL_3_RAIDS??'
            },
            {
                'name': 'raids4',
                'label': '??LEVEL_4_RAIDS??'
            },
            {
                'name': 'raids5',
                'label': '??LEVEL_5_RAIDS??'
            }
        ]
    },
    {
        'layer': 'gyms',
        'label': '??GYMS??',
        'filters': [
            {
                'name': 'gymsX',
                'label': '??EX_RAID_GYMS??'
            },
            {
                'name': 'gymsOther',
                'label': '??OTHER_GYMS??'
            },
            {
                'name': 'gymsFull',
                'label': '??FULL_GYMS??'
            },
            {
                'name': 'gymsMystic',
                'label': '??TEAM_MYSTIC??'
            },
            {
                'name': 'gymsValor',
                'label': '??TEAM_VALOR??'
            },
            {
                'name': 'gymsInstinct',
                'label': '??TEAM_INSTINCT??'
            }
        ]
    },
    {
        'layer': 'quests',
        'label': '??QUESTS??',
        'filters': [
            {
                'name': 'questsItems',
                'label': '??ITEM_REWARD??'
            },
            {
                'name': 'questsStardust',
                'label': '??STARDUST_REWARD??'
            },
            {
                'name': 'questsPokemon',
                'label': '??POKEMON_REWARD??'
            }
        ]
    },
    {
        'layer': 'pokemon',
        'label': '??POKEMON??',
        'filters': [
            {
                'name': 'pokemonUrgent',
                'label': '??LESS_THAN_FIVE_MINUTES??'
            }
        ]
    }
];

const allLanguages = [
    {
        'name': 'de',
        'label': 'Deutsch'
    },
    {
        'name': 'en-uk',
        'label': 'British English'
    },
    {
        'name': 'en-us',
        'label': 'American English'
    }
];

const controls = {
    'navigation': 'top-left',
    'geolocation': 'top-left',
    'languagemenu': 'top-right',
    'layersmenu': 'top-right',
    'filtermenu': 'top-center'
};

const templates = [
    {
        'name': 'raidPopup',
        'layer': 'raids',
        'url': 'templates/raid_popup.html'
    },
    {
        'name': 'gymPopup',
        'layer': 'gyms',
        'url': 'templates/gym_popup.html'
    },
    {
        'name': 'pokemonPopup',
        'layer': 'pokemon',
        'url': 'templates/pokemon_popup.html'
    },
    {
        'name': 'raidAttendance',
        'layer': 'raids',
        'url': 'templates/raid_attendance.html'
    },
    {
        'name': 'questPopup',
        'layer': 'quests',
        'url': 'templates/quest_popup.html'
    }
];