var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var vehicleSchema = mongoose.model("VehicleModel").schema;

var customerSchema = new Schema({
  customerID: Number,
  firstName: String,
  lastName: String,
  address: String,
  city: String,
  state: String,
  zip: Number,
  email: String,
  cell: String,
  work: String,
  vehicles: [vehicleSchema]
});

module.exports = mongoose.model("CustomerModel", customerSchema);