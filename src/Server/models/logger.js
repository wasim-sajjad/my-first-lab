var mongoose = require('mongoose');
var { User } = require('./user')



var LoggerSchema = new mongoose.Schema({
    email: {
  type: String,
  required: true,
  trim: true,
  minlength: 1
},
password:{
    type: String,
    required: true,
    trim: true,
    minlength: 8
}
});

var Logger = mongoose.model('Logger',LoggerSchema) ;

module.exports = {Logger}