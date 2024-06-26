var spauth = require('node-sp-auth');
var request = require('request-promise');
var $REST = require("gd-sprest");

console.log("Connecting to SPO");
var url = "https://albertb63034227.sharepoint.com/sites/RivaColdDBServer";
spauth.getAuth(url, {
    username: "yang.ye@e-bcsystems.com ",
    password: "Yye1234.",
    online: true
}).then(data => {
    console.log("Connected to SPO");
    var headers = data.headers;
    headers['Accept'] = 'application/json;odata=verbose'

    request.get({
        url: "https://albertb63034227.sharepoint.com/sites/RivaColdDBServer/_api/web",
        headers: headers,
        json: true
    }).then(response => {
        console.log(response.d.Title);
    });
});