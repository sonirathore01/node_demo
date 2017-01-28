/**
 * Created by lcom73 on 28/1/17.
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

    vm.addEmp = function () {
        if (vm.newEmp.password == vm.newEmp.cpassword) {
            $http
                .post(BASE_API + "register", vm.newEmp)
                .then(function (res) {
                    console.log(res);
                    vm.Emp.push(vm.newEmp);
                    vm.newEmp = {};
                }, function (err) {
                    console.log(err);
                })
        }else{
            console.log("password must be match");
        }
    };

    vm.logEmp = function () {
        $http
            .post(BASE_API + "login", vm.newEmp)
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
}