
(function ($) {

    //random location for 
    var random1=Math.floor((Math.random() * 332) + 268);
    var randomx=Math.floor((Math.random() * 90) + 80)

    var randomleftx = (Math.floor((Math.random() * 100) + 5))*(-1);

    var coin = document.getElementById('coin');
    var yoshi = document.getElementById('Yoshi');

    var ground = 600;
    var initialV= -40;
    var gravity = 2.9;


    var v = initialV;
    var yoshistate = 'right';
    var yoshichange = false;
    var yoshichanger = false;
    var y = ground;
    var x = 15;
    
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




    

    //$('div#coin').empty().append($yoshi_left);
    //$('div#coin').empty().append($yoshi_right);



    document.getElementById('YoshiBG_frontmost').style.left='0px';
    document.getElementById('YoshiBG_mid').style.left='0px';
    document.getElementById('YoshiBG_back').style.left='0px';
    document.getElementById('YoshiBG_furthestBack').style.left='0px';

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
            yoshistate = 'left';
            yoshichange = true;
            yoshichanger=false;
            };
           
           $('div#Yoshi').empty().append($yoshi_left);
        }
        else if (e.keyCode == '39') {
           // right arrow
           if (yoshistate=='left'){
           yoshispeed *= -1.0;
           yoshistate = 'right';
           yoshichanger = true;
           yoshichange=false;
           };

           $('div#Yoshi').empty().append($yoshi_right);
        }
    
    }

    function draw () {

        requestAnimFrame(draw,25);

        $('#YoshiBG_back').css('background-position', (spot * (1.0/12.0)) );
        $('#YoshiBG_mid').css('background-position', (spot * (1.0/6.0)) );
        $('#YoshiBG_frontmost').css('background-position', (spot * (1.0/2.7)) );
        
       
        spot = spot + yoshispeed;

        if (spot* (1.0/12.0) <= -$yoshibg.width() || spot*(1.0/12.0) >= $yoshibg.width()) {
            spot = 0;
        }

        if (jump) {
            v=v+gravity;
            y=y+v;
            if (y < 50){
                //jump = false;
            }
            if (y >ground){
                y=ground;
                jump = false;
                v = initialV;
            }
        } else {
            if (y >ground){y=ground;}
            if (y = ground){}
            if (y < ground){
                y=y+9.8;
            }
        }


        if (yoshichange){
            x=x+.2;
            if (x >= 90){
                yoshichange=false;
            }
        }

        if (yoshichanger){
            x=x-.5;
            if (x <= 20){
                yoshichanger=false;
            }
        }

        //console.log(y);   
        document.getElementById('Yoshi').style.top=y+'px';
        document.getElementById('Yoshi').style.left=x+'%';
        //console.log(random1);
        document.getElementById('coin').style.top=random1+'px';
        //document.getElementById('coin').style.left=randomx+'px';
        //coinpos=coinpos-20;
       //document.getElementById('coin').style.left = coinpos;


        var coinposi=coin.getBoundingClientRect();
        var yoshiposi=yoshi.getBoundingClientRect();
        var border=document.getElementById('body').getBoundingClientRect();
        

        //console.log(coinposi.left);
        //console.log(yoshiposi.left);
        //console.log(document.getElementById('Yoshi').left);
        if (yoshistate === 'right'){
            randomx = randomx -15;
            document.getElementById('coin').style.left=randomx+'px';
            if (coinposi.left >= yoshiposi.right || coinposi.top >= yoshiposi.bottom || coinposi.right <= yoshiposi.left || coinposi.bottom <= yoshiposi.top)
                {
                    
                }
                else
                {
                // overlap
                console.log('touched');
                
                random1=Math.floor((Math.random() * 332) + 268);
                //randomx=Math.floor((Math.random() * 90) + 80);
                randomx=border.right;
                }
                
                if (coinposi.left<= 0){
                    random1=Math.floor((Math.random() * 332) + 268);
                    //randomx=Math.floor((Math.random() * 90) + 80);
                    randomx=border.right;
                }
            }

            if (yoshistate === 'left'){
                randomleftx = randomleftx +15;
                document.getElementById('coin').style.left=randomleftx+'px';
                if (coinposi.left >= yoshiposi.right || coinposi.top >= yoshiposi.bottom || coinposi.right <= yoshiposi.left || coinposi.bottom <= yoshiposi.top)
                    {
                        
                    }
                    else
                    {
                    // overlap
                    console.log('touched');
                    
                    random1=Math.floor((Math.random() * 332) + 268);
                    //randomleftx = (Math.floor((Math.random() * 10) + 0));
                    randomleftx = border.left;
                    }
                    
                    if (coinposi.left>= border.right){
                        random1=Math.floor((Math.random() * 332) + 268);
                        //randomleftx = (Math.floor((Math.random() * 10) + 0));
                        randomleftx=border.left;
                    }
            }

    }

    draw();
    document.onkeydown = keyHandler;
})(jQuery);