System.register([], function(exports) {
	'use strict';

	return {
		execute: function() {
			QUnit.test('modern-sys-dep', function(assert) {
				order++;
				assert.ok(order === 1, 'order1');
			});
		
			exports('dep',"dep");
		}
	};
});

