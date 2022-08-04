define([
	'./compat-amd-dep'
], function(modernAmdDep) {
	'use strict';
	var dep = modernAmdDep.dep;

	QUnit.test('compat-amd', function(assert) {
		order++;
		assert.ok(order === 2, 'order2');
		assert.ok(dep === 'dep', dep);
	});

	QUnit.test('compat-css', function(assert) {
		var href = document.styleSheets[1].href;
		assert.ok(href === new URL("./assets/style.css", location).href, href);
	});
	QUnit.asyncTest('compat-image', function(assert) {
		expect(3);
		// QUnit.stop(2);
		var t1 = new Date();
		var gif = new Image();
		gif.onload = function() {
			var t2 = new Date();
			assert.ok(t2 - t1 < 20, "gif");
			QUnit.start();
		};
		gif.src = "./assets/image.gif";

		var jpg = new Image();
		jpg.onload = function() {
			var t2 = new Date();
			assert.ok(t2 - t1 < 20, "jpg");
			QUnit.start();
		};
		jpg.src = "./assets/image.jpg";

		var png = new Image();
		png.onload = function() {
			var t2 = new Date();
			assert.ok(t2 - t1 < 20, "png");
			QUnit.start();
		};
		png.src = "./assets/image.png";
	});

	QUnit.asyncTest('compat-dynamic', function(assert) {
		expect(1);
		__rollup_dynamic_import__(
			"./compat-amd-dynamic", "./assets/compat-amd.js", [], [], []
		).then(function(module) {
			assert.ok(module.dynamic === "dynamic", "dynamic");
			QUnit.start();
		});
	});
	
	QUnit.asyncTest('es2015-error', function (assert) {
		expect(2);
		QUnit.stop(1);
		__rollup_dynamic_import__(
			"./404", "./assets/compat-amd.js", [], [], []
		).then(undefined, function (e) {
			assert.ok(e instanceof Error, e.message);
			QUnit.start();
		});
		__rollup_dynamic_import__(
			"./syntax", "./assets/compat-amd.js", [], [], []
		).then(undefined, function (e) {
			assert.ok(e instanceof Error, e.message);
			QUnit.start();
		});
	});
});
