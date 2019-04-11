(function (pogomap) {
    pogomap.TemplateHelper = pogomap.TemplateHelper || {};

    pogomap.TemplateHelper.replaceDynamicPlaceholders = function (template, key, value) {
        return template.split('##' + key + '##').join(value);
    };

    pogomap.TemplateHelper.replaceStaticPlaceholders = function (template, placeholderCallback) {
        let placeholderPattern = /\?\?([^?]+)\?\?/g;

        return template.replace(placeholderPattern, function (match, placeholder) {
            return placeholderCallback(placeholder);
        });
    };
}(window.pogomap = window.pogomap || {}));