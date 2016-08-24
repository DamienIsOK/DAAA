'use strict';

$(document).ready(function() {
	

	var displayed = undefined;
	var gif_urls = [];
	var pic_urls = [];
	var vid_urls = [];
	var wiki_urls = [];


	$('#gifIcon').on('click', function() {



	});



//=================================================================
//	imgur code
//=================================================================


	var clientID = '6441b815d2612cc';

	$('#-submit').on('click', function(){

		pic_urls.length = 0;

		var searchTerm = $('#search').val();


		var img_queryURL = "https://api.imgur.com/3/gallery/search/top/all&?q_type=jpg&q_all=" + searchTerm;

		$.ajax({
			url: img_queryURL,
			method: 'GET',
			headers: {
        	Authorization: 'Client-ID ' + clientID
      		}
		})
	 
	 	.done(function(response) {

			for (var i = 0; i < 20; i++) {

				var results = response.data;

				if (results[i].type === "image/jpeg") { continue; }

				console.log(results[i]);
				
				var $imageURL = 'http://i.imgur.com/' + results[i].cover + 'm.jpg';

				// $('#images').append('<img src="' + $imageURL + '"/>'); 

				pic_urls.push($imageURL);

			}

		 	console.log(pic_urls.length);

		})
	 	
		//------

		return false;
	});






//=================================================================
//	giphy code
//=================================================================


	$("#submit").on("click", function(){

		gif_urls.length = 0;
		
		var searchBar = $('#search').val().trim();

		console.log(searchBar);

		var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' +
					searchBar+ '&api_key=dc6zaTOxFJmzC&limit=20';

		$.ajax({

			url: queryURL, 
			method:'GET'

		}).done(function(response) {

			var results = response.data;

			for (var i = 0; i < results.length; i++) {
				var imgurl = results[i].images.fixed_height.url;
				var gifImage = $('<img src ='+ imgurl + ' >' );
				// $(".gifs").append(gifImage);
				gif_urls.push(gifImage);
			}

			console.log(gif_urls.length);

		});
	});


});