// includes mongoose functions
var mongoose = require("mongoose");

// sets mongoose function to simpler var name
var Schema = mongoose.Schema;

// declares data types for job schema
var jobSchema = new Schema({
  repairType: String,
  complaint: String,
  cause: String,
  resolution: String,
  cost: String
});

// allows jobs to be stored in separate collection and exported
module.exports = mongoose.model("JobModel", jobSchema);