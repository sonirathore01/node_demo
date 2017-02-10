angular
    .module('app')
    .controller('CustController', CustController);

CustController.$inject = ['$scope', '$http', 'Upload'];

function CustController($scope,$http,$window,Upload,$modal) {
    var BASE_API = 'http://localhost:8081/';
    var vm = this;
    getCust();

    vm.Cust = {};
    vm.newCust = {};

    $http
        .get(BASE_API + 'getparent')
        .then(function (data) {
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

    vm.delete = function (id) {
        console.log(id);
        $http
            .delete(BASE_API + 'delete.html/' + id)
            .then(function (res) {
                // getCust();
                // console.log(res);
                vm.newCust = {};
            }, function (err) {
                console.log(err);
            })
    };

    vm.sort = function(keyname){
        vm.sortKey = keyname;   //set the sortKey to the param passed
        vm.reverse = !vm.reverse; //if true make it false and vice versa
    }

    vm.editForm = function (id) {
        vm.message = "Edit Form Button Clicked";
        console.log(vm.message);

        var modalInstance = $modal.open({
            templateUrl: 'edit.html',
            controller: ModalInstanceCtrl,
            scope: $scope,
            resolve: {
                userForm: function () {
                    return $scope.userForm;
                }
            }
        });
    }

    vm.deleteForm = function (id) {
        vm.message = "Delete Form Button Clicked";
        console.log(vm.message);

        var modalInstance = $modal.open({
            templateUrl: 'delete.html.html',
            controller: ModalInstanceCtrl,
            scope: $scope,
            resolve: {
                userForm: function () {
                    return $scope.userForm;
                }
            }
        });
    }

    var ModalInstanceCtrl = function ($scope, $http, $modalInstance, userForm, Upload) {

        ModalInstanceCtrl.$inject = ['Upload', '$http']

        $scope.delete = function () {
            $http({
                url: '/delete.html/' + $scope._id,
                method: 'DELETE'
            })
            $modalInstance.dismiss();
            $scope.getCust();
        }

        $scope.update = function () {
            Upload.upload({
                url: '/update/' + $scope._id,
                method: 'PUT',
                data: $scope.newCust

            }).then(function (response) {

                $scope.Cust = response.data
                $modalInstance.dismiss();
                $scope.getCust();
                $scope.newCust = {};
            })

        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };

}