var express = require("express");
var app = express();


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