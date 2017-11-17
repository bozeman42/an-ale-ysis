myApp.service('BeerService', function($http){
  let self = this;
  self.data = {
    keyword: ''
  };

  self.searchBeer = (keyword) => {
    console.log(keyword);
    self.data.keyword = '';
  };
});