define([
	'exports'
], function(exports) {
	'use strict';

	QUnit.test('modern-amd-dep', function(assert) {
		order++;
		assert.ok(order === 1, 'order1');
	});

	exports.dep = "dep";
});

