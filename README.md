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

A complete example is [here](//cmweiss.github.io/httpRequests/httpRequests.html).

`httpRequests` is invoked with two arguments. The first argument in a array of request objects. The only required property of the request object is `url`. Optional properties are `method` (default is `'get'`), `user`, `password`, `overrideMimeType`, `requestHeaders` (the value is an object of name/value pairs of the desired request headers), `withCredentials`, `onload`, and `onprogress`. The second argument is a callback which is invoked at the completion of all of the requests.

Typically when the results of two `XMLHttpRequest`s are need the callback (generally the `onload` event) of the first request is use to make the second request and the callback of the second request is used to complete the task of processing the two results. Alternatively, the promise pattern is used similarly. Both techniques serialize the requests, i.e. one request is made, when it completes the other request is made, when that completes then processing continues. `httpRequests` allows for parallel requests and a single callback which gets passed an array of all of the results. This is more performant and simplifies the code.

Caveat: the order of the results in the retuned results array is the order in which the results are completed, not the order in which the requests are made.
