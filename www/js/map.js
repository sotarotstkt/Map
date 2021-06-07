// This is a JavaScript file

// [NCMB] APIキー設定
var appKey    = "4bf47416a4deb54e6b0aa996ecdea60fbf1371817b99fb5234d2602b99a147c9";
var clientKey = "5b62c1ce281cf1636bc8d6569dc01b268b55128c614569551a0abdcfcc10f461";

// [NCMB] SDKの初期化
var ncmb = new NCMB(appKey, clientKey);
//sessionStorage.clear();

// ログイン中の会員
var currentLoginUser; 

map();
//alert(ncmb);
function map(){
  
  var item = sessionStorage.getItem("key");
  var obj = JSON.parse(item);
  console.log(obj.email);
  console.log(obj.password);
  
  ncmb.User.loginWithMailAddress(obj.email, obj.password).then(function(user) {
    console.log("【ID / PW 認証】ログインに成功しました");
    // [NCMB] ログイン中の会員情報の取得
    currentLoginUser = ncmb.User.getCurrentUser();
    })
    .catch(function(error) {
        console.log("【ID / PW 認証】ログインに失敗しました: " + error);
        alert("【ID / PW 認証】ログインに失敗しました: " + error);
    });
  
  mapboxgl.accessToken = 'pk.eyJ1Ijoic290YXJvdGFuYWthIiwiYSI6ImNrcDNubm1oZDFmbmUycGxneWQ2ZXJ6emQifQ.18VzITJnsmQFIDvnq0t3ag';
    var monument = [139.7673068, 35.6809591];
    /*
    navigator.geolocation.getCurrentPosition(function(position){ // 現在地取得
      var lng = position.coords.longitude;
      var lat = position.coords.latitude;
      mapView(lng, lat);
    });*/
    var lng = 139.710106;
    var lat = 35.64669;
    mapView(lng, lat);
    function mapView(lng, lat) {
      
      var map = new mapboxgl.Map({
          container: document.getElementById("map"),
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [lng, lat],//monument,
          zoom: 15
          
      });
      var Shops = ncmb.DataStore("Shop");
      Shops.fetchAll()
            .then(function(results){
              //alert("ins");
                for (var i = 0; i < results.length; i++) {
                  var object = results[i];
                  //alert(object.lng + " - " + object.lat + "-" + object.get("shopname"));
                  //setMaker(object.lng,object.lat, map);
                  var monument = [object.lng, object.lat];
                  //alert(monument);
                  var popup = new mapboxgl.Popup({ offset: 25 }).setText(
                    object.shopname
                  );

                  // create DOM element for the marker
                  var el = document.createElement('div');
                  el.id = 'marker';
                  // create the marker
                  new mapboxgl.Marker(el)
                      .setLngLat(monument)
                      .setPopup(popup) // sets a popup on this marker
                      .addTo(map);
                  el.addEventListener('click', function() {
                    //window.alert(object.shopname);
                    var obj = { shopname: object.shopname, addres: object.street_addres};
                    sessionStorage.clear();
                    sessionStorage.setItem("info", JSON.stringify(obj));
                    window.location.href = "information.html";
                  });
                }
              })
            .catch(function(err){
                console.log(err);
              });
    }
}
