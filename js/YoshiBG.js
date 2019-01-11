(function ($) {

    var spot = 0;
    var yoshispeed = 12;
    var $yoshibg = $("#YoshiBG_furthestBack");

    var requestAnimFrame = (function() {
        if (window.requestAnimationFrame) return window.requestAnimationFrame;
        if (window.webkitRequestAnimationFrame) return window.webkitRequestAnimationFrame;
        if (window.mozRequestAnimationFrame) return window.mozRequestAnimationFrame;
        if (window.oRequestAnimationFrame) return window.oRequestAnimationFrame;
        if (window.msRequestAnimationFrame) return window.msRequestAnimationFrame;
        else return function(callback, element) {
            window.setTimeout(callback, element);
        };


    })();

    function draw () {

        requestAnimFrame(draw,25);

        $('#YoshiBG_back').css('background-position', (spot * (1.0/12.0)) );
        $('#YoshiBG_mid').css('background-position', (spot * (1.0/6.0)) );
        $('#YoshiBG_frontmost').css('background-position', (spot * (1.0/3.0)) );
       
        spot = spot - yoshispeed;

        if (spot* (1.0/12.0) < -$yoshibg.width() ) {
            spot = 0;
        }

        
    }

    draw();
})(jQuery);