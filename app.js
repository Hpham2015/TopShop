var express = require("express");
var app = express();
var mongoose = require("mongoose");
app.use(express.static("public"));

app.set("view engine", "ejs");

var url = "mongodb://localhost:27017/TopShop";

/** CONNECT **/
mongoose.connect(url);

var Schema = mongoose.Schema;

// sets up customer entry form schema
var customerSchema = new Schema({
  customerID: Number,
  firstName: String,
  lastName: String,
  address: String,
  city: String,
  state: String,
  zip: Number,
  email: String,
  cell: String,
  work: String
});
// sets up vehicle entry form schema
var vehicleSchema = new Schema({
  customerID: Number,
  make: String,
  model: String,
  year: Number,
  color: String,
  type: String,
  productionDate: Date,
  inserviceDate: Date,
  lastSrvc: {
    date: Date,
    odom: Number,
    dailyAvg: Number,
    monthAvg: Number
  }
});

var partSchema = new Schema({
  partID: String,
  partDescription: String,
  quantity: Number,
  partPrice: Number
});

var jobSchema = new Schema({
  jobOrder: Number,
  jobID: String,
  jobName: String,
  laborCost: Number,
  parts: [partSchema],
  totalPartCost: Number, // all part costs
  totalJobCost: Number  // all part costs + labor cost
})

var repairOrderSchema = new Schema({
  customerInfo: customerSchema,
  vehicleInfo: vehicleSchema,
  totalCost: Number, // all job costs
  disclaimer: String
});

app.get("/", function(req, res){
  res.render("landing");
});

// adds new customer to DB
var customerObj = mongoose.model("customer", customerSchema);

app.get("/customerInputForm", function(req, res){
  res.render("customerInputForm");
  mongoose.model("customerInputForm").find(function (err, input){
    res.send(input);
  });
});

app.post("/customerInputForm", function(req, res){
  var newCustomerObj = req.customer;
  console.log(req.customer);
  res.redirect("/customerInputForm");
});

// adds new vehicle to DB
var vehicleObj = mongoose.model("vehicle", vehicleSchema);

app.post("/vehicleInputForm", function(req, res){
  var newVehicleObj = req.vehicle;
  res.redirect("/vehicleInputForm");
});
app.get("/vehicleInputForm", function(req, res){
  res.render("vehicleInputForm");
});

app.get("/repairOrderForm", function(req, res){
  res.render("repairOrderForm");
});

app.get("/vehicleInspectionForm", function(req, res){
  res.render("vehicleInspectionForm");
});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Server started.");
})