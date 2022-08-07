const importPlugin = require("rollup-plugin-import");
const alias = require("@rollup/plugin-alias");
const es3ify = require("rollup-plugin-es3ify");
const polyfill = require('rollup-plugin-polyfill');
const output = require("./polyfill-output");
const { utils, polyfills, pures } = require("sky-core/build/alias-compat.cjs");


module.exports = {
	input: "src/amd.js",
	output: {
		file: 'dist/rollup-runtime-compat-amd.js',
		format: 'iife',
		strict: false
	},
	context: 'window',
	plugins: [
		output(),
		alias({
			entries: polyfills.concat(pures).concat(utils)
		}),
		polyfill(["sky-core/polyfill/console"]),
		importPlugin({
			libraryName: "sky-core",
			libraryDirectory: "utils"
		}),
		...require("./compat-polyfill"),
		es3ify()
	]
};