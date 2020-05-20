function PromiseX(fn) {
    var _this = this;

    _this.resolve = function resolve() {
        _this.status = 'RESOLVED';
        for (var i = 0; i < _this.chains.length; i++) {
            var chain = _this.chains[i];

            if (chain.onfulfilled) {
                var o = chain.onfulfilled();

                if (o && typeof o.then == 'function') {
                    o.then(chain.promise.resolve)
                } else {
                    chain.promise.resolve();
                }
            } else {
                chain.promise.resolve();
            }


        }
    }
    _this.reject = function reject() {
        _this.status = 'REJECTED';
        for (var i = 0; i < _this.chains.length; i++) {
            var chain = _this.chains[i];

            if (chain.onrejected) {
                var o = chain.onrejected();

                if (o && typeof o.then == 'function') {
                    o.then(chain.promise.resolve)
                }
            }
            else {
                chain.promise.reject();
            }

        }
    }

    _this.then = function(onfulfilled, onrejected) {
        var promise = new PromiseX()

        _this.chains.push({
            onfulfilled: onfulfilled,
            onrejected: onrejected,
            promise: promise,
        });

        return promise;

    }
    _this.catch = function(onrejected) {
        return _this.then(null, onrejected);
    }

    _this.chains = [];
    _this.status = 'PENDING';

    if (fn != null) {
        fn(_this.resolve, _this.reject);
    }
};

var s = new PromiseX(function(resolve, reject) {
    setTimeout(reject, 5000);
}).then(function() {
    console.log('then')
}).then(function() {
    console.log('then')
}, function() {
    console.log('fail');

    return new PromiseX(function(resolve, reject) {
        setTimeout(resolve, 1000);
    });
}).then(function() {
    console.log('after fail')
})

var s = new PromiseX(function(resolve, reject) {
    setTimeout(resolve, 2000);
}).then(function() {
    console.log('then')
}).catch(function() {
    console.log('catch');
})