var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var lastServiceSchema = mongoose.model("LastService").schema;

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
    lastSrvc: lastServiceSchema
});

module.exports = mongoose.model("Vehicle", vehicleSchema);