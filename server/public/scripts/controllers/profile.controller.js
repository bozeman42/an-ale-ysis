myApp.controller('ProfileController', function(UserService,BeerService) {
  console.log('ProfileController created');
  var vm = this;
  let bs = BeerService;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.data = BeerService.data;

  bs.getStyleRatings();
  
});
