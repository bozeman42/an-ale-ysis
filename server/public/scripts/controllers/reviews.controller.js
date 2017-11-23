myApp.controller('ReviewsController', function($mdDialog, UserService,BeerService) {
  console.log('ReviewsController created');
  var vm = this;
  us = UserService;
  bs = BeerService;
  vm.data = bs.data;

  
  vm.getReviews = () => {
    bs.getReviews();
  };

  vm.editReview = (review) => {
    $mdDialog.show({
      controller: EditReviewController,
      templateUrl: '/views/templates/edit.dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(
      (review) => {
        swal('Success','Rating changed to '+rating+'.','success');
        
        vm.getReviews();
      }
    );
  };


  vm.getReviews();
});
