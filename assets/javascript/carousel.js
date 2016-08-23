'use strict';
$(document).ready(function() {
 
	 
  $("#owl-example-1").owlCarousel({
  	navigation: true,
  	items: 3,
  	pagination: false,
  });

  $("#owl-example-2").owlCarousel({
  	navigation: true,
  	items: 4,
  	pagination: false
  });

   $("#owl-example-2").owlCarousel({
  	navigation: true,
  	items: 1,
  	pagination: false
  });
    $("#owl-example-3").owlCarousel({
  	navigation: true,
  	items: 1,
  	pagination: false
  });
     $("#owl-example-4").owlCarousel({
  	navigation: true,
  	items: 1,
  	pagination: false
  });
 	

    $("#searchBtn").on('click',function(){
      var topic = $('#searchBar').val().trim();

      console.log(topic);

      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=3";

      console.log(queryURL);
        $.ajax({url: queryURL, method: 'GET'}).done(function(response){ 

        var results = response.data;
            console.log(queryURL);
            console.log(response);

              for (var i = 0; i < results.length; i++){

                var gifDiv = $('<div>');
                var gifImage = $('<img>');
                    gifImage.addClass('giffy');

                    gifImage.attr('src', results[i].images.fixed_height_still.url);
                    gifImage.attr('data-animate', results[i].images.fixed_height.url);
                    gifImage.attr('data-still', results[i].images.fixed_height_still.url);
                    gifImage.attr('data-state', "still");
                    // gifDiv.append(p);
                    gifDiv.append(gifImage);

                    $('#owl-example-1').prepend(gifDiv);
              } 
          });

     });
  });