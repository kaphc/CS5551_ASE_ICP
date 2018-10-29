var app = angular.module('students', []);

app.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});

app.controller('students_control', function ($scope, $http) {

    var init = function () {
        var req = $http.get('icp_9/students').then(function (response) {
            console.log(response.data);
            students_table = document.getElementById('student_table');
            while (students_table.hasChildNodes()) {
                students_table.removeChild(students_table.lastChild);
            }
            for (result = 0; result < response.data.length; result++) {
                let allStudents = [];
                allStudents.push(result + 1, response.data[result].class_id, response.data[result].student_name,
                    response.data[result].course_of_study, response.data[result].major, response.data[result].minor);
                let row = students_table.insertRow(result);
                for (let col = 0; col < allStudents.length; col++) {
                    row.insertCell(col).innerHTML = allStudents[col];
                }
            }
        })
    };

    init();

    $scope.addAStudent = function () {
        console.log($scope.formData.class_id);
        console.log($scope.formData.student_name);
        console.log($scope.formData.course_of_study);
        console.log($scope.formData.major);
        console.log($scope.formData.minor);
        var req = $http.post('icp_9/student?' +
            'class_id=' + class_id + '&' +
            'student_name=' + student_name + '&' +
            'course_of_study=' + course_of_study + '&' +
            'major=' + major + '&' +
            'minor=' + minor + '&'
            , $scope.formData);
        init();
    };

    $scope.searchAStudent = function () {
        let search = document.getElementById('search').value;
        if(search === null || search === ""){
            init();
        }
        var req = $http.get('icp_9/student_by_major/' + search).then(function (response) {
            console.log(response.data);
            students_table = document.getElementById('student_table');
            console.log(students_table.rows.length);
            while (students_table.hasChildNodes()) {
                students_table.removeChild(students_table.lastChild);
            }
            for (result = 0; result < response.data.length; result++) {
                let allStudents = [];
                allStudents.push(result + 1, response.data[result].class_id, response.data[result].student_name,
                    response.data[result].course_of_study, response.data[result].major, response.data[result].minor);

                let row = students_table.insertRow(result);
                for (let col = 0; col < allStudents.length; col++) {
                    row.insertCell(col).innerHTML = allStudents[col];
                }
            }
        })
    }
});
