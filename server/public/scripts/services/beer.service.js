myApp.service('BeerService', function($http,$location){
  let self = this;
  self.data = {
    keyword: '',
    beers: [],
    enteredBeer: {
      name: '',
      brewery: '',
      ibu: '',
      abv: '',
      style: null,
      description: ''
    },
    currentBeer: {
    },
    beerToRate: {},
    review: {
      rating: 3,
      comment: '',
      beer: {}
    },
    styles: [],
    reviews: [],
    styleRatings: []
  };

  self.searchBeer = (keyword) => {
    console.log(keyword);
    let config = {
      params: {
        q: keyword,
        type: 'beer',
        withBreweries: 'Y'
      }
    };
    $http.get('/beer/search',config)
    .then((response) => {
      self.data.beers = response.data.data;
      self.data.beers.forEach((beer) => {
        if (beer.labels) {
          beer.imgurl = beer.labels.medium;
        } else if (beer.breweries[0].images) {
          beer.imgurl = beer.breweries[0].images.squareMedium;
        } else {
          beer.imgurl = "https://www.drinkpreneur.com/wp-content/uploads/2017/04/drinkpreneur_2016-01-26-1453821995-8643361-beermain.jpg";
        }
      });
      console.log(self.data.beers);
    })
    .catch((error) => {
      alert('ERROR IN /beer/search/ route',error);
    });

    self.data.keyword = '';
  };

  self.selectBeer = (beer) => {
    $location.path('/rate');
    console.log(beer.brewery);
    self.data.review.beer = beer;
    
  };

  self.goToManualEntry = () => {
    $location.path('/entry');
  };

  // Routes

  self.getStyles = () => {
    $http.get('/beer/styles')
    .then((response)=>{
      console.log(response.data);
      self.data.styles = response.data;
    })
    .catch((error)=>{
      console.log('Failed to get styles');
    });
  };

  self.categorizeStyle = (beer) => {
    return {
      id: 1,
      name: "The One True Style",
      description: "All in one, one for all."
    };
  };

  self.submitReview = (review) => {
    $http.post('/beer/rate',review)
    .then((response)=>{
      console.log('Beer rated!');
    })
    .catch((error) => {
      console.log('Failed to rate beer');
    });
  };

  self.getReviews = () => {
    $http.get('/beer/reviews')
    .then((response) => {
      console.log('Got reviews');
      self.data.reviews = response.data;
      console.log(self.data.reviews);
    })
    .catch((error) => {
      console.log('Failed to get reviews',error);
    });
  };

  self.getStyleRatings = () => {
    $http.get('beer/style-ratings')
    .then((response) => {
      self.data.styleRatings = response.data;
    })
    .catch((error) => {
      console.log('Failed to get style ratings');
    });
  }
});