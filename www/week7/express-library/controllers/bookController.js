var Book = require('../models/book');

exports.index = function(req, res) {
	res.send('TODO: Home page');
};

exports.book_list = function(req, res) {
	res.send('TODO: Book list');
};

exports.book_detail = function(req, res) {
	res.send('TODO: Book detail' + req.params.id);
};

exports.book_create_get = function(req, res) {
	res.send('TODO: Book create GET');
};

exports.book_create_post = function(req, res) {
	res.send('TODO: Book create POST');
};

exports.book_delete_get = function(req, res) {
	res.send('TODO: Book delete GET');
};

exports.book_delete_post = function(req, res) {
	res.send('TODO: Book delete POST');
};

exports.book_update_get = function(req, res) {
	res.send('TODO: Book update GET');
};

exports.book_update_post = function(req, res) {
	res.send('TODO: Book update POST');
};
