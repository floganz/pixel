angular.module('pixel-app',[
	'templates', 
	'ngRoute',
	'Devise',
    'ngMaterial',
    'ngAnimate',
    'ngAria'
])
.config(function(AuthProvider, AuthInterceptProvider, $httpProvider) {
        // Customize login
        AuthProvider.loginMethod('POST');
        AuthProvider.loginPath('/users/sign_in.json');

        // Customize logout
        AuthProvider.logoutMethod('DELETE');
        AuthProvider.logoutPath('/users/sign_out.json');

        // // Customize register
        AuthProvider.registerMethod('POST');
        AuthProvider.registerPath('/user/sign_up.json');

        // // Customize the resource name data use namespaced under
        // // Pass false to disable the namespace altogether.
        AuthProvider.resourceName('user');
        // AuthProvider.resourceName('user');

        // // Also you can change host URL for backend calls
        // // (for example if it's on another server than your angular app)
        // // AuthProvider.baseUrl('http://localhost:3000');

        // // Customize user parsing
        // // NOTE: **MUST** return a truth-y expression
        AuthProvider.parse(function(response) {
            console.log(response);
            return response.data;
        });

        // Intercept 401 Unauthorized everywhere
        // Enables `devise:unauthorized` interceptor
        // AuthInterceptProvider.interceptAuth(true);

        // Set CSRF token for Rails in each request
        $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    })
.config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/auth/sign_in', {templateUrl:'pixel-app/auth/sign-in.html'})
      .when('/auth/sign_up', {templateUrl:'pixel-app/auth/sign-up.html'})
      .when('/dashboard', {templateUrl:'pixel-app/dashboard/dashboard.html'})
      .when('/campaign/:id', {templateUrl:'pixel-app/camp_single/campaign.html'})
      .otherwise({redirectTo: "/auth/login"})
}]);