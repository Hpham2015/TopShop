var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var VehicleInspectionFormSchema = mongoose.model("VehicleInspectionForms").schema;
var jobSchema = mongoose.model("JobModel").schema;

var repairOrderSchema = new Schema({
  repairOrderNumber: String,
  customerID: String,
  VIN: String,
  inspectionReport: VehicleInspectionFormSchema, // Can we assign each inspection report an ID?
  mechanicID: String,
  mechanicFirstName: String,
  mechanicLastName: String,
  jobs: [jobSchema],
  totalCost: String
});

module.exports = mongoose.model("repairOrder", repairOrderSchema);
