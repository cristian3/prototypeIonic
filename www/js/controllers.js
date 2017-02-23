angular.module('app.controllers', [])

.controller('favoritosCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('sucursalesCercanasCtrl', ['$scope', '$stateParams','$cordovaBeacon','$ionicPlatform','$rootScope','$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$cordovaBeacon,$ionicPlatform,$rootScope,$http) {
  $scope.beacons = {};
  $scope.sucursales=[];
  $scope.llamada=false;
   $ionicPlatform.ready(function() {

       $cordovaBeacon.requestWhenInUseAuthorization();

       $rootScope.$on("$cordovaBeacon:didExitRegion",function(result,pluginResult) {
           if (result) {
             console.log(pluginResult);
               $scope.llamada=true;
               //Simular cargado de nuevo
               sleep(1000);
               for(var i=0;i<$scope.sucursales.length;i++){
                 if($scope.sucursales[i].id==pluginResult.region.uuid){
                    $scope.sucursales.splice(i,1);
                    $scope.llamada=false;
                    $scope.$apply();
                 }
               }
           }
       });
       function sleep(milliseconds) {
         var start = new Date().getTime();
         for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
            break;
          }
        }
      }
       $rootScope.$on("$cordovaBeacon:didEnterRegion",function(result,pluginResult) {
           if (result) {
                $scope.llamada=true;
                for(var i=0;i<$scope.sucursales.length;i++){
                  if($scope.sucursales[i].id==pluginResult.region.uuid){
                    $scope.llamada=false;
                    break;
                  }
                }
                if($scope.llamada){
                $http.get('https://cnaviasa.mybluemix.net/sucursales/'+pluginResult.region.uuid).success(function(data){
                    $scope.sucursales.push(data);
                    $scope.llamada=false;
                });
              }
           }
       });
       $cordovaBeacon.startMonitoringForRegion($cordovaBeacon.createBeaconRegion("estimote", "e2c56db5-dffb-48d2-b060-d0f5a71096e0",0,0));

   });

}])

.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
