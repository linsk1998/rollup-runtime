const polyfill = require("rollup-plugin-polyfill-inject");
const inject = require("@rollup/plugin-inject");

module.exports=[
	polyfill({
		modules: {
			// 'globalThis': "sky-core/polyfill/globalThis",
			// "Symbol.for": "sky-core/polyfill/Symbol/for",
			// "Symbol.keyFor": "sky-core/polyfill/Symbol/keyFor",
			// "Symbol.hasInstance": "sky-core/polyfill/Function/prototype/@@hasInstance",
			// "Symbol.iterator": [
			// 	"sky-core/polyfill/Array/prototype/@@iterator",
			// 	"sky-core/polyfill/String/prototype/@@iterator"
			// ],
			// "Symbol": "sky-core/polyfill/Symbol",
			// "Array.from": [
			// 	"sky-core/polyfill/Array/from",
			// 	"sky-core/polyfill/Array/prototype/@@iterator",
			// 	"sky-core/polyfill/String/prototype/@@iterator"
			// ],
			"Array.isArray": "sky-core/polyfill/Array/isArray",
			// "Array.of": "sky-core/polyfill/Array/of",
			// "Date": "sky-core/polyfill/Date/constructor",
			"Date.now": "sky-core/polyfill/Date/now",
			// "Date.parse": "sky-core/polyfill/Date/parse",
			// "Math.acosh": "sky-core/polyfill/Math/acosh",
			// "Math.asinh": "sky-core/polyfill/Math/asinh",
			// "Math.atanh": "sky-core/polyfill/Math/atanh",
			// "Math.cbrt": "sky-core/polyfill/Math/cbrt",
			// "Math.clz32": "sky-core/polyfill/Math/clz32",
			// "Math.cosh": "sky-core/polyfill/Math/cosh",
			// "Math.expm1": "sky-core/polyfill/Math/expm1",
			// "Math.fround": "sky-core/polyfill/Math/fround",
			// "Math.hypot": "sky-core/polyfill/Math/hypot",
			// "Math.imul": "sky-core/polyfill/Math/imul",
			// "Math.log1p": "sky-core/polyfill/Math/log1p",
			// "Math.log2": "sky-core/polyfill/Math/log2",
			// "Math.log10": "sky-core/polyfill/Math/log10",
			// "Math.sign": "sky-core/polyfill/Math/sign",
			// "Math.sinh": "sky-core/polyfill/Math/sinh",
			// "Math.tanh": "sky-core/polyfill/Math/tanh",
			// "Math.trunc": "sky-core/polyfill/Math/trunc",
			//简易版的实现，仅适用于解析内容安全的json
			// "JSON": "sky-core/polyfill/JSON",
			//如果，需要解析第三方或其他不安全的json，需要使用其他JSON解析库
			//"JSON": "JSON",
			//ES2015.Core Number
			// "Number.EPSILON": "sky-core/polyfill/Number/EPSILON",
			// "Number.isFinite": "sky-core/polyfill/Number/isFinite",
			// "Number.isInteger": "sky-core/polyfill/Number/isInteger",
			// "Number.isNaN": "sky-core/polyfill/Number/isNaN",
			// "Number.isSafeInteger": "sky-core/polyfill/Number/isSafeInteger",
			// "Number.MAX_SAFE_INTEGER": "sky-core/polyfill/Number/MAX_SAFE_INTEGER",
			// "Number.MIN_SAFE_INTEGER": "sky-core/polyfill/Number/MIN_SAFE_INTEGER",
			// "Number.parseFloat": "sky-core/polyfill/Number/parseFloat",
			// "Number.parseInt": "sky-core/polyfill/Number/parseInt",
			// Object 遍历
			"Object.assign": "sky-core/polyfill/Object/assign",
			"Object.keys": "sky-core/polyfill/Object/keys",
			"Object.values": "sky-core/polyfill/Object/values",
			"Object.entries": "sky-core/polyfill/Object/entries",
			// "Object.fromEntries": "sky-core/polyfill/Object/fromEntries",
			// "Object.getOwnPropertySymbols": "sky-core/polyfill/Object/getOwnPropertySymbols",
			// Object property
			//由于ES3不支持 accessor，但是许多工具会生成defineProperty，且defineProperty不能判断是否支持支持accessor，可以污染全局的Object
			"Object.defineProperty": "sky-core/polyfill/Object/defineProperty",
			//由于ES3不支持 accessor，我建议不要污染全局的Object，用于给一些库判断是否支持accessor，需要用到defineProperties的地方用@rollup/plugin-inject
			"Object.defineProperties":"sky-core/polyfill/Object/defineProperties",
			// "Object.getOwnPropertyDescriptor": "sky-core/polyfill/Object/getOwnPropertyDescriptor",
			// "Object.getOwnPropertyDescriptors": "sky-core/polyfill/Object/getOwnPropertyDescriptors",
			// "Object.getOwnPropertyNames": "sky-core/polyfill/Object/getOwnPropertyNames",
			//Object 原型相关
			"Object.create": "sky-core/polyfill/Object/create",
			"Object.getPrototypeOf": "sky-core/polyfill/Object/getPrototypeOf",
			//ES3不能真正实现setPrototypeOf，建议不要污染全局的Object，特殊需要用的地方用@rollup/plugin-inject
			"Object.setPrototypeOf": "sky-core/polyfill/Object/setPrototypeOf",
			// "Object.is": "sky-core/polyfill/Object/is",
			//Reflect
			// "Reflect.apply": "sky-core/polyfill/Reflect/apply",
			// "Reflect.construct": "sky-core/polyfill/Reflect/construct",
			// "Reflect.defineProperty": "sky-core/polyfill/Reflect/defineProperty",
			// "Reflect.deleteProperty": "sky-core/polyfill/Reflect/deleteProperty",
			// "Reflect.get": "sky-core/polyfill/Reflect/get",
			// "Reflect.set": "sky-core/polyfill/Reflect/set",
			// "Reflect.getOwnPropertyDescriptor": "sky-core/polyfill/Reflect/getOwnPropertyDescriptor",
			// "Reflect.getPrototypeOf": "sky-core/polyfill/Reflect/getPrototypeOf",
			//Promise
			"Promise": "sky-core/polyfill/Promise",
			// ESNext.Promise
			// "Promise.allSettled": "sky-core/polyfill/Promise/allSettled",
			// "Promise.any": "sky-core/polyfill/Promise/any",
			// "AggregateError":"sky-core/polyfill/AggregateError",
			"queueMicrotask": "sky-core/polyfill/queueMicrotask",
			//ES2015.String
			// "String.fromCodePoint": "sky-core/polyfill/String/fromCodePoint",
			// "String.raw": "sky-core/polyfill/String/raw",
			//ES2015.Collection
			"Map": "sky-core/polyfill/Map",
			"Set": "sky-core/polyfill/Set",
			"WeakMap": "sky-core/polyfill/WeakMap",
			"WeakSet": "sky-core/polyfill/WeakSet",
			//URL 这个polyfil支持accessor，但不支持自动转string和JSON，需要用.href获取
			"URL": "sky-core/polyfill/URL",
			"URLSearchParams": "sky-core/polyfill/URLSearchParams",

			'location.origin': "sky-core/polyfill/location",
			'document.head': "sky-core/polyfill/document/head",
			// 'document.contains': "sky-core/polyfill/document/contains",
			// "console": "sky-core/polyfill/console",
			//这个实现基于IE的userData功能，只在同目录的HTML有效，如果需要html跨目录，要使用flash版的polyfill
			// "localStorage": "sky-core/polyfill/localStorage",
			// "sessionStorage": "sky-core/polyfill/sessionStorage",
			// 'Event': "sky-core/polyfill/Event",
		},
		exclude: [
		]
	}),
	//以下是prototype的修改
	polyfill({
		modules: {
			//其他对象的自动转JSON
			// ".toJSON": [
			// 	"sky-core/polyfill/Date/prototype/toJSON"
			// ],
			// "JSON.stringify": [
			// 	"sky-core/polyfill/Date/prototype/toJSON"
			// ],
			//ES5 Function
			".bind": "sky-core/polyfill/Function/prototype/bind",
			// ".name": "sky-core/polyfill/Function/prototype/name",
			//ES5 Array
			// ".every": "sky-core/polyfill/Array/prototype/every",
			// ".filter": "sky-core/polyfill/Array/prototype/filter",
			// ".forEach": "sky-core/polyfill/Array/prototype/forEach",
			// ".indexOf": "sky-core/polyfill/Array/prototype/indexOf",
			// ".lastIndexOf": "sky-core/polyfill/Array/prototype/lastIndexOf",
			// ".map": "sky-core/polyfill/Array/prototype/map",
			// ".reduce": "sky-core/polyfill/Array/prototype/reduce",
			// ".reduceRight": "sky-core/polyfill/Array/prototype/reduceRight",
			// ".some": "sky-core/polyfill/Array/prototype/some",
			//String/Array includes
			'.includes': [
				"sky-core/polyfill/Array/prototype/includes",
				"sky-core/polyfill/String/prototype/includes",
			],
			//ES6 Array
			// ".copyWithin": "sky-core/polyfill/Array/prototype/copyWithin",
			".fill": "sky-core/polyfill/Array/prototype/fill",
			".find": "sky-core/polyfill/Array/prototype/find",
			".findIndex": "sky-core/polyfill/Array/prototype/findIndex",
			// ".entries": "sky-core/polyfill/Array/prototype/entries",
			// ".keys": "sky-core/polyfill/Array/prototype/keys",
			// ".values": "sky-core/polyfill/Array/prototype/values",
			//ES2019 Array
			// ".flat": "sky-core/polyfill/Array/prototype/flat",
			// ".flatMap": "sky-core/polyfill/Array/prototype/flatMap",
			//Date
			//toLocaleFormat 这个只有火狐支持，非标准
			// ".toLocaleFormat": "sky-core/polyfill/Date/prototype/toLocaleFormat",
			// ".toISOString": "sky-core/polyfill/Date/prototype/toISOString",
			//ES5 String
			".trim": "sky-core/polyfill/String/prototype/trim",
			//ES6 String
			".startsWith": "sky-core/polyfill/String/prototype/startsWith",
			".endsWith": "sky-core/polyfill/String/prototype/endsWith",
			".repeat": "sky-core/polyfill/String/prototype/repeat",
			// ".codePointAt": "sky-core/polyfill/String/prototype/codePointAt",
			//ES2017.String
			".padStart": "sky-core/polyfill/String/prototype/padStart",
			".padEnd": "sky-core/polyfill/String/prototype/padEnd",
			//ES2018.Promise
			"Promise": "sky-core/polyfill/Promise/prototype/finally",
			//ES2019.String
			".trimStart": "sky-core/polyfill/String/prototype/trimStart",
			".trimEnd": "sky-core/polyfill/String/prototype/trimEnd",
			// ".trimLeft": "sky-core/polyfill/String/prototype/trimLeft",
			// ".trimRight": "sky-core/polyfill/String/prototype/trimRight",
			//ES2020.String
			// ".matchAll": "sky-core/polyfill/String/prototype/matchAll",
			//ESNext.String
			".replaceAll": "sky-core/polyfill/String/prototype/replaceAll",
			// DOM
			".rules": "sky-core/polyfill/CSSStyleSheet/prototype/rules",
			".styleSheet": "sky-core/polyfill/HTMLLinkElement/prototype/styleSheet",
		},
		exclude: [
			"**/node_modules/sky-core/polyfill/**",
			"**/node_modules/sky-core/polyfill-modern/**",
			"**/node_modules/sky-core/polyfill-compat/**",
			"**/node_modules/core-js/**",
			"**/node_modules/@babel/**",
			"**/node_modules/@swc/**"
		]
	}),
	inject({
		"modules": {
			"Symbol.iterator": "sky-core/pure/Symbol/iterator",
		}
	})
]