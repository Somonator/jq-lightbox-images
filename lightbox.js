(function($){
	$.fn.lightbox = function() {
		let $all_this = $(this),
				$tpl = $(`
				<div class="lightbox" style="display: none;">
					<div class="img-box"></div>
					<div class="prev" style="display: none;">&larr;</div>
					<div class="next">&rarr;</div>	
					<div class="close">&#9747;</div>	
				</div>
				`),
				$lightbox,
				$prev,
				$next,
				$close,

				image_now,				
				images_roadtrip = [],
				index_roadtrip = 0,				
				images_roadtrip_number = 0,			
				is_roadtrip_image = false,

				setTemplate = function() {
					if (!$('.lightbox').length > 0) {
						$('body').append($tpl);
					}

					return $tpl;
				},
				getImagesRoadtrip = function() {
					let images_roadtrip;

					images_roadtrip = $all_this.filter('[rel*="[roadtrip]"]');

					return images_roadtrip;
				},
				getImageRoadtrip = function(i) {
					return images_roadtrip[i];
				},
				openLightbox = function(event) {
					event.preventDefault();
					
					image_now = $(this);
					is_roadtrip_image = image_now.attr('rel').indexOf('[roadtrip]') != -1;
					index_roadtrip = is_roadtrip_image ? images_roadtrip.filter(image_now).index() - 1 : null;

					setImage();
					manageNav();
					isFull();

					$lightbox.hide();
					$lightbox.fadeIn('slow');
					$('body').addClass('lightbox-overlay');
				},				
				setImage = function() {
					let img = is_roadtrip_image ? getImageRoadtrip(index_roadtrip) : image_now.attr('href'), timer_loading_show;

					$lightbox.find('img').remove();
					$lightbox.find('.img-box').append('<img src="' + img + '" alt="">');
					
					timer_loading_show = setTimeout(function() {
						$lightbox.find('img').hide();
						$lightbox.append('<div class="load">loading</div>');
						$lightbox.addClass('loading');
					}, 2000);

					$lightbox.find('img').on('load', function() {
						$lightbox.find('.load').remove();
						$lightbox.removeClass('loading');
						$(this).show();

						clearTimeout(timer_loading_show);
					});
				},				
				manageNav = function() {
					if (is_roadtrip_image) {
						index_roadtrip == 0 ? $prev.hide() : $prev.show();
						index_roadtrip == images_roadtrip_number ? $next.hide() : $next.show();						
					} else {
						$prev.hide();
						$next.hide();					
					}
				},
				isFull = function() {
					let elem = is_roadtrip_image ? $all_this.closest('[href^="' + images_roadtrip[index_roadtrip] + '"]') : image_now;

					elem.hasClass('full') ? $lightbox.addClass('wow') : $lightbox.removeClass('wow');
				},				
				prevImage = function(event) {
					event.preventDefault();

					index_roadtrip == 0 ? null : index_roadtrip--;

					setImage();
					manageNav();
					isFull();

					$lightbox.hide();
					$lightbox.fadeIn('slow');
				},
				nextImage = function(event) {
					event.preventDefault();

					index_roadtrip == images_roadtrip_number ? null : index_roadtrip++ ;

					setImage();
					manageNav();
					isFull();

					$lightbox.hide();
					$lightbox.fadeIn('slow');
				},
				closelightbox = function(event) {
					event.preventDefault();

					$lightbox.fadeOut('fast');
					$('body').removeClass('lightbox-overlay');
				},
				init = function() {
					$lightbox = setTemplate();
					$prev = $lightbox.find('.prev');
					$next = $lightbox.find('.next');
					$close = $lightbox.find('.close');

					images_roadtrip = getImagesRoadtrip();
					images_roadtrip_number = images_roadtrip.length - 1;

					$lightbox.hide();
				};

		init();
		$all_this.on('click', openLightbox);
		$prev.on('click', prevImage);
		$next.on('click', nextImage);
		$close.on('click', closelightbox);
	};

	$(document).ready(function($){
		$('a[rel*="lightbox"]').lightbox();
	});
})(jQuery);