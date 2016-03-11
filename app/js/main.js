function Rating(element, rating) {
	this.element = element;
	this.rating = rating;
	this.maxRating = 5;
}

Rating.prototype.init = function() {
	for (var i = 0; i < this.rating; i++) {
		this.element.append('<div class="products__rating-star products__rating-star__checked"></div>');
	}

	for (var i = 0; i < this.maxRating - this.rating; i++) {
		this.element.append('<div class="products__rating-star products__rating-star__unchecked"></div>');
	}

	this.element.append('<div class="products__rating-num-container">' + this.rating + '</div>');
}

$(document).ready(function() {
	// ---------------------------------------------
	// ----------------SLIDER-----------------------
	// ---------------------------------------------

	var ratingElem = $('.products__rating');

	ratingElem.each(function() {
		new Rating($(this), parseInt(ratingElem.data('rating'))).init();
	});

	var sliderDiv = $( ".filter__slider" );
	var min = parseInt(sliderDiv.data('min'))
	var max = parseInt(sliderDiv.data('max'))

	sliderDiv.slider({
		range: true,
		min: min,
		max: max,
		step: 500,
		values: [ min, max ],
		slide: function(event, ui) {
			insertValues(ui.values[0], ui.values[1]);
		},
		create: function(event, ui) {
			var values = sliderDiv.slider("values")
			insertValues(values[0], values[1]);
		}
	});

	function insertValues(from, to) {
		$( "#filter__price-from" ).val(from);
		$( "#filter__price-to" ).val(to);	
	}

	// ---------------------------------------------
	// ----------------SELECT-----------------------
	// ---------------------------------------------
	$(".sort__select").select2({
		minimumResultsForSearch: Infinity
	});
});