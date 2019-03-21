(function(pogomap, undefined) {
	pogomap.Template = function(url) {
		const filePath = url;
		var content = null;
		var loadingComplete = false;
		
		this.load = function(){		
			return pogomap.Ajax.get(filePath).then(data => {
				content = data;
				loadingComplete = true;
			});
		};
		
		this.render = function(obj){			
			if(loadingComplete){
				return replacePlaceholders(obj);
			}
			else{
				throw new Error('loading of template not yet completed!');
			}
		};
		
		var replacePlaceholders = function(obj){			
			var result = content;
			
			for (const key in obj){
	    		result = result.split('##' + key + '##').join(obj[key]);
	    	}
			
			return result;
		};
	}
}(window.pogomap = window.pogomap || {}));