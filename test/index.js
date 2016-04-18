var UAPI = require('../');
var uAPI = new UAPI({
    'oauth_consumer_key' :'1sdsf345dfgfdg546434534df2',
    'oauth_consumer_secret' : 'B.1bRY8.uiRGoMSvfGdCYzfAJfZY7W',
    'oauth_token' : 'PW.Ay5vi03jMTFoPcUnZ2M2IGV.U8KrmoazkjFyA',
    'oauth_token_secret' : 'cT2Tyq9Ixxgwk7o4mmewKSTXYwwU48W.p0Qzd7PO',
    'site_name' : 'http://dimonchikone.ucoz.net/uapi/'
});


request.get('/blog', {'date' : '2016-04-15'}, function(err, result) {
    if(!err) {
        console.log(result);
    } else {
        console.log(err);
    }
});


