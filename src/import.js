var dynamicImport;
try {
	dynamicImport = new Function('url', 'return import(url)');
} catch (e) {
	window.__rollup_modules__ = Object.create(null);
	dynamicImport = (url) => {
		if(!navigator.onLine) {
			return Promise.reject(new URIError("Network offline."));
		}
		var escape = JSON.stringify(url);
		var script = Object.assign(document.createElement('script'), {
			type: 'module',
			textContent: `import * as x from ${escape}; __rollup_modules__[${escape}](x);`,
		});
		return new Promise((resolve, reject) => {
			__rollup_modules__[url] = resolve;
			script.onerror = (e) => {
				reject(new URIError("Fail to import * from '" + e.target.src + "'."));
			};
			document.head.appendChild(script);
		});
	};
}
export default dynamicImport;