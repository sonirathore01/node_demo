/**
 * Created by lcom73 on 28/1/17.
 */
angular
    .module('app',['ngFileUpload'])
    .controller('EmpController', EmpController);

function EmpController($scope,$http,Upload) {
    var BASE_API = 'http://127.0.0.1:8081/';
    var vm = this;
    var flag = 1;
    getEmp();

    vm.Emp = {};
    vm.newEmp = {};

        $http
            .get(BASE_API + 'getstate')
            .then(function (data) {
                vm.states = data.data;
            }), (function (err) {
        });

        vm.updateCity = function (id) {
            $http
                .get(BASE_API + 'getcity/' + id)
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
            .get(BASE_API + 'get')
            .then(function (res) {
                //console.log(res);
                vm.Emp = res.data;

            }, function (err) {
                console.log(err);
            })
    }

    vm.regEmp = function () {
        if(flag == 1) {
            Upload.upload({
                url: '/register',
                method: 'POST',
                data: vm.newEmp
            }).then(function (response) {
                vm.Emp.push(vm.newEmp);
                getEmp();
                vm.newEmp = {};
            })
        }else{
            Upload.upload({
                url: '/update/ + vm.newEmp._id',
                method: 'PUT',
                data: vm.newEmp
            }).then(function (response) {
                vm.Emp.push(vm.newEmp);
                getEmp();
                vm.newEmp = {};
            })
        }
    }

    vm.edit = function (j) {
        vm.newEmp = j;
        flag = 0;
    };

    vm.delete = function (id) {
        $http
            .delete(BASE_API + "delete/" + id)
            .then(function (res) {
                getEmp();
                console.log(res);
                vm.newEmp = {};
            }, function (err) {
                console.log(err);
            })
    };
}
