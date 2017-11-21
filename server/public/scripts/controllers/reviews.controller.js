myApp.controller('ReviewsController', function(UserService,BeerService) {
  console.log('ReviewsController created');
  var vm = this;
  us = UserService;
  bs = BeerService;
  vm.data = bs.data;

  
  vm.getReviews = () => {
    bs.getReviews();
  };

  vm.getReviews();
});
