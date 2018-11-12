var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var lastServiceSchema = new Schema({
  date: Date,
  odometer: Number,
  dailyAverageMiles: Number,
  monthlyAverageMiles: Number
});

module.exports = mongoose.model("LastServiceModel", lastServiceSchema);