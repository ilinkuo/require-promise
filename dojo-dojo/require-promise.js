define("require/promise", ["dojo/Deferred"], function (Deferred) {
    function matchesError(error, deps) {
        return deps.some(function (mid) {
            return (error.info[0] === require.toUrl(mid) + ".js");
        });
    }

    require.promise = function (deps) {

        var deferred = new Deferred();
        var errHandle = require.on('error', function (error) {
            if (matchesError(error, deps)) {
                errHandle.remove();
                deferred.reject("failed require not at " + error.info[0]);
            }
        });

        require(deps, function () {
            errHandle.remove();
            deferred.resolve(Array.prototype.slice.apply(arguments));
        });

        return {
            then: function (callback, errback, progback) {
                return deferred.promise.then(function (deps) {
                    errHandle.remove();
                    callback.apply(null, deps);
                }, errback, progback);
            }
        };
    };
});