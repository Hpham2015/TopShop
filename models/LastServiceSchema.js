// includes mongoose functions
var mongoose = require("mongoose");

// sets mongoose function to simpler var name
var Schema = mongoose.Schema;

// declares data types for last service schema
var lastServiceSchema = new Schema({
  date: Date,
  odometer: Number,
  dailyAverageMiles: Number,
  monthlyAverageMiles: Number
});

// allows objects of this schema to be saved in separate collection and exported
module.exports = mongoose.model("LastService", lastServiceSchema);