'use strict';

$(document).ready(function() {
	

	var displayed = undefined;
	var gif_urls = [];
	var pic1_urls = [];
	var pic2_urls = [];
	var vid_urls = [];
	var wiki_urls = [];

	// Copy to clipboard function using clipboard.js library
	var clipboard = new Clipboard('.btn');


	$('#gifsIcon').on('click', function() {

		$('.display-row').addClass('hide');
		$('#gifsContainer').removeClass('hide');
		$('#icon-footer').css('background-color', '#E76737');
		$('.icons').css('opacity', '.4');
		$(this).css('opacity', '1');

	});


	$('#picsIcon').on('click', function() {

		$('.display-row').addClass('hide');
		$('#picsContainer').removeClass('hide');
		$('#icon-footer').css('background-color', '#EAAF48');
		$('.icons').css('opacity', '.4');
		$(this).css('opacity', '1');

	});


	$('#vidsIcon').on('click', function() {

		$('.display-row').addClass('hide');
		$('#vidsContainer').removeClass('hide');
		$('#icon-footer').css('background-color', '#168793');
		$('.icons').css('opacity', '.4');
		$(this).css('opacity', '1');

	});


	$('#wikiIcon').on('click', function() {

		$('.display-row').addClass('hide');
		$('#wikiContainer').removeClass('hide');
		$('#icon-footer').css('background-color', '#19AA67');
		$('.icons').css('opacity', '.4');
		$(this).css('opacity', '1');

	});



//=================================================================
//	imgur code
//=================================================================


	var clientID = '6441b815d2612cc';

	$('#submit').on('click', function(){

		$('#pics').html('');

		pic1_urls.length = 0;

		var searchTerm = $('#search').val().trim();
		var img_queryURL = "https://api.imgur.com/3/gallery/search/top/all"+
							"&?q_type=jpg&q_all=" + searchTerm;

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

				// console.log(results[i]);
				var $imageURL = 'http://i.imgur.com/' + 
								results[i].cover + 'm.jpg';
				$('#pics').append('<img src="' + $imageURL + '"/>'); 
				// pic1_urls.push($imageURL);

			}

		 	// console.log('pic_urls.length '+pic_urls.length);

		})
	 	
		//------

		return false;


	});






//=================================================================
//	giphy code
//=================================================================


	$("#submit").on("click", function(){

		$('#gifs').html('');

		gif_urls.length = 0;
		var searchTerm = $('#search').val().trim();

		// console.log(searchTerm);
		var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' +
					searchTerm+ '&api_key=dc6zaTOxFJmzC&limit=20';

		$.ajax({

			url: queryURL, 
			method:'GET'

		}).done(function(response) {

			var results = response.data;

			for (var i = 0; i < results.length; i++) {

				var imgurl = results[i].images.fixed_height.url;
				var gifImage = $('<img src ='+ imgurl + ' >' );
				$("#gifs").append(gifImage);
				// gif_urls.push(gifImage);

			}

			console.log('gif_urls.length '+gif_urls.length);

		});


	});





//=================================================================
//	tumblr code
//=================================================================


	$("#submit").on('click', function(){
		// Run the form validation
		// formValidation();

		$('#pics').html('');

		var searchTerm = $('#search').val().trim();
		var url = "https://api.tumblr.com/v2/tagged?tag=" + 
			searchTerm + "&api_key=LlesQOluubqkqrscBuJN7EvvMLdiLyJyRSskIzYzaaroBQVBQQ";

		// Start ajax, making sure the datatype is JSONP
		$.ajax({

			url: url,
			method: 'GET',
			dataType: "jsonp"

		}).done(function(tumblrObject){

			console.log(tumblrObject);

			// Loop through the objects from Tumblr's API
			for(var i = 0; i < tumblrObject.response.length; i++) {
				
				var tumblrUrl = tumblrObject.response[i].short_url;
				var tumblrType = tumblrObject.response[i].type;
				var tumblrVideo = tumblrObject.response[i].video_url;
				var tumblrVideoType = tumblrObject.response[i].video_type;
				var $newButton = $("<button>").data("id", "link"+i)
											.data("data-clipboard-target", "post-shortlink");
				
				// *** ARPAD - THIS BLOCK HAS BEEN UPDATED AND SHOULD BE MERGED ***
										
				// Instructions on how to handle photos
				if(tumblrType == "photo"){

					var tumblrImage = tumblrObject.response[i].photos[0].alt_sizes[3].url;
					// var b = $('<input type="button" value="Copy link"/>')
					// var b = $('<img src="assets/images/copy.png" />')
					// 		.addClass("btn")
					// 		.attr("data-clipboard-text", tumblrImage);
					// 		console.log(tumblrImage);

					// Appending the results
					$("#resultDiv").append("<img src=" + 
						tumblrImage + ">" 
						 //+ "<br>" + tumblrUrl + "<br>"
						 )
					// 				.append(b)
									;
					// $("#searchInput").val("");

					// pic2_urls.push(tumblrImage);

				// Instructions on how to handle Tumblr videos
				} else if(tumblrType == "video" && tumblrVideoType == "tumblr") {

					// var b = $('<img src="assets/images/copy.png" />')
					// 		.addClass("btn")
					// 		.attr("data-clipboard-text", tumblrVideo);
					// 		console.log(tumblrVideo);

					$("#vids").append("<video width='320' height='240' controls>"+
						" <source src= " + tumblrVideo + "> </video>" 
						 // + "<br>" + tumblrUrl + "<br>"
						 )
					// 				.append(b)
									;
					// $("#searchInput").val("");

					// vid_urls.push(tumblrVideo);



				} 

			}

		})


		return false;


	});




//=================================================================
//	youtube code
//=================================================================


	$("#submit").on('click', function(){

		$('#vids').html('');

	    var searchTerm = $('#search').val().trim();
	    var url = 'https://www.googleapis.com/youtube/v3/search?q='+
	            searchTerm+'&part=snippet&key=AIzaSyASwJE5ny3b5D_MMihhX8TUgPsucMsSI7E';

	    $.ajax({

	        method: 'GET',
	        url: url

	    }).done(function(result){

	        for(var i = 0; i < result.items.length; i++) {

	            // console.log(result.items[i].id.kind);

	            if(result.items[i].id.kind === 'youtube#video') {

	                $('#vids').append('<iframe src="https://www.youtube.com/embed/' +
	                                            result.items[i].id.videoId +
	                                            '" width="350" height="260"></iframe>')
	                

	                // return 0;
	            }
	        }

	        console.log('# of youtube results '+result);

	    });

	    // q ='';

	})


});