import { dep } from "./es2015-esm-dep.js";


QUnit.test('es2015-esm', function(assert) {
	order++;
	assert.ok(order === 2, 'order2');
	assert.ok(dep === 'dep', dep);
});

QUnit.test('es2015-css', function(assert) {
	var href = document.styleSheets[1].href;
	assert.ok(href === new URL("./assets/style.css", location).href, href);
});
QUnit.asyncTest('es2015-image', function(assert) {
	expect(3);
	// QUnit.stop(2);
	var t1 = new Date();
	var gif = new Image();
	gif.src = "./assets/image.gif";
	gif.onload = function() {
		var t2 = new Date();
		assert.ok(t2 - t1 < 20, "gif");
		QUnit.start();
	};

	var jpg = new Image();
	jpg.src = "./assets/image.jpg";
	jpg.onload = function() {
		var t2 = new Date();
		assert.ok(t2 - t1 < 20, "jpg");
		QUnit.start();
	};

	var png = new Image();
	png.src = "./assets/image.png";
	png.onload = function() {
		var t2 = new Date();
		assert.ok(t2 - t1 < 20, "png");
		QUnit.start();
	};
});

QUnit.asyncTest('es2015-dynamic', function(assert) {
	expect(1);
	__rollup_dynamic_import__(
		"./es2015-esm-dynamic.js", "./assets/es2015-esm.js", [], [], []
	).then(function(module) {
		assert.ok(module.dynamic==="dynamic","dynamic");
		QUnit.start();
	});
});