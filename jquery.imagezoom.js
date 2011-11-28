(function( $ ){
  $.fn.imagezoom = function(base, options){
      var $this = $(this),
          
          defaultOptions = {
            width : 700,
            height : 500,
            previewHeight: 50,
            previewDivWidth: 200
          };
      
      var options = options || {};

      $.extend(options, defaultOptions);
      
      //create some new DOM elements
      var $pictureFrame = getPictureFrame(options),
          $overlay = getOverlay(),
          $preview = getPreview(options);
      

      if($this.find('li>img').length === 0){
        return this;
      }

      $this.remove();

      //loop through images
      $this.find('li>img').each(function(){
        var $span = $('<span></span>'),
            $this = $(this),
            $newImg = $this.clone().height(options.height - 100),
            $previewImg = $this.clone().height(options.previewHeight);
        
        $this.mouseover(function(){
          $this.css("cursor","pointer");
        });

        $this.height(100);

        $this.click(function(){
          
          $("#iz_main").find("img").remove().end().append($newImg);
        });
        
        $span.append($this);
        $preview.append($previewImg);

        $pictureFrame.find("#iz_thumbs").append($span);
      });

      $pictureFrame.find("#iz_close > a").click(function(){

          $pictureFrame.animate({width:0,height:0},function(){
            $pictureFrame.hide();
            $overlay.fadeOut();
          });
      });
       
      $pictureFrame.hide();
      $overlay.hide();

      $("body").append($pictureFrame).append($overlay);
      
      $preview.append(getLink());  
      base.append($preview);

      function getLink(){
          var $link = $('<div><a href="#">Detailed Images</a></div>');

          $link.click(function(){
            $overlay.fadeIn('slow',function(){
              $pictureFrame.height(10);
              $pictureFrame.find("#iz_main > img").remove();
              $pictureFrame.find("#iz_thumbs > span").find("img").eq(0).click();
              $pictureFrame.show();
              $pictureFrame.animate({width: options.width, height: options.height});
            });
          });

          return $link;
        }

      return $this;
  };

  function getOverlay(){
    return $('<div class="zoom_overlay" id="iz_overlay">&nbsp;</div>');
  }

  function getPreview(argument){
    return $('<div class="zoom_preview"></div>');
  }

  function getPictureFrame(options){
    var $pictureFrame = $('<div class="zoom_pictureFrame" id="iz_pictureFrame" style="width:0; height:0"><div class="zoom_thumbs" id="iz_thumbs"></div> <div class="zoom_close" id="iz_close"><a href="#">close</a></div><div class="zoom_main" id="iz_main"></div></div>'),
        height = $(window).height(),
        width = $(document).width();

    $pictureFrame.css({
        'left' : width/2 - (options.width/2), 
        'top' : height/2 - (options.height/2)  
    });

    return $pictureFrame;
  }

})(jQuery);
  