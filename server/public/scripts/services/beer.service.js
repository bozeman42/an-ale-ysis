myApp.service('BeerService', function($http,$location){
  let self = this;
  self.data = {
    keyword: '',
    beers: [],
    currentBeer: {

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

  self.rateBeer = (beer) => {
    $location.path('/rate');
  };


});