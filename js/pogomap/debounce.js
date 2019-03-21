(function(pogomap, undefined) {
	pogomap.Debounce = function(callback, delay) {
	    var timer;
	
	    return function(...args) {
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