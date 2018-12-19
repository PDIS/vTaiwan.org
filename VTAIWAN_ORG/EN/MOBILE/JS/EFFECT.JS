$(window).load(function(){
	$('#shadow').css('height',$('div.wrapper').height() + 100);
});

$(function(){
	var winH = window.innerHeight;
	$('#nav ul').height(winH);

	$('#menuBtnOn').click(function(){
		$('#shadow').show().animate({opacity:0.5},400);
		$('#nav').show().animate({opacity:1,left:0},400);
	});
	$('#menuBtnOff,#shadow').click(function(){
		$('#shadow').animate({opacity:0},400,function(){$(this).hide()});
		$('#nav').animate({opacity:0,left:-455},400,function(){$(this).hide()});
	});

	$('#searchBtn').click(function(){
		if(!$(this).next('div').hasClass('on')){
			$(this).next('div').slideDown(300).addClass('on');
		}else{
			$(this).next('div').slideUp(300).removeClass('on');
		}
	});
	$('#xBtn').click(function(){
		$(this).parent().slideUp(300).removeClass('on');
	});

	$('#topBtn').click(function(){
		$('html, body').animate({scrollTop: 0}, 500);
	});
});