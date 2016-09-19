angular.module('pixel-app').controller('campaignSingleController', ['dataservice', '$routeParams','$location','$q',
	function (dataservice, $routeParams, $location, $q) {

		var vm = this;
    vm.opened = vm;
    vm.limit = 12;
    vm.offset = 0;
    vm.isBusy = true;
    vm.isEnd = false;
    vm.q = "";
    vm.hasError = "";
    vm.a = {
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

    vm.statistic = function() {
      vm.stat.show = !vm.stat.show;
      dataservice.getStats(vm.camp.id).then(function(data) {
        vm.stat.data = data;
        for (var i = 0; i < vm.stat.data.length; i++) {
          for (var j = 0; j < vm.stat.data[i].length; j++) {
            if( j != 0 ) {
              vm.stat.data[i][j].data.push(vm.stat.data[i][j-1].data[0] - vm.stat.data[i][j].data[0]);
              if (vm.stat.data[i][j-1].data[0] == 0){
                vm.stat.data[i][j] = {};
              }
            } else {
              if (vm.stat.data[i][j].data[0] == 0){
                vm.stat.data.splice(i, 1);
                break;
              }
            }
          }
        }
        // console.log(vm.stat.data)
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
      vm.hasError = "";
      var data = {
        name: newValue.name,
        campaign_id: camp_id,
      }
      if (newValue.path) {
        data.path = newValue.path.value;
      }
      dataservice.createTarget(data).then(function(data) {
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

    vm.s = function(q) {
      vm.a.offset = 0;
      vm.a.isBusy = true;
      vm.a.q = q;
      var results;
      var deferred = $q.defer();
      dataservice.targetsSearch(vm.camp.id, vm.a.q, vm.a.offset, vm.a.limit).then(function(data) {
        vm.a.offset += vm.a.limit;
        vm.a.isBusy = false;
        if(data.length == 0)
          vm.a.isEnd = true;
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
