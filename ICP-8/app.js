'use strict';

angular.module("search-engine", []).controller("search-engine-ctrl", function ($scope, $http) {
    $scope.init = function(){
        $scope.username = localStorage.getItem("logged_user");
    };

    $scope.init();
    $scope.getResult = function () {
        let search_word = document.getElementById("search-word").value;
        let url_part_1 = "https://kgsearch.googleapis.com/v1/entities:search?query=";
        let url_part_2 = "&key=AIzaSyDF_fECqSQmSoROurh_GyBTr-CvHN9O7VI&limit=1&indent=True";
        $http.get(url_part_1 + search_word + url_part_2).then(function (response) {

            let information_table = document.getElementById("information-table");
            let image_table = document.getElementById("image");

            for (var information_table_iter = information_table.rows.length - 1; information_table_iter > -1; information_table_iter--) {
                information_table.deleteRow(information_table_iter);
            }

            for (var image_iter = image_table.rows.length - 1; image_iter > -1; image_iter--) {
                image_table.deleteRow(image_iter);
            }

            let first_row = information_table.insertRow(0);
            let second_row = information_table.insertRow(1);
            let third_row = information_table.insertRow(2);
            let fourth_row = information_table.insertRow(3);
            let fifth_row = information_table.insertRow(4);
            let sixth_row = information_table.insertRow(5);
            let seventh_row = information_table.insertRow(6);
            let image_row = image.insertRow(0);

            let name, type, description, article, wiki_link, site, license, icon_url;

            try {
                name = response.data["itemListElement"][0]["result"]["name"];
            } catch (e) {
                name = "NOT AVAILABLE";
            }
            first_row.insertCell(0).innerHTML = "Name";
            first_row.insertCell(1).innerHTML = name;

            try {
                type = response.data["itemListElement"][0]["result"]["@type"];
            } catch(e) {
                type = "NOT AVAILABLE";
            }
            second_row.insertCell(0).innerHTML = "Type";
            second_row.insertCell(1).innerHTML = type;

            try {
                description = response.data["itemListElement"][0]["result"]["description"];
            } catch (e) {
                description = "NOT AVAILABLE";
            }
            third_row.insertCell(0).innerHTML = "Description";
            third_row.insertCell(1).innerHTML = description;

            try {
                article = response.data["itemListElement"][0]["result"]["detailedDescription"]["articleBody"];
            } catch (e) {
                article = "NOT AVAILABLE";
            }
            fourth_row.insertCell(0).innerHTML = "Article";
            fourth_row.insertCell(1).innerHTML = article;

            try {
                wiki_link = "<a href=\"" + response.data["itemListElement"][0]["result"]["detailedDescription"]["url"] + "\">" + response.data["itemListElement"][0]["result"]["detailedDescription"]["url"] + "</a>";
            } catch (e) {
                wiki_link = "NOT AVAILABLE";
            }
            fifth_row.insertCell(0).innerHTML = "Wiki Page";
            fifth_row.insertCell(1).innerHTML = wiki_link;

            try {
                site = "<a href=\"" + response.data["itemListElement"][0]["result"]["url"] + "\">" + response.data["itemListElement"][0]["result"]["url"] + "</a>";
            } catch (e) {
                site = "NOT AVAILABLE";
            }
            sixth_row.insertCell(0).innerHTML = "Website";
            sixth_row.insertCell(1).innerHTML = site;

            try {
                license = "<a href=\"" + response.data["itemListElement"][0]["result"]["detailedDescription"]["license"] + "\">" + response.data["itemListElement"][0]["result"]["detailedDescription"]["license"] + "</a>";
            } catch (e) {
                license = "NOT AVAILABLE";
            }
            seventh_row.insertCell(0).innerHTML = "License";
            seventh_row.insertCell(1).innerHTML = license;

            try {
                icon_url = "<p align=\"center\"><img src=" + response.data["itemListElement"][0]["result"]["image"]["contentUrl"] + "></p>";
            } catch (e) {
                icon_url = "NOT AVAILABLE";
            }
            image_row.insertCell(0).innerHTML = icon_url;
        });
    }

});