$(document).ready(function(){
  var _wh;
  var _nowID=0;
  var _windowTop=0;
  var sn6more_now=0;
  var sn6moreMax=0;
  

  var o={
    line1Bg:$('#line1Bg'),
    wrapper:$('.wrapper'),
    dotNavA:$('.dotNav a'),
    w_w:$('.wrapper .scroll'),
    body:$('body'),
    //bgColor:['#0f9596','#f5a60d','#ef6703','#ff8c8','#95c660','#95c660'],
    offsetTop_s:[],
    offsetTop_oo:[
    $('.sn1-1').offset().top,
    $('.sn2-1').offset().top,
    $('.sn2-4').offset().top,
    $('.sn2-3').offset().top,
    $('.sn3-1').offset().top,
    $('.sn3-4').offset().top,
    $('.sn3-3').offset().top,
    $('.sn4-1').offset().top,
    $('.sn4-3').offset().top
    //$('.sn5-1').offset().top, mity mark
    //$('.sn5').offset().top, //mity add
    //$('.sn5-3').offset().top,
    ],
    tarray:[
      $('.sn1-1,.sn1-2,.sn1-3,.sn1-4'),
      $('.sn2-1,.sn2-2,.sn2-3,.sn2-4,.sn2-5'),
      $('.sn3-1,.sn3-2,.sn3-3,.sn3-4,.sn3-5'),
      $('.sn4-1,.sn4-2,.sn4-3,.sn4-4,.sn4-5')
      //$('.sn5-1,.sn5-2,.sn5-3,.sn5-4'),
    ],
    frame5:$('.frame5'),
    sn6MoreBtn:$('.sn6 .btnbar2 a')
  }


  if(o.frame5.length>0){
    sn6moreMax=o.frame5.length;
    function f5r_ListHD(_i){
      var _list=o.frame5.eq(_i);
      var _listMax=((_list.find('.lt4I').length)/4)|0;
      var _other=((_list.find('.lt4I').length)%4);
      var _listNow=0;

      _list.on( "init",function(){
        _listMax=((_list.find('.lt4I').length)/4)|0;
        _other=((_list.find('.lt4I').length)%4);
        _listNow=0;

        $(_list.find('.func1 a')).removeClass('on');
        if(_listMax>0 && _other==0) _listMax=_listMax-1;
        if(_listMax-1>=0) $(_list.find('.func1 a')).eq(1).addClass('on');

        _list.find('.lt4').css('top',_listNow*352);
      });

      //console.log(_listMax+'********_other-->'+_other+'********listid-->'+_i+'---length'+(_list.find('.lt4I').length));

      if(_listMax>0 && _other==0){_listMax=(_listMax-1);}
      if(_listMax-1<0){$(_list.find('.func1 a')).removeClass('on');}
      else{ $(_list.find('.func1 a')).eq(1).addClass('on');}
      
      //console.log('after--'+_listMax+'********_other-->'+_other+'********listid-->'+_i);

      $(_list.find('.func1 a')).eq(0).click(function(){
          _listNow++;
          //console.log(_listNow+'******++****'+_i)
          _list.find('.func1 a').eq(1).addClass('on');
          if(_listNow>=(_listMax-1))$(this).removeClass('on');
          _list.find('.lt4').css('top',_listNow*352);
      });

      $(_list.find('.func1 a')).eq(1).click(function(){
          _listNow--;
          //console.log(_listNow+'******--****'+_i);
          _list.find('.func1 a').eq(0).addClass('on');
          if(_listNow<=0)$(this).removeClass('on');
          _list.find('.lt4').css('top',_listNow*352);
      })



    }
    //o.frame5.each(function(i){  //mity mark
      //  f5r_ListHD(i); //mity mark
      //}) //mity mark
  }

  o.dotNavA.each(function(i){
    $(this).click(function(){
      _nowID=i;
      var _top=o.offsetTop_s[_nowID];
      TweenLite.to(o.wrapper, 0.8, {scrollTo:{y:_top}, ease:Power2.easeOut});
    })
  }) 

  /*resize*/
  $(window).resize(function(){
    resizeHD();
  })
  function resizeHD(){
    


    _wh=$(window).height();

    $('.menu').css('width',o.w_w.width());

    o.line1Bg.css('height',_wh-105);

    for (var i = 0; i < 5; i++) {
      o.offsetTop_s[i]=$('#sn'+(i+1)).offset().top-105+45;
      if(i==0) o.offsetTop_s[i]=0;
    }; 
  }
  resizeHD();
  /*scroll*/

  o.wrapper.scroll(function(){
    scrollHD();
  })

  o.wrapper.mousewheel(function (e){
    var scrollNum=''
    if(e.deltaY < 0){ 
      scrollNum=((_nowID+1)<5)?o.offsetTop_s[_nowID+1]:'+=100'; 
    }else{
      var nowscrolltop=o.wrapper.scrollTop();
      scrollNum=((nowscrolltop-100)>(o.offsetTop_s[4]-50))?'-=100':o.offsetTop_s[_nowID-1];
    }

    TweenLite.to(o.wrapper, 0.5, {scrollTo:{y:scrollNum}, ease:Power2.easeOut});
    return false;
  });

  
  function scrollHD(){ 
    var _scrolltop=o.wrapper.scrollTop(); 
   // console.log(_scrolltop+'**************');   //mity mark
    if(_scrolltop<(o.offsetTop_s[1]-_wh/2)){
      _nowID=0;
      o.tarray[0].addClass('on');
      o.tarray[1].removeClass('on');
      o.tarray[2].removeClass('on');
      o.tarray[3].removeClass('on');
      //o.tarray[4].removeClass('on');
      sn6moreMaxHD();
    }else if(_scrolltop<(o.offsetTop_s[2]-_wh/2)){
      _nowID=1;
      o.tarray[1].addClass('on');
      o.tarray[2].removeClass('on');
      o.tarray[3].removeClass('on');
      //o.tarray[4].removeClass('on');
      sn6moreMaxHD();
    }else if(_scrolltop<(o.offsetTop_s[3]-_wh/2)){
      _nowID=2;
      o.tarray[2].addClass('on');
      o.tarray[3].removeClass('on');
      //o.tarray[4].removeClass('on');
      sn6moreMaxHD();
    }else if(_scrolltop<(o.offsetTop_s[4]-_wh/2)){
      _nowID=3;
      o.tarray[3].addClass('on');
      //o.tarray[4].removeClass('on');
      sn6moreMaxHD();
    }
    // else if(_scrolltop<(o.offsetTop_s[5]-_wh/2)){
    //   _nowID=4;
    //   o.tarray[4].addClass('on');
    //   sn6moreMaxHD();
    // }
    else{
      _nowID=4;
      if(sn6moreMax>0){
        o.frame5.eq(0).fadeIn();
        if(sn6moreMax>1){
          o.frame5.eq(1).fadeIn();

          //console.log(sn6moreMax+'sn6moreMaxmax-->'+sn6more_now);   //mity mark
            //if((sn6moreMax-1)<=sn6more_now) o.sn6MoreBtn.css('display','none');   //mity mark
            //else o.sn6MoreBtn.css('display','block');   //mity mark
        }
      } 
    }
    o.dotNavA.eq(_nowID).addClass('on').siblings().removeClass('on');
  }
  scrollHD();

  function sn6moreMaxHD(){
    if(sn6moreMax>0){
      o.frame5.each(function(i){
          $(this).trigger("init");      
      });
        // o.frame5.fadeOut();   //mity mark
      sn6more_now=0;
      if(sn6moreMax>1) sn6more_now=1;
    }
  }

  function sn6MoreShow(){
      var max=((sn6more_now+2)>(sn6moreMax-1))?sn6moreMax:(sn6more_now+2);
      if(sn6moreMax>=max) o.sn6MoreBtn.fadeOut();
      else o.sn6MoreBtn.fadeIn();
      for (var j = sn6more_now+1; j <= max; j++) {
          o.frame5.eq(j).addClass('on').fadeIn();
          sn6more_now++;
      };
  }
  /*sn6btn*/
    //$('.sn6 .btnbar2 a').click(function(){  //mity mark
    //    sn6MoreShow();  //mity mark
    //})      //mity mark

  /*topBtn*/
  $('#topBtn').click(function(){
   TweenLite.to(o.wrapper, 0.5, {scrollTo:0, ease:Power2.easeOut});
  });

})