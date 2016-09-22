angular.module('pixel-app').controller('myDashboardController', ['dataService', '$scope',
	function (dataService, $scope) {

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
    vm.noResults ="";

    vm.search = function (q) {
      vm.q = q;
      vm.noResults = "";
      vm.offset = 0;
      var results;
      if(vm.q == "") {
        vm.isEnd = false;
        results = dataService.getCampaigns(vm.offset, vm.limit);
      } else {
        results = dataService.campaignsSearch(vm.q, vm.offset, vm.limit);
      }
      results.then(function(data) {
      vm.campaigns = data;
      vm.offset += vm.limit;
      if (vm.campaigns.length == 0) {
        vm.isEnd = true;
        vm.noResults = "Nothing found";
        return
      }
      vm.isBusy = false;
      });
    };

    vm.init = function () {
      vm.newOne = "";
      vm.q = "";
      dataService.getCampaigns(vm.offset, vm.limit).then(function(data) {
        vm.campaigns = data;
        vm.offset += vm.limit;
        if (vm.campaigns.length == 0) {
          vm.isEnd = true;
          vm.newOne = 'Press "NEW CAMPAIGN" to start';
          return
        }
        vm.isBusy = false;
      });
    };

    vm.init();

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

    vm.delete = function(id) {
      var i = _.findKey(vm.campaigns,{ 'id': id });
      dataService.destroyCampaign(id).then(function(id) {
        vm.campaigns.splice(i, 1);
        if( vm.campaigns.length == 0) {
          vm.newOne = 'Press "NEW CAMPAIGN" to start';
        }
      });
    };

    vm.logout = function () {
      vm.onLogout();
    }

    vm.change = function (tab) {
      vm.onChange({tab: tab});
    };

    vm.loadMore = function() {
      if (vm.isBusy || vm.isEnd) {
        return
      }
      vm.isBusy = true;
      var results;
      if(vm.q == "") {
        results = dataService.getCampaigns(vm.offset, vm.limit);
      } else {
        results = dataService.campaignsSearch(vm.q, vm.offset, vm.limit);
      }
      results.then(function(data) {
      vm.campaigns = vm.campaigns.concat(data);
      vm.offset += vm.limit;
      if (data.length == 0) {
        vm.isEnd = true;
      }
      vm.isBusy = false;
      });
    };
  }
]);
