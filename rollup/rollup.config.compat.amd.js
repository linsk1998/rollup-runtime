
const importPlugin = require("rollup-plugin-import");
const alias = require("@rollup/plugin-alias");
const { utils, polyfills, pures } = require("sky-core/build/alias-compat.cjs");


module.exports = {
	input: "src/amd.js",
	output: {
		file: 'dist/rollup-runtime-compat-amd.js',
		format: 'iife'
	},
	context: 'window',
	plugins: [
		alias({
			entries: polyfills.concat(pures).concat(utils)
		}),
		importPlugin({
			libraryName: "sky-core",
			libraryDirectory: "utils"
		}),
		...require("./compat-polyfill")
	]
};