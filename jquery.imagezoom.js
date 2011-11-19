(function( $ ){
  $.fn.imagezoom = function(base){
      var $this = $(this),
          $pictureFrame = getPictureFrame(),
          $overlay = getOverlay(),
          width = 600,
          height = 400;

      $this.remove();

      //loop through images
      $this.find('li>img').each(function(){
        var $span = $('<span></span>'),
            $this = $(this),
            $newImg = $this.clone();
        
       // $this.data("originalSize",$this.size());
        
        $this.mouseover(function(){
          $this.css("cursor","pointer");
        });

        $this.height(100);

        $this.click(function(){

          if($newImg.height() >= height){
            $newImg.height(height);  
          }
          
          $("#iz_main").find("img").remove().end().append($newImg);
        });
        
        $span.append($this);

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
        
      base.append(getLink());

        function getLink(){
          var $link = $('<div><a href="#">Zoom</a></div>');

          $link.click(function(){
            $overlay.fadeIn('slow',function(){
              $pictureFrame.height(10);
              $pictureFrame.find("#iz_main > img").remove();
              $pictureFrame.show();
              $pictureFrame.animate({width: width, height: height});
            });
          });

          return $link;
        }

      return $this;
  };

  function getOverlay(){
    return $('<div class="zoom_overlay" id="iz_overlay">&nbsp;</div>');
  }

  function getPictureFrame(){
    var $pictureFrame = $('<div class="zoom_pictureFrame" id="iz_pictureFrame" style="width:0; height:0"><div class="zoom_close" id="iz_close"><a href="#">close</a></div><div class="zoom_thumbs" id="iz_thumbs"></div><div class="zoom_main" id="iz_main"></div></div>'),
        height = $(window).height(),
        width = $(document).width();

    $pictureFrame.css({
        'left' : width/2 - 350, 
        'top' : height/2 - 250  
    });

    return $pictureFrame;
  }

})(jQuery);
