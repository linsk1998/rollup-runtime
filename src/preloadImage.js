export default function preloadImage(src) {
	return new Promise(function(resolve, reject) {
		var img = new Image();
		img.onload = function() {
			resolve();
		};
		img.onerror = function(e) {
			reject(new URIError("Fail to load Image:" + e.target.src));
		};
		img.src = src;
	});
}