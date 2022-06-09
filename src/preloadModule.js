import prefetch from "./prefetch";
var relList = document.createElement('link').relList;
var supportModulePreload = relList && relList.supports && relList.supports('modulepreload');


function preloadModule(url) {
	return new Promise((resolve, reject) => {
		var link = document.createElement("LINK");
		link.onload = function() {
			resolve();
			this.remove();
		};
		link.onerror = function() {
			reject(new URIError("Fail to preload module:" + this.href));
			this.remove();
		};
		link.href = url;
		link.rel = "modulepreload";
		document.head.appendChild(link);
	});
}

export default supportModulePreload ? preloadModule : prefetch;