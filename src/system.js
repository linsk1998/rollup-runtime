import preloadImage from "./preloadImage";
import { loadCSS } from "sky-core";
import { loadScript } from "sky-core";

var modules = {};

var DEFINED = 2;
var RESOLVED = 3;

var current;
function Module(src) {
	this.meta = {
		url: src
	};
	this.exports = {};
}
function exportMember(name, value) {
	current.exports[name] = value;
};
Module.prototype.init = function(stack) {
	if (stack.indexOf(this) >= 0) {
		return;
	}
	current = this;
	var factory = this.initor(exportMember, this);
	current = null;
	stack.push(this);
	var values = this.deps.map(function(dep) {
		var url = new URL(dep, this.meta.url);
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
	if (factory.setters) {
		factory.setters.forEach(setDepModule, values);
	}
	factory.execute();
	this.status = RESOLVED;
};
function setDepModule(setter, i) {
	setter(this[i]);
}

window.System = {
	register: function(deps, initor) {
		var src = document.currentScript.src;
		var module = modules[src];
		if (module) return;
		module = new Module(src);
		module.status = DEFINED;
		module.deps = deps;
		module.initor = initor;
		modules[src] = module;
	}
};

window.__rollup_dynamic_import__ = function(src, base, deps, css, imgs) {
	var rel = new URL(base, __rollup_baseURI__);
	var url = new URL(src, rel);
	var href = url.href;
	rel = null;
	url = null;
	var p1 = dynamicImport(href);
	var ps = [];
	deps.forEach(preloadModule, ps);
	css.forEach(preloadCSS, ps);
	imgs.forEach(preloadImg, ps);
	ps.push(p1);
	return Promise.all(ps).then(function(modules) {
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
	var module = modules[src];
	if (module) {
		return module.promise;
	}
	return loadScript(src).then(function() {
		var module = modules[src];
		if (!module) {
			throw new URIError("Fail to run script: " + src);
		}
		return module;
	});
}