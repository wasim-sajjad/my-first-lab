var mongoose = require('mongoose');
var validator = require('validator');
var bcrypt = require('bcryptjs');
var jwt= require('jsonwebtoken');
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate:{

     validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password:{
      type: String,
      required: true,
      trim: true,
      minlength: 8
  },
  tokens:[{
    access: {
      type: String,
      required: true
    },
    token:{
      type: String,
      required: true
    }
  }]
});






UserSchema.methods.generateAuthToken = function(_user){
  var access ='auth';

  var token= jwt.sign({_id: _user._id.toHexString(),access},'abc123').toString();

  _user.tokens.push({access,token});



  return _user.save().then((res)=>{
    return res;
  });
  
};


UserSchema.methods.login = function(body){

  console.log('this is one', body);



  var user = this; 

  user.model.findOne({email: body.email}, function(err, _user) {
    if(err){
      console.log('error: ', err);
      return err;
    } else {
      console.log('_user: ', _user);
      return _user;
    }

  });

}


UserSchema.statics.findByToken = function (token){
  var User= this;
  var decoded;

  try{

decoded = jwt.verify(token,'abc123');

  }catch(e){

  return Promise.reject();
          }
  return User.findOne({

   '_id': decoded._id,
   'tokens.token': token,
   'tokens.access': 'auth'

  });
};
UserSchema.pre('save', function (next){
  var user= this;

  if (user.isModified('password')){
    bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(user.password,salt,(err,hash)=>{
        user.password=hash;
        next();
                });
                });
}else {
  next();
}
}); 

var User = mongoose.model('User', UserSchema);

module.exports = {User}
