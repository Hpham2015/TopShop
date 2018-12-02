// includes mongoose functions
var mongoose = require("mongoose");

// sets mongoose function to simpler var name
var Schema = mongoose.Schema;

// imports last service schema from other schema file
var lastServiceSchema = mongoose.model("LastService").schema;

// declares data types for vehicle schema
var vehicleSchema = new Schema({
    customerID: Number,
    make: String,
    model: String,
    year: Number,
    licenseNum: String,
    VIN: String,
    color: String,
    type: String,
    mileage: Number,
    lastSrvc: lastServiceSchema // lastSrvc field contains an object of the last service schema
});

// allows objects of this schema to be stored in separate collection and exported
module.exports = mongoose.model("Vehicle", vehicleSchema);