var express = require("express");
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
  
// connects to MongoDB server
mongoose.connect('mongodb://localhost:27017/TopShop', {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


// sets up customer entry form schema
var customerSchema = new mongoose.Schema({
  customerID: Number,
  firstName: String,
  lastName: String,
  address: String,
  city: String,
  state: String,
  zip: Number,
  email: String,
  cell: String,
  work: String,
  vehicles: [vehicleSchema]
});

// sets up vehicle entry form schema
var vehicleSchema = new mongoose.Schema({
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

// adds new customer to DB
var customerObj = mongoose.model("customer", customerSchema);

app.post("/customerInputForm", function(req, res){
  var newCustomerObj = new customerObj(req);
  console.log(newCustomerObj);
  res.redirect("/customerInputForm");
//   customerObj.create(newCustomerObj, function(err, newlyCreated) {
//     if (err) {
//       console.log(err);
//   } else {
//     res.redirect("/customerInputForm");
//   }
// });

});

// adds new vehicle to DB
var vehicleObj = mongoose.model("vehicle", vehicleSchema);

app.post("/vehicleInputForm", function(req, res){
  var newVehicleObj = req.vehicle;
  vehicleObj.create(newVehicleObj, function(err, newlyCreated) {
    if (err) {
      console.log(err);
  } else {
    res.redirect("/vehicleInputForm");
  }
});

});

app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/customerInputForm", function(req, res){
  res.render("customerInputForm");
});

app.get("/repairOrderForm", function(req, res){
  res.render("repairOrderForm");
});

app.get("/vehicleInputForm", function(req, res){
  res.render("vehicleInputForm");
});

app.get("/vehicleInspectionForm", function(req, res){
  res.render("vehicleInspectionForm");
});

// Whoever is not on aws cloud 9, your ports will be different.
app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Server started.");
})