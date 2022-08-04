module.exports = function () {
	var arr = []
	return {
		resolveId(id) {
			if (id.startsWith("sky-core/polyfill/")) {
				arr.push(id.substr(18).replace(/\//g, "."));
			}
		},
		buildEnd() {
			arr.sort();
			var set = new Set(arr);
			set.forEach((id)=>{
				console.log(id);
			});
		}
	};
}