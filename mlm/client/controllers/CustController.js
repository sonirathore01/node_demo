/**
 * Created by lcom73 on 31/1/17.
 */
angular
    .module('app')
    .controller('CustController', CustController);

function CustController($http,$window,Upload) {
    var BASE_API = 'http://localhost:8081/';
    var vm = this;
    getCust();

    vm.Cust = {};
    vm.newCust = {};

    $http
        .get(BASE_API + 'getparent')
        .then(function (data) {
            console.log("p:",data);
            vm.parents = data.data;
        }), (function (err) {
    });

    vm.signinCust = function () {
        $window.location.href = '/home.html';
        console.log("hello");
    };

    vm.custEntry = function () {
        Upload.upload({
            url: '/custentry',
            method: 'POST',
            data: vm.newCust
        }).then(function (response) {
            vm.Cust.push(vm.newCust);
            getCust();
            vm.newCust = {};
        })
    };

    function getCust() {
        $http
            .get(BASE_API + 'get')
            .then(function (res) {
                console.log(res);
                vm.Cust = res.data;

            }, function (err) {
                console.log(err);
            })
    }

    vm.sort = function(keyname){
        vm.sortKey = keyname;   //set the sortKey to the param passed
        vm.reverse = !$scope.reverse; //if true make it false and vice versa
    }

}