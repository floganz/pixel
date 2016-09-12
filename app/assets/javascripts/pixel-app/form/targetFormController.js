angular.module('pixel-app').controller('targetFormController', ['dataservice',
	function (dataservice) {

    var vm = this;
    
    vm.onSubmit = function (newValue) {
      // console.log(newValue);
      // console.log(vm.type);
      if (vm.type == "new") {
        dataservice.createCampaign(newValue).then(function(data) {
          vm.onUpdate({data: data.target});
          vm.onCancel();
        });
      } else {
        var data = {
          name: newValue.name
        }
        dataservice.editTarget(newValue.id,data).then(function(data) {
          vm.onUpdate({id: newValue.id, data: data.target});
          vm.onCancel();
        });
      }
    }

    vm.cancel = function () {
      vm.onCancel();
    };
  }
]);
