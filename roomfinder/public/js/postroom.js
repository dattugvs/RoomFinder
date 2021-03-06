var currentTab = 0;
showTab(currentTab);

function showTab(n) {
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  fixStepIndicator(n)
}

function nextPrev(n) {
  var x = document.getElementsByClassName("tab");
  if (n == 1 && !validateForm()) return false;
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    document.getElementById("regForm").submit();
    return false;
  }
  showTab(currentTab);
}

function validateForm() {
  var x, y, z, i, valid = true;
  // x = document.getElementsByClassName("tab");
  // y = x[currentTab].getElementsByTagName("input");

  // for (i = 0; i < y.length; i++) {
  //   if (y[i].value == "") {
  //     y[i].className += " invalid";
  //     valid = false;
  //   }
  // }
  // if (valid) {
  //   document.getElementsByClassName("step")[currentTab].className += " finish";
  // }
  return valid;
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}

    $(document).ready(function(){
        $('input[type="checkbox"]').click(function(){
            if($(this).prop("checked") == true){
                console.log("Checkbox is checked.");
            }
            else if($(this).prop("checked") == false){
                console.log("Checkbox is unchecked.");
            }
        });
    });

var $fileInput = $('.file-input');
var $droparea = $('.file-drop-area');

// highlight drag area
$fileInput.on('dragenter focus click', function() {
  $droparea.addClass('is-active');
});

// back to normal state
$fileInput.on('dragleave blur drop', function() {
  $droparea.removeClass('is-active');
});

// change inner text
$fileInput.on('change', function() {
  var filesCount = $(this)[0].files.length;
  var $textContainer = $(this).prev('.js-set-number');

  if (filesCount === 1) {
    // if single file then show file name
    $textContainer.text($(this).val().split('\\').pop());
  } else {
    // otherwise show number of files
    $textContainer.text(filesCount + ' files selected');
  }
});

function activatePlacesSearch()
    {
      var zipCode = document.getElementById('zip');
      var input = document.getElementById('street');
      var state = document.getElementById('state');
      var city = document.getElementById('city');
      var location = document.getElementById('location');
      var postalCode;
      autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.setComponentRestrictions({'country': ['in']});
      google.maps.event.addListener(autocomplete, 'place_changed', function()
      {
        var place = autocomplete.getPlace();
        console.log(JSON.stringify(place));
        var address = place.formatted_address.split(', ');
        console.log(address);
        var len = address.length;
        if(len-2 >= 0)
        {
            var firstDigit = address[len-2].match(/\d/);
            var index = address[len-2].indexOf(firstDigit);
            if(index!=-1)
            {
              state.value = address[len-2].substring(0, index)
              zip.value = address[len-2].substring(index);
              zip.readOnly = true;
            }
            else
            {
              state.value = address[len-2];
              zip.value = "";
            }
            state.readOnly = true;
        }
        else
          state.value="";

        if(len-3 >= 0)
        {
          city.value = address[len-3];
          city.readOnly = true;
        }
        else
          city.value="";

        len = len-4;
        var str="";
        for(; len>=0 ; len--)
            str = str+" " +address[len];
        street.value = str;

        location.value= (place.geometry.location);

      });
    }