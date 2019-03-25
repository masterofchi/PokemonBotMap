(function (layers) {
    layers.GymsLayer = function (name, source, map) {
        this.name = name;
        this.source = source;
        this.map = map;
        this.features = [];

        this.createFeatures = function (gyms, templates) {
            this.features = gyms
                .map(gym => {
                    return {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [gym.lon, gym.lat]
                        },
                        'properties': {
                            'title': gym.gym_name,
                            'popupContent': templates.gymPopup.render(gym),
                            'icon': pogomap.IconLoader.loadTeamIcon(gym.team, this.map),
                            'applicableFilters': getApplicableFilters(gym),
                            'searchString': getSearchString(gym),
                            'gymId': gym.id
                        }
                    }
                });
        };

        let getApplicableFilters = function (gym) {
            let filters = [];

            if (Number(gym.slots_available) === 0) {
                filters.push('gymsFull');
            }

            if (Number(gym.ex_gym) === 1) {
                filters.push('gymsX');
            } else {
                filters.push('gymsOther');
            }

            switch (gym.team) {
                case '1':
                case 'mystic': {
                    filters.push('gymsMystic');
                    break;
                }
                case '2':
                case 'valor': {
                    filters.push('gymsValor');
                    break;
                }
                case '3':
                case 'instinct': {
                    filters.push('gymsInstinct');
                    break;
                }
            }

            return filters;
        };

        let getSearchString = function (gym) {
            return gym.gym_name + ' ' + gym.address;
        };
    };
}(window.layers = window.layers || {}));