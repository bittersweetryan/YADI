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
            $this = $(this);
        
       // $this.data("originalSize",$this.size());
        
        $this.mouseover(function(){
          $this.css("cursor","pointer");
        });

        $this.height(100);

        $this.click(function(){
          $("#main").html('<img src="' + $this.attr("src") + '">');
        });
        
        $span.append($this);

        $pictureFrame.find("#thumbs").append($span);
      });

      $pictureFrame.find("#close > a").click(function(){

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
              $pictureFrame.show();
              $pictureFrame.animate({width: width, height: height});
            });
          });

          return $link;
        }

      return $this;
  };

  function getOverlay(){
    return $('<div class="overlay" id="overlay">&nbsp;</div>');
  }

  function getPictureFrame(){
    var $pictureFrame = $('<div class="pictureFrame" id="pictureFrame" style="width:0; height:0"><div class="close" id="close"><a href="#">close</a></div><div class="thumbs" id="thumbs"></div><div class="main" id="main"></div></div>'),
        height = $(window).height(),
        width = $(document).width();

    $pictureFrame.css({
        'left' : width/2 - 350, 
        'top' : height/2 - 250  
    });

    return $pictureFrame;
  }

})(jQuery);
