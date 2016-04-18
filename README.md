# uapi
Module to work api.ucoz.net

Examples to use
```javascript
var uAPI = require("uapi");
var request = new uAPI.uAPI({
    'oauth_consumer_key' :'1sdsf345dfgfdg546434534df2',
    'oauth_consumer_secret' : 'B.1bRY8.uiRGoMSvfGdCYzfAJfZY7W',
    'oauth_token' : 'PW.Ay5vi03jMTFoPcUnZ2M2IGV.U8KrmoazkjFyA',
    'oauth_token_secret' : 'cT2Tyq9Ixxgwk7o4mmewKSTXYwwU48W.p0Qzd7PO',
    'site_name' : 'siteurl'
});

request.get('/blog', {'date' : '2016-04-15'}, function(err, result){
     if(!err) {
        console.log(result);
     } else {
        console.log(err);
     }
});

request.post('/blog', {
    'category' : '1',
    'title' : 'Название материала',
    'description': 'Краткое описание материала',
    'message' : 'Полное описание материала'
}, function(err, result) {
    if (!err) {
        console.log(result);
    } else {
        console.log(err);
    }
});

request.post('/photo', {
    'category' : '1',
    'photo' :'/home/dmitriy/image2.jpg' // добавление картинок
}, function(err, result) {
    if (!err) {
        console.log(result);
    } else {
        console.log(err);
    }
});


request.put('/blog', {
    'id' : '19',
    'title' : 'Название материала',
    'description': 'Краткое описание материала',
    'message' : 'Полное описание материала'
}, function(err, result) {
    if (!err) {
        console.log(result);
    } else {
        console.log(err);
    }
});

request.delete('/blog/posts', { 'id' : '16' }, function(err, result){
    if(!err) {
        console.log(result);
    } else {
        console.log(err);
    }
});

```
