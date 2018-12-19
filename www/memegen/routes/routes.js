// app/routes.js

// require controller
var memeController = require('../controllers/memeController');

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
		res.render('index', {title: 'Home'});
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
		res.render('login', {title: 'Login', message: req.flash('loginMessage')});
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/list',
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
		res.render('signup', {title: 'Signup', message: req.flash('signupMessage')});
    });

	// process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/list', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile', {title: 'Profile page', user: req.user});
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
	
	// render list page
	app.get('/list', isLoggedIn, function(req, res) {
		res.render('list', {title: 'List of memes', user: req.user});
    });
	
	// GET request for list of all items
	app.get('/meme/list', isLoggedIn, memeController.meme_list);
	
	// GET request for creating an item
	app.get('/meme/create', isLoggedIn, memeController.meme_create_form);
	
	// POST request for creating an item
	app.post('/meme/create', isLoggedIn, memeController.meme_create);
	
	// GET request to delete item
	app.get('/meme/:id/delete', isLoggedIn, memeController.meme_delete);
	
	// GET request for SVG
	app.get('/meme/:id/svg', isLoggedIn, memeController.meme_svg);
	
	// GET request to update item
	app.get('/meme/:id/update', isLoggedIn, memeController.meme_update_form);	
	
	// POST request to update item
	app.post('/meme/:id/update', isLoggedIn, memeController.meme_update);
	
	// GET request for one item
	app.get('/meme/:id', isLoggedIn, memeController.meme_get);
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}