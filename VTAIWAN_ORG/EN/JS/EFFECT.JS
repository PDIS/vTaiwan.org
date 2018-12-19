$(document).ready(function(){
	function ifclass(d,fn){
		d = $(d);
		if( d.length > 0 && typeof(fn) == 'function'){
			fn(d);
		};
	}

	//nav
	var navLi = $('#nav > ul > li');
	var subNav = $('div.subnav');
	navLi.each(function(){
		$(this).hover(function(){
			$(this).addClass('on').find(subNav).slideDown(300);
		},function(){
			$(this).removeClass('on').find(subNav).stop().slideUp(300);
		});
	}).last().find(subNav).css({right:0,margin:0});

	subNav.find('a').each(function(){
		if($(this).html().length > 8){
			$(this).parent(subNav).css({margin:'0 -123px 0 0'}).find('a').css({width:215});
		}
	});

	//submenu focus
	//var navLi = $('#nav').find('li');
	var navNum = navLi.length;
	var navLiA = $('#nav').find('li > a');
	var subnavNum = [];
	var nowFocus;
	var nowNav;
	var firstBlur = 0;
	var lastBlur = false;
	for(i=0;i<navNum;i++){
		navLi.eq(i).attr('num',i);
		subnavNum[i] = navLi.eq(i).children(subNav).children('a').length;
	}
	navLiA.focus(function(){
		$(this).parent().addClass('on');
		$(this).siblings(subNav).slideDown(300);
		firstBlur ++;
		if(firstBlur > 1){
			$(this).parent().next().next().removeClass('on').find(subNav).stop().slideUp(300);
			if(firstBlur = 3){
				$(this).parent().prev().prev().removeClass('on').find(subNav).stop().slideUp(300);
			}
		}
		if(lastBlur){
			//console.log('lastBlur');
			$(this).parent().prev().prev().removeClass('on').find(subNav).stop().slideUp(300);
		}
	});
	subNav.find('a').focus(function(){
		nowNav = $(this).parent().parent().attr('num');
		nowFocus = $(this).index();
		firstBlur = 0;
		if(nowFocus == subnavNum[nowNav]-1){
			lastBlur = true;
		}
	});
	$('a.logo').focus(function(){
		$('#nav').find('li').eq(0).removeClass('on').find(subNav).stop().slideUp(300);
	});
	$('#pagemain').focus(function(){
		$('#nav').find('li:last').removeClass('on').find(subNav).stop().slideUp(300);
	});

	//lt5 style
	$('div.lt5 a:even').css('background','#fff');

	//tableLt1 style
	$('div.tableLt1 td:first').css('border-top','1px solid #dcdcdc');

	//lt9 style
	lt9Func();

	//idx lt3
	ifclass('div.lt3',function (d){
		d.each(function (i){
			var split = $(this).find('li').eq(4);
	    	split.parent().after(split.nextAll().wrapAll('<ul/>').parent());
	    });
	});

});

//lt9 style
function lt9Func(){
	$('div.lt9I').hover(function(){
		$(this).find('div.func').slideDown(200);
	},function(){
		$(this).find('div.func').stop().slideUp(200);
	});
}

equalheight = function(container){
var currentTallest = 0,
     currentRowStart = 0,
     rowDivs = new Array(),
     $el,
     topPosition = 0;
 $(container).each(function() {
   $el = $(this);
   $($el).height('auto')
   topPostion = $el.position().top;

   if (currentRowStart != topPostion) {
     for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
       rowDivs[currentDiv].height(currentTallest);
     }
     rowDivs.length = 0; 
     currentRowStart = topPostion;
     currentTallest = $el.height();
     rowDivs.push($el);
   } else {
     rowDivs.push($el);
     currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
  }
   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
     rowDivs[currentDiv].height(currentTallest);
   }
 });
}
$(window).load(function() {
  equalheight('div.lt10>div');
});