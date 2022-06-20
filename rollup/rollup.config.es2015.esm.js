
const importPlugin = require("rollup-plugin-import");
const alias = require("@rollup/plugin-alias");
const { utils } = require("sky-core/build/alias-es2015.cjs");

module.exports = {
	input: "src/esm.js",
	output: {
		file: 'dist/rollup-runtime-es2015-esm.js',
		format: 'iife'
	},
	plugins: [
		alias({
			entries: utils
		}),
		importPlugin({
			libraryName: "sky-core",
			libraryDirectory: "utils"
		})
	]
};