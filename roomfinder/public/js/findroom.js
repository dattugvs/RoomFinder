var search = document.getElementById('search');
var lat = document.getElementById('lat');
var lng = document.getElementById('lng');
var areas=[], rooms=[];
var map, popup, Popup; count=0;
var movein_in = document.getElementById('movein');
var duration_in = document.getElementById('duration');
var minprice = document.getElementsByClassName('slider-price')[0];
var maxprice = document.getElementsByClassName('slider-price2')[0];
var sliderrow = document.getElementById("sliderrow");

var requests = [
  $.getJSON('/getRoomProfileList'),
  $.getJSON('/getAreasList'),
];
 
$.when.apply($,requests).done(function(){
  rooms = arguments[0][0]; //array of responses [0][data, status, xhrObj],[1][data, status, xhrObj]...
  areas = arguments[1][0];
  console.log(rooms);
  console.log(areas);
  showMap();
});

function showMap()
{
      sliderrow.innerHTML = '';
      var mapCanvas = document.getElementById('map');
      var mapOptions = {
          center: new google.maps.LatLng(lat.value,lng.value),
          zoom:12,
          mapTypeId:google.maps.MapTypeId.ROADMAP 
      };
      var map = new google.maps.Map(mapCanvas,mapOptions);

      setMarkers(map);
}

function setMarkers(map)
{
      var marker, i;
      definePopupClass();
      var movein_inp = Date.parse( movein_in.value);
      var duration_inp =0;// Date.parse( duration_in.value);
      var min_price = minprice.innerHTML;
      var max_price = maxprice.innerHTML;
      
      if(max_price=="25000+")
            max_price = Number(rooms[rooms.length-1].rent);
      if(min_price=="25000+")
            min_price = Number(rooms[rooms.length-1].rent);
      for (i = 0; i < areas.length; i++)
      {  
            var rent = Number(rooms[i].rent);
            if(rent< min_price)
                  continue;
            if(rent>max_price)
                  break;
            var dates = rooms[i].duration.split(' - ');
            var movein = Date.parse(dates[0]);
            var duration = Date.parse(dates[1]);

            if(movein>movein_inp || duration<duration_inp)
                  continue;
            
            var lat = areas[i].location[0];
            var long = areas[i].location[1];
            var roomid = areas[i].roomid;
            var userid = areas[i].userid;
            latlngset = new google.maps.LatLng(lat, long);

            var marker = new google.maps.Marker({  
                  map: map, position: latlngset  
            });
            map.setCenter(marker.getPosition())

            var map_slider_id = "mapslides"+count;
            var content = '<div id="'+map_slider_id+'" class="carousel slide" data-ride="carousel" >'+
            '<div class="carousel-inner">'+
              '<div class="carousel-item active">'+
                '<img src="//placehold.it/300x100/000/fff?text=1" width="100%" height="100%">'+
              '</div>'+
              '<div class="carousel-item">'+
                '<img src="//placehold.it/300x100/000/fff?text=2" width="100%" height="100%">'+
              '</div>'+
              '<div class="carousel-item">'+
                '<img src="//placehold.it/300x100/000/fff?text=3" width="100%" height="100%">'+
              '</div>'+
              '<a class="carousel-control-prev" href="#'+map_slider_id+'" data-slide="prev">'+
              '<span class="carousel-control-prev-icon"></span>'+
              '</a>'+
              '<a class="carousel-control-next" href="#'+map_slider_id+'" data-slide="next">'+
              '<span class="carousel-control-next-icon"></span>'+
              '</a>'+
            '</div>'+
            '<a href="/rooms/'+roomid+'" target="_blank">'+
            '<div style=" float:left; cursor:pointer;" onmouseover="this.style.color=\'blue\';" onmouseout="this.style.color=\'black\';" width="200">'+
             rent+'<br/>'+dates[0]+'<br/>Ambedkar Colony'+
            '</div>'+
            '</a>'+
            '<div class="profile" style=" float:right;">'+
              '<a href="/users/'+userid+'" target="_blank">'+
              '<img style="top:30px; bottom: 10px" src="//placehold.it/100x100/000/fff?text=" class="img-thumbnail" width="100" height="100">'+
              '<br>'+
              '</a>'+
              '<span>Dattatreya, 21</span>'+
            '</div>'+
          '</div>'+
        '</div>';
            var infowindow = new google.maps.InfoWindow()
            google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
                  return function() {
                        infowindow.setContent(content);
                        infowindow.open(map,marker);
                  };
            })(marker,content,infowindow)); 

            var element = createpopup();
            element.innerHTML = rent;
            popup = new Popup(new google.maps.LatLng(
            areas[i].location[0],areas[i].location[1]),element);
            popup.setMap(map);

            showResults(i);
      }
}

function showResults(i)
{
      var res_slider_id = "res_slides"+count;
      var dates = rooms[i].duration.split(' - ');
      var userid = rooms[i].userid;
      var roomid = rooms[i]._id;
      var rent = rooms[i].rent;
            var content = '<div class="col-sm-6">'+'<div id="'+res_slider_id+'" class="carousel slide" data-ride="carousel" >'+
            '<div class="carousel-inner">'+
              '<div class="carousel-item active">'+
                '<img src="//placehold.it/300x100/000/fff?text=1" width="100%" height="100%">'+
              '</div>'+
              '<div class="carousel-item">'+
                '<img src="//placehold.it/300x100/000/fff?text=2" width="100%" height="100%">'+
              '</div>'+
              '<div class="carousel-item">'+
                '<img src="//placehold.it/300x100/000/fff?text=3" width="100%" height="100%">'+
              '</div>'+
              '<a class="carousel-control-prev" href="#'+res_slider_id+'" data-slide="prev">'+
              '<span class="carousel-control-prev-icon"></span>'+
              '</a>'+
              '<a class="carousel-control-next" href="#'+res_slider_id+'" data-slide="next">'+
              '<span class="carousel-control-next-icon"></span>'+
              '</a>'+
            '</div>'+
            '<a href="/rooms/'+roomid+'" target="_blank">'+
            '<div style=" float:left; cursor:pointer;" onmouseover="this.style.color=\'blue\';" onmouseout="this.style.color=\'black\';" width="200">'+
             rent+'<br/>'+dates[0]+'<br/>Ambedkar Colony'+
            '</div>'+
            '</a>'+
            '<div class="profile" style=" float:right;">'+
              '<a href="/users/'+userid+'" target="_blank">'+
              '<img style="top:30px; bottom: 10px" src="//placehold.it/100x100/000/fff?text=" class="img-thumbnail" width="100" height="100">'+
              '<br>'+
              '</a>'+
              '<span>Dattatreya, 21</span>'+
            '</div>'+
          '</div>'+
        '</div>';
  $("#sliderrow").append(content);
}

function initMap()
{
      var autocomplete = new google.maps.places.Autocomplete(search);
      autocomplete.setComponentRestrictions({'country': ['in']});
      google.maps.event.addListener(autocomplete, 'place_changed', function()
      {
        var place = autocomplete.getPlace();
        lat.value = place.geometry.location.lat();
        lng.value = place.geometry.location.lng();
        showMap();
      });
}

function createpopup()
{
  count++;
  var ele = document.createElement('div');
  ele.setAttribute('id','popup'+count);
  ele.style.width="50px";
  ele.style.height="32px";
  ele.style.textAlign = "center";
  //line-height: 70px;
  ele.style.lineHeight ="20px";
  document.getElementById('map').appendChild(ele);
  return ele;
}

/** Defines the Popup class. */
function definePopupClass() {
  Popup = function(position, content) {
    this.position = position;

    content.classList.add('popup-bubble-content');

    var pixelOffset = document.createElement('div');
    pixelOffset.classList.add('popup-bubble-anchor');
    pixelOffset.appendChild(content);

    this.anchor = document.createElement('div');
    this.anchor.classList.add('popup-tip-anchor');
    this.anchor.appendChild(pixelOffset);

    // Optionally stop clicks, etc., from bubbling up to the map.
    this.stopEventPropagation();
  };
  // NOTE: google.maps.OverlayView is only defined once the Maps API has
  // loaded. That is why Popup is defined inside initMap().
  Popup.prototype = Object.create(google.maps.OverlayView.prototype);

  /** Called when the popup is added to the map. */
  Popup.prototype.onAdd = function() {
    this.getPanes().floatPane.appendChild(this.anchor);
  };

  /** Called when the popup is removed from the map. */
  Popup.prototype.onRemove = function() {
    if (this.anchor.parentElement) {
      this.anchor.parentElement.removeChild(this.anchor);
    }
  };

  /** Called when the popup needs to draw itself. */
  Popup.prototype.draw = function() {
    var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
    // Hide the popup when it is far out of view.
    var display =
        Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
        'block' :
        'none';

    if (display === 'block') {
      this.anchor.style.left = divPosition.x + 'px';
      this.anchor.style.top = divPosition.y + 'px';
    }
    if (this.anchor.style.display !== display) {
      this.anchor.style.display = display;
    }
  };

  Popup.prototype.stopEventPropagation = function() {
    var anchor = this.anchor;
    anchor.style.cursor = 'auto';

    [ 'dblclick', 'contextmenu', 'wheel', 'mousedown', 'touchstart',
     'pointerdown']
        .forEach(function(event) {
          anchor.addEventListener(event, function(e) {
            e.stopPropagation();
          });
        });
  };
}
$('.slider-price').on('DOMSubtreeModified',function(){
      showMap();
});
$('.slider-price2').on('DOMSubtreeModified',function(){
      showMap();
});