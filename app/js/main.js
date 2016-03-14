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

	var products_info = {
		"Тип SIM-карты": "Micro-SIM",
		"Количество SIM-карт": "1",
		"Цвет": "Белый",
		"ОС": "Android",
		"Связь 3G": "Есть",
		"4G (LTE)": "Нет",
		"GPS-модуль": "Есть"
	}

	$('.page-view__grid').click(function(event) {
		event.preventDefault();
		if (current === 'table') 
		{
			// List
			var list = $('ul.products');
			list.resetClass('products__grid');
			// List Elements
			var listElement = $('li.products__item');
			listElement.each(function() {
				$(this).resetClass('products__item__grid');

				// Containers
				$(this).find('.products__left-col').resetClass('products__top-container');
				$(this).find('.products__middle-col').resetClass('products__price-container');
				$(this).find('.products__right-col').resetClass('products__bottom-container');

				// Elements
				// Inserting name
				var name = $(this).find('.h2').text();
				console.log(name);
				$(this).find('.products__id').empty().resetClass('products__name-container').append('<h3 class="h3">' + name + '</h3>');

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
		} else if (current === "list") {
			$('.products').resetClass('products__grid');
			var product = $('li.products__item');
			product.each(function() {
				product.resetClass('products__item__grid');
				$(this).append('<div class="products__top-container"></div>');
				$(this).append('<div class="products__price-container"></div>');
				$(this).append('<div class="products__bottom-container"></div>');

				topContainer = $(this).find('.products__top-container');
				priceContainer = $(this).find('.products__price-container');
				botContainer = $(this).find('.products__bottom-container');

				topContainer.append('<div class="products__main-image"> \
					<img src="images/content/shop_03.png" alt="' + name + '" class="products__image-center"</div>');
				
				var thumbBlock = '<div class="products__thumbnails">';
				for (var i = 0; i < 3; i++) {
					thumbBlock += '<div class="products__thumbnail"></div>';
				}
				thumbBlock += '</div>';
				topContainer.append(thumbBlock);

				var name = $(this).find('.products__name__list').text();
				$(this).find('.products__name__list').remove();

				var nameBlock = '<div class="products__name-container">';
				nameBlock += '<h3 class="h3">' + name + '</h3></div>';
				topContainer.append(nameBlock);

				var table_elem = '<table class="products__info">';
				$.each(products_info, function(index, val) {
					 table_elem += '<tr class="products__info-row">';
					 table_elem += '<td class="products__info-field">' + index + '</td>';
					 table_elem += '<td class="products__info-value">' + val + '</td></tr>';
				});
				table_elem += '</table>';
				topContainer.after(table_elem);

				var ratingBlock = '<div class="products__rating__grid" data-rating="4"></div>';
				$(this).find('.products__info').after(ratingBlock);

				var prodPrice = $(this).find('.products__price__list').resetClass('products__price').detach();
				priceContainer.append(prodPrice);

				var availBlock = $(this).find('.products__availability__list').resetClass('products__availability__grid').detach();
				botContainer.append(availBlock);

				var buttonBlock = $(this).find('.products__order-button__list').resetClass('products__order-button__grid').detach();
				botContainer.append(buttonBlock);

				$('.products__id__list').remove();

				current = 'grid';
			});
		}
	});

	$('.page-view__table').click(function(event) {
		event.preventDefault();

		if (current === 'grid') {
			// List
			$('ul.products__grid').resetClass('products');
			var listElement = $('li.products__item__grid');

			listElement.each(function() {
				$(this).resetClass('products__item');
				$(this).find('.products__top-container').resetClass('products__left-col');
				$(this).find('.products__price-container').resetClass('products__middle-col');
				$(this).find('.products__bottom-container').resetClass('products__right-col');

				$(this).find('table.products__info').remove();
				var name = $(this).find('.h3').text();
				$(this).find('.products__name-container').empty().resetClass('products__id').append('<span class="products__unit">Артикул</span> 189238');

				$(this).find('.products__middle-col').append('<h2 class="h2">' + name + '</h2>');
				$(this).find('.products__middle-col').append('<p>Смартфон Samsung GT-I9301I GALAXY S 3 Ceramic White Моноблок, Micro-SIM, Android 4.4, 3G, Bluetooth 4.0, EDGE, GPRS, WAP, Wi-Fi, Количество ядер процессора 4, Частота процессора 1400 МГц...</p>');
				
				var rating = $(this).find('.products__rating__grid').resetClass('products__rating').detach();
				$(this).find('.products__middle-col').append(rating);

				var buttonBlock = $(this).find('.products__order-button__grid').resetClass('products__order-button').detach();
				$(this).find('.products__right-col').prepend(buttonBlock);

				var priceBlock = $(this).find('.products__price').detach();
				$(this).find('.products__right-col').prepend(priceBlock);

				$(this).find('.products__availability__grid').resetClass('products__availability');
				
				current = 'table';
			});
		} else if (current === 'list') {
			var product = $('li.products__item');
			product.each(function() {
				$(this).append('<div class="products__left-col"></div>');
				$(this).append('<div class="products__middle-col"></div>');
				$(this).append('<div class="products__right-col"></div>');

				var leftCol = $(this).find('.products__left-col');
				var midCol = $(this).find('.products__middle-col');
				var rightCol = $(this).find('.products__right-col');

				var name = $(this).find('.products__name__list').text();
				$(this).find('.products__name__list').remove();

				leftCol.prepend('<div class="products__main-image"> \
					<img src="images/content/shop_03.png" alt="' + name + '" class="products__image-center"</div>');

				var thumbBlock = '<div class="products__thumbnails">';
				for (var i = 0; i < 3; i++) {
					thumbBlock += '<div class="products__thumbnail"></div>';
				}
				thumbBlock += '</div>';
				leftCol.append(thumbBlock);

				var prodID = $(this).find('.products__id__list').resetClass('products__id').detach();
				leftCol.append(prodID);

				midCol.append('<h2 class="h2">' + name + "</h2>");
				midCol.append('<p>Смартфон Samsung GT-I9301I GALAXY S 3 Ceramic White Моноблок, Micro-SIM, Android 4.4, 3G, Bluetooth 4.0, EDGE, GPRS, WAP, Wi-Fi, Количество ядер процессора 4, Частота процессора 1400 МГц...</p>');
				midCol.append('<div class="products__rating" data-rating="4"></div>');
	
				var prodPrice = $(this).find('.products__price__list').resetClass('products__price').detach();
				rightCol.append(prodPrice);

				var prodButton = $(this).find('.products__order-button__list').resetClass('products__order-button').detach();
				rightCol.append(prodButton);

				var availBlock = $(this).find('.products__availability__list').resetClass('products__availability').detach();
				rightCol.append(availBlock);

				current = "table";
			});	
		} // end if
	});

	$('.page-view__list').click(function(event) {
		event.preventDefault();

		if (current === "table") {
			var product = $('li.products__item');
			product.each(function() {
				var prodID = $(this).find('.products__id').resetClass('products__id__list').detach();
				var prodName = $(this).find('.h2').text();
				var prodPrice = $(this).find('.products__price').resetClass('products__price__list').detach();
				var prodAvail = $(this).find('.products__availability').resetClass('products__availability__list').detach();
				var prodButton = $(this).find('.products__order-button').resetClass('products__order-button__list').detach();

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

	$.fn.resetClass = function (newClass) {
		return this.removeClass().addClass(newClass);
	}
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