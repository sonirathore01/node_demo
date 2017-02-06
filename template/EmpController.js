/**
 * Created by lcom73 on 28/1/17.
 */
// Default colors
var brandPrimary = '#20a8d8';
var brandSuccess = '#4dbd74';
var brandInfo = '#63c2de';
var brandWarning = '#f8cb00';
var brandDanger = '#f86c6b';

var grayDark = '#2a2c36';
var gray = '#55595c';
var grayLight = '#818a91';
var grayLighter = '#d1d4d7';
var grayLightest = '#f8f9fa';

angular
    .module('app', ['ui.router', 'oc.lazyLoad', 'pascalprecht.translate', 'ncy-angular-breadcrumb',
        'angular-loading-bar', 'ngSanitize', 'ngAnimate' ])
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.latencyThreshold = 1;
    }])
    .run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
        $rootScope.$on('$stateChangeSuccess', function () {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });
        $rootScope.$state = $state;
        return $rootScope.$stateParams = $stateParams;
    }])
    .controller('EmpController', EmpController);
    EmpController.$inject = ['$scope', '$http'];

function EmpController($scope,$http,Upload) {
   // var BASE_API = 'http://localhost:3000/';
    var vm = this;
    var flag = 1;
    getEmp();

    vm.Emp = {};
    vm.newEmp = {};

        $http
            .get('getstate')
            .then(function (data) {
                vm.states = data.data;
            }), (function (err) {
        });

        vm.updateCity = function (id) {
            $http
                .get('getcity/' + id)
                .then(function (res) {
                    vm.cities = res.data;
                }), (function (err) {
                console.log(err);
            });
        }

    // $http
    //     .post(BASE_API + 'addcity',vm.newEmp)
    //     .then(function (data) {
    //         $scope.cities = data;
    //     }),(function (err) {
    //     console.log(err);
    // });

    // $http
    //     .post(BASE_API + 'addstate',vm.newEmp)
    //     .then(function (data) {
    //         $scope.cities = data;
    //     }),(function (err) {
    //     console.log(err);
    // });

    function getEmp() {
        $http
            .get('/get')
            .then(function (res) {
                //console.log(res);
                vm.Emp = res.data;

            }, function (err) {
                console.log(err);
            })
    }

    vm.regEmp = function () {
        Upload.upload({
            url: '/register',
            method: 'POST',
            data: vm.newEmp
        }).then(function (response) {
            vm.Emp.push(vm.newEmp);
            getEmp();
            vm.newEmp = {};
        })
    }

    vm.updateEmp = function () {
            Upload.upload({
                url: '/update/' + vm.newEmp._id,
                method: 'PUT',
                data: vm.newEmp
            }).then(function (response) {
                vm.Emp.push(vm.newEmp);
                getEmp();
                vm.newEmp = {};
            })
        }

    vm.edit = function (j) {
        vm.newEmp = j;
        flag = 0;
    };

    vm.delete = function (id) {
        $http
            .delete('delete/' + id)
            .then(function (res) {
                getEmp();
                console.log(res);
                vm.newEmp = {};
            }, function (err) {
                console.log(err);
            })
    };

    vm.editForm = function (id) {
        vm.message = "Edit Form Button Clicked";
        console.log(vm.message);
        $http
            .get('/get/' + id)
            .then(function (response) {
                vm.newEmp = response;
            }, function (err) {
                console.log(err);
            })

        var modalInstance = $modal.open({
            templateUrl: 'edit.html',
            controller: ModalInstanceCtrl,
            scope: vm,
            resolve: {
                userForm: function () {
                    return vm.userForm;
                }
            }
        });
    }

    vm.deleteForm = function (id) {
        vm.message = "Delete Form Button Clicked";
        console.log(vm.message);
        $http
            .delete('/delete/' + id)
            .then(function (response) {
                vm.newEmp = {};

            }, function (err) {
                console.log(err);
            })

        var modalInstance = $modal.open({
            templateUrl: 'delete.html',
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

        $scope.deleteProfile = function () {
            $http({
                url: '/delete/' + $scope._id,
                method: 'DELETE'
            })
            $modalInstance.dismiss();
            $scope.getEmp();
        }

        $scope.updateProfile = function () {
            Upload.upload({
                url: '/update/' + $scope._id,
                method: 'PUT',
                data: $scope.newEmp

            }).then(function (response) {

                $scope.Emp = response.data
                $modalInstance.dismiss();
                $scope.getEmp();
                $scope.newEmp = {};
            })

        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };
}
