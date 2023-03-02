const mongoose = require('mongoose');

let Book = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  Description: {
    type: String
  },
}, {
  collection: "books"
});


module.exports = mongoose.model("Book",Book);
