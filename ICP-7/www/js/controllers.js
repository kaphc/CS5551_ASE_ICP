angular.module('starter.controllers', ["ionic", "ngCordova", "firebase"])

  .controller('login_controller', function ($scope, $ionicPopup, $state, $firebaseAuth) {

    var fbAuth = $firebaseAuth();

    $scope.email_login = function (username, password) {
      if (username === undefined) {
        $scope.showAlert("Please enter your username");
        return;
      }
      if (password === undefined) {
        $scope.showAlert("Please enter your password");
        return;
      }
      fbAuth.$signInWithEmailAndPassword(username, password).then(function (authData) {
        $state.go("home");
      }).catch(function (error) {
        $scope.showAlert(error);
        console.error("ERROR: " + error);
      });
    };
    var provider = new firebase.auth.GoogleAuthProvider();
    $scope.google_login = function () {
      firebase.auth().signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        $state.go("home");
      }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
    };
    $scope.showAlert = function (message) {
      var alertPopup = $ionicPopup.alert({
        title: 'Warning',
        template: "<p style='text-align: center'>" + message + "</p>",
        buttons: [
          {
            text: '<b>OK</b>',
            type: 'button-dark',
          }
        ]
      })
    }
  })

  .controller('register_controller', function ($scope, $state, $firebaseAuth, $ionicPopup) {

    var fbAuth = $firebaseAuth();

    $scope.register = function (username, password) {
      if (username === undefined) {
        $scope.showAlert("Please enter username");
        return;
      }
      if (password === undefined) {
        $scope.showAlert("Please enter password");
        return;
      }
      fbAuth.$createUserWithEmailAndPassword(username, password).then(function (userData) {
        return fbAuth.$signInWithEmailAndPassword(username,
          password);
      }).then(function (authData) {
        $scope.showAlert_success("Registered Sucessfuly !!!!!");
        $state.go("tab.login");
      }).catch(function (error) {
        $scope.showAlert(error);
        console.error("ERROR: " + error);
      });
    };

    $scope.showAlert = function (message) {
      var alertPopup = $ionicPopup.alert({
        title: 'Warning',
        template: "<p style='text-align: center'>" + message + "</p>",
        buttons: [
          {
            text: '<b>OK</b>',
            type: 'button-dark',
          }
        ]
      })
    }

    $scope.showAlert_success = function (message) {
      var alertPopup = $ionicPopup.alert({
        title: 'Success',
        template: "<p style='text-align: center'>" + message + "</p>",
        buttons: [
          {
            text: '<b>OK</b>',
            type: 'button-dark',
          }
        ]
      })
    }
  })

  .controller('home_controller', function ($scope, $ionicHistory, $firebaseObject, $firebaseArray, $firebaseAuth, $cordovaCamera, $state) {
      $ionicHistory.clearHistory();  //for clearing user login history

      $scope.images = [];
      $scope.fb = $firebaseAuth();
      var fbAuth = $scope.fb.$getAuth();
      var ref = firebase.database().ref();
      var obj = $firebaseObject(ref);
      if (fbAuth) {
        var userReference = ref.child("users/" + fbAuth.uid);   //capture the user reference in data structure ,it navigates to specific user page in freebase
        var syncArray = $firebaseArray(userReference.child("images"));  //binding specific node in firebase to an array object in angularjs
        $scope.images = syncArray;
      } else {
        $state.go("tab.login");  //directs to firebase page
      }

      $scope.upload = function () {
        var options = {
          quality: 75,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          popoverOptions: CameraPopoverOptions,
          targetWidth: 500,
          targetHeight: 500,
          saveToPhotoAlbum: false
        };
        $cordovaCamera.getPicture(options).then(function (imageData) {
          syncArray.$add({image: imageData}).then(function () {
            alert("Image has been uploaded");
          });
        }, function (error) {
          console.error(error);
        });
      };

      $scope.go_to_home = function () {
        firebase.auth().signOut().then(function () {
          $state.go("tab.login");  //directs to firebase page
        }, function (error) {
          $scope.showAlert(error);
          console.error('Sign Out Error', error);
        });
      }
    }
  );
