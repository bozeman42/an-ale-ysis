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
      style: '',
      description: ''
    },
    currentBeer: {},
    beerToRate: {},
    review: {
      rating: 3,
      comment: '',
      beerId: ''
    }
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
      console.log(self.data.beers);
    })
    .catch((error) => {
      alert('ERROR IN /beer/search/ route');
    });

    self.data.keyword = '';
  };

  self.selectBeer = (beer) => {
    $location.path('/rate');
    self.data.beerToRate = beer;
    
  };

  self.goToManualEntry = () => {
    $location.path('/entry');
  };



});