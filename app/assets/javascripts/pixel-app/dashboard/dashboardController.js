angular.module('pixel-app').controller('dashboardController', ['dataservice', '$scope','Auth',
	function (dataservice, $scope,Auth) {

		var vm = this;
    vm.scope = $scope;
    vm.opened = vm;

    if (Auth.isAuthenticated()) {
      dataservice.getCampaigns().then(function(data) {
        vm.campaigns = data;
        dataservice.getTargets(vm.campaigns[0].id).then(function(data) {
          vm.campaigns[0].targets = data;
        });
      });
    } 

    this.new = function(newValue) {
      vm.campaign = {};
      vm.type = "new";
      if(vm.show) {
        vm.show = false;
      } else {
        vm.opened.show = false;
        vm.show = true;
        vm.opened = vm;
      }
    };

    this.addRecord = function(data) {
      console.log(data)
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
  }
]);
