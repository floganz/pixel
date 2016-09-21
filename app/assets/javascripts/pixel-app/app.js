angular.module('pixel-app',[
	'templates', 
	'ngRoute',
  'ui.router',
	'Devise',
  'ngMaterial',
  'ngAnimate',
  'ngAria',
  'chart.js',
  'ngCookies',
  'ngMessages',
  'infinite-scroll'
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
.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/dashboard');
  
  $stateProvider
    .state('sign_in', {
      url: "/auth/sign_in",
      templateUrl: "pixel-app/pages/sign-in.html"
    })
    .state('sign_up', {
      url: "/auth/sign_up",
      templateUrl: "pixel-app/pages/sign-up.html"
    })
    .state('dashboard', {
      url: "/dashboard",
      templateUrl: "pixel-app/pages/dashboard.html"
    })
    .state('new_campaign', {
      url: "/new_campaign",
      templateUrl: "pixel-app/pages/new-campaign.html"
    })
    .state('campaign', {
      url: "/campaign/:id",
      templateUrl: "pixel-app/pages/campaign.html"
    })
}]);
