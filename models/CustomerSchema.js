var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//var vehicleSchema = mongoose.model("Vehicle").schema;

var customerSchema = new Schema({
  customerID: String,
  firstName: String,
  lastName: String,
  address: String,
  city: String,
  state: String,
  zip: Number,
  email: String,
  cell: Number,
  work: Number
  // vehicles: [vehicleSchema]
});

module.exports = mongoose.model("Customer", customerSchema);