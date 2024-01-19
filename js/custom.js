var myLazyLoad = new LazyLoad({
  elements_selector: ".lazy",
});


$(document).ready(function () {

  wow = new WOW(
          {
          boxClass:     'wow',      // default
          animateClass: 'animated', // default
          offset:       0,          // default
          mobile:       true,       // default
          live:         true        // default
        }
        )
        wow.init();


	var ismobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  window.onload = function(e){
    checkforVideo();
    
    $('.preloader,#primary').addClass('loaded');
      setTimeout(function(){
        $('.preloader').hide();
      },1000);
  }

  
$herovid = $('.video-section.hero video')[0];
function checkforVideo() {
    // var b = setInterval(()=>{
    //   // console.log($('.video-section.hero video')[0].currentTime);
    //     if($herovid && $herovid.readyState === 4){
    //         // ($(".video-section.hero video").length);
    //       $herovid.play();
    //     //if($herovid.currentTime > 2){
    //       // console.log
    //       $('.preloader,#primary').addClass('loaded');
    //       setTimeout(function(){
    //         $('.preloader').hide();
    //       },1000);

    //       clearInterval(b);

    //     }                   
    // },500);
}


 function isScreen(elem,pos) {
    // if the element doesn't exist, abort
    if( elem.length == 0 ) {
      return;
    }
    var $window = jQuery(window);
    var viewport_top = $window.scrollTop();
    var viewport_height = $window.height();
    var viewport_bottom = viewport_top + viewport_height;
    var $elem = jQuery(elem);
    var top = $elem.offset().top;
    var height = $elem.height();
    var bottom = top + height;
    if(pos == 'before')
      return ( viewport_bottom < top );
    else if(pos == 'after')
      return ( bottom < viewport_top);
    return (top >= viewport_top && top < viewport_bottom) ||
    (bottom > viewport_top && bottom <= viewport_bottom) ||
    (height > viewport_height && top <= viewport_top && bottom >= viewport_bottom)
  }
  function OnScreenPercent(elem) {
    if( elem.length == 0 || !isScreen(elem)) {
      return;
    }
    var $window = jQuery(window);
    var viewport_top = $window.scrollTop();
    var viewport_height = $window.height();
    var viewport_bottom = viewport_top + viewport_height;
    var $elem = jQuery(elem);
    var top = $elem.offset().top;
    var height = $elem.height();
    var bottom = top + height;

    var distance = viewport_bottom - top;
    var percent = distance / ((viewport_height + height) / 100);
    return percent;

  }
  $(window).bind('scroll',function(){

    if(!ismobile && $('[data-px]').length && $(window).width() > 712){
      $('[data-px]').each(function(){
        var dist;
        var end = parseInt($(this).attr('data-px-end'));
        var start = parseInt($(this).attr('data-px-start'));

        var isElementInView = isScreen($(this));
        if (isElementInView) {
          var range = start - end;

          dist = start - ((OnScreenPercent($(this)) * range) / 100);

          if($(this).attr('data-px') == 'x'){
            $(this).css({
                transform: "translate3d("+ dist +"px,0,0)"
            });
          }
          else{
            $(this).css({
                transform: "translate3d(0,"+ dist +"px,0)"
            });
          }

        }
        else{
          if(isScreen($(this),'before')){
            dist=start;
          }else if(isScreen($(this),'after')){
            dist=end;
          }
          if($(this).attr('data-px') == 'x'){
              $(this).css({
                  transform: "translate3d("+ dist +"px,0,0)"
              });
          }
          else{
              $(this).css({
                  transform: "translate3d(0,"+ dist +"px,0)"
              });
          }

        }
      });
    }
  });
 

$("[gl-timeline]").each(function(){
    $( this ).on('timeupdate', function(event) {
      currtime = parseInt(event.target.currentTime);
      $section = $(this).closest('section');
      if($( this ).attr('gl-timeline') == '' || $( this ).attr('gl-timeline') !== ''+currtime){
        $( this ).attr('gl-timeline', currtime);
        $section.find('.caption[gl-start="'+currtime+'"]').addClass('capshow');
        $section.find('.caption[gl-end="'+currtime+'"]').removeClass('capshow');
      }
    });
  });



$('.slider').slick({
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
 //prevArrow: '<span class="product-showcase-carousel-controls product-showcase-carousel-controls--left"><i class="fa fa-angle-left" aria-hidden="true"></i></span>',
//	nextArrow: '<span class="product-showcase-carousel-controls product-showcase-carousel-controls--right"><i class="fa fa-angle-right" aria-hidden="true"></i></span>',
  autoplay:true,
  prevArrow:false,
  nextArrow:false,
});



// $(window).scroll(function() {
//  if ($(this).scrollTop() > 100){  
//     $('header').addClass("scrolled");
//   }
//   else{
//     $('header').removeClass("scrolled");
//   } 

// });



$(window).bind('scroll',function(){
    var $window = jQuery(window);
    var viewport_top = $window.scrollTop();
    if(viewport_top > 0){
      $('header').addClass('scrolled');
    }
    else{
      $('header').removeClass('scrolled');
    }

    if(startsite){
      if($('.equilizer').hasClass('animated')){
        if(viewport_top > $('.video-section.hero').height() && volscreen == 1){
          volscreen = 0;
          $('#bg-audio').trigger("play").animate({"volume": 0}, 500);
          if(ismobile)
            $('#bg-audio').trigger("pause");
        }
        else if(viewport_top <= $('.video-section.hero').height() && volscreen == 0){
          volscreen = 1;
          $('#bg-audio').trigger("play").animate({"volume": 1}, 500);
          if(ismobile)
            $('#bg-audio').trigger("play");
        }
      }
  
      //slider
  
      $('.slider-section .slider, .location-map .slider').each(function(){
        var isElementInView = isScreen($(this));
        if(isElementInView){
          $(this).slick('slickPlay');
        }
        else{
          $(this).slick('slickPause');
        }
      });
  
      
      $('video').each(function(i, obj) {
        if(isScreen(obj) && obj.paused){
          obj.play();
        }
      });


    }

  });


$('.golf_sliderJs').slick({
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  autoplay:true,
  slidesToScroll: 3,
   prevArrow: '<span class="product-showcase-carousel-controls product-showcase-carousel-controls--left"><i class="fa fa-angle-left" aria-hidden="true"></i></span>',
nextArrow: '<span class="product-showcase-carousel-controls product-showcase-carousel-controls--right"><i class="fa fa-angle-right" aria-hidden="true"></i></span>',
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});


$(".fixed-media #afterplus").click(function(){
    	$(".fixed-media .description").toggleClass("visible");
		$("#afterplus i").toggleClass(" fa-angle-up");
  });


$('.know_more').click(function() {
           
             $('.rental-opportunity').css('display', 'flex');
              if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
        && location.hostname == this.hostname) {
          var $target = $(this.hash);
          $target = $target.length && $target
          || $('[name=' + this.hash.slice(1) +']');
          if ($target.length) {
            var targetOffset = $target.offset().top - 40;
            $('html,body')
            .animate({scrollTop: targetOffset}, 1000);
           return false;
          }
        }
    });



$('.infra_slider').slick({
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  autoplay:true,
  slidesToScroll: 1,
  prevArrow: false,
  nextArrow: false,
});


$('.location_slider').slick({
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  autoplay:true,
  slidesToScroll: 1,
  prevArrow: false,
  nextArrow: false,
});

$('.distance_info_cont').slick({
    dots: false,
    infinite: false,
    autoplay: false,
    pauseOnDotsHover: true,
    speed: 300,
    fade: true,
    prevArrow: false,
  nextArrow: false,
    // adaptiveHeight: true,
  });
  $('.distance_info_cont').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    $('.dist_cat li').removeClass('dist-active');
    $('.dist_cat li[data-dist="'+nextSlide+'"]').addClass('dist-active');
  });

  $('.dist_cat li').bind("click",function(){
    console.log($(this).attr('data-dist'));
    $('.distance_info_cont').slick('slickGoTo', $(this).attr('data-dist'));
  });



  $('.menu-button').bind("click",function(){
    $('nav').toggleClass('nav-open');
    $('.hero-contact').removeClass('mob-on');
  });
   $('.nav-close').bind("click",function(){
    $('nav').removeClass('nav-open');
  });



$('.enquire-contact').bind("click",function(){
    $('.hero-contact').addClass('mob-on');
    $('nav').removeClass('nav-open');
});

$('.enquire-close').bind("click",function(){
    $('.hero-contact').removeClass('mob-on');
  });
$('input').focus(function(){
  $(this).parents('.form-group').addClass('focused');
});

$('input').blur(function(){
  var inputValue = $(this).val();
  if ( inputValue == "" ) {
    $(this).removeClass('filled');
    $(this).parents('.form-group').removeClass('focused');  
  } else {
    $(this).addClass('filled');
  }
})  



$('nav a').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
        && location.hostname == this.hostname) {
          var $target = $(this.hash);
          $target = $target.length && $target
          || $('[name=' + this.hash.slice(1) +']');
          if ($target.length) {
            var targetOffset = $target.offset().top - 100;
            $('html,body')
            .animate({scrollTop: targetOffset}, 1000);
           return false;
          }
        }
});


$('nav a').click(function(){
    $('nav').removeClass('nav-open');
});


var volscreen = 0;
  var startsite = 0;
  $('.start-button').bind("click",function(){
    window.scrollTo(0, 0); 
    $herovid = $('.video-section.hero video')[0];
    $herovid.pause();
    $herovid.currentTime = 0;
    $herovid.load();
    $herovid.play();
    $('.start-screen').addClass('loaded');
    volscreen = 1;
    $('#bg-audio').trigger("play").animate({"volume": 1}, 1000);
    myLazyLoad.loadAll();
    setTimeout(function(){
      $('.start-screen').hide();
    },1000);
    startsite = 1;
    
  });

$('.equilizer').bind("click",function(){
    if(volscreen){
      volscreen = 0;
      $('#bg-audio').animate({"volume": 0}, 500);
      if(ismobile)
        $('#bg-audio').trigger("pause");
      $('.equilizer').removeClass('animated');
    }
    else{
      volscreen = 1;
      $('#bg-audio').animate({"volume": 1}, 500);
      if(ismobile)
        $('#bg-audio').trigger("play");
      
      $('.equilizer').addClass('animated');
    }
  });







});










