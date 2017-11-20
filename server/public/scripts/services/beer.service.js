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
    styles: []
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
      self.data.beers.forEach
      console.log(self.data.beers);
    })
    .catch((error) => {
      alert('ERROR IN /beer/search/ route');
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

});