const allStyles = [
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

const allLayers = [
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

const allFilters = [
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
                'label': 'Pok&eacute;mon Belohnung'
            }
        ]
    },
    {
        'layer': 'pokemon',
        'label': 'Pok&eacute;mon',
        'filters': [
            {
                'name': 'pokemonUrgent',
                'label': 'Unter 5 Minuten'
            }
        ]
    }
];

const controls = {
    'navigation': 'top-left',
    'geolocation': 'top-left',
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