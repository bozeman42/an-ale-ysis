myApp.controller('ReviewsController', function ($mdDialog, UserService, BeerService) {
  console.log('ReviewsController created');
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
      targetEvent: review
    }).then((edits) => {
      bs.submitEdits(edits).then(() => {
        swal('Success', 'Edits accepted.', 'success');
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
      console.log('Decided to delete',reviewId);
      bs.deleteReview(reviewId)
    });
  };
  if (bs.data.categories[0]){
    vm.getReviews();
  } else {
    Promise.all([bs.getCategories(),bs.getStyles()])
    .then(vm.getReviews);
  }
});
