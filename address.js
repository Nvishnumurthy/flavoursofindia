var formHandler = {
    eachInputChange: function() {
      var inputs = $('input');
      inputs.each(function(e, el) {
        $(el).change(function() {
          var $el = $(this),
            $label = $el.siblings('label');
          if ($el.val() == '' || $el.val() == 'undefined') {
            $el.addClass('isInvalid');
          } else {
            $label.addClass('isFilledIn');
          }
        });
      });
    },
    googlePlaceFinder: function() {
      // This example displays an address form, using the autocomplete feature
      // of the Google Places API to help users fill in the information.
  
      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
  
      var placeSearch, autocomplete;
      var componentForm = {
        // street_number: 'short_name',
        // route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        // country: 'long_name',
        postal_code: 'short_name'
      };
  
      function initAutocomplete() {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
        autocomplete = new google.maps.places.Autocomplete(
          /** @type {!HTMLInputElement} */
          (document.getElementById('route')), {
            types: ['geocode']
          });
  
        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
      console.log(autocomplete);
        autocomplete.addListener('place_changed', fillInAddress);
  
      }
  
      function fillInAddress() {
        console.log("triggered")
        // Get the place details from the autocomplete object.
        var place = autocomplete.getPlace();
  
        for (var component in componentForm) {
          document.getElementById(component).value = '';
          document.getElementById(component).disabled = false;
        }
  
        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
        for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];
          if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
          }
        }
        // API breaks up house number and street name into 2 fields
        // use place.name instead to have 1 field for street address
        document.getElementById('route').value = place.name;
  
        markFilledIn();
      }
  
      // Bias the autocomplete object to the user's geographical location,
      // as supplied by the browser's 'navigator.geolocation' object.
      function geolocate() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
              center: geolocation,
              radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
          });
        }
      }
      var markFilledIn = function() {
        var inputs = $('.billingSection input');
        $(inputs).each(function() {
          console.log($(this).val());
          if ($(this).val() !== '') {
            $(this).siblings('label').addClass('isFilledIn');
          }
        });
      }
      initAutocomplete();
      // Remove Google's placeholder value
      $('#route').attr("placeholder", "");
    },
    init: function() {
      formHandler.eachInputChange();
      formHandler.googlePlaceFinder();
    }
  }
  formHandler.init();