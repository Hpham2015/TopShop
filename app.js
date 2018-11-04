var express = require("express");
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
  
// connects to MongoDB server
mongoose.connect('mongodb://localhost:27017/TopShop', {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// sets up schema to store last service info
var lastServiceSchema = new mongoose.Schema({
  date: Date,
  odometer: Number,
  dailyAverageMiles: Number,
  monthlyAverageMiles: Number
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
  lastSrvc: lastServiceSchema
});

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



// initializes customer object model
var customerObj = mongoose.model("customer", customerSchema);

// adds new customer to DB
app.post("/customerInputForm", function(req, res){
  var newCustomerObj = new customerObj({
    customerID: req.body.customerID,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    address: req.body.street,
    city: req.body.City,
    state: req.body.State,
    zip: Number(req.body.zip),
    email: req.body.email,
    cell: req.body.cell,
    work: req.body.work
  });
  
  console.log(newCustomerObj);
  
  newCustomerObj.save(function(err) {
    if (err) {
      console.log(err);
  } else {
    res.redirect("/customerInputForm");
  }
});

});

// initializes vehicle and last service object models
var vehicleObj = mongoose.model("vehicle", vehicleSchema);
var lastServiceObj = mongoose.model("lastService", lastServiceSchema);

// adds new vehicle to DB
app.post("/vehicleInputForm", function(req, res){
  var lastServiceModelInstance = new lastServiceObj({
    date: req.body.lastServiceDate,
    odometer: Number(req.body.lastServiceOdom),
    dailyAverageMiles: Number(req.body.lastServiceDailyMiles),
    monthlyAverageMiles: Number(req.body.lastServiceMonthlyMiles)
  });
  
  var newVehicleObj = new vehicleObj({
    VIN: req.body.VIN,
    make: req.body.make,
    model: req.body.model,
    year: Number(req.body.year),
    color: req.body.color,
    type: req.body.type,
    productionDate: req.body.productionDate,
    inserviceDate: req.body.inserviceDate,
    lastService: lastServiceModelInstance
  });
  vehicleObj.create(newVehicleObj, function(err, newlyCreated) {
    if (err) {
      console.log(err);
  } else {
    res.redirect("/vehicleInputForm");
  }
});

});

// takes input from search form to search for items, then returns JSON with info to form
app.post("/displaySearch", function(req, res) {
  
  
});


app.use(express.static(__dirname + "/public"));
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