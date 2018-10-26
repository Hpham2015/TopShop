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
  // VIN: String,
  vehicles: [vehicleSchema]
});

var inspectionReportSchema = new Schema({
  vehicleInfo: vehicleSchema,
  INTERIOR_EXTERIOR: {
    Exterior_Body: {type: Number, min: 0, max: 3},
    WindShield_Glass: {type: Number, min: 0, max: 3},
    Wipers: {type: Number, min: 0, max: 3},
    Exterior_Lights: {type: Number, min:0, max: 3},
    Interior_Lights: {type: Number, min: 0, max: 3},
    AC_Operation: {type: Number, min: 0, max: 3},
    Heating: {type: Number, min: 0, max: 3},
    Other: String
  },
  UNDERHOOD: {
    Engine_Oil: {type: Number, min: 0, max: 3},
    Brake_Fluid: {type: Number, min: 0, max: 3},
    Power_Steering_Fluid: {type: Number, min: 0, max: 3},
    Washer_Fluid: {type: Number, min: 0, max: 3},
    Belts_and_Hoses: {type: Number, min: 0, max: 3},
    Antifreeze_Coolant: {type: Number, min: 0, max: 3},
    Air_Filter: {type: Number, min: 0, max: 3},
    Cabin_Filter: {type: Number, min: 0, max: 3},
    Fuel_Filter: {type: Number, min: 0, max: 3},
    Spark_Plugs_Wires: {type: Number, min: 0, max: 3},
    Other: String,
    Battery_Charge: {type: Number, min: 0, max: 3},
    Battery_Condition: {type: Number, min: 0, max: 3},
    Cables_Connections: {type: Number, min: 0, max: 3}
  },
  UNDER_VEHICLE: {
    Brakes_Pads_Shoes: {type: Number, min: 0, max: 3},
    Brake_Lines_Hoses: {type: Number, min: 0, max: 3},
    Steering_System: {type: Number, min: 0, max: 3},
    Shocks_Struts: {type: Number, min: 0, max: 3},
    Driveline_Axles_CV_Shaft: {type: Number, min: 0, max: 3},
    Exhaust_System: {type: Number, min: 0, max: 3},
    Fuel_Lines_Hoses: {type: Number, min: 0, max: 3},
    Other: String
  },
  TIRES: {
    Tread_Depth: {type: Number, min: 0, max: 3},
    LF: {type: Number, min: 0, max: 3},
    RF: {type: Number, min: 0, max: 3},
    LR: {type: Number, min: 0, max: 3},
    RR: {type: Number, min: 0, max: 3},
    Wear_Pattern_Damage: {
      LF: {type: Number, min: 0, max: 3},
      RF: {type: Number, min: 0, max: 3},
      LR: {type: Number, min: 0, max: 3},
      RR: {type: Number, min: 0, max: 3},
    },
    Air_Pressure: {
      TPMS_Warning_System: Boolean,
      Front: {
        LF: {type: Number, min: 0},
        RF: {type: Number, min: 0},
        OEM_Spec: Number
      },
      Back: {
        LR: {type: Number, min: 0},
        RR: {type: Number, min: 0},
        OEM_Spec: Number
      }
    },
    Tire_Check_OE_Interval_Suggests: {
      Allignment: Boolean,
      Balance: Boolean,
      Rotation: Boolean,
      New_Tire: Boolean
    }
  },
  Comments: String,
  Inspected_by: String,
  Inspected_on: Date
});

// sets up vehicle entry form schema
var partSchema = new Schema({
  partID: String,
  partDescription: String,
  quantity: Number,
  partCost: Number
});

var jobSchema = new Schema({
  jobID: String,
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
  inspectionReport: inspectionReportSchema,
  jobs: [jobSchema],
  totalCost: Number, // all job costs
  disclaimer: String
});

app.get("/", function(req, res){
  res.render("landing");
});

// adds new vehicle to DB
var lastServiceModel = mongoose.model("lastService", lastServiceSchema);
var vehicleModel = mongoose.model("vehicle", vehicleSchema);

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
    customerID: req.body.customerID,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.city,
    state: req.body.state,
    zip: Number(req.body.zip),
    email: req.body.email,
    cell: req.body.cell,
    work: req.body.work,
  });
  
  var vin = req.body.VIN;
  var query = vehicleModel.findOne({VIN: vin}, function (err, vehicleModel) {
    if (err) {
      res.send(err);
    }
    console.log(vehicleModel);
    customerModelInstance.vehicles.push(vehicleModel);
    
    console.log(customerModelInstance);
    
    customerModelInstance.save(function (err) {
      if (err) console.log(err);
    });
    
  });
  // customerModelInstance.vehicle.push(query);
  // customerModel.create(customerModelInstance, function(err) {
  //   if (err) {
  //     console.log(err);
  //   }
  // });
  // console.log(customerModel.count());  
  res.redirect("/customerInputForm");
});



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
  console.log(vehicleModelInstance);
  vehicleModelInstance.save(function (err) {
    if (err) console.log(err);
  });
  res.redirect("/vehicleInputForm");
});


app.get("/repairOrderForm", function(req, res){
  res.render("repairOrderForm");
});

app.post("/repairOrderForm", function(req, res) {
    
});

app.get("/vehicleInspectionForm", function(req, res){
  res.render("vehicleInspectionForm");
});

app.post("/vehicleInspectionForm", function(req, res) {
    
});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Server started.");
})

function testFind() {
  console.log("here");
  // vehicleModel.find({'make': "Toyota"}, "make model");
}