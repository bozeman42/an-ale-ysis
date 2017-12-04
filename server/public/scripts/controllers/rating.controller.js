myApp.controller('RatingController', function ($location, $mdToast, BeerService) {
  console.log('RatingController created');
  let vm = this;
  let bs = BeerService;

  vm.data = bs.data;
  vm.review = bs.data.review;
  vm.beer = bs.data.review.beer;
  vm.messages = ['I hate it!','I don\'t like it.','It\'s okay.','I like it.','I love it!'];
  vm.ratingMessage = 'Select a rating!';

  vm.submitReview = (review) => {
    if (review.rating) {
      bs.submitReview(review)
        .then(() => {
          $mdToast.show(
            $mdToast.simple()
              .textContent('Your rating has been added.')
              .position('bottom left')
              .hideDelay(2500)
          );
          $location.path('/profile');
        });
    } else {
      vm.ratingMessage = 'Please select a rating...';
    }
  };

  vm.starRating = (event) => {
    if (parseInt(event.target.id)){
      vm.review.rating = parseInt(event.target.id);
    }
  };

  vm.ratingLeave = () => {
    let stars = document.getElementsByClassName('rating-icon');
    if (vm.review.rating) {
      vm.ratingMessage = vm.messages[vm.review.rating - 1];
    } else {
      vm.ratingMessage = 'Select a rating!';
    }
    for (let i = 0; i < stars.length; i += 1) {
      stars[i].classList.remove('gold');
      stars[i].classList.remove('no-star');
      if (i < vm.review.rating) {
        stars[i].classList.add('gold');
      } else {
        stars[i].classList.add('no-star');
      }
    }
  }

  vm.ratingHover = (event) => {
    let stars = document.getElementsByClassName('rating-icon');
    vm.ratingMessage = vm.messages[event.target.id - 1];
    for (let i = 0; i < stars.length; i += 1) {
      stars[i].classList.remove('gold');
      stars[i].classList.remove('no-star');
      if (i < event.target.id) {
        stars[i].classList.add('gold');
      } else {
        stars[i].classList.add('no-star');
      }
    }
  };

});