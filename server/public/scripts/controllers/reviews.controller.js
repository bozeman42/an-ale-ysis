myApp.controller('ReviewsController', function ($mdDialog, UserService, BeerService) {
  console.log('ReviewsController created');
  var vm = this;
  us = UserService;
  bs = BeerService;
  vm.data = bs.data;


  vm.getReviews = () => {
    bs.getReviews();
  };

  vm.editReview = (review) => {
    console.log("review to edit", review);
    $mdDialog.show({
      locals: { review: review },
      controller: 'EditReviewController as ec',
      templateUrl: '/views/templates/edit.dialog.html',
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      targetEvent: review
    })
      .then((edits) => {
        bs.submitEdits(edits)
        .then(() => {
          swal('Success', 'Rating changed to ' + edits.rating + '.', 'success');
          vm.getReviews();
        });
      })
      .catch(() => {
        console.log('Editing cancelled');
      });
  };


  vm.getReviews();
});
