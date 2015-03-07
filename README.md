# httpRequests.js
###Makes multiple parallel asynchronous XMLHttpRequests.

Simple usage example:
```javascript
httpRequests([{url: 'file1.txt'}, {url: 'file2.txt'}], function (responses) {
    var file1Res = responses.filter(function (res) {return res.url === 'file1.txt';}),
        file2Res = responses.filter(function (res) {return res.url === 'file2.txt';});
        //...
});
```

`httpRequest` is invoked with two arguments. The first argument in a array of requests objects. The only required property of the request object is `url`. Optional properties are `method` (default is `'get'`), `user`, `password`, `overrideMimeType`, `requestHeaders` (the value is an object of name/value pairs of the desired request headers), `withCredentials`, `onload`, and `onprogress`. The second argument is a callback which is invoked at the completion of all of the requests.
