(function(pogomap, undefined) {
	pogomap.FilterControl = function(options) {
		const storageName = 'pogomapFilterSettings';
		const tabIdPrefix = 'tab-';
		const panelIdPrefix = 'panel-';
		const filterCheckBoxIdPrefix = 'filter-checkbox-';
		
		var map = null;
		var container = null;		
		var settings = {};

		if (localStorage.getItem(storageName)) {
			settings = JSON.parse(localStorage.getItem(storageName));
		}

		this.onAdd = function(mapInstance) {
			map = mapInstance;
			container = document.createElement('div');
			container.id = 'filter-settings';
			container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
			
			var list = document.createElement('ul');
			var listItem = document.createElement('li');
			var searchBox = document.createElement('input');
			searchBox.type = 'text';
			searchBox.className = 'filter-search';
			searchBox.placeholder = '\uD83D\uDD0D';
			
			searchBox.addEventListener('keyup', pogomap.Debounce(this.onSearchKeyUp, 500));
			
			listItem.appendChild(searchBox);
			
			var clearButton = document.createElement('button');
			clearButton.className = 'filter-clear';
			clearButton.innerText = '\u274C';
			
			clearButton.addEventListener('click', event => {
				searchBox.value = '';
				options.searchCallback(''); 
			});
			
			listItem.appendChild(clearButton);						
			list.appendChild(listItem);
			
			listItem = document.createElement('li');
			
			var tabsDiv = document.createElement('div');
			tabsDiv.className = 'filter-tabs';
			
			var panelsDiv = document.createElement('div');
			panelsDiv.className = 'filter-panels';
			var firstTab = true;
			
			options.filters.forEach(filterGroup => {
				var tab = document.createElement('div');
				tab.id = tabIdPrefix + filterGroup.layer;
				tab.className = 'tab';
				
				if(firstTab){
					tab.classList.add('tab-active');
				}
				
				tab.innerHTML = filterGroup.label;
				
				tab.addEventListener('click', this.onTabClick);
				
				var panel = document.createElement('div');
				panel.id = panelIdPrefix + filterGroup.layer;
				panel.className = 'panel';
				
				if(firstTab){
					panel.classList.add('panel-active');
					firstTab = false;
				}
				
				filterGroup.filters.forEach(filter => {
					var span = document.createElement('span');
					span.className = 'checkbox-container';
					
					var checkBox = document.createElement('input');
					checkBox.type = 'checkbox';
					
					if(typeof settings[filter.name] === 'undefined'){
						settings[filter.name] = true;
					}
					
					checkBox.checked = settings[filter.name];
					checkBox.name = filter.name;
					checkBox.id = filterCheckBoxIdPrefix + filter.name;
					
					checkBox.addEventListener('click', this.onFilterClick)
					
					var label = document.createElement('label');
					label.htmlFor = checkBox.id;
					label.innerHTML = filter.label;
					
					span.appendChild(checkBox);
					span.appendChild(label);
					panel.appendChild(span);
				});
				
				tabsDiv.appendChild(tab);
				panelsDiv.appendChild(panel);
			});
			
			listItem.appendChild(tabsDiv);
			listItem.appendChild(panelsDiv);
			list.appendChild(listItem);
			container.appendChild(list);	
			
			return container;
		};

		this.onRemove = function() {
			container.parentNode.removeChild(container);
			map = null;
		};
		
		this.onTabClick = function(event) {
			document.querySelectorAll('.tab-active').forEach(element => {
				element.classList.remove('tab-active');
			});
			
			document.querySelectorAll('.panel-active').forEach(element => {
				element.classList.remove('panel-active');
			});
			
			event.target.classList.add('tab-active');
			document.getElementById(panelIdPrefix + event.target.id.substring(tabIdPrefix.length)).classList.add('panel-active');
		};
		
		this.onSearchKeyUp = function(event){
			options.searchCallback(event.target.value);
		};
		
		this.onFilterClick = (function(event){
			settings[event.target.name] = event.target.checked;
			this.saveSettings();			
			options.filterCallback(this.getActiveFilters());
		}).bind(this);
		
		this.getActiveFilters = function(){
			return Object.keys(settings).filter(setting => settings[setting]);
		};

		this.saveSettings = function() { 
			localStorage.setItem(storageName, JSON.stringify(settings));
		};
			
		window.addEventListener('unload', this.saveSettings);
	}
}(window.pogomap = window.pogomap || {}));