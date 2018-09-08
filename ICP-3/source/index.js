angular.module('food_details', []).controller('food_details_control', function ($scope, $http) {
    $scope.getFoodDetails = function () {
        let food_name = document.getElementById("food_name").value;
        // API call to get calories and serving weight from nutrionix
        $http.get('https://api.nutritionix.com/v1_1/search/' + food_name + '?results=0:1&fields=*&appId=a3692a61' +
            '&appKey=0a4ccf5b3457817388938ef3a4ed6a34').then(function (response) {
            $scope.calories = response.data['hits'][0]['fields']['nf_calories'];
            $scope.serving_weight = response.data['hits'][0]['fields']['nf_serving_weight_grams'];
            document.getElementById('calories').innerHTML = $scope.calories;
            document.getElementById('serving_weight').innerHTML = $scope.serving_weight;
            console.log($scope.calories);
            console.log($scope.serving_weight);
        });
        // API call to play searched keyword from watson text to speech
        $scope.playProductName = function () {
            let audio = new Audio();
            audio.src = 'https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize?' +
                'username=f61d1286-72ec-4d67-a0a2-16969a62acac&password=4AmGC8jSSy5G&' +
                'text=you have searched for ' + food_name;
            audio.play();
        }
    }
});