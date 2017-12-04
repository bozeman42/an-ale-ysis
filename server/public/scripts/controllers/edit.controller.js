myApp.controller('EditReviewController',function($mdDialog,review){
  console.log('EditReviewController created');

  let vm = this;
  vm.review = review;
  vm.edits = {
    id: review.id,
    rating: review.rating,
    comment: review.comment
  };

  vm.messages = ['I hate it!','I don\'t like it.','It\'s okay.','I like it.','I love it!'];
  vm.ratingMessage = 'Select a rating!';

  vm.submitEdits = (edits) => {
    $mdDialog.hide(edits);
  };

  vm.cancel = () => {
    $mdDialog.cancel();
  };


  vm.starRating = (event) => {
    if (parseInt(event.target.id)){
      vm.edits.rating = parseInt(event.target.id);
    }
  };

  vm.ratingLeave = () => {
    let stars = document.getElementsByClassName('dialog-rating-icon');
    console.log(stars);
    console.log('left!');
    console.log('vm.edits.rating',vm.edits.rating);
    if (vm.edits.rating) {
      vm.ratingMessage = vm.messages[vm.edits.rating - 1];
    } else {
      vm.ratingMessage = 'Select a rating!';
    }
    for (let i = 0; i < stars.length; i += 1) {
      console.log('Star',i);
      stars[i].classList.remove('gold');
      stars[i].classList.remove('no-star');
      if (i < vm.edits.rating) {
        stars[i].classList.add('gold');
        console.log('is gold');
      } else {
        stars[i].classList.add('no-star');
        console.log('is not gold');
      }
    }
  }
  setTimeout(vm.ratingLeave,100);
  vm.ratingHover = (event) => {
    let stars = document.getElementsByClassName('dialog-rating-icon');
    vm.ratingMessage = vm.messages[event.target.id - 1];
    for (let i = 0; i < stars.length; i += 1) {
      stars[i].classList.remove('gold');
      stars[i].classList.remove('no-star');
      if (i < event.target.id) {
        stars[i].classList.add('gold');
        console.log(stars[i],'should be gold');
      } else {
        stars[i].classList.add('no-star');
      }
    }
  };
});