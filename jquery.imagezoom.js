(function( $, undefined ){
  $.fn.imagezoom = function(base, options){
	var $this = $(this),
		defaults = {
			width : 700,
			height : 500,
			previewHeight: 50,
			previewDivWidth: 200,
			thumbsWidth: 0,
			imagePath: 'images'
		},
		$stageDiv = createDiv(),
		$pictureFrame = null,
		$overlay = getOverlay(),
		$preview = null,
		arrowsLoaded = false,
		$thumbs = null;

		if(typeof options === 'object'){
			options = $.extend({},defaults,options);
		}
		else{
			options = defaults;
		}

		//cache variables that point to the zoom elements
		$pictureFrame = getPictureFrame(options);
		$preview = getPreview(options);
		$thumbs = getThumbs();

		$("body").append($stageDiv);

		//if no images were found in the li passed in return
		if($this.find('li>img').length === 0){
			$.error("No images were found under the root element.");
		}

		//remove the ul that has the images from the DOM
		$this.remove();

		//loop through images and process each one
		$this.find('li>img').each(function(){

			var $span = $('<span></span>'),
				$thumb = $(this),
				$newImg = $thumb.clone().height(options.height - 100),
				$previewImg = $thumb.clone().height(options.previewHeight);

			$thumb.mouseover(function(){
				$thumb.css("cursor","pointer");
			});

			$thumb.height(100);

			$thumb.click(function(){
				$("#iz_main").find("img").remove().end().append($newImg);
			});

			$previewImg.click(function(){
				show($overlay,$pictureFrame,options);
			}).
			hover(function(){
				$(this).css({"cursor" : "pointer"});
			});

			$span.append($thumb);
			
			$preview.append($previewImg);

			var $stagingImage = $thumb.clone();

			$stagingImage.load(function(){
				options.thumbsWidth += $(this).get(0).clientWidth;

				//add the arrows
				if(options.thumbsWidth > options.width && !arrowsLoaded){
					$rightArrow = createArrow('right');
					$leftArrow = createArrow('left');

					$pictureFrame.append($rightArrow).append($leftArrow);

					$pictureFrame.find(".arrow").on("mouseover", function(){
						if($(this).hasClass("right_arrow")){
							scroll($thumbs,'right');
						}
					});

					arrowsLoaded = true;
				}
			});

			$stageDiv.append($stagingImage);

			$thumbs.append($span);

		}); //end loop through images

		$pictureFrame.prepend($thumbs);
		
		

		//add the close link
		$pictureFrame.find("#iz_close > a").click(function(){

			$pictureFrame.animate({height:0},function(){
				$(this).animate({width:0},function(){
					$pictureFrame.hide();
					$overlay.fadeOut();
				});
			});
		});

		//hide the objects
		$pictureFrame.hide();
		$overlay.hide();

		$pictureFrame.width(0).height(0);

		$preview.append(getLink());
		base.append($preview);
	
	$("body").append($pictureFrame).append($overlay);

	//inner functions, these use vars nested in the plugin
	function scroll($target, direction){
		var scrollAmount = 100;

		$target.animate({"right": scrollAmount});
	}

	function getLink(){
		var $link = $('<div><a href="#">Detailed Images</a></div>');

		$link.click(function(){
			show($overlay,$pictureFrame,options);
		});

		return $link;
	}
		
	return $this;
 };

function createArrow(direction){
	return $('<div class="arrow ' + direction + '_arrow">&nbsp;</div>');
}

function show($overlay,$pictureFrame,options){
	$overlay.fadeIn('slow',function(){
		$pictureFrame.height(0);

		$pictureFrame.find("#iz_main > img").remove();
		$pictureFrame.find("#iz_thumbs > span").find("img").eq(0).click();
		$pictureFrame.find("#iz_thumbs").width(options.thumbsWidth);

		$pictureFrame.show();

		$pictureFrame.animate({width: options.width},function(){
			$pictureFrame.animate({height: options.height},function(){
					$pictureFrame.find("#iz_thumbs").slideDown('slow');
			});
		});
	});
}

function getOverlay(){
	return $('<div class="zoom_overlay" id="iz_overlay">&nbsp;</div>');
}

function getPreview(argument){
	return $('<div class="zoom_preview"></div>');
}

function getPictureFrame(options){
	var $pictureFrame = $('<div class="zoom_pictureFrame" id="iz_pictureFrame"><div class="zoom_close" id="iz_close"><a href="#"><img src="' + options.imagePath + '/close.png"></a></div><div class="zoom_main" id="iz_main"></div></div>'),
		height = $(window).height(),
		width = $(document).width();

	$pictureFrame.css({
		'left' : width/2 - (options.width/2),
		'top' : height/2 - (options.height/2)
	}).
	width(options.width);

	return $pictureFrame;
}

function getThumbs(){
	return $('<div class="zoom_thumbs" id="iz_thumbs"></div>');
}

function createDiv(){
	return	$('<div id="staging"></div>');
}

})(jQuery);
  