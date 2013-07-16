## Distributions (require, promise):

1. [ ] dojo-dojo
2. [ ] requireJS-jQuery
3. [ ] curl-cujo
4. [ ] requireJS-cujo

## Approach:

* Add a promise method to the require object which returns a promise
* The promise returned is an extension of the promises implementation to allow multiple resolve so that the exact same callback function can be used in a traditional require

```javascript
require(["dep1", "dep2"], function(d1, d2){
  // do stuff
});
```
works the same as

````javascript
require.promise(["dep1", "dep2"]).then(function(d1, d2){
   // do stuff
});
````
## Implementation Considerations:
* dojo and requireJS allow modification of the global require, which then propagates down to the local require. However, the global require is not part of the specification, and curl does not use a global require.
* Modify the require as an AMD side effect, if allowable
* Modify the instance of the promise by using a before aspect to transform an array of dependencies into a call. This approach is compatible with Promises A+ and transparent to the user, but will not handle any extensions/convenience methods.

## Deliverables
* Code
* Readme for implementation issues
* jsFiddle or Codepen example, based on gist
* tests 
* grunt task
* 

