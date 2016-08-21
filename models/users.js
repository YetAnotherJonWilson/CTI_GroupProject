var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    username: {type: String, required: true, index: {unique: true} },
    password: {type: String, required: true}
});

UserSchema.pre('save', function(next){

  var user = this;
  // var SALT_WORK_FACTOR = 10;
  console.log('/models/users/ inside UserSchema.pre');
  if(!user.isModified('password')){
    console.log('/models/users/ !user.isModified("password")');
    return next();
  }
  bcrypt.hash(user.password, SALT_WORK_FACTOR, function(err, hash){
      if(err){
          console.log(error);
      }
      else{
      console.log('Hashed password!', hash);
      user.password = hash;
      return next();
    }
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, callback){
// no error, boolean indicating whether the passwords matched
// this.password is the password in the database
// candidatePassword is what we received on the request

  var user = this;

  bcrypt.compare(candidatePassword, user.password, function(err, isMatch){
      if(err){
          console.log('There was an error', err);
          callback(err, isMatch);
      } else {
          console.log('isMatch', isMatch);
          callback(null, isMatch)
      }
  })
};



// var User = mongoose.model('User', UserSchema);

module.exports = mongoose.model('User', UserSchema);
