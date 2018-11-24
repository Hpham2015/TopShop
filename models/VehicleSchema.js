var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var lastServiceSchema = mongoose.model("LastService").schema;

var vehicleSchema = new Schema({
    customerID: Number,
    make: String,
    model: String,
    year: Number,
    licenseNum: Number,
    VIN: Number,
    color: String,
    type: String,
    lastSrvc: lastServiceSchema
});

module.exports = mongoose.model("Vehicle", vehicleSchema);