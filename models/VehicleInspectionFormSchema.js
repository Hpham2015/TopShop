//Require Mongoose
var mongoose = require('mongoose');

//Define Schema
var Schema = mongoose.Schema;
var VehicleInspectionFormSchema = new Schema({
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
//export the Schema so it can be used outside
//saves to vehicleinspectionforms collection (all lowercase)
module.exports = mongoose.model('VehicleInspectionForms', VehicleInspectionFormSchema );