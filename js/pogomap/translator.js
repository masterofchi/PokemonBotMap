(function (pogomap) {
    pogomap.Translator = pogomap.Translator || {};
    pogomap.Translator.dictionary = undefined;

    pogomap.Translator.init = function (language) {
        const dictionaryFile = 'js/i18n/' + language + '.json';

        return pogomap.Ajax.getJSON(dictionaryFile).then(data => {
            pogomap.Translator.dictionary = data;
        });
    };

    pogomap.Translator.get = function (key) {
        if (typeof (pogomap.Translator.dictionary) === 'undefined') {
            throw new Error('Loading of dictionary not yet completed! Did you call init?');
        }

        if (typeof (pogomap.Translator.dictionary[key]) === 'undefined') {
            return key;
        } else {
            return pogomap.Translator.dictionary[key];
        }
    };
}(window.pogomap = window.pogomap || {}));