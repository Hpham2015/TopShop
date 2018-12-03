var jobModel = require('./models/JobSchema.js');
var lastServiceModel = require('./models/LastServiceSchema.js');
var vehicleModel = require('./models/VehicleSchema.js');
var VehicleInspectionFormModel = require('./models/VehicleInspectionFormSchema.js');
var customerModel = require('./models/CustomerSchema.js');
var repairOrderModel = require('./models/RepairOrderFormSchema.js');

module.exports = {
    populate() {
      var lastService1 = new lastServiceModel({
        date: new Date('December 1, 2011 01:11:11'),
        odometer: 11111,
        dailyAverageMiles: 30,
        monthlyAverageMiles: 900
      });
      
      var lastService2 = new lastServiceModel({
        date: new Date('December 2, 2012 02:22:22'),
        odometer: 22222,
        dailyAverageMiles: 1,
        monthlyAverageMiles: 30
      });
      
      var lastService3 = new lastServiceModel({
        date: new Date('December 3, 2013 03:33:33'),
        odometer: 33333,
        dailyAverageMiles: 50,
        monthlyAverageMiles: 15000
      });
      
      var newVehicle1 = new vehicleModel({
        customerID: 1672548348,
        make: "Toyota",
        model: "Camry",
        year: 2019,
        licenseNum: "9J1JB12",
        VIN: "1FAPP36X6RK192113",
        color: "Red",
        type: "Midsize",
        mileage: 11111,
        lastSrvc: lastService1
      });
      
      var newVehicle2 = new vehicleModel({
        customerID: 2924637168,
        make: "Honda",
        model: "HR-V",
        year: 2019,
        licenseNum: "9H1LLF7",
        VIN: "1C3CDZAG5DN749746",
        color: "Red",
        type: "Van",
        mileage: 22222,
        lastSrvc: lastService2
      });
      
      var newVehicle3 = new vehicleModel({
        customerID: 3673157365,
        make: "Acura",
        model: "TLX",
        year: 2019,
        licenseNum: "9JWJA14",
        VIN: "1N4AL3AP7FC188988",
        color: "Red",
        type: "Car",
        mileage: 33333,
        lastSrvc: lastService3
      });
      
      var newCustomer1 = new customerModel({
        customerID: 1672548348,
        firstName: "John", 
        lastName: "Connor",
        street: "111 Nonya Business",
        city: "New York",
        state: "NY",
        zip: 17315,
        email: "John@private.com",
        cell: 123164438,
        work: 647321486,
        vehicles: [
          newVehicle1,
          newVehicle2,
          newVehicle3
        ]
      });
      
      var newCustomer2 = new customerModel({
        customerID: 2924637168,
        firstName: "John", 
        lastName: "Connor",
        street: "22222 Nonya Business",
        city: "New York",
        state: "NY",
        zip: 24731,
        email: "ConnorJ15@gmail.com",
        cell: 2614147615,
        work: 2653565643,
        vehicles: [
          newVehicle1,
          newVehicle2
        ]
      });
      
      var newCustomer3 = new customerModel({
        customerID: 3673157365,
        firstName: "Jonathan", 
        lastName: "Brown",
        street: "3333333 Nonya Business",
        city: "New York",
        state: "NY",
        zip: 33333,
        email: "BrownJ4076@gmail.com",
        cell: 3948648961,
        work: 3645564434,
        vehicles: [
          newVehicle1
        ]
      });
      
      var jobs1 = new jobModel({
        repairType: "Customer Pay",
        complaint: "Complaint11",
        cause: "Cause111",
        resolution: "Resolution1111",
        cost: "111.25"
      });
      
      var jobs2 = new jobModel({
        repairType: "Warranty",
        complaint: "Complaint22",
        cause: "Cause222",
        resolution: "Resolution2222",
        cost: "222.15"
      });
      
      var jobs3 = new jobModel({
        repairType: "Internal",
        complaint: "Complaint33",
        cause: "Cause333",
        resolution: "Resolution3333",
        cost: "333.42"
      });
      
      var vehicleInspecion1 = new VehicleInspectionFormModel({
        Name: "John Connor",
        Mileage: 13715,
        Year_Make_Model: "2019 Toyota Camry",
        VIN: "1FAPP36X6RK192113",
        License: "9J1JB12",
        email: "John@private.com",
        Comments: "Oil change needed",
        Inspected_on: new Date('December 1, 1111 01:11:11')
      });
      
      var vehicleInspecion2 = new VehicleInspectionFormModel({
        Name: "John Connor",
        Mileage: 27314,
        Year_Make_Model: "2019 Honda HR-V",
        VIN: "1C3CDZAG5DN749746",
        License: "9H1LLF7",
        email: "ConnorJ15@gmail.com",
        Comments: "Broken Windshield",
        Inspected_on: new Date('December 2, 2222 02:22:22')
      });
      
      var vehicleInspecion3 = new VehicleInspectionFormModel({
        Name: "Jonathan Brown",
        Mileage: 37473,
        Year_Make_Model: "2018 Acura TLX",
        VIN: "1N4AL3AP7FC188988",
        License: "9JWJA14",
        email: "BrownJ4076@gmail.com",
        Comments: "Everything looks good.",
        Inspected_on: new Date('December 3, 3333 03:33:33')
      });
    
      var repairOrder1 = new repairOrderModel({
        repairOrderNumber: "11111",
        customerID: "1672548348",
        VIN: "1FAPP36X6RK192113",
        inspectionReport: vehicleInspecion1,
        mechanicID: "11874",
        mechanicFirstName: "Tressa",
        mechanicLastName: "Manthey",
        jobs: jobs1,
        totalCost: "111.25"
      });
      
      var repairOrder2 = new repairOrderModel({
        repairOrderNumber: "22222",
        customerID: "2924637168",
        VIN: "1C3CDZAG5DN749746",
        inspectionReport: vehicleInspecion2,
        mechanicID: "22731",
        mechanicFirstName: "Cleta",
        mechanicLastName: "Isenberg",
        jobs: jobs2,
        totalCost: "222.15"
      });
      
      var repairOrder3 = new repairOrderModel({
        repairOrderNumber: "33333",
        customerID: "3673157365",
        VIN: "1N4AL3AP7FC188988",
        inspectionReport: vehicleInspecion3,
        mechanicID: "33751",
        mechanicFirstName: "Jacques",
        mechanicLastName: "Cryer",
        jobs: jobs3,
        totalCost: "333.42"
      });
      
      // newCustomer1.save(function(error) {
      //   //res.render("searchPage");
      //   if (error) {
      //     console.error(error);
      //   }
      // });
      
      customerModel.update({customerID: 1672548348}, newCustomer1, {upsert: true}, function(err, doc) {
        if (err) console.log("Customer1 existed");
        else console.log("Customer1 added")
      });
      
      // newCustomer2.save(function(error) {
      //   //res.render("searchPage");
      //   if (error) {
      //     console.error(error);
      //   }
      // });
      
      customerModel.update({customerID: 2924637168}, newCustomer2, {upsert: true}, function(err, doc) {
        if (err) console.log("Customer2 existed");
        else console.log("Customer2 added")
      });
      
      // newCustomer3.save(function(error) {
      //   //res.render("searchPage");
      //   if (error) {
      //     console.error(error);
      //   }
      // });
      
      customerModel.update({customerID: 3673157365}, newCustomer3, {upsert: true}, function(err, doc) {
        if (err) console.log("Customer3 existed");
        else console.log("Customer3 added")
      });
      
      // newVehicle1.save(function(error) {
      //   if (error) {
      //     console.log(error);
      //   }
      // });
      
      vehicleModel.update({VIN: "1FAPP36X6RK192113"}, newVehicle1, {upsert: true}, function(err, doc) {
        if (err) console.log("Vehicle1 existed");
        else console.log("Vehicle1 added")
      });
      
      // newVehicle2.save(function(error) {
      //   if (error) {
      //     console.log(error);
      //   }
      // });
      
      vehicleModel.update({VIN: "1C3CDZAG5DN749746"}, newVehicle2, {upsert: true}, function(err, doc) {
        if (err) console.log("Vehicle2 existed");
        else console.log("Vehicle2 added")
      });
      
      // newVehicle3.save(function(error) {
      //   if (error) {
      //     console.log(error);
      //   }
      // });
      
      vehicleModel.update({VIN: "1N4AL3AP7FC188988"}, newVehicle3, {upsert: true}, function(err, doc) {
        if (err) console.log("Vehicle3 existed");
        else console.log("Vehicle3 added")
      });
      
      // lastService1.save(function(error){
      //   if (error) {
      //     console.log(error);
      //   }
      // });
      
      lastServiceModel.update({odometer: 11111}, lastService1, {upsert: true}, function(err, doc) {
        if (err) console.log("lastService1 existed");
        else console.log("lastService1 added")
      });
      
      // lastServiceModel.save(function(error){
      //   if (error) {
      //     console.log(error);
      //   }
      // });
      
      lastServiceModel.update({odometer: 22222}, lastService2, {upsert: true}, function(err, doc) {
        if (err) console.log("lastService2 existed");
        else console.log("lastService2 added")
      });
      
      // lastService3.save(function(error){
      //   if (error) {
      //     console.log(error);
      //   }
      // });
      
      vehicleModel.update({odometer: 11111}, lastService3, {upsert: true}, function(err, doc) {
        if (err) console.log("lastService3 existed");
        else console.log("lastService3 added")
      });
      
      // repairOrder1.save(function(error){
      //   if (error) {
      //     console.log(error);
      //   }
      // });
      
      repairOrderModel.update({repairOrderNumber: "11111"}, repairOrder1, {upsert: true}, function(err, doc) {
        if (err) console.log("RepairOrder1 existed");
        else console.log("RepairOrder1 added")
      });
      
      // repairOrder2.save(function(error){
      //   if (error) {
      //     console.log(error);
      //   }
      // });
      
      repairOrderModel.update({repairOrderNumber: "22222"}, repairOrder2, {upsert: true}, function(err, doc) {
        if (err) console.log("RepairOrder2 existed");
        else console.log("RepairOrder2 added")
      });
      
      // repairOrder3.save(function(error){
      //   if (error) {
      //     console.log(error);
      //   }
      // });
      
      repairOrderModel.update({repairOrderNumber: "33333"}, repairOrder3, {upsert: true}, function(err, doc) {
        if (err) console.log("RepairOrder3 existed");
        else console.log("RepairOrder3 added")
      });
      
      // vehicleInspecion1.save(function(error){
      //   if (error) {
      //     console.log(error);
      //   }
      // });
      
      VehicleInspectionFormModel.update({Mileage: 13715}, vehicleInspecion1, {upsert: true}, function(err, doc) {
        if (err) console.log("vehicleInspecion1 existed");
        else console.log("vehicleInspecion1 added")
      });
      
      // vehicleInspecion2.save(function(error){
      //   if (error) {
      //     console.log(error);
      //   }
      // });
      
      VehicleInspectionFormModel.update({Mileage: 27314}, vehicleInspecion2, {upsert: true}, function(err, doc) {
        if (err) console.log("vehicleInspecion2 existed");
        else console.log("vehicleInspecion2 added")
      });
      
      // vehicleInspecion3.save(function(error){
      //   if (error) {
      //     console.log(error);
      //   }
      // });
      
      VehicleInspectionFormModel.update({rMileage: 37473}, vehicleInspecion3, {upsert: true}, function(err, doc) {
        if (err) console.log("vehicleInspecion3 existed");
        else console.log("vehicleInspecion3 added")
      });
      
      // jobs1.save(function(error){
      //   if (error) {
      //     console.log(error);
      //   }
      // });
      
      jobModel.update({complaint: "Complaint11"}, jobs1, {upsert: true}, function(err, doc) {
        if (err) console.log("jobs1 existed");
        else console.log("jobs1 added")
      });
      
      // jobs2.save(function(error){
      //   if (error) {
      //     console.log(error);
      //   }
      // });
      
      jobModel.update({complaint: "Complaint22"}, jobs2, {upsert: true}, function(err, doc) {
        if (err) console.log("jobs2 existed");
        else console.log("jobs2 added")
      });
      
      // jobs3.save(function(error){
      //   if (error) {
      //     console.log(error);
      //   }
      // });
      
      jobModel.update({complaint: "Complaint33"}, jobs3, {upsert: true}, function(err, doc) {
        if (err) console.log("jobs3 existed");
        else console.log("jobs3 added")
      });
    }
};