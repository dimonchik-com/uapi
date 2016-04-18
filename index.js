var querystring = require('querystring');
var md5 = require('md5');
var request= require('request');

var uAPI = function (params) {
    if(params.site_name.substr(params.site_name.length-1)=="/") {
        params.site_name=params.site_name.substr(0,params.site_name.length-1);
    }
    this.confif=params;
}

uAPI.prototype.get = function (url, data, callback) {
    var method="GET";

    if (typeof(data) == 'function') {
        callback=data;
    }

    var array_data=this.getSignature(url, method, data);

    var queryString = querystring.stringify(array_data);
    request.get({url:this.confif.site_name+url+"?"+queryString}, function optionalCallback(err, httpResponse, body) {
        if (!err) {
            try {
                callback(null,JSON.parse(body));
            } catch (e) {
                console.log(body);
            }
        } else {
            callback(err);
        }
    });
}

uAPI.prototype.post = function (url, data, callback) {
    var method="POST";

    if (typeof(data) == 'function') {
        callback=data;
    }

    var array_data=this.getSignature(url, method, data);

    request.post({url:this.confif.site_name+url, formData: array_data}, function optionalCallback(err, httpResponse, body) {
        if (!err) {
            try {
                callback(null,JSON.parse(body));
            } catch (e) {
                console.log(body);
            }
        } else {
            callback(err);
        }
    });
}

uAPI.prototype.put = function (url, data, callback) {
    var method="PUT";

    if (typeof(data) == 'function') {
        callback=data;
    }

    var array_data=this.getSignature(url, method, data);

    request.put({url:this.confif.site_name+url, formData: array_data}, function optionalCallback(err, httpResponse, body) {
        if (!err) {
            try {
                callback(null,JSON.parse(body));
            } catch (e) {
                console.log(body);
            }
        } else {
            callback(err);
        }
    });
}

uAPI.prototype.delete = function (url, data, callback) {
    var method="DELETE";

    if (typeof(data) == 'function') {
        callback=data;
    }

    var array_data=this.getSignature(url, method, data);

    request.del({url:this.confif.site_name+url, formData: array_data}, function optionalCallback(err, httpResponse, body) {
        if (!err) {
            try {
                callback(null,JSON.parse(body));
            } catch (e) {
                console.log(body);
            }
        } else {
            callback(err);
        }
    });
}

uAPI.prototype.getSignature=function(url, method, send_data) {
    var params={
        'oauth_version':'1.0',
        'oauth_timestamp': Math.round(new Date().getTime()/1000),
        'oauth_nonce' : md5(new String(new Date().getTime() + this.getRandomInt(0,1000000000000))),
        'oauth_signature_method' : 'HMAC-SHA1',
        'oauth_consumer_key' : this.confif.oauth_consumer_key,
        'oauth_token' : this.confif.oauth_token
    }

    params = this.collect_object(params, send_data);

    var time_params=this.ksort(params); // сортируем массив

    var data = querystring.stringify(time_params);

    var baseString = method.toUpperCase() + '&' + encodeURIComponent(this.confif.site_name+url) + '&' + encodeURIComponent(data.replace('+', '%20'));
    var crypto = require('crypto'), hash;

    hash = crypto.createHmac('sha1', this.confif['oauth_consumer_secret'] + '&' + this.confif['oauth_token_secret']).update(baseString).digest('base64');
    params["oauth_signature"]=hash;

    return params;
}

uAPI.prototype.getRandomInt=function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

uAPI.prototype.ksort=function(myObj) {
    var keys = Object.keys(myObj), i, len = keys.length;

    keys.sort();

    var object={};
    for (i = 0; i < len; i++) {
        k = keys[i];
        object[k]=myObj[k];
    }
    return object;
}

uAPI.prototype.collect_object=function() {
    var ret = {};
    var len = arguments.length;
    for (var i = 0; i < len; i++) {
        for (p in arguments[i]) {
            if (arguments[i].hasOwnProperty(p)) {
                ret[p] = arguments[i][p];
            }
        }
    }
    return ret;
}

exports.uAPI = uAPI;