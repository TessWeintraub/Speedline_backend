const mongoose = require('mongoose')
const Schema = mongoose.Schema

const warehouseSchema = new Schema({
    userId: {
      ref: 'users',
      type: Schema.Types.ObjectId,
    },
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
      default: 0
    },
    one: {
      type: String,
    },
    checked: {
      type: Boolean,
      default: false
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
      },
      checked: {
        type: Boolean,
        default: false
      },
    }]
})

module.exports = mongoose.model('warehouses', warehouseSchema)