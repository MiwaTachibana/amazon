var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
// var Schema = mongoose.Schema;

// user schema attributes
var UserSchema = new mongoose.Schema( {
	email: { type: String, unique: true, lowercase: true},
	password: String,

	profile: {
		name: {type: String, default: ' ' },
		picture: {type: String, default: ' '}
	},

	address: String,
	history: [{
		date: Date,
		paid: {type: Number, default: 0},
		// item: {type: Schema.Types.ObjectId, ref: }

	}]
})




//hash the password before it is saved to the db




//compare passwords in the db vs. the submitted password