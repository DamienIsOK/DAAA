$(document).ready(function(){

	$("--button").on("click", function(){
		
		var searchBar = $('#search').val().trim();
		console.log(searchBar);
		var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' +searchBar+ '&api_key=dc6zaTOxFJmzC&limit=20';

		$.ajax({url: queryURL, method:'GET'}).done(function(response) {

			var results = response.data;

			for (var i = 0; i < results.length; i++) {
				var gifImage = $('<img src ='+ results[i].images.fixed_height.url + ' >' );
				$(".gifs").append(gifImage);
			}

		});
	});

});

	