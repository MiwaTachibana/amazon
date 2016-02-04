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

//.pre is a built in bcrypt method
UserSchema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password') ) return next();
	bcrypt.genSalt(8, function(error, salt) {
		if (error) return next(error);
		bcrypt.hash(user.password, salt, null, function(error, hash) {
			if(error) return next(error);
			user.password = hash;
			next();
		});
	});	
});



//compare passwords in the db vs. the submitted password

//comparePassword is a custom method
UserSchema.methods.comparePassword = function(password){
	return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);