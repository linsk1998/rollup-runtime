
QUnit.test('es2015-esm-dep', function(assert) {
	order++;
	assert.ok(order === 1, 'order1');
});

export var dep = "dep";

