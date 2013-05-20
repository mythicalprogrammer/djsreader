'use strict';

angular.module('djsreaderApp')
  .controller('MainCtrl', function ($scope, $http) {
      var query = "select * from xml where url='http://dailyjs.com/atom.xml' and itemPath='feed.entry'"
	  var options = "&format=json&diagnostics=true&callback=JSON_CALLBACK";

	  query = encodeURI(query+options);

	  var yql = "http://query.yahooapis.com/v1/public/yql?q=";
	  var url = yql+query;

	  $http.jsonp(url)
	  	.success(function(data, status, headers, config) {
			$scope.feed = {
				title: 'DailyJS',
				items: data.query.results.entry
			};
		})
		.error(function(data, status, headers, config) {
			console.error('Error fetching feed:', data);
		});

  });
