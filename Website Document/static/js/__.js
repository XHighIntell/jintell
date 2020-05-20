
!function() {
    /** @type __.Namespace  */
    var __ = window.__ = { api: {} };
    var api = __.api;

    //------------------version 2----------------

    api.createApiPromise = function(request, payload) {

        return new Promise(function(resolve, reject) {
            request.setRequestHeader('Accept', 'application/json, text/plain, */*');
            request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

            request.load(function() {
                /** @type ___.Api.LetsEncrypt.CreateResponse  */
                var response;
                try {
                    response = JSON.parse(this.responseText);
                } catch (e) {

                }


                /** @type ___.Api.ApiPromiseReason */
                var e = {
                    request: this,
                    response: response,
                }

                if (response.code == 0) resolve(e);
                else reject(e);
            }).error(function() {
                /** @type ___.Api.ApiPromiseReason */
                var reason = {
                    request: this,
                    response: { code: -200, description: "ERR_INTERNET_DISCONNECTED" },
                }

                reject(reason);
            });

            if (payload != null)
                request.send(JSON.stringify(payload));
            else
                request.send();

        })
    }

    __.api.xortal = {};
    __.api.xortal.transfusions = new function() {
        /** @type __.Api.Xortal.Transfusions.Namespace */
        var _this = this;
        var endpoint = '/api/xortal/transfusions';

        _this.get_all_file = function() {
            return api.createApiPromise(intell.post(endpoint + '/get_all_file'));
        }
    }();

}();
