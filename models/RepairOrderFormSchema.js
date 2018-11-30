// includes mongoose functions
var mongoose = require("mongoose");

// sets mongoose function to simpler var name
var Schema = mongoose.Schema;

// imports VIF and job schemas from other schema files
var VehicleInspectionFormSchema = mongoose.model("VehicleInspectionForms").schema;
var jobSchema = mongoose.model("JobModel").schema;

// declares data types for form
var repairOrderSchema = new Schema({
  repairOrderNumber: String,
  customerID: String,
  VIN: String,
  inspectionReport: VehicleInspectionFormSchema, // Can we assign each inspection report an ID?
  mechanicID: String,
  mechanicFirstName: String,
  mechanicLastName: String,
  jobs: [jobSchema], // array of job schema objects
  totalCost: String
});

// allows objects to be stored in separate collection and exported
module.exports = mongoose.model("repairOrder", repairOrderSchema);