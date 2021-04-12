const https = require('https');

module.exports = function httpsRequest(hostname, port, path, method, timeout) {
	return new Promise((resolve) => {
		const options = {
			hostname: hostname || 'localhost',
			port: port || 443,
			path: path || '/',
			method: method || 'GET',
			timeout: timeout || 15000,
		};

		const req = https.request(options, (res) => {
			resolve({ res, err: null });
		});

		req.on('timeout', () => {
			req.destroy();
		});

		req.on('error', (err) => {
			resolve({ res: null, err });
		});

		req.end();
	});
};
