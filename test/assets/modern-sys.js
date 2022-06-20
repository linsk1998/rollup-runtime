System.register([
	'./modern-sys-dep.js'
], function(exports) {
	'use strict';
	var dep;

	return {
		setters: [function(modernAmdDep) {
			dep = modernAmdDep.dep;
		}],
		execute: function() {
			QUnit.test('modern-sys', function(assert) {
				order++;
				assert.ok(order === 2, 'order2');
				assert.ok(dep === 'dep', dep);
			});

			QUnit.test('modern-css', function(assert) {
				var href = document.styleSheets[1].href;
				assert.ok(href === new URL("./assets/style.css", location).href, href);
			});
			QUnit.asyncTest('modern-image', function(assert) {
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

			QUnit.asyncTest('modern-dynamic', function(assert) {
				expect(1);
				__rollup_dynamic_import__(
					"./modern-sys-dynamic.js", "./assets/modern-sys.js", [], [], []
				).then(function(module) {
					assert.ok(module.dynamic === "dynamic", "dynamic");
					QUnit.start();
				});
			});
		}
	};
});
