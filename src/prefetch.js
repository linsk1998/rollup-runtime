export default function prefetch(url) {
	return new Promise((resolve, reject) => {
		var link = document.createElement("LINK");
		link.onload = function() {
			resolve();
			this.remove();
		};
		link.onerror = function(e) {
			reject(new URIError("Fail to prefetch module:" + this.href));
			this.remove();
		};
		link.href = url;
		link.rel = "prefetch";
		document.head.appendChild(link);
	});
}