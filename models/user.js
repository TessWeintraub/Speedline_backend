const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  characteristic: {
    button_text: {
      type: String,
      default: 'Add a warehouse +'
    },
    five: {
      type: String,
      default: 'Height, m'
    },
    four: {
      type: String,
      default: 'Width, m'
    },
    three: {
      type: String,
      default: 'Length, m'
    },
    two: {
      type: String,
      default: 'Number of products'
    },
    one: {
      type: String,
      default: 'All stores'
    }
  },
  warehouses: [
    {
      ref: 'warehouses',
      type: Schema.Types.ObjectId
    }
  ]

})
module.exports = mongoose.model('users' ,userSchema)