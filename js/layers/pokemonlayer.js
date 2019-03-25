(function (layers) {
    layers.PokemonLayer = function (name, source, map) {
        this.name = name;
        this.source = source;
        this.map = map;
        this.features = [];

        this.createFeatures = function (pokemon, templates) {
            this.features = pokemon
                .map(pokemon => preparePokemonForRendering(pokemon))
                .map(pokemon => {
                    return {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [pokemon.lon, pokemon.lat]
                        },
                        'properties': {
                            'title': pokemon.pokemon_name,
                            'popupContent': templates.pokemonPopup.render(pokemon),
                            'icon': pogomap.IconLoader.loadPokemonIcon(pokemon.pokemon_id, this.map),
                            'applicableFilters': getApplicableFilters(pokemon),
                            'searchString': getSearchString(pokemon)
                        }
                    }
                });
        };

        let preparePokemonForRendering = function (pokemon) {
            const timeParts = pokemon.tth.split(':');
            const tthParts = [];

            if (timeParts[0] > 0) {
                tthParts.push(Number(timeParts[0]) + ' Stunde' + (Number(timeParts[0]) !== 1 ? 'n' : ''));
            }

            tthParts.push(Number(timeParts[1]) + ' Minute' + (Number(timeParts[1]) !== 1 ? 'n' : ''));

            if (Number(timeParts[0]) === 0 && timeParts[1] < 5) {
                pokemon.urgent = 1;
                pokemon.tth_string = 'Unter 5 Minuten'
            } else {
                pokemon.urgent = 0;
                pokemon.tth_string = 'Noch ' + tthParts.join(', ');
            }

            return pokemon;
        };

        let getApplicableFilters = function (pokemon) {
            const filters = [];

            if (pokemon.urgent) {
                filters.push('pokemonUrgent');
            }

            return filters;
        };

        let getSearchString = function (pokemon) {
            return pokemon.pokemon_name;
        }
    };
}(window.layers = window.layers || {}));