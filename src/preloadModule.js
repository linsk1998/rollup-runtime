
export default function preloadModule(url) {
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
		link.rel = "modulepreload";
		link.href = url;
		document.head.appendChild(link);
	});
}