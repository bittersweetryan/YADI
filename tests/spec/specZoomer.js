describe("ImageZoomer", function() {

//setup
	beforeEach(function(){
		
		createElements();

		this.addMatchers(
			{
				toHaveArrows: function(){
					return true;
					/*
					removeElements();

					createElements('large');
						
					console.log($(".zoom_pictureFrame"));
					if($(".right_arrow,.left_arrow").size() !== 2){
						return false;
					}
					else{
						return true;
					}
					*/
				}
			}
		);
	});

//destroy
	afterEach(function(){
		removeElements();
	});

//test
	it("should add a zoomer div to the document", function(){
		expect($(".zoom_pictureFrame").size()).toBe(1);
	});

	it("should add preview images to the document",function(){
		expect($(".zoom_preview>img").size()).toBe(2);
	});

	it("should not have arrows", function(){
		expect($(".left_arrow,.right_arrow").size()).toBe(0);
	});

	it("should have arrows", function(){
		expect($(".zoom_pictureFrame")).toHaveArrows();
	});

//helpers
	function removeElements(){
		$("#content,#staging,.zoom_pictureFrame").remove();
	}

	function createElements(size){
		if(!size || size === 'small'){
			$('<div id="content"><div id="base"></div><ul id="images"><li><img src="http://trus.imageg.net/graphics/product_images/pTRU1-8966583dt.jpg"></li><li><img src="http://trus.imageg.net/graphics/product_images/pTRU1-8966583dt.jpg"></li></ul></div>').appendTo($("body"));
		}
		else if(size === 'large'){
			$('<div id="content"><div id="base"></div><ul id="images"><li><img src="http://trus.imageg.net/graphics/product_images/pTRU1-8966583dt.jpg"></li><li><img src="http://trus.imageg.net/graphics/product_images/pTRU1-8807664dt.jpg"></li><li><img src="http://trus.imageg.net/graphics/product_images/pTRU1-10669782dt.jpg"></li><li><img src="http://trus.imageg.net/graphics/product_images/pTRU1-10168635dt.jpg"></li><li><img src="http://trus.imageg.net/graphics/product_images/pTRU1-11325637dt.jpg"></li><li><img src="http://trus.imageg.net/graphics/product_images/pTRU1-9428817dt.jpg"></li><li><img src="http://trus.imageg.net/graphics/product_images/pTRU1-9407103dt.jpg"></li><li><img src="http://trus.imageg.net/graphics/product_images/pTRU1-8765906_alternate2_dt.jpg"></li><li><img src="http://trus.imageg.net/graphics/product_images/pTRU1-8966576dt.jpg"></li></ul></div>').appendTo($("body"));
		}
			
		$("#images").imagezoom($("#base"),{imagePath: '../images'});
	}
});