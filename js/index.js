let settings = new pogomap.Settings(constants.mapbox_map_center, constants.mapbox_starting_zoom, constants.default_language);
let map = new pogomap.Map(settings, allStyles, allLayers, allFilters, allLanguages);

document.addEventListener('DOMContentLoaded', () => {
    pogomap.Translator.init(settings.getLanguage()).then(() => {
        map.loadTemplates(templates).then(() => {
            map.init('map');
            map.registerControlPosition('top-center');
            map.addControls(controls);
        });
    });
});