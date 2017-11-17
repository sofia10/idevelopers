$().ready(function(){
	var slideCounter = 0;
	var slideLength = $('.animate .item').length;

	var bullets = "<div class='bullets'>";
	for(i = 0; i < slideLength; i++){
		var img = $(".animate .item .appimg");
		if(i == 0)
		var bullet = "<span class='active' onclick='slide(this)'><div class='rotate'><img src='"+$(img).attr('src')+"'></div></span>";
		else
		var bullet = "<span onclick='slide(this)'><div class='rotate'><img src='"+$(img).attr('src')+"'></div></span>";
		bullets += bullet;
	}
	bullets += "</div>";
	$(".animate").append(bullets);


function slide(that){
	var activeindex = $(".animate .item.active").index();
	var index = $(that).index();

	$(".animate .item.active").addClass('prev');
	setTimeout(function(){
		$(".animate .item").removeClass('active').removeClass('prev');
		$(".animate .item").eq(index).addClass('active');
	},2000);
	
	$(".bullets span").removeClass('active');
	$(that).addClass('active');
	
}

// slider

var slide = 0;

$(".bullets span").click(function(){
  var i = $(this).index();
  slide = i;
  var that = this;
  $(".item.active").addClass('out');
  setTimeout(function(){
    $(".item").removeClass('active').removeClass('out');
    $(".bullets span").removeClass('active');
    $(that).addClass('active');
    $(".item").eq(i).addClass('active');
  },1500);
});



/*burger menu*/

var overlayNav = $('.cd-overlay-nav'),
		overlayContent = $('.cd-overlay-content'),
		navigation = $('.cd-primary-nav'),
		toggleNav = $('.cd-nav-trigger');

	//inizialize navigation and content layers
	layerInit();
	$(window).on('resize', function(){
		window.requestAnimationFrame(layerInit);
	});

	//open/close the menu and cover layers
	toggleNav.on('click', function(){
		if(!toggleNav.hasClass('close-nav')) {
			//it means navigation is not visible yet - open it and animate navigation layer
			toggleNav.addClass('close-nav');
			
			overlayNav.children('span').velocity({
				translateZ: 0,
				scaleX: 1,
				scaleY: 1,
			}, 500, 'easeInCubic', function(){
				navigation.addClass('fade-in');
			});
		} else {
			//navigation is open - close it and remove navigation layer
			toggleNav.removeClass('close-nav');
			
			overlayContent.children('span').velocity({
				translateZ: 0,
				scaleX: 1,
				scaleY: 1,
			}, 500, 'easeInCubic', function(){
				navigation.removeClass('fade-in');
				
				overlayNav.children('span').velocity({
					translateZ: 0,
					scaleX: 0,
					scaleY: 0,
				}, 0);
				
				overlayContent.addClass('is-hidden').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					overlayContent.children('span').velocity({
						translateZ: 0,
						scaleX: 0,
						scaleY: 0,
					}, 0, function(){overlayContent.removeClass('is-hidden')});
				});

				if($('html').hasClass('no-csstransitions')) {
					overlayContent.children('span').velocity({
						translateZ: 0,
						scaleX: 0,
						scaleY: 0,
					}, 0, function(){overlayContent.removeClass('is-hidden')});
				}
			});
		}
	});

	function layerInit(){
		var diameterValue = (Math.sqrt( Math.pow($(window).height(), 2) + Math.pow($(window).width(), 2))*2);
		overlayNav.children('span').velocity({
			scaleX: 0,
			scaleY: 0,
			translateZ: 0,
		}, 50).velocity({
			height : diameterValue+'px',
			width : diameterValue+'px',
			top : -(diameterValue/2)+'px',
			left : -(diameterValue/2)+'px',
		}, 0);

		overlayContent.children('span').velocity({
			scaleX: 0,
			scaleY: 0,
			translateZ: 0,
		}, 50).velocity({
			height : diameterValue+'px',
			width : diameterValue+'px',
			top : -(diameterValue/2)+'px',
			left : -(diameterValue/2)+'px',
		}, 0);
	}
});
