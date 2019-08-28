
// Plugin @RokoCB :: Return the visible amount of px of any element currently in viewport.
// stackoverflow.com/questions/24768795/
// jsfiddle.net/RokoCB/tw6g2oeu/7/
;(function($, win) {
    $.fn.inViewport = function(cb) {
        return this.each(function(i,el){
            function visPx(){
                if(deviceWidth > 640) {
                    var H = $(this).height() / 1.8;
                } else {
                    var H = $(this).height() / 1.1;
                }
                var r = el.getBoundingClientRect(), t=r.top, b=r.bottom;
                return cb.call(el, Math.max(0, t>0? H-t : (b<H?b:H)));
            } visPx();
            $(win).on("resize scroll", visPx);
        });
    };
}(jQuery, window));

function scrollToDiv(id, vel) {
    animazione = true;
    if (vel == null)
        vel = 1200;
    var puntoArrivo = $(id).offset().top + 1;
    if (vel == 0) {
        $('body, html').scrollTop(puntoArrivo);
    } else {
        $('body, html').animate({
            scrollTop: puntoArrivo
        }, vel, 'easeInOutQuart', function () {
            animazione = false;
        });
    }
}

function checkLandscape() {
	if (deviceWidth < 1024 && isMobile()) {
		if (deviceWidth > deviceHeight) {
			$(".rotate-screen-container").fadeIn(500);
			document.addEventListener("touchstart", dontScroll);
			document.addEventListener("touchmove", dontScroll);
		} else {
			$(".rotate-screen-container").fadeOut(500);
			document.removeEventListener("touchstart", dontScroll);
			document.removeEventListener("touchmove", dontScroll);
		}
	}
}

function dontScroll(e) {
	e.preventDefault();
}

function isMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true;
    } else {
        return false;
	}
}

var deviceWidth, deviceHeight;
var mousePosX, mousePosY;

(function ($) {

    $(window).resize(function () {
        deviceWidth = $(window).width();
        deviceHeight = $(window).height();

        checkLandscape();
        setTimeout(function(){
            resizeVisual();
        }, 100);
        updateSidebar();
        updateBackground();
    });

    $(window).scroll(function (e) {
        updateSidebar();
        updateBackground();
    });

})(jQuery);


$(document).ready(function () {

    deviceWidth = $(window).width();
    deviceHeight = $(window).height();

    checkLandscape();
    updateSidebar();

    // Preload the site
    var preload_i = 0;
    $('body').imagesLoaded()
        .always( function( instance ) {

            $('html, body').scrollTop(0);
            $('.loading_layer .w').delay(600).fadeOut(function() {
                $('body').removeClass('menuOn');
                $('.loading_layer').delay(300).fadeOut();
            });

            setTimeout(function() {

                // Wow.js init
                var wow = new WOW({
                    offset: deviceHeight / 4
                });
                wow.init();

                resizeVisual();

                // Header
                $(".header").inViewport(function(px){
                    if(px && !$(this).attr('animated')) {
                        $(this).attr('animated','true');
                        animHeader();
                    }
                });

                // Quote
                $("blockquote").each(function(i, el){
                    $(el).inViewport(function(px){
                        if(px && !$(el).attr('animated')) {
                            $(el).attr('animated','true');
                            $(el).addClass('visible');
                        }
                    });
                });

            }, 1000);
        })
        .progress( function( instance, image ) {
            preload_i++;
            perc = Math.round((preload_i*100) / instance.images.length);
        });

    // // Plugin okshadow 
    // if(deviceWidth > 640) {
    //     $('.header .title h1').okshadow({
    //         color: '#512838',
    //         textShadow: true,
    //         xMax: 15,
    //         xOffset: 0,
    //         yMax: 15,
    //         yOffset: 15,
    //         fuzzMin: 0,
    //         fuzzMax: 0,
    //         fuzzFactor: 0
    //     });
    // } else {
    //     $('.header .title h1').css('text-shadow','10px 10px 0px #512838')
    // }

    // Click to snap sidebar
    $('.sidebar .bar .dot').each(function(i, el) {
        $(el).click(function() {
            scrollToDiv('.' + $(el).data('section'), 2200);
        })
    });

});


/**************************************************************************************
* Animate header
*/
function animHeader() {
    var rightInitial = "74%";
    var rightFinal = "100%";
    var leftInitial = "13%";
    var leftFinal = "-2%";

    if(deviceWidth <= 640) {
        rightInitial = "100%";
        rightFinal = "120%";
        leftInitial = "0%";
        leftFinal = "-10%";
    }

    TweenMax.fromTo($('.header .bg'), 3,
		{ opacity:0, width: rightInitial, marginLeft: leftInitial, ease:Strong.easeInOut },
		{ opacity:1, width: rightFinal, marginLeft: leftFinal, ease:Strong.easeInOut }
	).delay(1);
    TweenMax.fromTo($('.header .rachel'), 3,
		{ width: "30%", marginLeft: "-30%", ease:Strong.easeInOut },
		{ width: "30%", marginLeft: "0%", ease:Strong.easeInOut }
	).delay(1);
    TweenMax.fromTo($('.header .chuming'), 3,
        { width: "30%", marginLeft: "100%", ease:Strong.easeInOut },
        { width: "30%", marginLeft: "70%", ease:Strong.easeInOut }
    ).delay(1);
    TweenMax.fromTo($('.header .title'), 1,
		{ opacity:0, marginTop: '4%' },
		{ opacity:1, marginTop: '0' }
	).delay(2.5);
    TweenMax.fromTo($('.header small'), 1,
		{ opacity:0 },
		{ opacity:1 }
	).delay(2.5);
}


/**************************************************************************************
* Resize panels
*/
function resizeVisual() {
    // Resize header
    var resizeHeight = deviceHeight;
    if(deviceWidth <= 991) {
        resizeHeight = deviceHeight;
    }
    $('.header').css({
        'width': deviceWidth,
        'height': resizeHeight,
        'max-height': deviceHeight
    });

    
    if (deviceHeight*1.5 > deviceWidth) {
        $('#stars').css({
            'height': deviceHeight,
            'width': deviceHeight*1.5,
            'left': (deviceWidth-deviceHeight*1.5)/2
        });
        $('#boxes').css({
            'height': deviceHeight,
            'width': deviceHeight*1.5,
            'left': (deviceWidth-deviceHeight*1.5)*0.8
        });
        $('#waterfall').css({
            'height': deviceHeight,
            'width': deviceHeight*1.5,
            'left': (deviceWidth-deviceHeight*1.5)*0.7
        });
        $('iframe').css({
            'height': deviceHeight,
            'width': deviceWidth,
            'left': (deviceHeight*1.5-deviceWidth)*0.7
        });
    } else {
        $('#stars').css({
            'height': deviceWidth*2/3,
            'width': deviceWidth,
            'left': 0
        });
        $('#boxes').css({
            'height': deviceWidth*2/3,
            'width': deviceWidth,
            'left': 0
        });
        $('#waterfall').css({
            'height': deviceWidth*2/3,
            'width': deviceWidth,
            'left': 0
        });
        $('iframe').css({
            'height': deviceHeight,
            'width': deviceWidth*0.5,
            'left': 0
        });
    }
}


/**************************************************************************************
* Scrolling effects
* Background color change
*/
var pageAnchors = [".header", "#stars", "#boxes", "#waterfall"];

function updateBackground() {
    //console.clear();

    var hiddenPixels = $(window).scrollTop();
    var pixelsAboveHeader = $(pageAnchors[1]).offset().top;
    var body = $('body');
    if (hiddenPixels > pixelsAboveHeader*4/5) {
        body.css({transition : 'background-color 1s ease-in-out',
            "background-color": "black"});
    } else {
        body.css({transition : 'background-color 1s ease-in-out',
            "background-color": "white"});
    }

    // Lights fade
    // Boxes fade
    // Boxes color change
    var hiddenPixelsAfterBoxes = $(window).scrollTop() - $(pageAnchors[2]).offset().top;
    var boxesPercentageHidden = hiddenPixelsAfterBoxes/Math.max(deviceHeight, deviceWidth*2/3);
    var base = $('.base');
    var addon = $('.addon');
    base.fadeTo(1, 1-boxesPercentageHidden);
    addon.fadeTo(1, 1-boxesPercentageHidden);
    var hue = hiddenPixelsAfterBoxes/Math.max(deviceHeight, deviceWidth*2/3)*480;
    $('.addon').css("-webkit-filter", "hue-rotate("+hue+"deg)");
}

/**************************************************************************************
* Sidebar
*/
function updateSidebar() {
    if(deviceWidth > 640) {

        //console.clear();

        var bar = $('.sidebar .sect.s0 .progress');
        var currentSec = '.stars';
        var sommaAltezze = 0;
        var hiddenPixelsAfterHeader = $(window).scrollTop() - $(pageAnchors[0]).offset().top;
        var pixelsAboveHeader = $(pageAnchors[0]).offset().top;

        $('.sidebar .bar .dot').removeClass('on');

        for(i=0; i<=pageAnchors.length-1; i++) {
            if(hiddenPixelsAfterHeader >= $(pageAnchors[i]).offset().top) {
                //console.log('skip --> ' + i);
                $('.sidebar .sect.s' + i + ' .progress').css('height', '100%');
                $('.sidebar .bar .dot.d' + i).addClass('on');
                sommaAltezze = Math.round($(pageAnchors[i]).offset().top);
                continue;
            } else {
                // console.log('------');
                // console.log('current: ' + i);
                hiddenPixelsAfterHeader = $(pageAnchors[i-1]).offset().top + ( $(window).scrollTop() - $(pageAnchors[i-1]).offset().top );
                pixelsAboveHeader = $(pageAnchors[i]).offset().top - $(pageAnchors[i-1]).offset().top;
                bar = $('.sidebar .sect.s' + (i-1) + ' .progress');
                currentSec = pageAnchors[i];
                break;
            }
        }

        if( hiddenPixelsAfterHeader >= $(pageAnchors[0]).height() && hiddenPixelsAfterHeader <= $(pageAnchors[1]).offset().top*2) {
            $('.sidebar').addClass('visible');
        } else {
            $('.sidebar').removeClass('visible');
        }

        var scrollPercent = ( (hiddenPixelsAfterHeader - sommaAltezze) / pixelsAboveHeader ) * 100;
        bar.css('height', Math.round(scrollPercent) + '%');

    }
}
