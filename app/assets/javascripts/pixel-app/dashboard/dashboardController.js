angular.module('pixel-app').controller('dashboardController', ['dataservice', '$scope','Auth','$location',
	function (dataservice, $scope, Auth, $location) {

		var vm = this;
    vm.scope = $scope;
    vm.opened = vm;
    vm.campaigns = [];
    vm.newOne = "";

    this.init = function () {
      vm.newOne = "";
      if (Auth.isAuthenticated()) {
        // console.log("1");
        dataservice.getCampaigns(Auth._currentUser.id).then(function(data) {
          vm.campaigns = data;
          if (vm.campaigns.length == 0) {
            // console.log("no data");
            vm.newOne = 'Press "NEW CAMPAIGN" to start';
            return
          }
          dataservice.getTargets(vm.campaigns[0].id).then(function(data) {
            vm.campaigns[0].targets = data;
          });
        });
      }
    };

    vm.init();

    this.new = function(newValue) {
      vm.campaign = {};
      vm.type = "new";
      vm.newOne = "";
      if(vm.show) {
        vm.show = false;
      } else {
        vm.opened.show = false;
        vm.show = true;
        vm.opened = vm;
      }
    };

    this.addRecord = function(data) {
      // console.log(data);
      vm.newOne = "";
      vm.campaigns.unshift(data.campaign);
    };

    this.cancel = function () {
      vm.opened.show = false;
    };

    vm.scope.$on('deleteRecord',function(event, id){
      var obj =  vm.campaigns.filter(function(obj) {
        return obj.id == id;
      });
      var i =  vm.campaigns.indexOf(obj[0]);
      dataservice.destroyCampaign(id).then(function(id) {
        vm.campaigns.splice(i, 1);
      });
    });

    vm.logout = function () {
      vm.onLogout();
    }

    vm.change = function (tab) {
      vm.onChange({tab: tab});
    };

    vm.scope.$on("$locationChangeSuccess", function(event, next, current) {
      vm.init();
    });
  }
]);
