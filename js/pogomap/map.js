(function(pogomap, mapbox, undefined) {
	pogomap.Map = function(settings, styles, layers, filters){
		var activeFilters = null;
		mapbox.accessToken = constants.mapbox_api_key;
		this.map = null;
		this.templates = {};
		this.layers = {};
		
		this.init = function(containerId){
		    this.map = new mapbox.Map({
		        container: containerId,
		        style: 'mapbox://styles/mapbox/' + settings.getStyle(),
		        center: settings.getLocation(),
		        zoom: settings.getZoom()
		    });
		    
		    this.createLayers();
		};
		
		this.createLayers = function(){
			layers.forEach(layer => {
				var layerObject = new window.layers[layer['class']](layer.name, layer.source);
				this.layers[layer.name] = layerObject;
			});
		};
		
		this.registerControlPosition = function(positionName) {
	        if (this.map._controlPositions[positionName]) {
	            return;
	        }
	        
	        var positionContainer = document.createElement('div');
	        positionContainer.className = `mapboxgl-ctrl-${positionName}`;
	        this.map._controlContainer.appendChild(positionContainer);
	        this.map._controlPositions[positionName] = positionContainer;
	    };
		
		this.addControls = function(controlSettings){
			if(controlSettings.navigation){
				this.map.addControl(new mapboxgl.NavigationControl(), controlSettings.navigation);
			}
			
			if(controlSettings.geolocation){
				this.map.addControl(new mapboxgl.GeolocateControl({
					'positionOptions': { 
						'enableHighAccuracy': true 
					}, 
					'trackUserLocation': true 
				}), controlSettings.geolocation);
			}
			
			if(controlSettings.layersmenu){
				this.map.addControl(new pogomap.LayersControl({
					'styles': styles,
					'styleCallback': this.setStyle,
					'layers': layers,
					'layerCallback': this.setLayerVisibility
				}), controlSettings.layersmenu);
			}
			
			if(controlSettings.filtermenu){
				var filterControl = new pogomap.FilterControl({
					'searchCallback': this.searchLayers,
					'filterCallback': this.filterLayers,
					'filters': filters
				});
							
				this.map.addControl(filterControl, controlSettings.filtermenu);
				activeFilters = filterControl.getActiveFilters();	
			}
		};
		
		this.loadTemplates = function(templates){
			return Promise.all(
				templates.map(template => {
					this.templates[template.name] = new pogomap.Template(template.url);
					return this.templates[template.name].load();
				})
			);
		};
		
		this.load = function(){
			console.log('loading data');
			console.log('populating layers');
			console.log('rendering layers');
		};

		this.setStyle = (function(name){
	    	this.map.setStyle('mapbox://styles/mapbox/' + name);
	    	settings.setStyle(name);
			settings.save();
		}).bind(this);

		this.setLayerVisibility = (function(name, visible) {
			if(visible){
				if(!settings.hasLayer(name)){
					settings.addLayer(name);
				}
				
				if(this.map.getLayer(name)){
					this.map.setLayoutProperty(name, 'visibility', 'visible');
				}
			}
			else{
				settings.removeLayer(name);
				
				if(this.map.getLayer(name)){
					this.map.setLayoutProperty(name, 'visibility', 'none');
				}
			}
			
			settings.save();
		}).bind(this);
		
		this.filterLayers = (function(newActiveFilters){
			console.log(newActiveFilters);
			activeFilters = newActiveFilters;
		}).bind(this);
		
		this.searchLayers = (function(searchString){
			console.log(searchString);
		}).bind(this);
	};
}(window.pogomap = window.pogomap || {}, mapboxgl));