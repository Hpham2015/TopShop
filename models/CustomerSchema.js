// includes mongoose functions
var mongoose = require("mongoose");

// sets mongoose function to simpler var name
var Schema = mongoose.Schema;

// imports vehicle schema from other schema file
var vehicleSchema = mongoose.model("Vehicle").schema;

// declares data types for each field in schema
var customerSchema = new Schema({
  customerID: String,
  firstName: String,
  lastName: String,
  street: String,
  city: String,
  state: String,
  zip: Number,
  email: String,
  cell: Number,
  work: Number,
  vehicles: [vehicleSchema] // vehicles field is an array of vehicle objects
});

// allows objects of this schema to be saved in separate collection and exported
module.exports = mongoose.model("Customer", customerSchema);