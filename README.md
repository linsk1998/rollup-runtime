# rollup-runtime

rollup-runtime is a module loader for rollup dist. support amd systemjs and esm.

# Why not native esm

* nomodule polyfill;
* dynamic import polyfill;
* module,css,asset preload;

Those feature is a module rollup-runtime base on esm.

## Use

```javascript
__rollup_dynamic_import__(src:string, base:string, deps:string[], css:string[], img:string[]):Promise<any>
```