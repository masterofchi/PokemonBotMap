(function (pogomap) {
    pogomap.Ajax = pogomap.Ajax || {};

    pogomap.Ajax.get = function (url) {
        return fetch(url, {
            'method': 'GET'
        }).then(response => {
            return response.text();
        });
    };

    pogomap.Ajax.getJSON = function (url) {
        return fetch(url, {
            'method': 'GET'
        }).then(response => {
            return response.json();
        });
    };

    pogomap.Ajax.postJSON = function (url, data) {
        return fetch(url, {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            return response.json();
        });
    };
}(window.pogomap = window.pogomap || {}));