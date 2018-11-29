//Require Mongoose
var mongoose = require('mongoose');

//Define Schema
var Schema = mongoose.Schema;
var VehicleInspectionFormSchema = new Schema({
    Name: String,
    Mileage: Number,
    Year_Make_Model: String,
    VIN: String,
    License: String,
    email: String,
    INTERIOR_EXTERIOR: {
        Exterior_Body: {type:String, enum:['ok','warning','danger']},
        WindShield_Glass: {type:String, enum:['ok','warning','danger']},
        Wipers: {type:String, enum:['ok','warning','danger']},
        Exterior_Lights: {type:String, enum:['ok','warning','danger']},
        Interior_Lights: {type:String, enum:['ok','warning','danger']},
        AC_Operation: {type:String, enum:['ok','warning','danger']},
        Heating: {type:String, enum:['ok','warning','danger']},
        Other: {type:String, enum:['ok','warning','danger']}
    },
    UNDERHOOD: {
        Engine_Oil: {type:String, enum:['ok','warning','danger']},
        Brake_Fluid: {type:String, enum:['ok','warning','danger']},
        Power_Steering_Fluid: {type:String, enum:['ok','warning','danger']},
        Washer_Fluid: {type:String, enum:['ok','warning','danger']},
        Belts_and_Hoses: {type:String, enum:['ok','warning','danger']},
        Antifreeze_Coolant: {type:String, enum:['ok','warning','danger']},
        Air_Filter: {type:String, enum:['ok','warning','danger']},
        Cabin_Filter: {type:String, enum:['ok','warning','danger']},
        Fuel_Filter: {type:String, enum:['ok','warning','danger']},
        Spark_Plugs: {type:String, enum:['ok','warning','danger']},
        Battery_Charge: {type:String, enum:['ok','warning','danger']},
        Battery_Condition: {type:String, enum:['ok','warning','danger']},
        Cables_Connections: {type:String, enum:['ok','warning','danger']},
        Other: {type:String, enum:['ok','warning','danger']}
    },
    UNDER_VEHICLE: {
        Brakes_Pads_Shoes: {type:String, enum:['ok','warning','danger']},
        Brake_Lines_Hoses: {type:String, enum:['ok','warning','danger']},
        Steering_System: {type:String, enum:['ok','warning','danger']},
        Shocks_Struts: {type:String, enum:['ok','warning','danger']},
        Driveline_Axles_CV_Shaft: {type:String, enum:['ok','warning','danger']},
        Exhaust_System: {type:String, enum:['ok','warning','danger']},
        Fuel_Lines_Hoses: {type:String, enum:['ok','warning','danger']},
        Other: {type:String, enum:['ok','warning','danger']}
    },
    TIRES: {
        Tread_Depth: {type:String, enum:['ok','warning','danger']},
        LF: {type:String, enum:['ok','warning','danger']},
        RF: {type:String, enum:['ok','warning','danger']},
        LR: {type:String, enum:['ok','warning','danger']},
        RR: {type:String, enum:['ok','warning','danger']},
        LF_Tread_Depth: {type:Number, min:0, max:20},
        RF_Tread_Depth: {type:Number, min:0, max:20},
        LR_Tread_Depth: {type:Number, min:0, max:20},
        RR_Tread_Depth: {type:Number, min:0, max:20},
        Wear_Pattern_Damage: {
            LF: {type:String, enum:['ok','warning','danger']},
            RF: {type:String, enum:['ok','warning','danger']},
            LR: {type:String, enum:['ok','warning','danger']},
            RR: {type:String, enum:['ok','warning','danger']},
        },
        Air_Pressure: {
            TPMS_Warning_System: Boolean,
            Front: {
                LF: {type:Number, min:30, max:60},
                RF: {type:Number, min:30, max:60},
                OEM_Spec: Number
            },
            Back: {
                LR: {type:Number, min:30, max:60},
                RR: {type:Number, min:30, max:60},
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
//export the Schema so it can be used outside
//saves to vehicleinspectionforms collection (all lowercase)
module.exports = mongoose.model('VehicleInspectionForms', VehicleInspectionFormSchema );