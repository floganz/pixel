angular.module('pixel-app').controller('dashboardController', ['dataservice', '$scope','Auth','$location','$cookies',
	function (dataservice, $scope, Auth, $location, $cookies) {

		var vm = this;
    vm.scope = $scope;
    vm.opened = vm;
    vm.campaigns = [];
    vm.newOne = "";
    vm.limit = 12;
    vm.offset = 0;
    vm.isBusy = true;
    vm.isEnd = false;
    vm.q = "";

    vm.search = function (q) {
      vm.q = q;
      vm.offset = 0;
      var results;
      var user_id;
      if(vm.q == "") {
        vm.isEnd = false;
        results = dataservice.getCampaigns(Auth._currentUser.id, vm.offset, vm.limit)
      } else {
        results = dataservice.campaignsSearch(Auth._currentUser.id, vm.q, vm.offset, vm.limit)
      }
      results.then(function(data) {
        vm.campaigns = data;
        vm.offset += vm.limit;
        if (vm.campaigns.length == 0) {
          vm.isEnd = true;
          return
        }
        dataservice.getTargets(vm.campaigns[0].id, 0, 12).then(function(data) {
          vm.campaigns[0].targets = data;
          vm.isBusy = false;
        });
      });
    };

    vm.init = function () {
      vm.newOne = "";
      vm.q = "";
      if (Auth._currentUser) {
        // console.log("_1")
        user_id = Auth._currentUser.id;
      } else {
        // console.log("_2")
        user_id = $cookies.get('_pixel-app-session');
      }
      // console.log("2")
      // if (Auth.isAuthenticated()) {
        // console.log("3")
        dataservice.getCampaigns_tmp(user_id, vm.offset, vm.limit).then(function(data) {
          vm.campaigns = data;
          vm.offset += vm.limit;
          if (vm.campaigns.length == 0) {
            vm.isEnd = true;
            vm.newOne = 'Press "NEW CAMPAIGN" to start';
            return
          }
          // dataservice.getTargets(vm.campaigns[0].id, 0, 12).then(function(data) {
          //   vm.campaigns[0].targets = data;
            vm.isBusy = false;
          // });
        });
      // }
    };

    vm.init();
    // vm.search();

    vm.new = function(newValue) {
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

    vm.addRecord = function(data) {
      // console.log(data);
      vm.newOne = "";
      vm.campaigns.unshift(data.campaign);
    };

    vm.cancel = function () {
      vm.opened.show = false;
    };

    vm.scope.$on('deleteRecord',function(event, id){
      var obj =  vm.campaigns.filter(function(obj) {
        return obj.id == id;
      });
      var i =  vm.campaigns.indexOf(obj[0]);
      dataservice.destroyCampaign(id).then(function(id) {
        vm.campaigns.splice(i, 1);
        if( vm.campaigns.length == 0) {
          vm.newOne = 'Press "NEW CAMPAIGN" to start';
        }
      });
    });

    vm.logout = function () {
      vm.onLogout();
    }

    vm.change = function (tab) {
      vm.onChange({tab: tab});
    };

    // $rootScope.$on("$locationChangeSuccess", function(event, next, current) {
    //   console.log("1")
    //   vm.init();
    // });

    vm.loadMore = function() {
      if (vm.isBusy || vm.isEnd) {
        return
      }
      vm.isBusy = true;
      var results;
      if(vm.q == "") {
        results = dataservice.getCampaigns_tmp(Auth._currentUser.id, vm.offset, vm.limit)
      } else {
        results = dataservice.campaignsSearch_tmp(Auth._currentUser.id, vm.q, vm.offset, vm.limit)
      }
      results.then(function(data) {
        vm.campaigns = vm.campaigns.concat(data);
        vm.offset += vm.limit;
        if (data.length == 0) {
          vm.isEnd = true;
        }
        dataservice.getTargets(vm.campaigns[0].id, 0, 12).then(function(data) {
          vm.campaigns[0].targets = data;
          vm.isBusy = false;
        });
      });
    };
  }
]);
