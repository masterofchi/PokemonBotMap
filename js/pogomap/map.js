(function (pogomap, mapbox) {
    pogomap.Map = function (settings, styleSettings, layerSettings, filterSettings, languageSettings) {
        mapbox.accessToken = constants.mapbox_api_key;
        this.map = undefined;
        this.templates = [];
        this.layers = [];
        this.activeFilters = [];
        this.activeSearchString = '';
        this.updateTimer = undefined;

        this.init = function (containerId) {
            this.map = new mapbox.Map({
                container: containerId,
                style: 'mapbox://styles/mapbox/' + settings.getStyle(),
                center: settings.getLocation(),
                zoom: settings.getZoom(),
                pitch: settings.getPitch(),
                bearing: settings.getBearing()
            });

            this.createLayers();
            this.bindEvents();
        };

        this.createLayers = function () {
            layerSettings.forEach(layerSetting => {
                const layerObject = new window.layers[layerSetting['class']](layerSetting.name, layerSetting.source, this.map);
                this.layers.push(layerObject);
            });
        };

        this.bindEvents = function () {
            this.map.on('load', event => {
                this.layers.forEach(layer => {
                    event.target.on('click', layer.name, clickEvent => {
                        const coordinates = clickEvent.features[0].geometry.coordinates.slice();
                        const popupContent = clickEvent.features[0].properties.popupContent;

                        while (Math.abs(clickEvent.lngLat.lng - coordinates[0]) > 180) {
                            coordinates[0] += clickEvent.lngLat.lng > coordinates[0] ? 360 : -360;
                        }

                        new mapboxgl.Popup()
                            .setLngLat(coordinates)
                            .setHTML(popupContent)
                            .addTo(event.target);
                    });

                    event.target.on('mouseenter', layer.name, () => {
                        event.target.getCanvas().style.cursor = 'pointer';
                    });

                    event.target.on('mouseleave', layer.name, () => {
                        event.target.getCanvas().style.cursor = '';
                    });
                });
            });

            this.map.on('style.load', () => {
                pogomap.IconLoader.loadedImages.length = 0;
                this.loadFeatures();
            });

            this.map.on('moveend', event => {
                const newCenter = event.target.getCenter();
                settings.setLocation([newCenter.lng, newCenter.lat]);
                settings.save();

                if (constants.use_geo_boundary) {
                    this.loadFeatures();
                }
            });

            let onZoomEnd = (function (event) {
                settings.setZoom(event.target.getZoom());
                settings.save();
            }).bind(this);

            this.map.on('zoomend', onZoomEnd);
            this.map.on('boxzoomend', onZoomEnd);

            this.map.on('pitchend', event => {
                settings.setPitch(event.target.getPitch());
                settings.save();
            });

            this.map.on('rotateend', event => {
                settings.setBearing(event.target.getBearing());
                settings.save();
            });
        };

        this.registerControlPosition = function (positionName) {
            if (this.map._controlPositions[positionName]) {
                return;
            }

            const positionContainer = document.createElement('div');
            positionContainer.className = `mapboxgl-ctrl-${positionName}`;
            this.map._controlContainer.appendChild(positionContainer);
            this.map._controlPositions[positionName] = positionContainer;
        };

        this.addControls = function (controlSettings) {
            if (controlSettings.navigation) {
                this.map.addControl(new mapboxgl.NavigationControl(), controlSettings.navigation);
            }

            if (controlSettings.geolocation) {
                this.map.addControl(new mapboxgl.GeolocateControl({
                    'positionOptions': {
                        'enableHighAccuracy': true
                    },
                    'trackUserLocation': true
                }), controlSettings.geolocation);
            }

            if (controlSettings.layersmenu) {
                this.map.addControl(new pogomap.LayersControl({
                    'styles': styleSettings,
                    'styleCallback': this.setStyle,
                    'layers': layerSettings,
                    'layerCallback': this.setLayerVisibility
                }), controlSettings.layersmenu);
            }

            if (controlSettings.filtermenu) {
                const filterControl = new pogomap.FilterControl({
                    'searchCallback': this.searchLayers,
                    'filterCallback': this.filterLayers,
                    'filters': filterSettings
                });

                this.map.addControl(filterControl, controlSettings.filtermenu);
                this.activeFilters = filterControl.getActiveFilters();
            }
        };

        this.loadTemplates = function (templates) {
            return Promise.all(
                templates.map(template => {
                    let templateObject = new pogomap.Template(template.name, template.layer, template.url);
                    this.templates.push(templateObject);
                    return templateObject.load();
                })
            );
        };

        this.loadFeatures = (function () {
            let promises = [];
            let layerObjects = [];

            settings.getLayers().forEach(layerName => {
                const layerObject = this.layers.filter(layer => layer.name === layerName)[0];
                const url = layerObject.source + (constants.use_geo_boundary ? '?geoBoundary=' + getGeoBoundaryString() : '');
                promises.push(pogomap.Ajax.getJSON(url));
                layerObjects.push(layerObject);
            }, this);

            Promise.all(promises).then(allData => {
                for (let i = 0; i < allData.length; i++) {
                    layerObjects[i].createFeatures(allData[i], filterTemplates(layerObjects[i].name));
                }

                this.updateFeatures();
            });
        }).bind(this);

        let getGeoBoundaryString = function () {
            return JSON.stringify(getGeoBoundary());
        };

        let getGeoBoundary = (function () {
            const canvas = this.map.getCanvas();
            let {width, height} = canvas;

            return {
                upperLeft: this.map.unproject([0, 0]).toArray(),
                upperRight: this.map.unproject([width, 0]).toArray(),
                lowerLeft: this.map.unproject([0, height]).toArray(),
                lowerRight: this.map.unproject([width, height]).toArray()
            };
        }).bind(this);

        let filterTemplates = (function (layerName) {
            return this.templates.reduce((templates, template) => {
                if (template.layer === layerName) {
                    templates[template.name] = template;
                }

                return templates;
            }, {});
        }).bind(this);

        let sortByZIndex = function (layer1, layer2) {
            return layerSettings.filter(layer => layer.name === layer1)[0].zIndex - layerSettings.filter(layer => layer.name === layer2)[0].zIndex;
        };

        this.updateFeatures = (function () {
            if (!this.map.isStyleLoaded()) {
                window.setTimeout(this.updateFeatures, 100);
                return;
            }

            settings.getLayers().sort(sortByZIndex).forEach(layerName => {
                const layerObject = this.layers.filter(layer => layer.name === layerName)[0];
                let filteredFeatures = this.filterFeatures(layerObject.features);

                if (this.map.getSource(layerObject.name)) {
                    this.map.getSource(layerObject.name).setData({
                        'type': 'FeatureCollection',
                        'features': filteredFeatures
                    });
                } else {
                    this.map.addSource(layerObject.name, {
                        type: 'geojson',
                        data: {'type': 'FeatureCollection', 'features': filteredFeatures}
                    });
                }

                if (typeof (layerObject.setFilterAcrossLayers) === 'function') {
                    layerObject.setFilterAcrossLayers(filteredFeatures, this.map);
                }

                if (!this.map.getLayer(layerObject.name)) {
                    this.map.addLayer({
                        'id': layerObject.name,
                        'type': 'symbol',
                        'source': layerObject.name,
                        'layout': {
                            'text-field': '{label}',
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
            }, this);

            if (this.updateTimer) {
                window.clearTimeout(this.updateTimer);
            }

            this.updateTimer = window.setTimeout(this.loadFeatures, constants.map_refresh_rate * 1000);
        }).bind(this);

        this.filterFeatures = function (features) {
            return features.filter(feature => {
                return feature.properties.applicableFilters.every(
                    filter => {
                        return this.activeFilters.includes(filter);
                    }
                ) && (this.activeSearchString.length === 0 || feature.properties.searchString.toLowerCase().includes(this.activeSearchString.toLowerCase()));
            });
        };

        this.setStyle = (function (name) {
            this.map.setStyle('mapbox://styles/mapbox/' + name);
            settings.setStyle(name);
            settings.save();
        }).bind(this);

        this.setLayerVisibility = (function (name, visible) {
            let reloadNeeded = false;

            if (visible) {
                if (!settings.hasLayer(name)) {
                    settings.addLayer(name);
                }

                if (this.map.getLayer(name)) {
                    this.map.setLayoutProperty(name, 'visibility', 'visible');
                } else {
                    reloadNeeded = true;
                }
            } else {
                settings.removeLayer(name);

                if (this.map.getLayer(name)) {
                    this.map.setLayoutProperty(name, 'visibility', 'none');
                }

                let unsetFunction = this.layers.filter(layer => layer.name === name)[0].unsetFilterAcrossLayers;

                if (typeof (unsetFunction) === 'function') {
                    unsetFunction(this.map);
                }
            }

            settings.save();

            if (reloadNeeded) {
                this.loadFeatures();
            } else {
                this.updateFeatures();
            }
        }).bind(this);

        this.filterLayers = (function (newActiveFilters) {
            this.activeFilters = newActiveFilters;
            this.updateFeatures();
        }).bind(this);

        this.searchLayers = (function (searchString) {
            this.activeSearchString = searchString;
            this.updateFeatures();
        }).bind(this);
    };
}(window.pogomap = window.pogomap || {}, mapboxgl));