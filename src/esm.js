import dynamicImport from "./import";
import preloadModule from "./preloadModule";
import prefetch from "./prefetch";
import loadCSS from "./loadCSS";

var promises = {};
window.__rollup_dynamic_import__ = function(src, base, deps) {
	var href = new URL(src, new URL(base, __rollup_baseURI__)).href;
	var promise = promises[href];
	if (promise) {
		return promise;
	}
	if (deps && deps.length) {
		promise = Promise.all([
			dynamicImport(href),
			deps.map((dep) => {
				var url = new URL(dep, __rollup_baseURI__);
				if (url.pathname.endsWith(".js")) {
					return preloadModule(url.href);
				} else if (url.pathname.endsWith(".css")) {
					return loadCSS(url.href);
				} else {
					return prefetch(url.href);
				}
			})
		]).then((values) => {
			return values[0];
		});
	} else {
		promise = dynamicImport(href);
	}
	promises[href] = promise;
	return promise;
};