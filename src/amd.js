import preloadImage from "./preloadImage";
var modules = {};

var DEFINED = 2;
var RESOLVED = 3;

function Module(src) {
	this.url = src;
	this.exports = {};
}
Module.prototype.init = function(stack) {
	if (stack.indexOf(this) >= 0) {
		return;
	}
	stack.push(this);
	var values = this.deps.map(function(dep) {
		switch (dep) {
			case 'module':
				return this;
			case 'exports':
				return this.exports;
		}
		var url = new URL(dep, this.url);
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
	this.pop();
	this.initor.apply(undefined, values);
	this.status = RESOLVED;
};

window.define = function(deps, initor) {
	var src = document.currentScript.src;
	var module = modules[src];
	if (module) return;
	module = new Module(src);
	module.status = DEFINED;
	module.deps = deps;
	module.initor = initor;
	modules[src] = module;
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
	Promise.all(ps).then(function(modules) {
		var module = modules.pop();
		if (module.status === DEFINED) {
			module.init([]);
		}
		return module.exports;
	});
};

function preloadModule(dep) {
	var url = new URL(dep, __rollup_baseURI__);
	this.push(dynamicImport(url.herf));
	url = null;
}
var cssLinks = {};
function preloadCSS(css) {
	var url = new URL(css, __rollup_baseURI__);
	var href = url.href;
	if (!cssLinks[href]) {
		var link = document.createElement('LINK');
		link.href = href;
		link.rel = 'stylesheet';
		link.type = 'text/css';
		document.head.appendChild(link);
		url = null;
		cssLinks[href] = true;
	}
}
function preloadImg(img) {
	var url = new URL(img, __rollup_baseURI__);
	this.push(preloadImage(url.herf));
	url = null;
}

function dynamicImport(src) {
	var module = modules[src];
	if (module) {
		return module.promise;
	}
	return new Promise(function(resolve, reject) {
		loadScript(src, function() {
			var module = modules[src];
			if (!module) {
				reject(new URIError("Fail to run script: " + src));
			}
			resolve(module);
		}, reject);
	});
}