import dynamicImport from "./import";
import preloadModule from "./preloadModule";
import prefetch from "./prefetch";
import preloadImage from "./preloadImage";
import loadCSS from "./loadCSS";
import { supportModulePreload, supportPrefetch } from "./supports";

var preModule = supportModulePreload ?
	preloadModule :
	supportPrefetch ?
		prefetch :
		nopre

function nopre() {
	return Promise.resolve();
}
var preImage = preloadImage

var promises = {};
window.__rollup_dynamic_import__ = function (src, base, deps, css, imgs) {
	var href = new URL(src, new URL(base, __rollup_baseURI__)).href;
	var promise = promises[href];
	if (promise) {
		return promise;
	}
	promise = dynamicImport(href);
	var ps = [];
	deps.forEach((dep) => {
		ps.push(preModule(new URL(dep, __rollup_baseURI__).href));
	});
	css.forEach((dep) => {
		ps.push(loadCSS(new URL(dep, __rollup_baseURI__).href));
	});
	imgs.forEach((dep) => {
		ps.push(preImage(new URL(dep, __rollup_baseURI__).href));
	});
	if (ps.length) {
		ps.unshift(promise);
		promise = Promise.all(ps).then((values) => {
			return values[0];
		});
	}
	promises[href] = promise;
	return promise;
};