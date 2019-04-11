(function (pogomap) {
    pogomap.LayersControl = function (options) {
        let map = null;
        let container = null;

        this.onAdd = function (mapInstance) {
            map = mapInstance;
            container = document.createElement('div');
            container.id = 'layer-settings';
            container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';

            const list = document.createElement('ul');
            let listItem;

            options.styles.forEach(style => {
                const itemId = 'style-' + style.name;
                listItem = document.createElement('li');
                const radioButton = document.createElement('input');
                radioButton.id = itemId;
                radioButton.name = 'style';
                radioButton.value = style.style;
                radioButton.type = 'radio';

                if (settings.getStyle() === style.style) {
                    radioButton.checked = true;
                }

                radioButton.addEventListener('click', event => {
                    options.styleCallback(event.target.value);
                });

                const label = document.createElement('label');
                label.htmlFor = itemId;
                label.innerHTML = pogomap.TemplateHelper.replaceStaticPlaceholders(style.label, pogomap.Translator.get);

                listItem.appendChild(radioButton);
                listItem.appendChild(label);

                list.appendChild(listItem);
            });

            listItem = document.createElement('li');
            listItem.appendChild(document.createElement('hr'));
            list.appendChild(listItem);

            options.layers.forEach(layer => {
                const itemId = 'layer-' + layer.name;
                listItem = document.createElement('li');
                const checkBox = document.createElement('input');
                checkBox.id = itemId;
                checkBox.value = layer.name;
                checkBox.type = 'checkbox';

                if (settings.hasLayer(layer.name)) {
                    checkBox.checked = true;
                }

                checkBox.addEventListener('change', event => {
                    options.layerCallback(event.target.value, event.target.checked);
                });

                const label = document.createElement('label');
                label.htmlFor = itemId;
                label.innerHTML = pogomap.TemplateHelper.replaceStaticPlaceholders(layer.label, pogomap.Translator.get);

                listItem.appendChild(checkBox);
                listItem.appendChild(label);

                list.appendChild(listItem);
            });

            container.appendChild(list);

            return container;
        };

        this.onRemove = function () {
            container.parentNode.removeChild(container);
            map = null;
        };
    }
}(window.pogomap = window.pogomap || {}));