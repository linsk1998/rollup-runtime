var cssPromises = {};
export default function loadCSS(href) {
	var p = cssPromises[href];
	if (p) {
		return p;
	}
	p = new Promise((resolve, reject) => {
		var link = document.createElement('LINK');
		link.href = href;
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.onload = function() {
			var sheet = this.sheet;
			if (sheet) {
				var cssRules = sheet.cssRules;
				if (cssRules && cssRules.length) {
					resolve();
				}
			}
			reject(new URIError("Fail to load CSS:" + this.href));
		};
		link.onerror == function(e) {
			reject(new URIError("Fail to fetch CSS:" + this.href));
		};
		document.head.appendChild(link);
	});
	cssPromises[href] = p;
	return p;
}