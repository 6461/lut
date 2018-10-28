'use strict';

const PORT = 8080;
const HOST = '0.0.0.0';

const express = require('express');
const app = express();

app.get('/', function (req, res) {
	const response = '<!DOCTYPE html>\n<html>\n' +
		'<head><title>App</title></head>\n' +
		'<body>\n' +
		'<img src="https://pds.exblog.jp/pds/1/201002/12/90/a0126590_22301391.jpg" alt="Wow!">\n' +
		'<p>Wow!</p>\n' +
		'</body>\n' +
		'</html>';
	res.send(response);
});

app.listen(PORT, HOST, function () {
	console.log('Test app listening on ' + HOST + ':' + PORT);
});
