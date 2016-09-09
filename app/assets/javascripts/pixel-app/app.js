angular.module('pixel-app',[
	'templates', 
	'ngRoute',
	'Devise',
  'ngMaterial',
  'ngAnimate',
  'ngAria',
  'chart.js',
  'ngCookies',
  'ngMessages'
])
.config(['AuthProvider', 'AuthInterceptProvider', '$httpProvider', function(AuthProvider, AuthInterceptProvider, $httpProvider) {
        AuthProvider.loginMethod('POST');
        AuthProvider.loginPath('/users/sign_in.json');

        AuthProvider.logoutMethod('DELETE');
        AuthProvider.logoutPath('/users/sign_out.json');

        AuthProvider.registerMethod('POST');
        AuthProvider.registerPath('/users.json');

        AuthProvider.resourceName('user');

        AuthProvider.parse(function(response) {
            return response.data;
        });

        $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    }])
.config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/auth/sign_in', {templateUrl:'pixel-app/auth/sign-in.html'})
      .when('/auth/sign_up', {templateUrl:'pixel-app/auth/sign-up.html'})
      .when('/dashboard', {templateUrl:'pixel-app/dashboard/dashboard.html'})
      .when('/new_campaign', {templateUrl:'pixel-app/form/new-campaign.html'})
      .when('/campaign/:id', {templateUrl:'pixel-app/camp_single/campaign.html'})
      .otherwise({redirectTo: "/auth/sign_in"})
}]);