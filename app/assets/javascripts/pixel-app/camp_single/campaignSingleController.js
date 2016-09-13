angular.module('pixel-app').controller('campaignSingleController', ['dataservice', '$routeParams','$location',
	function (dataservice, $routeParams, $location) {

		var vm = this;
    vm.opened = vm;
    vm.limit = 12;
    vm.offset = 0;
    vm.isBusy = true;
    vm.isEnd = false;
    vm.q = "";

    if ($routeParams.id) {
      dataservice.getCampaign($routeParams.id).then(function(data) {
        vm.camp = data;
        dataservice.getTargets(vm.camp.id, vm.offset, vm.limit).then(function(data) {
          vm.camp.targets = data;
          vm.offset += vm.limit;
          vm.isBusy = false;
          if(data.length == 0)
            vm.isEnd = true;
        });
      });
    }
    //
    vm.edit = function(id) {
      vm.type = "edit";
      if (vm.camp.show) {
        vm.camp.show = false
      }
      else {
        vm.opened.show = false;
        vm.camp.show = true
        vm.opened = vm.camp;
      }
      vm.campaign = angular.copy(vm.camp);
      // console.log("edit " + id)
    };

    vm.editTarget = function(id) {
      vm.type = "edit";
      if (vm.t.show) {
        vm.t.show = false
      }
      else {
        vm.opened.show = false;
        vm.t.show = true
        vm.opened = vm.t;
      }
      vm.target = angular.copy(vm.t);
      // console.log("editTarget " + id)
    };

    vm.editRecord = function (id,data) {
      vm.opened.show = !vm.opened.show;
      vm.camp = data;
      // console.log("edit record " + id + " data " + data)
    };

    vm.delete = function (id) {
      // vm.scope.$emit('deleteRecord', id);
      // auth.tab('dashboard');
      // var obj =  vm.campaigns.filter(function(obj) {
      //   return obj.id == id;
      // });
      // var i =  vm.campaigns.indexOf(obj[0]);
      dataservice.destroyCampaign(vm.camp.id).then(function(id) {
        // vm.campaigns.splice(i, 1);
        // console.log($location.path('dashboard'));
        $location.path('dashboard');

      });
      // console.log("delete " + id)
    };

    vm.cancel = function () {
      vm.camp.show = false;
    	// vm.onCancel();
      // console.log("cancel")
    };

    vm.addTarget = function (newValue, camp_id) {
      newValue.campaign_id = camp_id;
      var data = {
        name: newValue.name,
        campaign_id: newValue.campaign_id
      }
      dataservice.createTarget(data).then(function(data) {
        data.target.visits = 0;
        data.target.unique = 0;
        vm.camp.targets.unshift(data.target);
      });
      vm.target.name = "";
    };

    vm.destroy = function (id) {
      var obj =  vm.camp.targets.filter(function(obj) {
        return obj.id == id;
      });
      var i =  vm.camp.targets.indexOf(obj[0]);
      //console.log(id);
      dataservice.destroyTarget(id).then(function(id) {
        vm.camp.targets.splice(i, 1);
      });

    };

    vm.search = function(q) {
      vm.offset = 0;
      vm.isBusy = true;
      vm.q = q;
      // console.log(vm.q)
      var results;
      if( vm.q == "" ) {
        vm.isEnd = false;
        results = dataservice.getTargets(vm.camp.id, vm.offset, vm.limit);
      } else {
        results = dataservice.targetsSearch(vm.camp.id, vm.q, vm.offset, vm.limit);
      }
      results.then(function(data) {
        vm.camp.targets = data;
        vm.offset += vm.limit;
        vm.isBusy = false;
        if(data.length == 0)
          vm.isEnd = true;
      });
    };

    vm.loadMore = function() {
      if (vm.isBusy || vm.isEnd) {
        return
      }
      vm.isBusy = true;
      var results;
      if( vm.q == "" ) {
        results = dataservice.getTargets(vm.camp.id, vm.offset, vm.limit);
      } else {
        results = dataservice.targetsSearch(vm.q, vm.offset, vm.limit);
      }
      results.then(function(data) {
        vm.camp.targets = vm.camp.targets.concat(data);
        vm.offset += vm.limit;
        vm.isBusy = false;
        if(data.length == 0)
          vm.isEnd = true;
      });
    };
	}
]);
