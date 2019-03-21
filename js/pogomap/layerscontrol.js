(function(pogomap, undefined) {
	pogomap.LayersControl = function(options) {
		var map = null;
		var container = null;

		this.onAdd = function(mapInstance) {
			map = mapInstance;
			container = document.createElement('div');
			container.id = 'layer-settings';
			container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
			
			var list = document.createElement('ul');
			var listItem;
			
			options.styles.forEach(style => {
				var itemId = 'style-' + style.name;
				listItem = document.createElement('li');
				var radioButton = document.createElement('input');
				radioButton.id = itemId;
				radioButton.value = style.style;
				radioButton.type = 'radio';
				
				if(settings.getStyle() == style.style){
					radioButton.checked = true;
				}
				
				radioButton.addEventListener('click', event => {
					options.styleCallback(event.target.value);
			    });
				
				var label = document.createElement('label');
				label.htmlFor = itemId;
				label.innerHTML = style.label;
				
				listItem.appendChild(radioButton);
				listItem.appendChild(label);
				
				list.appendChild(listItem);
			});
			
			listItem = document.createElement('li');
			listItem.appendChild(document.createElement('hr'));	
			list.appendChild(listItem);
			
			options.layers.forEach(layer => {
				var itemId = 'layer-' + layer.name;
				listItem = document.createElement('li');
				var checkBox = document.createElement('input');
				checkBox.id = itemId;
				checkBox.value = layer.name;
				checkBox.type = 'checkbox';
				
				if(settings.hasLayer(layer.name)){
					checkBox.checked = true;
				}
				
				checkBox.addEventListener('change', event => {
					options.layerCallback(event.target.value, event.target.checked);
				});
				
				var label = document.createElement('label');
				label.htmlFor = itemId;
				label.innerHTML = layer.label;
				
				listItem.appendChild(checkBox);
				listItem.appendChild(label);
				
				list.appendChild(listItem);
			});
			
			container.appendChild(list);
			
			return container;
		};

		this.onRemove = function() {
			container.parentNode.removeChild(container);
			map = null;
		};
	}
}(window.pogomap = window.pogomap || {}));