function EmpController($http) {
    var BASE_API = 'http://127.0.0.1:8081/';
    var vm = this;
    getEmp();
    vm.Emp = {};
    vm.newEmp = {};
    vm.addEmp = function () {
        $http
            .post(BASE_API + "register", vm.newEmp)
            .then(function (res) {
                console.log(res);
                vm.Emp.push(vm.newEmp);
                vm.newEmp = {};
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
    };
}
angular
    .module('app')
    .controller('EmpController', EmpController)
