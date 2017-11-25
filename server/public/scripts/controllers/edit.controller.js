myApp.controller('EditReviewController',function($mdDialog,review){
  console.log('EditReviewController created');

  let vm = this;
  vm.review = review;
  vm.edits = {
    id: review.id,
    rating: review.rating,
    comment: review.comment
  };

  console.log('EditReviewController review:',vm.review);

  vm.submitEdits = (edits) => {
    $mdDialog.hide(edits);
  };

  vm.cancel = () => {
    $mdDialog.cancel();
  };
});