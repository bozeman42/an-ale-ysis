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
    imgurl: 'img/anALE-alysisblack-01.svg',
    description: ''
  };

  self.data = {
    keyword: '',
    searchType: 'beer',
    searchFilter: '',
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
    sortReviewsBy: 'id',
    reverseReviewSort: false,
    reviewFilterText: '',
    categoryRatings: [],
    crLabels: [],
    crData: [],
    ibuRatings: [],
    ibuRangeRatings: [],
    ibuRangeRatingsLabels: []
  };

  self.reset = () => {
    self.data.enteredBeer = enteredBeerTemplate;
    self.data.searchFilter = '';
    self.data.beers = [];
    self.data.breweries = [];
    self.data.review = {
      rating: null,
      comment: '',
      beer: {}
    };
    self.data.ibuRangeRatings = [];
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
        // beer.imgurl = "https://www.drinkpreneur.com/wp-content/uploads/2017/04/drinkpreneur_2016-01-26-1453821995-8643361-beermain.jpg";
        beer.imgurl = 'img/anALE-alysisblack-01.svg';
      }
    });
  };

  self.searchBeer = (keyword, searchType) => {
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
          self.applyLabels();
        } else if (response.data.searchType === 'brewery') {
          self.data.breweries = response.data.body.data;
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
        self.data.beers = response.data.data;
        self.applyLabels();
      })
      .catch((error) => {

      });
  };

  self.selectBeer = (beer) => {
    $location.path('/rate');
    self.data.review.beer = beer;

  };

  self.goToManualEntry = () => {
    $location.path('/entry');
  };

  self.getStyles = () => {
    return $http.get('/beer/styles')
      .then((response) => {
        self.data.styles = response.data.data;
        return self.data.styles;
      })
      .catch((error) => {
        console.log('Failed to get styles');
      });
  };

  self.getCategories = () => {
    return $http.get('/beer/categories')
      .then((response) => {
        self.data.categories = response.data.data;
        self.data.categories = self.data.categories.filter((category) => {
          return (category.name != '""');
        });
        return self.data.categories;
      })
      .catch((error) => {
        console.log('Failed to get categories');
      });
  };

  self.submitReview = (review) => {
    return $http.post('/beer/rate', review)
      .then((response) => {
        self.reset();
      })
      .catch((error) => {
        console.log('Failed to rate beer');
      });
  };

  self.getReviews = () => {
    return $http.get('/beer/reviews')
      .then((response) => {
        console.log('Got reviews');
        self.data.reviews = response.data;
        self.data.reviews.forEach((review) => {
          let style = self.data.styles.filter((style) => {

            return style.id === review.style;
          });
          review.styleName = style[0].name;
          review.categoryName = style[0].category.name;
        });
      })
      .catch((error) => {
        console.log('Failed to get reviews', error);
      });
  };

  // get average ratings for each beer category
  self.getCategoryRatings = () => {
    self.data.crLabels = [];
    self.data.crData = [];
    return $http.get('beer/category-ratings')
      .then((response) => {
        response.data.forEach((rating) => {
          self.data.crLabels.push(self.data.categories[rating.category - 1].name);
          self.data.crData.push(rating.categoryRating);
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
        self.data.ibuRangeRatings = [];
        self.data.ibuRangeRatingsLabels = [];
        let ibuMax = 0;
        // convert IBU value to a number and find the maximum IBU level reviewed
        for (let i = 0; i < self.data.ibuRatings.length; i += 1) {
          self.data.ibuRatings[i].x = parseFloat(self.data.ibuRatings[i].x);
          ibuMax = (self.data.ibuRatings[i].x > ibuMax) ? self.data.ibuRatings[i].x : ibuMax;
        }
        // find the average rating for each band of 10 of IBU
        let ratings = self.data.ibuRatings;
        let bandTotalRatings;
        let bandRatingsSum;
        for (let i = 0; i <= ibuMax; i += 10) {
          bandTotalRatings = 0;
          bandRatingsSum = 0;
          for (let j = 0; j < ratings.length; j += 1) {
            if ((ratings[j].x >= i) && (ratings[j].x < i + 10)) {
              bandTotalRatings += 1;
              bandRatingsSum += ratings[j].y;
            }
          }
          if (bandTotalRatings !== 0) {
            self.data.ibuRangeRatings.push(bandRatingsSum / bandTotalRatings);
          } else {
            self.data.ibuRangeRatings.push(0);
          }
          self.data.ibuRangeRatingsLabels.push('' + i + ' - ' + (i + 10));
        }
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
    return $http.delete('/beer/reviews/', config)
      .then((response) => {
        console.log('Got response from server for delete');
        return self.getReviews();
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