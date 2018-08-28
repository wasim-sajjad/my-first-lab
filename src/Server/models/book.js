var mongoose = require('mongoose');

var Book = mongoose.model('Book', {
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  description: {
    type: String,
    //required: true,
    minlength: 1,
    
  },
  imagePath: {
    type: String,
  // required: true,
    minlength: 1,
    
  }
});

module.exports = {Book};
