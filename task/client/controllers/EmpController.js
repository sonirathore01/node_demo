/**
 * Created by lcom73 on 28/1/17.
 */
angular
    .module('app',['ngFileUpload','angularUtils.directives.dirPagination'])
    .controller('EmpController', EmpController);

function EmpController($scope,$http,Upload) {
    var BASE_API = 'http://127.0.0.1:8089/';
    var vm = this;
    var flag = 1;
    vm.pageno = 1; // initialize page no to 1
    vm.total_count = 0;
    vm.itemsPerPage = 2; //this could be a dynamic value from a drop down
    vm.Emp = {};
    vm.newEmp = {};


    getEmp(); // Call the function to fetch initial data on page load.

    function getEmp() {
        vm.Emp = [];
        $http
            .get(BASE_API + 'get')
            .then(function (res) {
                //console.log(res);
                vm.Emp = res.data;
                // vm.total_count = res.total_count; // total data count.
            }, function (err) {
                console.log(err);
            })
    }

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
            .delete(BASE_API + "delete.html/" + id)
            .then(function (res) {
                getEmp();
                console.log(res);
                vm.newEmp = {};
            }, function (err) {
                console.log(err);
            })
    };
}
