myApp.controller('ReviewsController', function ($mdDialog, $mdToast, UserService, BeerService) {
  var vm = this;
  us = UserService;
  bs = BeerService;
  vm.data = bs.data;

  vm.sortIcon = vm.data.reverseReviewSort?'ic_keyboard_arrow_down_black_24px':'ic_keyboard_arrow_up_black_24px';

  vm.reverseSort = () => {
    vm.data.reverseReviewSort = !vm.data.reverseReviewSort;
    vm.sortIcon = vm.data.reverseReviewSort?'ic_keyboard_arrow_down_black_24px':'ic_keyboard_arrow_up_black_24px';
  };
  vm.getReviews = () => {
    bs.getReviews();
  };

  vm.editReview = (review) => {
    $mdDialog.show({
      locals: { review: review },
      controller: 'EditReviewController as ec',
      templateUrl: '/views/templates/edit.dialog.html',
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      targetEvent: review,
    }).then((edits) => {
      bs.submitEdits(edits).then(() => {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Your edits have been accepted.')
            .position('bottom left' )
            .hideDelay(2500)
        );
      });
    }).catch(() => {
      console.log('Editing cancelled');
    });
  };

  vm.deleteReview = (reviewId) => {
    let confirm = $mdDialog.confirm()
    .title('Are you sure?')
    .textContent('Are you sure you want to delete this review?')
    .ariaLabel('Confirm delete')
    .ok('Delete')
    .cancel('Cancel');
    $mdDialog.show(confirm)
    .then(() => {
      bs.deleteReview(reviewId)
    })
    .then(() => {
      $mdToast.show(
        $mdToast.simple()
          .textContent('Review deleted')
          .hideDelay(2500)
      );
    });
  };

  if (bs.data.categories[0]){
    vm.getReviews();
  } else {
    Promise.all([bs.getCategories(),bs.getStyles()])
    .then(vm.getReviews);
  }
});
