// This is a JavaScript file
function test(){
  var item = sessionStorage.getItem("key");
  var obj = JSON.parse(item);
  console.log(obj.email);
  console.log(obj.password);
  //var numb = sessionStorage.getItem(['ncmb']);
  //document.getElementById("te").innerHTML=ncmb.info;
  sessionStorage.clear();
}