(function (pogomap) {
    pogomap.TemplateHelper = pogomap.TemplateHelper || {};

    pogomap.TemplateHelper.replacePlaceholders = function (template, key, value) {
        return template.split('##' + key + '##').join(value);
    };
}(window.pogomap = window.pogomap || {}));