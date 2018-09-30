var myApp = angular.module('starter.controllers', ['ionic']);

myApp.controller('login_controller', function ($scope, $ionicPopup, $timeout) {
  $scope.loginAction = function () {
    let login_username = document.getElementById("login_username").value;
    let login_password = document.getElementById("login_password").value;
    if (login_username.toString() === "") {
      $scope.showAlert("Enter Username");
      return;
    }
    if (login_password.toString() === "") {
      $scope.showAlert("Enter Password");
    }
  };
  $scope.showAlert = function (message) {
    var alertPopup = $ionicPopup.alert({
      title: 'Warning',
      template: message
    })
  }
});
myApp.controller('register_controller', function ($scope, $ionicPopup, $timeout) {
  $scope.registerAction = function () {
    let register_username = document.getElementById("register_username").value;
    let register_first_name = document.getElementById("register_first_name").value;
    let register_last_name = document.getElementById("register_last_name").value;
    let register_password = document.getElementById("register_password").value;
    let register_confirm_password = document.getElementById("register_confirm_password").value;
    if (register_username.toString() === "") {
      $scope.showAlert("Enter Username");
      return;
    }
    if (register_password.toString() === "") {
      $scope.showAlert("Enter Password");
      return;
    }
    if (register_confirm_password.toString() === "") {
      $scope.showAlert("Enter Confirm Password");
      return;
    }
    if (register_password !== register_confirm_password) {
      $scope.showAlert("Password and Confirm Password Mismatch");
    }
  };
  $scope.showAlert = function (message) {
    var alertPopup = $ionicPopup.alert({
      title: 'Warning',
      template: message
    })
  };
});

