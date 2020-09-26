(function($){
	$.fn.lightbox = function() {
		let $all_this = $(this),
			$tpl = $(`
			<div class="lightbox" style="display: none;">
				<div class="img-box"></div>
				<div class="prev nav-item" style="display: none;">&larr;</div>
				<div class="next nav-item">&rarr;</div>	
				<div class="close nav-item">&#9747;</div>	
			</div>
			<div class="lightbox-overlay" style="display: none;"></div>
			`),
			$lightbox,
			$prev,
			$next,
			$close,
			$overlay,

			image_now,				
			images_group = [],
			index_group_now = 0,				
			images_group_number = 0,			
			is_group_image = false,

			setTemplate = function() {
				if (!$('.lightbox').length > 0) {
					$('body').append($tpl);
					$tpl.filter('.lightbox');					
				}

				return $tpl;
			},
			getImagesGroup = function(rel_value) {
				return $all_this.filter('[rel*="' + rel_value + '"]');
			},
			getGroupImage = function(i) {
				return $(images_group[i]);
			},
			checkGroup = function() {
				if (image_now.attr('rel').match(/\[(.*?)\]/)) {
					is_group_image = true;								
					images_group = getImagesGroup(image_now.attr('rel'));
					index_group_now = images_group.index(image_now);				
					images_group_number = images_group.length - 1;		
				} else {
					is_group_image = false;
				}
			},
			checkFull = function() {
				let img = is_group_image ? getGroupImage(index_group_now) : image_now;

				img.hasClass('lightbox-with-scroll') ? $lightbox.addClass('full-with-scroll') : $lightbox.removeClass('full-with-scroll');
			},
			openLightbox = function(event) {
				event.preventDefault();
				
				image_now = $(this);

				checkGroup();
				checkFull();				
				setImage();
				manageNav();

				$lightbox.fadeIn(200);
				$overlay.fadeIn(100);				
				$('body').addClass('lightbox-overflow-hidden');
			},				
			setImage = function() {
				let img = is_group_image ? getGroupImage(index_group_now) : image_now, timeout_show_loading;

				$lightbox.find('img').remove();
				$lightbox.addClass('loading');

				timeout_show_loading = setTimeout(function() {
					$lightbox.append('<div class="load">loading...</div>');
				}, 500);
						
				$lightbox.find('.img-box').append('<img src="' + img.attr('href') + '" alt="">');
				$lightbox.find('img').hide();

				$lightbox.find('img').on('load', function() {
					$lightbox.find('img').fadeIn(200);
					$lightbox.removeClass('loading').find('.load').remove();

					clearTimeout(timeout_show_loading);
				});
			},
			manageNav = function() {
				if (is_group_image) {
					index_group_now == 0 ? $prev.hide() : $prev.show();
					index_group_now == images_group_number ? $next.hide() : $next.show();						
				} else {
					$prev.hide();
					$next.hide();					
				}
			},						
			prevImage = function(event) {
				event.preventDefault();

				index_group_now == 0 ? null : index_group_now--;

				setImage();
				manageNav();
				checkFull();

				$lightbox.hide();
				$lightbox.fadeIn('slow');
			},
			nextImage = function(event) {
				event.preventDefault();

				index_group_now == images_group_number ? null : index_group_now++;

				setImage();
				manageNav();
				checkFull();

				$lightbox.hide();
				$lightbox.fadeIn('slow');
			},
			closelightbox = function(event) {
				event.preventDefault();

				$lightbox.fadeOut(300);
				$overlay.fadeOut(100);
				$('body').removeClass('lightbox-overflow-hidden');
			},
			init = function() {
				$lightbox = setTemplate();
				$prev = $lightbox.find('.prev');
				$next = $lightbox.find('.next');
				$close = $lightbox.find('.close');
				$overlay = $('.lightbox-overlay');
				$lightbox.hide();

				$all_this.on('click', openLightbox);				
				$prev.on('click', prevImage);
				$next.on('click', nextImage);
				$close.on('click', closelightbox);
				$overlay.on('click', closelightbox);
			};

		init();
	};
})(jQuery);