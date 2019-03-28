(function (pogomap) {
    pogomap.Template = function (name, layer, url) {
        this.name = name;
        this.layer = layer;
        this.url = url;
        let template = null;
        let loadingComplete = false;

        this.load = function () {
            return pogomap.Ajax.get(url).then(data => {
                template = data;
                loadingComplete = true;
            });
        };

        this.render = function (objectToRender) {
            if (loadingComplete) {
                let result = template;

                for (const key in objectToRender) {
                    if (objectToRender.hasOwnProperty(key)) {
                        result = pogomap.TemplateHelper.replacePlaceholders(result, key, objectToRender[key]);
                    }
                }

                return result;
            } else {
                throw new Error('Loading of template not yet completed!');
            }
        };
    }
}(window.pogomap = window.pogomap || {}));