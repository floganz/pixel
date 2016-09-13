angular.module('pixel-app').service('dataservice', ['$http', '$q', 'Auth', dataservice]);

function dataservice($http, $q, Auth) {
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
    editTarget: editTarget,
    campaignsSearch: campaignsSearch,
    targetsSearch: targetsSearch,
    getCampaigns_tmp: getCampaigns_tmp,
    campaignsSearch_tmp: campaignsSearch_tmp
  };
  return service;

  function campaignsSearch_tmp(id, q, offset, limit) {
    offset = offset ? offset : 0;
    limit = limit ? limit : 12;
    var deffered = $q.defer();
    $http.get("/search_c_t?user_id=" + id + "&q=" + q + "&offset=" + offset + "&limit=" + limit)
    .success(function(data, status, headers, config){
      deffered.resolve(data);
    });
    return deffered.promise;    
  };

  function getCampaigns_tmp(id, offset, limit) {
    offset = offset ? offset : 0;
    limit = limit ? limit : 12;
    var deffered = $q.defer();
    $http.get("/campaigns_t?user_id=" + id + "&offset=" + offset + "&limit=" + limit)
    .success(function(data, status, headers, config){
      deffered.resolve(data);
    });
    return deffered.promise;
  };

  function campaignsSearch(id, q, offset, limit) {
    offset = offset ? offset : 0;
    limit = limit ? limit : 12;
    var deffered = $q.defer();
    $http.get("/search_c?user_id=" + id + "&q=" + q + "&offset=" + offset + "&limit=" + limit)
    .success(function(data, status, headers, config){
      deffered.resolve(data);
    });
    return deffered.promise;    
  };

  function targetsSearch(id, q, offset, limit) {
    offset = offset ? offset : 0;
    limit = limit ? limit : 12;
    var deffered = $q.defer();
    $http.get("/search_t?campaign_id=" + id + "&q=" + q + "&offset=" + offset + "&limit=" + limit)
    .success(function(data, status, headers, config){
      deffered.resolve(data);
    });
    return deffered.promise;    
  };

  function getCampaigns(id, offset, limit) {
    offset = offset ? offset : 0;
    limit = limit ? limit : 12;
    var deffered = $q.defer();
    $http.get("/campaigns?user_id=" + id + "&offset=" + offset + "&limit=" + limit)
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
  
  function getTargets(id, offset, limit) {
    offset = offset ? offset : 0;
    limit = limit ? limit : 12;
    var deffered = $q.defer();
    $http.get("/targets?campaign_id=" + id + "&offset=" + offset + "&limit=" + limit)
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
    // console.log(newValue)
    $http.post(
      "/campaigns", newValue,
      {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
    ).success(function (data, status, headers, config) {
      deffered.resolve(data);
    })
    .error(function (){
      // console.log("error");
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
      // console.log("error");
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
      // console.log("error");
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
      // console.log("error");
    });
    return deffered.promise;
  };

  function editTarget(id,newValue) {
    var deffered = $q.defer();
    $http.patch(
      "/targets/"+id, newValue,
      {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
    ).success(function (data, status, headers, config) {
      deffered.resolve(data);
    })
    .error(function (){
      // console.log("error");
    });
    return deffered.promise;
  };
};