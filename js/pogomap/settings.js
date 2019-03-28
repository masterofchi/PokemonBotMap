(function (pogomap) {
    pogomap.Settings = function (defaultLocation, defaultZoom) {
        const storageName = 'pogomapSettings';
        const defaultSettings = {
            'location': defaultLocation,
            'zoom': defaultZoom,
            'bearing': 0,
            'pitch': 0,
            'style': 'streets-v10',
            'layers': [
                'raids',
                'gyms'
            ],
            'language': 'de'
        };

        let settings;

        if (localStorage.getItem(storageName)) {
            settings = JSON.parse(localStorage.getItem(storageName));
        } else {
            settings = defaultSettings;
        }

        this.getLocation = function () {
            return settings.location;
        };

        this.setLocation = function (value) {
            settings.location = value;
        };

        this.getZoom = function () {
            return settings.zoom;
        };

        this.setZoom = function (value) {
            settings.zoom = value;
        };

        this.getBearing = function () {
            return settings.bearing;
        };

        this.setBearing = function (value) {
            settings.bearing = value;
        };

        this.getPitch = function () {
            return settings.pitch;
        };

        this.setPitch = function (value) {
            settings.pitch = value;
        };

        this.getStyle = function () {
            return settings.style;
        };

        this.setStyle = function (value) {
            settings.style = value;
        };

        this.getLayers = function () {
            return settings.layers;
        };

        this.hasLayer = function (name) {
            return settings.layers.includes(name);
        };

        this.addLayer = function (name) {
            settings.layers.push(name);
        };

        this.removeLayer = function (name) {
            settings.layers = settings.layers.filter(layer => layer !== name);
        };

        this.getLanguage = function () {
            return settings.language;
        };

        this.setLanguage = function (value) {
            settings.language = value;
        };

        this.save = function () {
            localStorage.setItem(storageName, JSON.stringify(settings));
        };

        window.addEventListener('unload', this.save);
    };
}(window.pogomap = window.pogomap || {}));