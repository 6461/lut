"use strict";

const Meme = require('../models/memeModel');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.meme_list = function(req, res, next) {
	Meme.find()
	.exec(function (err, list) {
		if (err) {
			res.status(500).send({error: 'Error getting list'});
			return next(err);
		} else {
			// Successful
			res.status(200).json(list);
		}
	});
};

exports.meme_get = function(req, res, next) {
	Meme.findById(req.params.id)
	.exec(function (err, meme) {
		if (err) {
			res.status(500).send({error: 'Error getting meme'});
			return next(err);
		} else {
			// Successful
			res.status(200).json(meme);
		}
	});
};

exports.meme_svg = function(req, res, next) {
	Meme.findById(req.params.id)
	.exec(function (err, meme) {
		if (err) {
			res.status(500).send({error: 'Error getting meme'});
			return next(err);
		} else {
			// Successful
			/* TODO */
			console.log(meme);
			let meme_svg = meme.name;
			res.send(meme_svg);
		}
	});
};

exports.meme_create_form = function(req, res, next) {
	res.render('form', {title: 'Create meme'});
};

exports.meme_create =  [
	// Validate that the name field is not empty.
	body('name', 'Meme name required').isLength({ min: 1 }).trim(),
	body('width').isNumeric(),
	body('height').isNumeric(),
	body('background_color', 'Background color required').isLength({ min: 1 }).trim(),
	body('font_size').isNumeric(),
	body('font_color', 'Font color required').isLength({ min: 1 }).trim(),
	body('text_x').isNumeric(),
	body('text_y').isNumeric(),
	body('caption', 'Caption required').isLength({ min: 1 }).trim(),
	
	// Sanitize (trim and escape) the name field.
	sanitizeBody('name').trim().escape(),
	sanitizeBody('background_color').trim().escape(),
	sanitizeBody('font_color').trim().escape(),
	sanitizeBody('caption').trim().escape(),

	// Process request after validation and sanitization.
	(req, res, next) => {
		// Extract the validation errors from a request.
		const errors = validationResult(req);

		// Create an item object with escaped and trimmed data.
		var meme = new Meme({
			name: req.body.name,
			width: req.body.width,
			height: req.body.height,
			background_color: req.body.background_color,
			font_size: req.body.font_size,
			font_color: req.body.font_color,
			text_x: req.body.text_x,
			text_y: req.body.text_y,
			caption: req.body.caption
		});

		if (!errors.isEmpty()) {
			// There are errors.
			res.status(500).send({error: 'Error creating meme'});
			return;
		} else {
			// Data from form is valid.
			meme.save(function (err) {
				if (err) {
					res.status(500).send({error: 'Error creating meme'});
					return next(err);
				} else {
					// Successful
					res.status(200).json(meme);
				}
			});
		}
	}
];

exports.meme_update_form = function(req, res, next) {
	Meme.findById(req.params.id)
	.exec(function (err, meme) {
		if (err) {
			return next(err);
		}
		if (meme == null) {
			var err = new Error('Meme not found');
			err.status = 404;
			return next(err);
		}
		// Successful
		res.render('form', {title: 'Update meme', meme: meme});
	});
};

exports.meme_update =  [
	// Validate fields.
	body('name', 'Meme name required').isLength({ min: 1 }).trim(),
	body('width').isNumeric(),
	body('height').isNumeric(),
	body('background_color', 'Background color required').isLength({ min: 1 }).trim(),
	body('font_size').isNumeric(),
	body('font_color', 'Font color required').isLength({ min: 1 }).trim(),
	body('text_x').isNumeric(),
	body('text_y').isNumeric(),
	body('caption', 'Caption required').isLength({ min: 1 }).trim(),
	
	// Sanitize fields.
	sanitizeBody('name').trim().escape(),
	sanitizeBody('background_color').trim().escape(),
	sanitizeBody('font_color').trim().escape(),
	sanitizeBody('caption').trim().escape(),

	// Process request after validation and sanitization.
	(req, res, next) => {
		// Extract the validation errors from a request.
		const errors = validationResult(req);

		// Create an item object with escaped and trimmed data.
		var meme = new Meme({
			name: req.body.name,
			width: req.body.width,
			height: req.body.height,
			background_color: req.body.background_color,
			font_size: req.body.font_size,
			font_color: req.body.font_color,
			text_x: req.body.text_x,
			text_y: req.body.text_y,
			caption: req.body.caption
		});

		if (!errors.isEmpty()) {
			// There are errors.
			res.status(500).send({error: 'Error updating meme'});
			return;
		} else {
			// Data from form is valid. Update.
			Meme.findByIdAndUpdate(req.params.id, meme, {}, function (err, thememe) {
				if (err) {
					res.status(500).send({error: 'Error updating meme'});
					return next(err);
				} else {
					// Successful
					res.status(200).json(meme);
				}
			});
		}
	}
];

exports.meme_delete = function(req, res, next) {
	Meme.findByIdAndRemove(req.params.id, function deleteMeme(err) {
		if (err) {
			res.status(500).send({error: 'Error deleting meme'});
			return next(err);
		} else {
			// Successful
			res.json({success: true});
		}
	});
};
