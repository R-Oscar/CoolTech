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
	// ----------------VIEWS------------------------
	// ---------------------------------------------
	var current = 'table';

	$('.page-view__grid').click(function(event) {
		event.preventDefault();
		if (current === 'table') 
		{
			// List
			var list = $('ul.products');
			list.removeClass().addClass('products__grid');
			// List Elements
			var listElement = $('li.products__item');
			listElement.each(function() {
				$(this).removeClass().addClass('products__item__grid');

				// Containers
				$(this).find('.products__left-col').removeClass().addClass('products__top-container');
				$(this).find('.products__middle-col').removeClass().addClass('products__price-container');
				$(this).find('.products__right-col').removeClass().addClass('products__bottom-container');

				// Elements
				// Inserting name
				var name = $(this).find('.h2').text();
				console.log(name);
				$(this).find('.products__id').empty().removeClass().addClass('products__name-container').append('<h3 class="h3">' + name + '</h3>');

				var products_info = {
					"Тип SIM-карты": "Micro-SIM",
					"Количество SIM-карт": "1",
					"Цвет": "Белый",
					"ОС": "Android",
					"Связь 3G": "Есть",
					"4G (LTE)": "Нет",
					"GPS-модуль": "Есть"
				}

				var table_elem = '<table class="products__info">';
				$.each(products_info, function(index, val) {
					 table_elem += '<tr class="products__info-row">';
					 table_elem += '<td class="products__info-field">' + index + '</td>';
					 table_elem += '<td class="products__info-value">' + val + '</td></tr>';
				});
				table_elem += '</table>';

				// Inserting table
				$(this).find('.products__top-container').after(table_elem);

				// Replacing rating block
				var rating = $(this).find('.products__rating').addClass('products__rating__grid').detach();
				$(this).find('.products__info').after(rating);

				// Emptying old title and description
				$(this).find('h2').remove();
				$(this).find('p').remove();

				// Replacing price block
				var price = $(this).find('.products__price').detach();
				$(this).find('.products__price-container').append(price);

				// Replacing avail block
				var avail = $(this).find('.products__availability').addClass('products__availability__grid').detach();
				$(this).find('.products__bottom-container').prepend(avail);

				// Restyling button
				$(this).find('.products__order-button').addClass('products__order-button__grid');
			});

			current = 'grid';
		}
	});

	$('.page-view__table').click(function(event) {
		event.preventDefault();

		if (current === 'grid') {
			// List
			$('ul.products__grid').removeClass().addClass('products');
			var listElement = $('li.products__item__grid');

			listElement.each(function() {
				$(this).removeClass().addClass('products__item');
				$(this).find('.products__top-container').removeClass().addClass('products__left-col');
				$(this).find('.products__price-container').removeClass().addClass('products__middle-col');
				$(this).find('.products__bottom-container').removeClass().addClass('products__right-col');

				$(this).find('table.products__info').remove();
				var name = $(this).find('.h3').text();
				$(this).find('.products__name-container').empty().removeClass().addClass('products__id').append('<span class="products__unit">Артикул</span> 189238');

				$(this).find('.products__middle-col').append('<h2 class="h2">' + name + '</h2>');
				$(this).find('.products__middle-col').append('<p>Смартфон Samsung GT-I9301I GALAXY S 3 Ceramic White Моноблок, Micro-SIM, Android 4.4, 3G, Bluetooth 4.0, EDGE, GPRS, WAP, Wi-Fi, Количество ядер процессора 4, Частота процессора 1400 МГц...</p>');
				
				var rating = $(this).find('.products__rating__grid').removeClass().addClass('products__rating').detach();
				$(this).find('.products__middle-col').append(rating);

				var buttonBlock = $(this).find('.products__order-button__grid').removeClass().addClass('products__order-button').detach();
				$(this).find('.products__right-col').prepend(buttonBlock);

				var priceBlock = $(this).find('.products__price').detach();
				$(this).find('.products__right-col').prepend(priceBlock);

				$(this).find('.products__availability__grid').removeClass().addClass('products__availability');
				
				current = 'table';
			});
		}
	});

	$('.page-view__list').click(function(event) {
		event.preventDefault();

		if (current == "table") {
			var product = $('li.products__item');
			product.each(function() {
				var prodID = $(this).find('.products__id').removeClass().addClass('products__id__list').detach();
				var prodName = $(this).find('.h2').text();
				var prodPrice = $(this).find('.products__price').removeClass().addClass('products__price__list').detach();
				var prodAvail = $(this).find('.products__availability').removeClass().addClass('products__availability__list').detach();
				var prodButton = $(this).find('.products__order-button').removeClass().addClass('products__order-button__list').detach();

				$(this).empty();
				$(this).append(prodID);
				$(this).append('<div class="products__name__list">' + prodName + '</div>');
				$(this).append(prodPrice);
				$(this).append(prodAvail);
				$(this).append(prodButton);

				current = 'list';
			});
		}
	});

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