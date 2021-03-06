/**
 * Created by lcom73 on 31/1/17.
 */
angular
    .module('app')
    .controller('EmpController', EmpController);

function EmpController($http) {
    var BASE_API = 'http://127.0.0.1:8081/';
    var vm = this;
    getEmp();

    vm.Emp = {};
    vm.newEmp = {};

    vm.signupEmp = function () {
        if (vm.newEmp.password == vm.newEmp.cpassword) {
            $http
                .post(BASE_API + "signup", vm.newEmp)
                .then(function (res) {
                    console.log(res);
                    vm.Emp.push(vm.newEmp);
                    getEmp();
                    vm.newEmp = {};
                }, function (err) {
                    console.log(err);
                })
        }else{
            console.log("password must be match !!");
        }
    };

    vm.signinEmp = function () {
        $http
            .post(BASE_API + "signin", vm.newEmp)
            .then(function (res) {
                console.log(res);
            }, function (err) {
                console.log(err);
            })
    };

    function getEmp() {
        $http
            .get(BASE_API + 'get')
            .then(function (res) {
                console.log(res);
                vm.Emp = res.data;

            }, function (err) {
                console.log(err);
            })
    }

    vm.edit = function (j) {
        vm.newEmp = j;
        flag = 0;
    };

    vm.updateEmp = function () {
            $http
                .put(BASE_API + "update/" + vm.newEmp._id, vm.newEmp)
                .then(function (res) {
                    getEmp();
                    console.log(res);
                    vm.newEmp = {};
                    flag = 1;
                }, function (err) {
                    console.log(err);
                })
    }

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