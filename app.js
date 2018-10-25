var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.set("view engine", "ejs");

var url = "mongodb://localhost:27017/test";
/** CONNECT **/
mongoose.connect(url);

var Schema = mongoose.Schema;

var lastServiceSchema = new Schema({
  date: Date,
  odometer: Number,
  dailyAverageMiles: Number,
  monthlyAverageMiles: Number
});

var vehicleSchema = new Schema({
  VIN: String,
  make: String,
  model: String,
  year: Number,
  color: String,
  type: String,
  productionDate: Date,
  inserviceDate: Date,
  lastService: lastServiceSchema
});

// sets up customer entry form schema
var customerSchema = new Schema({
  customerID: String,
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
var partSchema = new Schema({
  partID: String,
  partDescription: String,
  quantity: Number,
  partPrice: Number
});

var jobSchema = new Schema({
  jobID: mongoose.Schema.Types.ObjectId,
  jobOrder: Number,
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
var customerModel = mongoose.model("customer", customerSchema);

app.get("/customerInputForm", function(req, res){
  res.render("customerInputForm");
  // mongoose.model("customerInputForm").find(function(err, input){
  //   res.send(input);
  // });
});

app.post("/customerInputForm", function(req, res){

  var customerModelInstance = new customerModel({
    customerID: Number(req.body.customerID),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.city,
    state: req.body.state,
    zip: Number(req.body.zip),
    email: req.body.email,
    cell: req.body.cell,
    work: req.body.work
  });
  // customerModel.create(customerModelInstance, function(err) {
  //   if (err) {
  //     console.log(err);
  //   }
  // });
  console.log(customerModelInstance);
  // console.log(customerModel.count());  
  res.redirect("/customerInputForm");
});

// adds new vehicle to DB
var lastServiceModel = mongoose.model("lastService", lastServiceSchema);
var vehicleModel = mongoose.model("vehicle", vehicleSchema);

app.get("/vehicleInputForm", function(req, res){
  res.render("vehicleInputForm");
});

app.post("/vehicleInputForm", function(req, res){
  
  var lastServiceModelInstance = new lastServiceModel({
    date: req.body.lastServiceDate,
    odometer: Number(req.body.lastServiceOdom),
    dailyAverageMiles: Number(req.body.lastServiceDailyMiles),
    monthlyAverageMiles: Number(req.body.lastServiceMonthlyMiles)
  });
  
  var vehicleModelInstance = new vehicleModel({
    VIN: Number(req.body.VIN),
    make: req.body.make,
    model: req.body.mode,
    year: Number(req.body.year),
    color: req.body.color,
    type: req.body.type,
    productionDate: req.body.productionDate,
    inserviceDate: req.body.inserviceDate,
    lastService: lastServiceModelInstance
  });
  console.log(vehicleModelInstance);
  res.redirect("/vehicleInputForm");
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