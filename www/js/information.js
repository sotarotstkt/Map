// This is a JavaScript file
var item = sessionStorage.getItem("info");
var obj = JSON.parse(item);
//document.getElementById("info").innerHTML=obj.shopname;
console.log(obj.shopname);
