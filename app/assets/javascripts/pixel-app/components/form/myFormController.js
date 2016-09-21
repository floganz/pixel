angular.module('pixel-app').controller('myFormController', ['dataservice',
	function (dataservice) {

    var vm = this;
    vm.hasError = "";
    
    vm.onSubmit = function (newValue) {
      // console.log(newValue);
      // console.log(vm.type);
      vm.hasError = "";
      if (vm.type == "new") {
        dataservice.createCampaign(newValue).then(function(data) {
          //vm.onUpdate({data: data});
          if(!data.success) {
            vm.hasError = "Name is taken";
            return;
          }
          vm.onUpdate({tab: "campaign/" + data.campaign.id});
          vm.onCancel();
        });
      } else {
        dataservice.editCampaign(newValue.id,newValue).then(function(data) {
          vm.onUpdate({id: newValue.id, data: newValue});
          vm.onCancel();
        });
      }
    }

    vm.cancel = function () {
      vm.onCancel();
    };

    vm.logout = function () {
      vm.onLogout();
    }

    vm.change = function (tab) {
      vm.onChange({tab: tab});
    };
  }
]);
