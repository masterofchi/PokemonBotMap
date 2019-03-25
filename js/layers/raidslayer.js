(function (layers) {
    layers.RaidsLayer = function (name, source, map) {
        this.name = name;
        this.source = source;
        this.map = map;
        this.features = [];

        this.createFeatures = function (raids, templates) {
            this.features = raids
                .map(raid => prepareRaidForRendering(raid, templates))
                .map(raid => {
                    return {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [raid.lon, raid.lat]
                        },
                        'properties': {
                            'title': raid.pokemon_name,
                            'popupContent': templates.raidPopup.render(raid),
                            'icon': pogomap.IconLoader.loadPokemonIcon(raid.pokedex_id, this.map),
                            'label': getLabel(raid),
                            'applicableFilters': getApplicableFilters(raid),
                            'searchString': getSearchString(raid),
                            'gymId': raid.gym_id
                        }
                    }
                });
        };

        let prepareRaidForRendering = function (raid, templates) {
            raid.ts_start_string = new Date(raid.ts_start * 1000).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });
            raid.ts_end_string = new Date(raid.ts_end * 1000).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });

            const remaining = [];

            if (raid.t_left > 3600) {
                const hours = Math.floor(raid.t_left / 3600);
                remaining.push(hours + ' Stunde' + (hours !== 1 ? 'n' : ''));
                raid.t_left -= hours * 3600;
            }

            if (raid.t_left > 60) {
                const minutes = Math.floor(raid.t_left / 60);
                remaining.push(minutes + ' Minute' + (minutes !== 1 ? 'n' : ''));
                raid.t_left -= minutes * 60;
            }

            const seconds = raid.t_left;
            remaining.push(seconds + ' Sekunde' + (seconds !== 1 ? 'n' : ''));

            raid.t_left_string = remaining.join(', ');

            if (raid.raiders) {
                raid.raiders_set = 1;
                raid.raiders_string = '';

                for (const key in raid.raiders) {
                    if (raid.raiders.hasOwnProperty(key)) {
                        raid.raiders_string += raid.raiders[key].reduce((result, attendence) => {
                            return result + templates.raidAttendance.render(attendence);
                        }, '');
                    }
                }
            } else {
                raid.raiders_set = 0;
            }

            if (raid.move_1 && raid.move_2) {
                raid.raid_moves_present = 1;
            } else {
                raid.raid_moves_present = 0;
            }

            return raid;
        };

        let getLabel = function (raid) {
            const raidLevel = raid.raid_level === 'X' ? 'EX RAID' : '\u272A'.repeat(Number(raid.raid_level));
            const totalRaiders = raid.raiders != null ? Object.keys(raid.raiders).map(key => {
                return raid.raiders[key].reduce((total, raider) => {
                    return total + Number(raider.raiders)
                }, 0);
            }).reduce(function (total, num) {
                return total + num;
            }, 0) : '';

            return raidLevel + ' ' + totalRaiders;
        };

        let getApplicableFilters = function (raid) {
            return ['raids' + raid.raid_level];
        };

        let getSearchString = function (raid) {
            return raid.pokemon_name + ' ' + raid.gym_name + (raid.move_1 ? ' ' + raid.move_1 : '') + (raid.move_2 ? ' ' + raid.move_2 : '');
        };

        this.setFilterAcrossLayers = function (filteredFeatures, map) {
            if (map.getLayer('gyms')) {
                const filters = [];
                filters.push('all');

                filteredFeatures.forEach(feature => {
                    filters.push(['!=', 'gymId', feature.properties.gymId]);
                });

                map.setFilter('gyms', filters);
            }
        };

        this.unsetFilterAcrossLayers = function (map) {
            if (map.getLayer('gyms')) {
                map.setFilter('gyms', null);
            }
        };
    };
}(window.layers = window.layers || {}));