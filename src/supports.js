
var relList = document.createElement('link').relList;
var supportModulePreload = false;
var supportPrefetch = false;

if (relList && relList.supports) {
	supportModulePreload = relList.supports('modulepreload')
	supportPrefetch = relList.supports('prefetch')
}

export { supportModulePreload, supportPrefetch }