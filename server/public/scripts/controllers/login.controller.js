myApp.controller('LoginController', function ($http, $location, UserService) {
  var vm = this;
  
  vm.userService = UserService;

  vm.user = {
    username: '',
    password: ''
  };

  vm.message = '';

  vm.login = function () {
    if (vm.user.username === '' || vm.user.password === '') {
      vm.message = "Enter your username and password!";
    } else {
      $http.post('/', vm.user).then(function (response) {
        if (response.data.username) {
          // location works with SPA (ng-route)
          $location.path('/profile'); // http://localhost:5000/#/user
        } else {
          console.log('LoginController -- login -- failure: ', response);
          vm.message = "The login credentials used were incorrect.";
        }
      }).catch(function (response) {
        console.log('LoginController -- registerUser -- failure: ', response);
        vm.message = "The login credentials used were incorrect.";
      });
    }
  };

  vm.register = () => {
    $location.path('/register');
  };

  vm.returnToLogin = () => {
    $location.path('/home');
  };

  vm.registerUser = function () {
    if (vm.user.username === '' || vm.user.password === '') {
      vm.message = "Choose a username and password!";
    } else {
      $http.post('/register', vm.user).then(function (response) {
        $location.path('/home');
      }).catch(function (response) {
        console.log('LoginController -- registerUser -- error');
        vm.message = "Please try again."
      });
    }
  };

});
