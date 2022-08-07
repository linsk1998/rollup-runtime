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

# With Polyfill

## supports es6-module

```
nomodule
```

## ie 6-8

```
Array.isArray
Array.prototype.findIndex
Array.prototype.forEach
Array.prototype.indexOf
Array.prototype.map
Array.prototype.some
Object.create
Object.defineProperty
Promise
Promise.prototype.finally
String.prototype.startsWith
URL
URLSearchParams
console
document.head
queueMicrotask
```

## other

```
Array.isArray
Array.prototype.findIndex
Object.create
Object.defineProperties
Object.defineProperty
Object.keys
Promise
Promise.prototype.finally
String.prototype.startsWith
String.prototype.trim
URL
URLSearchParams
console
document.currentScript
document.head
location
queueMicrotask
```