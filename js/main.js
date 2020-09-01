window.onload = function () {
  var toggleFloatingMenu = function() {
    $( '.js-floating-nav' ).toggleClass( 'is-visible' );
    $( '.js-floating-nav-trigger' ).toggleClass( 'is-open' );
  };

  $( ".background-card" ).css( "min-height", window.screen.availHeight + "px" );
  $( '.js-floating-nav-trigger' ).on( 'click', function(e) {
    e.preventDefault();
    toggleFloatingMenu();
  });
  $( '.js-floating-nav a' ).on( 'click', toggleFloatingMenu );
}

$(document).ready(function() {
	var formModal = $('.contact-modal'),
		formLogin = formModal.find('#close'),
		formContact = formModal.find('#link-envelope'),
		mainNav = $('.social-links');

	// jQuery Form Processor
	$('#contact-form').submit(function(e){
		// grab the form. Use the form id
		var form = $('#contact-form');

		// send form data to mailer.php
		$.ajax({
			type: 'POST',
			url: form.attr('action'),
			data: form.serialize(),
			success: function(ajaxOutput) {
				// clear the output area's formatting
				$("#output-area").css("display", "");

				// write the server's reply to the output area
				$("#output-area").html(ajaxOutput);

				// reset the form if it was successful
				if($(".alert-success").length >= 1) {
					$("#contact-form")[0].reset();
				}
			}
		});
		e.preventDefault();
	});// end jQuery Form Processor

	//open modal
	// mainNav.on('click', function(event){
	// 	$(event.target).is(mainNav) && mainNav.children('ul').toggleClass('is-visible');
	// });

	//open contact form
	mainNav.on('click', '.link-envelope', contact_selected);

	//close modal
	formModal.on('click', function(event){
		if( $(event.target).is(formModal) || $(event.target).is('.close-form') ) {
			formModal.removeClass('is-visible');
		}
	});
	//close modal when clicking the esc keyboard button
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		formModal.removeClass('is-visible');
	    }
    });

	function contact_selected(){
		mainNav.children('ul').removeClass('is-visible');
		formModal.addClass('is-visible');
		formLogin.removeClass('is-selected');
		formContact.addClass('is-selected');
		formForgotPassword.removeClass('is-selected');
		tabLogin.removeClass('selected');
		tabContact.addClass('selected');
	}

// Will automatically generate current position lenght of time
  Date.daysBetween = function( date1, date2 ) {
    //Get 1 day in milliseconds
    var oneDay=1000*60*60*24;

    // Convert both dates to milliseconds
    var date1Ms = date1.getTime();
    var date2Ms = date2.getTime();

    // Calculate the difference in milliseconds
    var differenceMs = date2Ms - date1Ms;

    // Convert back to days and return
    return Math.round(differenceMs/oneDay);
  }

  //Set the two dates
  var startDate = new Date(2020, 2, 0); //YEAR MONTH DAY ZERO INDEXED
  var currentDate = new Date();

  //this will seperate months and days
  function yearsMonths(x) {
  	var years = 365;
  	var days = 31;
  	var remainder = x % years;
  	var casio = remainder % days;
  	year = (x - remainder) / years;
  	month = (remainder - casio) / days;

    //This will change the word to either year, years, or exclude it
  	if(year == 1) {
    	var yearResult = year + " year";
    } else if(year > 1){
    	var yearResult = year + " years";
    } else {
    	var yearResult = "";
    }
    //This will change the word to either month, months, or exclude it
    if(month == 1) {
    	var monthResult = month + " month";
    } else if(month > 1){
    	var monthResult = month + " months";
    } else {
    	var monthResult = "";
    }
  	var result = yearResult + " " + monthResult;

  	return result;
  }
  // to inject into dom
  var smallDates = yearsMonths(Date.daysBetween(startDate, currentDate));
  $('#smallDates').html(smallDates);

  var bigDates = yearsMonths(Date.daysBetween(startDate, currentDate));
  $('#bigDates').html(bigDates);

	//REMOVE THIS - it's just to show error messages
	formLogin.find('input[type="submit"]').on('click', function(event){
		event.preventDefault();
		formLogin.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
	});
	formSignup.find('input[type="submit"]').on('click', function(event){
		event.preventDefault();
		formSignup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
	});


	//IE9 placeholder fallback
	//credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
	if(!Modernizr.input.placeholder){
		$('[placeholder]').focus(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
		  	}
		}).blur(function() {
		 	var input = $(this);
		  	if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.val(input.attr('placeholder'));
		  	}
		}).blur();
		$('[placeholder]').parents('form').submit(function() {
		  	$(this).find('[placeholder]').each(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
			 		input.val('');
				}
		  	})
		});
	}

});


//credits http://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
jQuery.fn.putCursorAtEnd = function() {
	return this.each(function() {
    	// If this function exists...
    	if (this.setSelectionRange) {
      		// ... then use it (Doesn't work in IE)
      		// Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
      		var len = $(this).val().length * 2;
      		this.focus();
      		this.setSelectionRange(len, len);
    	} else {
    		// ... otherwise replace the contents with itself
    		// (Doesn't work in Google Chrome)
      		$(this).val($(this).val());
    	}
	});
};
