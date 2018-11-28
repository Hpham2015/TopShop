var jobModel = require('./models/JobSchema.js');
var lastServiceModel = require('./models/LastServiceSchema.js');
var vehicleModel = require('./models/VehicleSchema.js');
var VehicleInspectionFormModel = require('./models/VehicleInspectionFormSchema.js');
var customerModel = require('./models/CustomerSchema.js');
var repairOrderModel = require('./models/RepairOrderFormSchema.js');

module.exports = {
    populate() {
      var lastService1 = new lastServiceModel({
        date: new Date('December 1, 1111 01:11:11'),
        odometer: 11111,
        dailyAverageMiles: 11111,
        monthlyAverageMiles: 11111
      });
      
      var lastService2 = new lastServiceModel({
        date: new Date('December 2, 2222 02:22:22'),
        odometer: 22222,
        dailyAverageMiles: 22222,
        monthlyAverageMiles: 22222
      });
      
      var lastService3 = new lastServiceModel({
        date: new Date('December 3, 3333 03:33:33'),
        odometer: 33333,
        dailyAverageMiles: 33333,
        monthlyAverageMiles: 33333
      });
      
      var newVehicle1 = new vehicleModel({
        customerID: 1111111111,
        make: "make11111",
        model: "model11111",
        year: 1111,
        licenseNum: "License1",
        VIN: 111,
        color: "color111",
        type: "type1111",
        mileage: 11111,
        lastSrvc: lastService1
      });
      
      var newVehicle2 = new vehicleModel({
        customerID: 2222222222,
        make: "make22222",
        model: "model22222",
        year: 2222,
        licenseNum: "License2",
        VIN: 222,
        color: "color222",
        type: "type2222",
        mileage: 22222,
        lastSrvc: lastService2
      });
      
      var newVehicle3 = new vehicleModel({
        customerID: 3333333333,
        make: "make33333",
        model: "model33333",
        year: 3333,
        licenseNum: "License3",
        VIN: 333,
        color: "color333",
        type: "type3333",
        mileage: 33333,
        lastSrvc: lastService3
      });
      
      var newCustomer1 = new customerModel({
        customerID: 1111111111,
        firstName: "John", 
        lastName: "Connor",
        street: "111 Nonya Business",
        city: "New York",
        state: "NY",
        zip: 11111,
        email: "11111@youdieded.com",
        cell: 1231111111,
        work: 1111111111,
        vehicles: [
          newVehicle1,
          newVehicle2,
          newVehicle3
        ]
      });
      
      var newCustomer2 = new customerModel({
        customerID: 2222222222,
        firstName: "John", 
        lastName: "Connor",
        street: "22222 Nonya Business",
        city: "New York",
        state: "NY",
        zip: 22222,
        email: "222222222@youdieded.com",
        cell: 2222222222,
        work: 2222222222,
        vehicles: [
          newVehicle1,
          newVehicle2
        ]
      });
      
      var newCustomer3 = new customerModel({
        customerID: 3333333333,
        firstName: "John", 
        lastName: "Conner",
        street: "3333333 Nonya Business",
        city: "New York",
        state: "NY",
        zip: 3333333,
        email: "johnwick@youdieded.com",
        cell: 3333333333,
        work: 3333333333,
        vehicles: [
          newVehicle1
        ]
      });
      
      var jobs1 = new jobModel({
        repairType: "repairType1",
        complaint: "Complaint11",
        cause: "Cause111",
        resolution: "Resolution1111",
        cost: "Cost11111"
      });
      
      var jobs2 = new jobModel({
        repairType: "repairType2",
        complaint: "Complaint22",
        cause: "Cause222",
        resolution: "Resolution2222",
        cost: "Cost22222"
      });
      
      var jobs3 = new jobModel({
        repairType: "repairType3",
        complaint: "Complaint33",
        cause: "Cause333",
        resolution: "Resolution3333",
        cost: "Cost33333"
      });
      
      var vehicleInspecion1 = new VehicleInspectionFormModel({
        Name: "Name111",
        Mileage: 111,
        Year_Make_Model: "Yearmakemodel111",
        VIN: 111,
        License: "License1",
        email: "email1",
        Comments: "1car comment",
        Inspected_on: new Date('December 1, 1111 01:11:11')
      });
      
      var vehicleInspecion2 = new VehicleInspectionFormModel({
        Name: "Name222",
        Mileage: 222,
        Year_Make_Model: "Yearmakemodel222",
        VIN: 222,
        License: "License2",
        email: "email2",
        Comments: "2car comment",
        Inspected_on: new Date('December 2, 2222 02:22:22')
      });
      
      var vehicleInspecion3 = new VehicleInspectionFormModel({
        Name: "Name333",
        Mileage: 333,
        Year_Make_Model: "Yearmakemodel333",
        VIN: 333,
        License: "License3",
        email: "email3",
        Comments: "3car comment",
        Inspected_on: new Date('December 3, 3333 03:33:33')
      });
    
      var repairOrder1 = new repairOrderModel({
        repairOrderNumber: "1",
        customerID: "1111111111",
        VIN: "111",
        inspectionReport: vehicleInspecion1,
        mechanicID: "11111",
        mechanicFirstName: "firstname111",
        mechanicLastName: "lastname111",
        jobs: jobs1,
        totalCost: "111"
      });
      
      var repairOrder2 = new repairOrderModel({
        repairOrderNumber: "2",
        customerID: "2222222222",
        VIN: "222",
        inspectionReport: vehicleInspecion2,
        mechanicID: "22222",
        mechanicFirstName: "firstname222",
        mechanicLastName: "lastname222",
        jobs: jobs2,
        totalCost: "222"
      });
      
      var repairOrder3 = new repairOrderModel({
        repairOrderNumber: "3",
        customerID: "3333333333",
        VIN: "111",
        inspectionReport: vehicleInspecion3,
        mechanicID: "33333",
        mechanicFirstName: "firstname333",
        mechanicLastName: "lastname333",
        jobs: jobs3,
        totalCost: "333"
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