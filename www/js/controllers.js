angular.module('starter.controllers', ['ngCordova','ngStorage'])
.controller('AppCtrl', function($scope, $ionicModal, $timeout,$location, $cordovaGeolocation) {
  if(window.localStorage.getItem('estaIniciado')==null){
    console.log("no esta logueado");
    $location.path("/app/login");
  }
})
.controller('loginCtrl', function($scope, $http, $location,$ionicPlatform, $cordovaDevice,$localStorage){
  var device="";
  var cordova="";
  var model="";
  var platform="";
  var uuid="";
  var version="";
  $scope.mostrar="";
  $scope.response="";
  document.addEventListener("deviceready", function () {
    device = $cordovaDevice.getDevice();
    cordova = $cordovaDevice.getCordova();
    model = $cordovaDevice.getModel();
    platform = $cordovaDevice.getPlatform();
    uuid = $cordovaDevice.getUUID();
    version = $cordovaDevice.getVersion();
  }, false);
  $scope.mostrar=function(){
    $scope.idCelular="El id es: "+uuid;
  }
  $scope.doLogin = function(username, password){
    $scope.response="";
    window.localStorage.setItem('usuario',username);
    window.localStorage.setItem('uuid',uuid);
    $http.get("http://colvin.chillan.ubiobio.cl:8070/fcantill/tesisfinal/backend/web/index.php?r=api/login&usuario="+username+"&contrasena="+password+"&imei="+uuid)
    .success(function(data){
      console.log(data["respuesta"]);
      if(data["respuesta"]=="true"){
        window.localStorage.setItem('estaIniciado',"true");
        $location.path("/inicio");
      }else{
        $scope.response="usuario o contraseña incorrectos";
      }
    });
  }
})
.controller('marcajesCtrl', function($scope,$location) {
  $scope.marcajes=[];
  $scope.marcajes.push({id:"1",campus:"fdo may",hora:"09:01",dia:"07-10-2016",punto:"-12,54,12,44",estado:"atrasado", img:"fdomay.jpg"});
  $scope.marcajes.push({id:"2",campus:"fdo may",hora:"08:55",dia:"08-10-2016",punto:"-12,54,12,44",estado:"no atrasado",img:"fdomay.jpg"});
  $scope.marcajes.push({id:"3",campus:"fdo may",hora:"08:50",dia:"09-10-2016",punto:"-12,54,12,44",estado:"no atrasado",img:"fdomay.jpg"});
  $scope.marcajes.push({id:"4",campus:"fdo may",hora:"08:45",dia:"10-10-2016",punto:"-12,54,12,44",estado:"no atrasado",img:"fdomay.jpg"});
  })
.controller('inicioCtrl',function($scope, $cordovaGeolocation, $location, $localStorage, dateFilter, $http){
  console.log();
  var date = new Date();
  console.log(date);
  var usuario=localStorage.getItem("usuario");
  var uuid=localStorage.getItem("uuid");
  var dateString=dateFilter(date, 'yyyy-MM-dd');
  var hourString=dateFilter(date,'HH:mm:ss');
  console.log(dateString,hourString);
  $scope.latitud='0';
  $scope.longitud='0';
  $scope.respuesta="";
  $scope.hacerMarcaje=function(){
    if(window.localStorage.getItem('estaIniciado')==null){
      console.log("no esta logueado");
      alert("Usuario no identificado");
      $location.path("/app/login");
    }else{
      var options = {timeout: 10000, enableHighAccuracy: false};
      $cordovaGeolocation.getCurrentPosition(options).then(function(position){
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        $scope.latitud=position.coords.latitude;
        $scope.longitud=position.coords.longitude;
        $http.get("http://colvin.chillan.ubiobio.cl:8070/fcantill/tesisfinal/backend/web/index.php?r=api/marcado&imei="+uuid+"&usuario=18430720-0&fecha="+dateString+"&hora="+hourString+"&latitud="+$scope.latitud+"&longitud="+$scope.longitud).success(function(data){
          console.log(data);
          $scope.respuesta=data;
        });
        var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
          google.maps.event.addListenerOnce($scope.map, 'idle', function(){
              var marker = new google.maps.Marker({
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                position: latLng
              });
              var infoWindow = new google.maps.InfoWindow({
                content: "Aqui estoy!"
              });

              google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open($scope.map, marker);
              });
          });
      }, function(error){
        console.log("No se pudo obtener locación.");
      });
    }
  }
  $scope.consultarUbicacion=function(){
    if(window.localStorage.getItem('estaIniciado')==null){
      console.log("no esta logueado");
      alert("Usuario no identificado");
      $location.path("/app/login");
    }else{
      var options = {timeout: 10000, enableHighAccuracy: false};
      $cordovaGeolocation.getCurrentPosition(options).then(function(position){
      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      $scope.latitud=position.coords.latitude;
      $scope.longitud=position.coords.longitude;
      var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
      google.maps.event.addListenerOnce($scope.map, 'idle', function(){
          var marker = new google.maps.Marker({
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            position: latLng
          });
          var infoWindow = new google.maps.InfoWindow({
            content: "Aqui estoy!"
          });

          google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open($scope.map, marker);
          });
      });
      }, function(error){
        console.log("No se pudo obtener locación.");
      });
    }
  }
})
.controller('marcajeCtrl', function($scope,$location, $stateParams) {
});
