window.setTimeout(function() {
  // your code here
var NewCustomerButton = document.getElementById("NC");
var RepairOrderButton = document.getElementById("RO");
var NewVehicleButton = document.getElementById("NV");
var VehicleInspectionButton = document.getElementById("VI");
var logoHome = document.getElementById("logo");

NewCustomerButton.addEventListener("click",newCustomer);
RepairOrderButton.addEventListener("click",repairOrder);
NewVehicleButton.addEventListener("click",newVehicle);
VehicleInspectionButton.addEventListener("click",vehicleInspection);








function newCustomer(){location.href = "/customerInputForm";}
function repairOrder(){location.href = "/repairOrderForm";}    
function newVehicle(){location.href = "/vehicleInputForm";}    
function vehicleInspection(){location.href = "/vehicleInspectionForm";}   



/*function newCustomerHighLight(){location.href = "/customerInputForm";}
function repairOrderHighLight(){location.href = "/repairOrderForm";}    
function newVehicleHighLight(){location.href = "/vehicleInputForm";}    
function vehicleInspectionHighLight(){location.href = "/vehicleInspectionForm";} */  





    
}, 650);


