'use strict';

// $(document).ready(function() {
	

	var clientID = '6441b815d2612cc';

	$('#submit').on('click', function(){

		var searchTerm = $('#search').val();


		// // THIS IS THE QUERY URL TO RETURN GIFS

		// var gif_queryURL = "https://api.imgur.com/3/gallery/search/top/all&?q_type=anigif&q_all=" + searchTerm;

		// $.ajax({
		// 	url: gif_queryURL,
		// 	method: 'GET',
		// 	headers: {
  //       	Authorization: 'Client-ID ' + clientID
  //     		}
		// })
	 
	 // 	.done(function(response) {

	 // 	// var results = response.data;

	 // 	// console.log(results[1]);

		// 	for (var i = 0; i < 10; i++) {

		// 		var results = response.data;

		// 		if (results[i].type === "image/gif") { continue; }

		// 		console.log(results[i]);
				
		// 		var $imageURL = 'http://i.imgur.com/' + results[i].cover + 'm.jpg';

		// 		$('#imageView').append('<img src="' + $imageURL + '"/>'); 



		// 		// THIS IS TO RETURN ONLY GIFS

		// 		var results = response.data;

		// 		console.log(results[i]);

		// 		var $imageURL = results[i].link;

		// 		$('#imageView').append('<img src="' + $imageURL + '"/>'); 

		// 	}	

	 // 	});


		// THIS IS THE QUERY URL TO RETURN JPEGS

		var img_queryURL = "https://api.imgur.com/3/gallery/search/top/all&?q_type=jpg&q_all=" + searchTerm;

		$.ajax({
			url: img_queryURL,
			method: 'GET',
			headers: {
        	Authorization: 'Client-ID ' + clientID
      		}
		})
	 
	 	.done(function(response) {

		 	// var results = response.data;

		 	// console.log(results[1]);

			for (var i = 0; i < 20; i++) {


				// THIS IS TO RETURN ONLY JPEGS

				var results = response.data;

				if (results[i].type === "image/jpeg") { continue; }

				console.log(results[i]);
				
				var $imageURL = 'http://i.imgur.com/' + results[i].cover + 'm.jpg';

				// $('#images').append('<img src="' + $imageURL + '"/>'); 

				pic_urls.append($imageURL);


				// THIS IS TO RETURN ONLY GIFS

				// var results = response.data;

				// console.log(results[i]);

				// var $imageURL = results[i].link;

				// $('#images').append('<img src="' + $imageURL + '"/>'); 


			}	

		})
	 	
	 	console.log(pic_urls.length);

		//------

		return false;
	});


// });
