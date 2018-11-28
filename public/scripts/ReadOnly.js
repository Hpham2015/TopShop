var requiresImmidate=document.querySelectorAll('[value="require immediate"]');
var mayRquire=document.querySelectorAll('[value="may require"]');
var checkedOk=document.querySelectorAll('[value="checked and ok"]');
var pdf = document.getElementById("pdfDownload");
console.log(requiresImmidate);

for(var i=0; i<requiresImmidate.length; i++)
{
    requiresImmidate[i].style.borderColor = "red";
    requiresImmidate[i].style.color="red";
}
for(var i=0; i<mayRquire.length; i++)
{
    mayRquire[i].style.borderColor = "yellow";
    mayRquire[i].style.color="gold";
}
for(var i=0; i<checkedOk.length; i++)
{
    checkedOk[i].style.borderColor = "green";
    checkedOk[i].style.color="green";
}

pdf.addEventListener("click",function(){
    console.log("clikced")
});