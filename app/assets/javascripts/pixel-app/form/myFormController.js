angular.module('pixel-app').controller('myFormController', ['dataservice',
	function (dataservice) {

    var vm = this;
    
    this.onSubmit = function (newValue) {
      console.log(newValue);
      console.log(vm.type);
      if (vm.type == "new") {
        dataservice.createCampaign(newValue).then(function(data) {
          vm.onUpdate({data: data});
          vm.onCancel();
        });
      } else {
        dataservice.editCampaign(newValue.id,newValue).then(function(data) {
          vm.onUpdate({id: newValue.id, data: newValue});
          vm.onCancel();
        });
      }
    }

    this.cancel = function () {
      vm.onCancel();
    };
  }
]);
