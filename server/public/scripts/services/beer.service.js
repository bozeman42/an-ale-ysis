myApp.service('BeerService', function ($http, $location) {
  let self = this;

  console.log('BeerService created');

  let enteredBeerTemplate = {
    name: '',
    brewery: '',
    ibu: '',
    abv: '',
    style: null,
    category: null,
    imgurl: null,
    description: ''
  };

  self.data = {
    keyword: '',
    searchType: 'brewery',
    beers: [],
    breweries: [],
    enteredBeer: enteredBeerTemplate,
    beerToRate: {},
    review: {
      rating: undefined,
      comment: '',
      beer: {}
    },
    filterCategory: null,
    styles: [],
    categories: [],
    reviews: [],
    categoryRatings: [],
    crLabels: [],
    crData: [],
    ibuRatings: [],
    ibuRangeRatings: []
  };

  self.reset = () => {
    self.data.enteredBeer = enteredBeerTemplate;
    self.data.beers = [];
    self.data.breweries = [];
    self.data.review = {
      rating: null,
      comment: '',
      beer: {}
    };
  };

  self.resolveCategory = (categoryId) => {
    let categoryName = self.data.categories.filter((category) => {
      return category.id === categoryId;
    })[0].name;
    return categoryName;
  };

  self.resolveStyle = (styleId) => {
    let styleName = self.data.styles.filter((style) => {
      return style.id === styleId;
    })[0].name;
    return styleName;
  };

  self.applyLabels = () => {
    self.data.beers.forEach((beer) => {
      if (beer.labels) {
        beer.imgurl = beer.labels.medium;
      } else if (beer.breweries[0].images) {
        beer.imgurl = beer.breweries[0].images.squareMedium;
      } else {
        beer.imgurl = "https://www.drinkpreneur.com/wp-content/uploads/2017/04/drinkpreneur_2016-01-26-1453821995-8643361-beermain.jpg";
      }
    });
  };

  self.searchBeer = (keyword, searchType) => {
    console.log('Keyword', keyword, 'searchType:', searchType);
    let config = {
      params: {
        q: keyword,
        type: searchType,
        withBreweries: 'Y'
      }
    };
    self.reset();
    $http.get('/beer/search', config)
      .then((response) => {
        if (response.data.searchType === 'beer') {
          self.data.beers = response.data.body.data;
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
        } else if (response.data.searchType === 'brewery') {
          self.data.breweries = response.data.body.data;
          console.log('breweries',self.data.breweries);
        }
      })
      .catch((error) => {
        alert('ERROR IN /beer/search/ route', error);
      });

    self.data.keyword = '';
  };

  self.getBreweryBeers = (brewery) => {
    self.data.breweries = [brewery];
    let config = {
      params: {
        breweryId: brewery.id
      }
    };
    $http.get('beer/bybrewery', config)
    .then((response) => {
      console.log(response.data);
      self.data.beers = response.data.data;
      self.applyLabels();
    })
    .catch((error) => {

    });
  };

  self.selectBeer = (beer) => {
    $location.path('/rate');
    console.log(beer.brewery);
    self.data.review.beer = beer;

  };

  self.goToManualEntry = () => {
    $location.path('/entry');
  };

  self.getStyles = () => {
    return $http.get('/beer/styles')
      .then((response) => {
        console.log(response.data);
        self.data.styles = response.data.data;
        console.log('Styles', self.data.styles);
        return self.data.styles;
      })
      .catch((error) => {
        console.log('Failed to get styles');
      });
  };

  self.getCategories = () => {
    return $http.get('/beer/categories')
      .then((response) => {
        console.log(response.data);
        self.data.categories = response.data.data;
        self.data.categories = self.data.categories.filter((category) => {
          return (category.name != '""');
        });
        console.log('Categories', self.data.categories);
        return self.data.categories;
      })
      .catch((error) => {
        console.log('Failed to get categories');
      });
  };

  self.submitReview = (review) => {
    return $http.post('/beer/rate', review)
      .then((response) => {
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
          console.log(review.categoryName);
        });
        console.log(self.data.reviews);
      })
      .catch((error) => {
        console.log('Failed to get reviews', error);
      });
  };

  // get average ratings for each beer category
  self.getCategoryRatings = () => {
    self.data.crLabels = [];
    self.data.crData = [];
    console.log('crData before',self.data.crData);
    return $http.get('beer/category-ratings')
      .then((response) => {
        response.data.forEach((rating) => {
          self.data.crLabels.push(self.data.categories[rating.category - 1].name);
          self.data.crData.push(rating.categoryRating);
        });
        // self.data.categoryRatings = response.data;
        // console.log('Category Ratings:', self.data.categoryRatings);
        // self.data.categories.forEach((category) => {
        //   self.data.crLabels.push(category.name);
        //   self.data.crData.push(0);
        // });
        // // new attempt
        // self.data.categoryRatings.forEach((pair) => {
        //   self.data.crData[pair.category - 1] = pair.categoryRating;
        // });
        // console.log('crData after',self.data.crData);
        // // self.data.categoryRatings.forEach((rating) => {
        // //   let ratedCategory = self.data.categories.filter((category) => {
        // //     return rating.category === category.id;
        // //   });
        // //   rating.categoryName = ratedCategory[0].name;
        // //   self.data.crLabels.push(rating.categoryName);
        // //   self.data.crData.push(rating.categoryRating);
        // // });
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

  self.submitEdits = (edits) => {
    return $http.put('beer/reviews/edit', edits)
      .then((response) => {
        self.getReviews()
      })
      .catch((error) => {
        console.log('Editing failed');
      });
  };

  self.deleteReview = (reviewId) => {
    config = {
      params: {
        id: reviewId
      }
    };
    console.log('Deleting review', config.params.id);
    return $http.delete('/beer/reviews/', config)
      .then((response) => {
        console.log('Got response from server for delete');
        self.getReviews();
      })
      .catch((error) => {
        console.log('Failed to delete');
      });
  };

  self.filterByCategory = (categoryId) => {
    return style.categoryId === categoryId;
  };

  self.getStyles();
  self.getCategories();
});