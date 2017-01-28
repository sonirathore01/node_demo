function EmpController($http) {
    var BASE_API = 'http://127.0.0.1:8081/';
    var vm = this;
    var flag = true;
    getEmp();
    vm.Emp = {};
    vm.newEmp = {};

    function getEmp() {
        $http
            .get(BASE_API + 'get')
            .then(function (res) {
                console.log(res);
                vm.Emp = res.data;
            }, function (err) {
                console.log(err);
            })
    };

    vm.addEmp = function () {
        $http
            .post(BASE_API + "register", vm.newEmp)
            .then(function (res) {
                getEmp();
                console.log(res);
                vm.Emp.push(vm.newEmp);
                vm.newEmp = {};
            }, function (err) {
                console.log(err);
            })
    };

    vm.edit = function (j) {
        vm.newEmp = j;
    };

    vm.putEmp = function () {
        function getEmp() {
            $http
                .put(BASE_API + "update/" + vm.newEmp._id, vm.newEmp)
                .then(function (res) {
                    getEmp();
                    console.log(res);
                    vm.newEmp = {};
                }, function (err) {
                    console.log(err);
                })
        };
    }

    vm.delEmp = function (id) {
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
angular
    .module('app')
    .controller('EmpController', EmpController)