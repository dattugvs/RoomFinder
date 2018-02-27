$('#carouselExample').on('slide.bs.carousel', function (e) {

    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 4;
    var totalItems = $('.carousel-item').length;
    
    if (idx >= totalItems-(itemsPerSlide-1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i=0; i<it; i++) {
            // append slides to end
            if (e.direction=="left") {
                $('.carousel-item').eq(i).appendTo('.carousel-inner');
            }
            else {
                $('.carousel-item').eq(0).appendTo('.carousel-inner');
            }
        }
    }
});

function initMap()
{
    var loc = document.getElementById('loc').innerHTML;
    loc = loc.split(',');
    var lat = parseFloat(loc[0]);
    var lang = parseFloat(loc[1]);

    var mapCanvas = document.getElementById('map');
      var mapOptions = {
          center: new google.maps.LatLng(lat,lang),
          zoom:12,
          mapTypeId:google.maps.MapTypeId.ROADMAP 
      };
      var map = new google.maps.Map(mapCanvas,mapOptions);
}
$(document).ready(function() {
    var duration = $('#duration').text();
    var arr = duration.split(' - ');
    console.log(arr);
    $('#moveIn').html(arr[0]);
    $('#moveOut').html(arr[1]);
});