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
  warehouses: [{
    characteristic: {
      button_text: {
        type: String,
        default: 'Add cargo +'
      },
      five: {
        type: String,
        default: 'Shipment method'
      },
      four: {
        type: String,
        default: 'Purchasing technology'
      },
      three: {
        type: String,
        default: 'Item number'
      },
      two: {
        type: String,
        default: 'Manufacturer'
      },
      one: {
        type: String,
        default: 'All stores'
      },
      title: {
        type: String,
      }
    },
    five: {
      type: Number,
    },
    four: {
      type: Number,
    },
    three: {
      type: Number,
    },
    two: {
      type: Number,
    },
    one: {
      type: String,
    },
    products: [{
      five: {
        type: String
      },
      four: {
        type: String
      },
      three: {
        type: String
      },
      two: {
        type: String
      },
      one: {
        type: String
      },
      payment: {
        type: String
      }
    }]
  }]

})
