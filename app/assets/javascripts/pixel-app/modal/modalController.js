angular.module('pixel-app')
.controller('ModalController', ['$mdDialog', '$mdMedia',
  function($mdDialog, $mdMedia) {

  var vm = this;

  vm.showAdvanced = function(ev, record, del) {
    // console.log(record);
    $mdDialog.show({
      controller: 'DialogController as m',
      templateUrl: 'pixel-app/modal/modal.html',
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

}]);
