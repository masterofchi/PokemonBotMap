(function (pogomap) {
    pogomap.Debounce = function (callback, delay) {
        let timer;

        return function (...args) {
            if (timer) {
                clearTimeout(timer);
            }

            timer = setTimeout(() => {
                callback(...args);
                timer = null;
            }, delay);
        }
    }
}(window.pogomap = window.pogomap || {}));