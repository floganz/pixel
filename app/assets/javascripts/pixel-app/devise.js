// angular.module('pixel-app')
// .controller('deviseController', function(Auth) {
//         var credentials = {
//             email: 'user@domain.com',
//             password: 'password1'
//         };
//         var config = {
//             headers: {
//                 'X-HTTP-Method-Override': 'POST'
//             }
//         };

//         Auth.login(credentials, config).then(function(user) {
//             console.log(user); // => {id: 1, ect: '...'}
//         }, function(error) {
//             // Authentication failed...
//         });

//         $scope.$on('devise:login', function(event, currentUser) {
//             // after a login, a hard refresh, a new tab
//         });

//         $scope.$on('devise:new-session', function(event, currentUser) {
//             // user logged in by Auth.login({...})
//         });
//     });