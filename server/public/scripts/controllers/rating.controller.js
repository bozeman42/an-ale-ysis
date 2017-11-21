myApp.controller('RatingController',function(BeerService){
  console.log('RatingController created');
  let vm = this;
  let bs = BeerService;

  vm.data = bs.data;
  vm.review = bs.data.review;
  vm.beer = bs.data.review.beer;

  vm.submitReview = (review) => {
    bs.submitReview(review);
  };

  console.log('Beer to rate:',vm.beer);
});