(function(layers, undefined) {
	layers.PokemonLayer = function(name, source){
		this.name = name;
		this.source = source;
	};
}(window.layers = window.layers || {}));