var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var lastServiceSchema = mongoose.model("LastServiceModel").schema;

var vehicleSchema = new Schema({
    customerID: Number,
    make: String,
    model: String,
    year: Number,
    licenseNum: Number,
    VIN: Number,
    color: String,
    type: String,
    mileage: Number,
    productionDate: Date,
    inserviceDate: Date,
    lastSrvc: lastServiceSchema
});

module.exports = mongoose.model("VehicleModel", vehicleSchema);