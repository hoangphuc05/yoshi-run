
(function ($) {

    var ground = 320;
    var yoshistate = 'right';
    var y = ground;
    var gravity = 10;
    var jump = false;
    var spot = 0;
    var yoshispeed = -40;             //orig : var yoshispeed = -40;

    var $yoshi_right = $('<img/>');
    $yoshi_right[0].src = "img/yoshirunright.gif";
  
  
    var $yoshi_left = $('<img/>');
    $yoshi_left[0].src = "img/yoshirunleft.gif";
  
  
    $('div#Yoshi').empty().append($yoshi_right);
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




    







    $("body" ).click(function() {
        yoshispeed *= -1.0;
                                   
        if ( yoshispeed > 0 )    
        {
            $('div#Yoshi').empty().append($yoshi_left);
        }                                                                //orig: if (yoshispeed > 0) {$('div#Yoshi').empty().append($yoshi_left); }
                
        else
            $('div#Yoshi').empty().append($yoshi_right);
        $('div#Yoshi').show();
      });

    

    $("body").dblclick( function(){
        jump = true;
    
    });

    function keyHandler(e){
        e = e || window.event;
        if (e.keyCode == '38') {
            jump = true;
        }
        else if (e.keyCode == '40') {
            // down arrow
        }
        else if (e.keyCode == '37') {
           // left arrow
           if (yoshistate=='right'){
            yoshispeed *= -1.0;
            yoshistate = 'left'
            };
           
           $('div#Yoshi').empty().append($yoshi_left);
        }
        else if (e.keyCode == '39') {
           // right arrow
           if (yoshistate=='left'){
           yoshispeed *= -1.0;
           yoshistate = 'right'
           };

           $('div#Yoshi').empty().append($yoshi_right);
        }
    
    }

    function draw () {

        requestAnimFrame(draw,25);

        $('#YoshiBG_back').css('background-position', (spot * (1.0/12.0)) );
        $('#YoshiBG_mid').css('background-position', (spot * (1.0/6.0)) );
        $('#YoshiBG_frontmost').css('background-position', (spot * (1.0/3.0)) );
       
        spot = spot + yoshispeed;

        if (spot* (1.0/12.0) <= -$yoshibg.width() || spot*(1.0/12.0) >= $yoshibg.width()) {
            spot = 0;
        }

        if (jump) {
            y=y-30;
            if (y < 50){
                jump = false;
            }
        } else {
            if (y >=ground){}
            if (y < ground){
                y=y+9.8;
            }
        }



        console.log(y);   
        document.getElementById('Yoshi').style.top=y+'px';
        
    }

    draw();
    document.onkeydown = keyHandler;
})(jQuery);