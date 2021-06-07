// [NCMB] APIキー設定
var appKey    = "4bf47416a4deb54e6b0aa996ecdea60fbf1371817b99fb5234d2602b99a147c9";
var clientKey = "5b62c1ce281cf1636bc8d6569dc01b268b55128c614569551a0abdcfcc10f461";

// [NCMB] SDKの初期化
var ncmb = new NCMB(appKey, clientKey);
//sessionStorage.clear();

// ログイン中の会員
var currentLoginUser; 

//オブジェクトの初期化
var currentMonument;

//map();

function login(){
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  ncmb.User.loginWithMailAddress(email, password).then(function(user) {
    /* 処理成功 */
    console.log("【ID / PW 認証】ログインに成功しました");
    // [NCMB] ログイン中の会員情報の取得
    currentLoginUser = ncmb.User.getCurrentUser();

    // フィールドを空に
    /*
    email="";
    password="";
    */
    // 詳細ページへ移動
    //$.mobile.changePage('#DetailPage');
    //map();
    //alert(ncmb);
    var obj = { email: email, password: password};
    sessionStorage.setItem("key", JSON.stringify(obj));
    window.location.href = "map.html";
    //window.location.href = "sample.html";
    })
    .catch(function(error) {
        /* 処理失敗 */
        console.log("【ID / PW 認証】ログインに失敗しました: " + error);
        alert("【ID / PW 認証】ログインに失敗しました: " + error);
        // フィールドを空に
        email="";
        password="";
        // loading の表示終了
        //$.mobile.loading('hide');
    });
}
/*
function map(){
  
  mapboxgl.accessToken = 'pk.eyJ1Ijoic290YXJvdGFuYWthIiwiYSI6ImNrcDNubm1oZDFmbmUycGxneWQ2ZXJ6emQifQ.18VzITJnsmQFIDvnq0t3ag';
    var monument = [139.7673068, 35.6809591];
    navigator.geolocation.getCurrentPosition(function(position){ // 現在地取得
      var lng = position.coords.longitude;
      var lat = position.coords.latitude;
      mapView(lng, lat);
    });

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
                    information();
                  });
                }
              })
            .catch(function(err){
                console.log(err);
              });
    }
}
*/

/*
function information(){
  window.location.href = "information.html";
  document.getElementById("info").innerHTML = "aaa";
}
*/
