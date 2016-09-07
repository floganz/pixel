angular.module('pixel-app').service('dataservice', ['$http', '$q','Auth', dataservice]);

function dataservice($http,$q, Auth) {
  var service = {
    getCampaigns: getCampaigns,
    getCampaign: getCampaign,
    getTargets: getTargets,
    getEvents: getEvents,
    createCampaign: createCampaign,
    createTarget: createTarget,
    createEvent: createEvent,
    destroyCampaign: destroyCampaign,
    destroyTarget: destroyTarget,
    destroyEvent: destroyEvent,
    editCampaign: editCampaign,
    editTarget: editTarget
  };
  return service;

  function setUser() {
    Auth.currentUser().then(function(user) {
        // User was logged in, or Devise returned
        // previously authenticated session.
        console.log(user); // => {id: 1, ect: '...'}
        return user.id
    }, function(error) {
        // unauthenticated error
        console.log("user not auth");
        return -1;
    });
  }

  function getCampaigns(id) {
    var deffered = $q.defer();
    // id = 1;
    $http.get("/campaigns?user_id=" + id)
    .success(function(data, status, headers, config){
      deffered.resolve(data);
    });
    return deffered.promise;
  };

  function getCampaign(id) {
    var deffered = $q.defer();
    $http.get("/campaigns/" + id)
    .success(function(data, status, headers, config){
      deffered.resolve(data);
    });
    return deffered.promise;
  };
  
  function getTargets(id) {
    var deffered = $q.defer();
    $http.get("/targets?campaign_id=" + id)
    .success(function(data, status, headers, config){
      deffered.resolve(data);
    });
    return deffered.promise;
  };

  function getEvents(id) {
    var deffered = $q.defer();
    $http.get("/get_events?target_id=" + id)
    .success(function(data, status, headers, config){
      deffered.resolve(data);
    });
    return deffered.promise;
  };

  function createCampaign(newValue) {
    var deffered = $q.defer();
    newValue.user_id = Auth._currentUser.id;
    console.log(newValue)
    $http.post(
      "/campaigns", newValue,
      {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
    ).success(function (data, status, headers, config) {
      deffered.resolve(data);
    })
    .error(function (){
      console.log("error");
    });
    return deffered.promise;
  };

  function createTarget(newValue) {
    var deffered = $q.defer();
    $http.post(
      "/targets", newValue,
      {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
    ).success(function (data, status, headers, config) {
      deffered.resolve(data);
    })
    .error(function (){
      console.log("error");
    });
    return deffered.promise;
  };

  function createEvent(newValue) {
    var deffered = $q.defer();
    $http.post(
      "/events", newValue,
      {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
    ).success(function (data, status, headers, config) {
      deffered.resolve(data);
    })
    .error(function (){
      console.log("error");
    });
    return deffered.promise;
  };
  
  function destroyCampaign(id){
    var deffered = $q.defer();
    $http.delete(
      "/campaigns/" +id,
      {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
    ).success(function (data, status, headers, config) {
      deffered.resolve(data);
    });
    return deffered.promise;
  };

  function destroyTarget(id){
    var deffered = $q.defer();
    $http.delete(
      "/targets/" +id,
      {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
    ).success(function (data, status, headers, config) {
      deffered.resolve(data);
    });
    return deffered.promise;
  };

  function destroyEvent(id){
    var deffered = $q.defer();
    $http.delete(
      "/events/" +id,
      {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
    ).success(function (data, status, headers, config) {
      deffered.resolve(data);
    });
    return deffered.promise;
  };

  function editCampaign(id,newValue) {
    var deffered = $q.defer();
    $http.patch(
      "/campaigns/"+id, newValue,
      {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
    ).success(function (data, status, headers, config) {
      deffered.resolve(data);
    })
    .error(function (){
      console.log("error");
    });
    return deffered.promise;
  };

  function editTarget(id,newValue) {
    var deffered = $q.defer();
    console.log("id " + id + " data " + newValue);
    $http.patch(
      "/targets/"+id, newValue,
      {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
    ).success(function (data, status, headers, config) {
      deffered.resolve(data);
    })
    .error(function (){
      console.log("error");
    });
    return deffered.promise;
  };
};