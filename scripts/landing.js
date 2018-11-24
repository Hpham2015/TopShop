window.setTimeout(function() {
  // your code here
var NewCustomerButton = document.getElementById("NC");

var DashBoardButton = document.getElementById("VI");
var logoHome = document.getElementById("logo");
var ad1 = document.getElementById("firstAd");
var ad2 = document.getElementById("secondAd");
var ad3 = document.getElementById("thirdAd");
var ad4 = document.getElementById("forthAd");
var overlay=document.getElementsByClassName("overlay");


NewCustomerButton.addEventListener("click",newCustomer);

DashBoardButton.addEventListener("click",DashBoard);
var i=0;
setInterval(function(){
     adChange(i);
     i++;
     if(i==4)
     {
         i=0;
     }
     
     console.log("got loop every three secondss");
},10000);       


function newCustomer(){location.href = "/customerInputForm";}
   
function DashBoard(){location.href = "/dashboard";}   

 
function adChange(element)
{
    
var headerElements=document.getElementsByTagName("h1");
var pElement = headerElements[element];
     console.log(pElement);
     //overlay.style.right=Math.floor(Math.random() * 101) + 50;
     pElement.setAttribute("class", "fadeIn");
    
     setTimeout(function() {
            
         pElement.setAttribute("class","fadeOut");
      
     }, 5000);
            
           
      
    
    
}



    
}, 650);


