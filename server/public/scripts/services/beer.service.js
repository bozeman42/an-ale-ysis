myApp.service('BeerService', function($http,$location){
  let self = this;

  let enteredBeerTemplate =  {
    name: '',
    brewery: '',
    ibu: '',
    abv: '',
    style: null,
    category: null,
    description: ''
  };
  
  self.data = {
    keyword: '',
    beers: [],
    enteredBeer: enteredBeerTemplate,
    beerToRate: {},
    review: {
      rating: undefined,
      comment: '',
      beer: {}
    },
    styles: [],
    categories: [],
    reviews: [],
    categoryRatings: [],
    ibuRatings: []
  };

  self.reset = () => {
    self.data.enteredBeer = enteredBeerTemplate;
    self.data.beers = [];
    self.data.review = {
      rating: null,
      comment: '',
      beer: {}
    };
    $location.path('/profile')
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
      self.data.styles = response.data.data;
      console.log('Styles',self.data.styles);
      return self.data.styles;
    })
    .catch((error)=>{
      console.log('Failed to get styles');
    });
  };

  self.getCategories = () => {
    return $http.get('/beer/categories')
    .then((response)=>{
      console.log(response.data);
      self.data.categories = response.data.data;
      self.data.categories = self.data.categories.filter((category) => {
        return (category.name != '""');
      });
      console.log('Categories',self.data.categories);
    })
    .catch((error)=>{
      console.log('Failed to get categories');
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
    return $http.post('/beer/rate',review)
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
      self.data.reviews.forEach((review) => {
        console.log(review);
        let style = self.data.styles.filter((style) => {
          
          return style.id === review.style;
        });
        console.log(style);
        review.styleName = style[0].name;
        review.categoryName = style[0].category.name;
      });
      console.log(self.data.reviews);
    })
    .catch((error) => {
      console.log('Failed to get reviews',error);
    });
  };

  self.getCategoryRatings = () => {
    $http.get('beer/category-ratings')
    .then((response) => {
      self.data.categoryRatings = response.data;
      console.log('Category Ratings:',self.data.categoryRatings);

      self.data.categoryRatings.forEach((rating) => {
        let ratedCategory = self.data.categories.filter((category) =>{
          return rating.category === category.id;
        });
        rating.categoryName = ratedCategory[0].name;
      });
    })
    .catch((error) => {
      console.log('Failed to get category ratings');
    });
  };
  
  
  
  self.getIbuRatings = () => {
    return $http.get('beer/ibu-ratings')
    .then((response) => {
      self.data.ibuRatings = response.data;
      console.log(self.data.ibuRatings);
    })
    .catch((error) => {
      console.log('There has been an error getting the IBU rating data');
    });
  };
  
  self.filterByCategory = (categoryId) => {
    return style.categoryId === categoryId;
  };
  
  self.getStyles();
  self.getCategories();
});