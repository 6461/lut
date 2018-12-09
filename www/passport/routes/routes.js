// app/routes.js

// require controller
var itemController = require('../controllers/itemController');

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
		res.render('index', {title: 'Home page'});
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
		res.render('login', {title: 'Login page', message: req.flash('loginMessage')});
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
		res.render('signup', {title: 'Signup page', message: req.flash('signupMessage')});
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
	
	// render shopping list page
	app.get('/list', isLoggedIn, function(req, res) {
		res.render('list', {title: 'Shopping list', user: req.user});
    });
	
	// GET request for list of all items
	app.get('/item/list', isLoggedIn, itemController.item_list);

	// POST request for creating an item
	app.post('/item/create', isLoggedIn, itemController.item_create);

	// POST request to delete item
	app.post('/item/delete', isLoggedIn, itemController.item_delete);

	// GET request for one item
	app.get('/item/:id', isLoggedIn, itemController.item_get);
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}