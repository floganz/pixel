angular.module('pixel-app').controller('campaignSingleController', ['dataService', '$stateParams','$location','$q',
	function (dataService, $stateParams, $location, $q) {

		var vm = this;
    vm.opened = vm;
    vm.limit = 12;
    vm.offset = 0;
    vm.isBusy = true;
    vm.isEnd = false;
    vm.q = "";
    vm.hasError = "";
    vm.autoComplite = {
      limit: 12,
      offset: 0,
      isBusy: true,
      isEnd: false
    }
    vm.stat = {
      show: false,
      labels: ["visits", "lost"],
      options: { responsive: true },
      data: []
    }

    if ($stateParams.id) {
      dataService.getCampaign($stateParams.id).then(function(data) {
        vm.camp = data;
        dataService.getTargets(vm.camp.id, vm.offset, vm.limit).then(function(data) {
          vm.camp.targets = data;
          vm.offset += vm.limit;
          vm.isBusy = false;
          if(data.length == 0)
            vm.isEnd = true;
        });
      });
    }

    vm.statistic = function() {
      vm.stat.show = !vm.stat.show;
      dataService.getStats(vm.camp.id).then(function(data) {
        vm.stat.data = data;
      });
    };

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
      dataService.destroyCampaign(vm.camp.id).then(function(id) {
        // console.log($location.path('dashboard'));
        $location.path('dashboard');
      });
    };

    vm.cancel = function () {
      vm.camp.show = false;
    	// vm.onCancel();
      // console.log("cancel")
    };

    vm.addTarget = function (newValue, camp_id) {
      vm.hasError = "";
      var data = {
        name: newValue.name,
        campaign_id: camp_id,
      }
      if (newValue.path) {
        data.path = newValue.path.value;
      }
      dataService.createTarget(data).then(function(data) {
        if(!data.success) {
          vm.hasError = "Name is taken or parent already have children";
          return;
        }
        data.target.visits = 0;
        data.target.unique = 0;
        vm.camp.targets.unshift(data.target);
      });
      vm.target.name = "";
    };

    vm.destroy = function (id) {
      var i = _.findKey(vm.camp.targets,{ 'id': id });
      dataService.destroyTarget(id).then(function(id) {
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
        results = dataService.getTargets(vm.camp.id, vm.offset, vm.limit);
      } else {
        results = dataService.targetsSearch(vm.camp.id, vm.q, vm.offset, vm.limit);
      }
      results.then(function(data) {
        vm.camp.targets = data;
        vm.offset += vm.limit;
        vm.isBusy = false;
        if(data.length == 0)
          vm.isEnd = true;
      });
    };

    vm.autoComplite = function(q) {
      vm.autoComplite.offset = 0;
      vm.autoComplite.isBusy = true;
      vm.autoComplite.q = q;
      var results;
      var deferred = $q.defer();
      dataService.targetsSearch(vm.camp.id, vm.autoComplite.q, vm.autoComplite.offset, vm.autoComplite.limit).then(function(data) {
        vm.autoComplite.offset += vm.autoComplite.limit;
        vm.autoComplite.isBusy = false;
        if(data.length == 0)
          vm.autoComplite.isEnd = true;
        deferred.resolve( data.map(function(target) {
            return {
              value: target.id,
              display: target.name
            };
          })
        );
      });
      return deferred.promise;
    };

    vm.loadMore = function() {
      if (vm.isBusy || vm.isEnd) {
        return
      }
      vm.isBusy = true;
      var results;
      if( vm.q == "" ) {
        results = dataService.getTargets(vm.camp.id, vm.offset, vm.limit);
      } else {
        results = dataService.targetsSearch(vm.q, vm.offset, vm.limit);
      }
      results.then(function(data) {
        vm.camp.targets = vm.camp.targets.concat(data);
        vm.offset += vm.limit;
        vm.isBusy = false;
        if(data.length == 0)
          vm.isEnd = true;
      });
    };
    
    vm.showAdvanced = function(ev, record, del) {
      $mdDialog.show({
        controller: 'modalController as $ctrl',
        templateUrl: 'pixel-app/components/modal/modal.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        locals: {
          camp: record,
          del: del
        },
        clickOutsideToClose:true
      })
      .then(function(answer) {
        // console.log(answer);
      }, function() {
        // console.log("cancel");
      });
    };
	}
]);
