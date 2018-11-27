var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var jobSchema = new Schema({
  repairType: String,
  complaint: String,
  cause: String,
  resolution: String,
  cost: String
});

module.exports = mongoose.model("JobModel", jobSchema);