(function (pogomap) {
    pogomap.LanguageControl = function (options) {
        let map = null;
        let container = null;

        this.onAdd = function (mapInstance) {
            map = mapInstance;
            container = document.createElement('div');
            container.id = 'language-settings';
            container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';

            const list = document.createElement('ul');
            list.className = 'language-' + settings.getLanguage();
            let listItem;

            options.languages.forEach(language => {
                const itemId = 'language-' + language.name;
                listItem = document.createElement('li');
                const radioButton = document.createElement('input');
                radioButton.id = itemId;
                radioButton.name = 'language';
                radioButton.value = language.name;
                radioButton.type = 'radio';

                if (settings.getLanguage() === language.name) {
                    radioButton.checked = true;
                }

                radioButton.addEventListener('click', event => {
                    options.languageCallback(event.target.value);
                });

                const label = document.createElement('label');
                label.htmlFor = itemId;
                label.innerHTML = language.label;
                label.className = 'language-' + language.name;

                listItem.appendChild(radioButton);
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