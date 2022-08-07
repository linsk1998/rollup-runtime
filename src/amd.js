import preloadImage from "./preloadImage";
import { loadCSS } from "sky-core";
import { loadScript } from "sky-core";
import "sky-core/polyfill/console";

var modules = {};
var promises = {};

var DEFINED = 2;
var RESOLVED = 3;

function Module(src) {
	this.url = src;
	this.exports = {};
}
Module.prototype.init = function (stack) {
	if (stack.indexOf(this) >= 0) {
		return;
	}
	stack.push(this);
	var values = this.deps.map(function (dep) {
		switch (dep) {
			case 'require':
				return null;
			case 'module':
				return this;
			case 'exports':
				return this.exports;
		}
		var url = new URL(dep + ".js", this.url);
		var href = url.href;
		url = null;
		var module = modules[href];
		if (!module) {
			throw new URIError("Fail to preload module: " + href);
		}
		if (module.status === DEFINED) {
			module.init(stack);
		}
		return module.exports;
	}, this);
	stack.pop();
	this.initor.apply(undefined, values);
	this.status = RESOLVED;
};

window.define = function (arg1, arg2, arg3) {
	var src = document.currentScript.src;
	var module = modules[src];
	if (module) return;
	module = new Module(src);
	module.status = DEFINED;
	switch (arguments.length) {
		case 1:
			module.initor = arg1;
			module.deps = [];
			break;
		case 2:
			module.deps = arg1;
			module.initor = arg2;
			break;
		case 3:
			module.name = arg1;
			module.deps = arg2;
			module.initor = arg3;
			break;
		default:
			throw new Error();
	}
	modules[src] = module;
};

window.__rollup_dynamic_import__ = function (src, base, deps, css, imgs) {
	var rel = new URL(base, __rollup_baseURI__);
	var url = new URL(src + ".js", rel);
	var href = url.href;
	rel = null;
	url = null;
	var p1 = dynamicImport(href);
	var ps = [];
	deps.forEach(preloadModule, ps);
	css.forEach(preloadCSS, ps);
	imgs.forEach(preloadImg, ps);
	ps.push(p1);
	return Promise.all(ps).then(function (modules) {
		var module = modules.pop();
		if (module.status === DEFINED) {
			module.init([]);
		}
		return module.exports;
	});
};

function preloadModule(dep) {
	var url = new URL(dep, __rollup_baseURI__);
	this.push(dynamicImport(url.href));
	url = null;
}
function preloadCSS(css) {
	var url = new URL(css, __rollup_baseURI__);
	this.push(loadCSS(url.href));
	url = null;
}
function preloadImg(img) {
	var url = new URL(img, __rollup_baseURI__);
	this.push(preloadImage(url.href));
	url = null;
}

function dynamicImport(src) {
	var promise = promises[src];
	if (promise) {
		return promise;
	}
	return promises[src] = loadScript(src).then(function () {
		var module = modules[src];
		if (!module) {
			throw new URIError("Fail to run script: " + src);
		}
		return module;
	});
}