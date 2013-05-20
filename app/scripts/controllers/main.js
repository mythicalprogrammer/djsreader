'use strict';

angular.module('djsreaderApp')
	.controller('MainCtrl', function ($scope, $http, $timeout) {
		$scope.refreshInterval = 60;

		$scope.feeds = [{
			url: 'http://dailyjs.com/atom.xml'
	  	}];

		$scope.fetchFeed = function(feed) {
			feed.items = [];
	  
      		var query = "select * from xml where url='"+feed.url+"' and itemPath='feed.entry'";
	  		var options = "&format=json&diagnostics=true&callback=JSON_CALLBACK";

	  		query = encodeURI(query+options);

	  		var yql = "http://query.yahooapis.com/v1/public/yql?q=";
	  		var url = yql+query;

	  		$http.jsonp(url)
	  			.success(function(data, status, headers, config) {
					if (data.query.results) {
						feed.items = data.query.results.entry;
					}
				})
				.error(function(data, status, headers, config) {
					console.error('Error fetching feed:', data);
				});

			$timeout(function() { $scope.fetchFeed(feed);}, $scope.refreshInterval * 1000);
		};

		$scope.addFeed = function(feed) {
			$scope.feeds.push(feed);
			$scope.fetchFeed(feed);
			$scope.newFeed = {};
		};

		$scope.deleteFeed = function(feed) {
			$scope.feeds.splice($scope.feeds.indexOf(feed), 1);
		};



  });
