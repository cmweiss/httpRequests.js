function httpRequests(requests, callback) {
	'use strict';
	var numRequests = requests.length,
		numRequestsCompleted = 0,
		responses = [];

	function allRequestsCompleted() {
		return numRequests === numRequestsCompleted;
	}

	requests.forEach(function (request) {
		var xhr = new XMLHttpRequest();
		xhr.open(request.method || 'get', request.url, true, request.user || null, request.password || null);
		if ('overrideMimeType' in request) {
			xhr.overrideMimeType(request.overrideMimeType);
		}
		if ('requestHeaders' in request) {
			Object.keys(request.requestHeader).forEach(function (name) {
				xhr.setRequestHeader(name, request.requestHeader[name]);
			});
		}
		xhr.responseType = request.responseType || '';
		xhr.timeout = request.timeout;
		xhr.withCredentials = request.withCredentials || false;
		xhr.onload = request.onload;
		xhr.onloadend = function () {
			numRequestsCompleted += 1;
			responses.push({
				url: request.url,
				response: xhr.response,
				responseHeaders: xhr.getAllResponseHeaders().replace(/\r/g, '').replace(/\n$/, '').split('\n').reduce(function (prev, line) {
					var kv = line.split(': ', 2);
					prev[kv[0]] = kv[1];
					return prev;
				}, {}),
				responseText: xhr.responseText,
				responseXML: xhr.responseXML,
				status: xhr.status,
				statusText: xhr.statusText
			});
			
			if (allRequestsCompleted()) {
				callback(responses);
			}
		};
		xhr.onprogress = request.onprogress;

		xhr.send(request.send || null);
	});
}
