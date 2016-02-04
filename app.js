var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/amazon';
var ejs = require('ejs');
var engine = require('ejs-mate')



mongoose.connect(mongoUri);

//MIDDLEWARE
//now knows that the public folder is for the static files
app.use( logger('dev') );
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true} ) );

//what kind of engine do we want to use (ejsMate)
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))



var UserRouter = require('./models/user.js');

app.post('/create-user', function(req, res, next) {
	var user = new UserRouter();

	user.profile.name = req.body.name;
	user.password = req.body.password;
	user.email = req.body.email;

	user.save(function(error) {
		if (error) return next(error);
		res.json("successfully created a new user")
	});
});

app.get('/', function(req, res) {
	//knows to look in the views folder
	res.render('main/home.ejs')
})

app.get('/about', function(req, res){
	res.render('main/about.ejs');
})

app.listen(port);
console.log('server on port ', port)