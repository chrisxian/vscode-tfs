/* global suite */
/* global test */

'use strict';

const assert    = require('assert'),
      vscode    = require('vscode'),
      vscodeTfs = require('../lib/vscode-tfs');

suite("VSCode TFS Tests Suite", function() {
	test("Something 1", function() {
		assert.equal(-1, [1, 2, 3].indexOf(5));
		assert.equal(-1, [1, 2, 3].indexOf(0));
	});
});
