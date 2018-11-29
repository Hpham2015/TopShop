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
        cost: "$111.25"
      });
      
      var jobs2 = new jobModel({
        repairType: "Warranty",
        complaint: "Complaint22",
        cause: "Cause222",
        resolution: "Resolution2222",
        cost: "$222.15"
      });
      
      var jobs3 = new jobModel({
        repairType: "Internal",
        complaint: "Complaint33",
        cause: "Cause333",
        resolution: "Resolution3333",
        cost: "$333.42"
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
        totalCost: "$111.25"
      });
      
      var repairOrder2 = new repairOrderModel({
        repairOrderNumber: "2",
        customerID: "2924637168",
        VIN: "1C3CDZAG5DN749746",
        inspectionReport: vehicleInspecion2,
        mechanicID: "22731",
        mechanicFirstName: "Cleta",
        mechanicLastName: "Isenberg",
        jobs: jobs2,
        totalCost: "$222.15"
      });
      
      var repairOrder3 = new repairOrderModel({
        repairOrderNumber: "3",
        customerID: "3673157365",
        VIN: "1N4AL3AP7FC188988",
        inspectionReport: vehicleInspecion3,
        mechanicID: "33751",
        mechanicFirstName: "Jacques",
        mechanicLastName: "Cryer",
        jobs: jobs3,
        totalCost: "$333.42"
      });
      
      newCustomer1.save(function(error) {
        //res.render("searchPage");
        if (error) {
          console.error(error);
        }
      });
      
      newCustomer2.save(function(error) {
        //res.render("searchPage");
        if (error) {
          console.error(error);
        }
      });
      
      newCustomer3.save(function(error) {
        //res.render("searchPage");
        if (error) {
          console.error(error);
        }
      });
      
      newVehicle1.save(function(error) {
        if (error) {
          console.log(error);
        }
      });
      
      newVehicle2.save(function(error) {
        if (error) {
          console.log(error);
        }
      });
      
      newVehicle3.save(function(error) {
        if (error) {
          console.log(error);
        }
      });
      
      lastService1.save(function(error){
        if (error) {
          console.log(error);
        }
      });
      
      lastService2.save(function(error){
        if (error) {
          console.log(error);
        }
      });
      
      lastService3.save(function(error){
        if (error) {
          console.log(error);
        }
      });
      
      repairOrder1.save(function(error){
        if (error) {
          console.log(error);
        }
      });
      
      repairOrder2.save(function(error){
        if (error) {
          console.log(error);
        }
      });
      
      repairOrder3.save(function(error){
        if (error) {
          console.log(error);
        }
      });
      
      vehicleInspecion1.save(function(error){
        if (error) {
          console.log(error);
        }
      });
      
      vehicleInspecion2.save(function(error){
        if (error) {
          console.log(error);
        }
      });
      
      vehicleInspecion3.save(function(error){
        if (error) {
          console.log(error);
        }
      });
      
      jobs1.save(function(error){
        if (error) {
          console.log(error);
        }
      });
      
      jobs2.save(function(error){
        if (error) {
          console.log(error);
        }
      });
      
      jobs3.save(function(error){
        if (error) {
          console.log(error);
        }
      });
    }
};