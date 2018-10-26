//express
var express = require("express");
var app = express();

<<<<<<< HEAD
//mongoose connection
var mongoose = require('mongoose');
var mongoURL = 'mongodb://localhost:27017/myDB';
mongoose.connect(mongoURL, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//allows us to read data from page by looking at body
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//define Schema
var Schema = mongoose.Schema;
var VehicleInspectionSchema = new Schema({
    Name: String,
    Mileage: Number,
    Year_Make_Model: String,
    VIN: Number,
    License: String,
    email: String,
    INTERIOR_EXTERIOR: {
        Exterior_Body: {type:Number, min:0, max: 3},
        WindShield_Glass: {type:Number, min:0, max: 3},
        Wipers: {type:Number, min:0, max: 3},
        Exterior_Lights: {type:Number, min:0, max: 3},
        Interior_Lights: {type:Number, min:0, max: 3},
        AC_Operation: {type:Number, min:0, max: 3},
        Heating: {type:Number, min:0, max: 3},
        Other: String
    },
    UNDERHOOD: {
        Engine_Oil: {type:Number, min:0, max: 3},
        Brake_Fluid: {type:Number, min:0, max: 3},
        Power_Steering_Fluid: {type:Number, min:0, max: 3},
        Washer_Fluid: {type:Number, min:0, max: 3},
        Belts_and_Hoses: {type:Number, min:0, max: 3},
        Antifreeze_Coolant: {type:Number, min:0, max: 3},
        Air_Filter: {type:Number, min:0, max: 3},
        Cabin_Filter: {type:Number, min:0, max: 3},
        Fuel_Filter: {type:Number, min:0, max: 3},
        Spark_Plugs_Wires: {type:Number, min:0, max: 3},
        Other: String,
        Battery_Charge: {type:Number, min:0, max: 3},
        Battery_Condition: {type:Number, min:0, max: 3},
        Cables_Connections: {type:Number, min:0, max: 3}
    },
    UNDER_VEHICLE: {
        Brakes_Pads_Shoes: {type:Number, min:0, max: 3},
        Brake_Lines_Hoses: {type:Number, min:0, max: 3},
        Steering_System: {type:Number, min:0, max: 3},
        Shocks_Struts: {type:Number, min:0, max: 3},
        Driveline_Axles_CV_Shaft: {type:Number, min:0, max: 3},
        Exhaust_System: {type:Number, min:0, max: 3},
        Fuel_Lines_Hoses: {type:Number, min:0, max: 3},
        Other: String
    },
    TIRES: {
        Tread_Depth: {type:Number, min:0, max: 3},
        LF: {type:Number, min:0, max: 3},
        RF: {type:Number, min:0, max: 3},
        LR: {type:Number, min:0, max: 3},
        RR: {type:Number, min:0, max: 3},
        Wear_Pattern_Damage: {
            LF: {type:Number, min:0, max: 3},
            RF: {type:Number, min:0, max: 3},
            LR: {type:Number, min:0, max: 3},
            RR: {type:Number, min:0, max: 3},
        },
        Air_Pressure: {
            TPMS_Warning_System: Boolean,
            Front: {
                LF: {type:Number, min:0},
                RF: {type:Number, min:0},
                OEM_Spec: Number
            },
            Back: {
                LR: {type:Number, min:0},
                RR: {type:Number, min:0},
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
var vehicleInspectionForm = mongoose.model("vehicleInspectionForm",VehicleInspectionSchema);

=======
>>>>>>> 3f72478ed751228690aa7a27ae98962b888d9a94

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

//rendering stuff
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
});

//listens to vehicleInspectionForm
app.post('/vehicleInspectionForm', function(req,res) {
  var newVehicleInspectionForm = new vehicleInspectionForm({
    Name: req.body.Name,
    Mileage: req.body.Mileage,
    Year_Make_Model: req.body.Year_Make_Model,
    VIN: req.body.VIN,
    License: req.body.License,
    email: req.body.email
  });
  newVehicleInspectionForm.save(function(error) {
    res.send("saved?");
    if (error) {
      console.error(error);
    }
  });
});