
(function ($) {

    var border=document.getElementById('body').getBoundingClientRect();

    //var a = new Date();
    //var prevtime = a.getTime();
    var prevtime = 0;
    //random location for coin from the right
    var random1=Math.floor((Math.random() * 332) + 268);
    var randomx=border.right;

    //radom location for coin from the left
    var randomleftx = (Math.floor((Math.random() * 100) + 5))*(-1);

    var coin = document.getElementById('coin');
    var yoshi = document.getElementById('Yoshi');


    //physic
    var ground = 600;
    var initialV= -43;
    var v = initialV;
    var gravity = 3;

    var scorecounter = 0;//score counter


    //yosgi state for going left or right
    var yoshistate = 'right';
    var yoshichange = false;
    var yoshichanger = false;
    var y = ground;
    var x = 10;
    
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


    //put all the backgroung to the left
    
    document.getElementById('YoshiBG_frontmost').style.left='0px';
    document.getElementById('YoshiBG_mid').style.left='0px';
    document.getElementById('YoshiBG_back').style.left='0px';
    document.getElementById('YoshiBG_furthestBack').style.left='0px';
    document.getElementById('coin').style.left=border.right+'px';

    //DLC incoming
    /*$("body" ).click(function() {
        
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
    
    });*/

    //controlling function
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
            v=v+gravity; //apply physic to game
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

        //yoshi change the state to the left
        if (yoshichange){
            x=x+.2;
            if (x >= 90){
                yoshichange=false;
            }
        }

        //yoshi change the state to the right
        if (yoshichanger){
            x=x-.2;
            if (x <= 10){
                yoshichanger=false;
            }
        }

        //console.log(y);   
        document.getElementById('Yoshi').style.top=y+'px';
        document.getElementById('Yoshi').style.left=x+'%';
        //console.log(random1);
        document.getElementById('coin').style.top=random1+'px';
        document.getElementById("scorebox").innerHTML = 'Coins Collected: ' + scorecounter;
        //document.getElementById('coin').style.left=randomx+'px';
        //coinpos=coinpos-20;
       //document.getElementById('coin').style.left = coinpos;

        
        var coinposi=coin.getBoundingClientRect();
        var yoshiposi=yoshi.getBoundingClientRect();
        
        

        //console.log(coinposi.left);
        //console.log(yoshiposi.left);
        //console.log(document.getElementById('Yoshi').left);

        //yoshi going right
        if (yoshistate === 'right'){
            randomx = randomx -15;
            document.getElementById('coin').style.left=randomx+'px';

            //check for colition
            if (coinposi.left >= yoshiposi.right || coinposi.top >= yoshiposi.bottom || coinposi.right <= yoshiposi.left || coinposi.bottom <= yoshiposi.top)
                {
                    
                }
                else
                {
                // overlap
                
                //set the position of the coin after being hit
                random1=Math.floor((Math.random() * 332) + 268);
                randomx=border.right;
                var d = new Date();
                var currentTime = d.getTime();
                //console.log(currentTime - prevtime)
                //prevent the score to be increased by 2 at a time
                if (currentTime - prevtime >=500 ){
                scorecounter=scorecounter+1;
                console.log(scorecounter);
                
                prevtime = currentTime;
                }
                }
                
                if (coinposi.left<= 0){
                    random1=Math.floor((Math.random() * 332) + 268);
                    //randomx=Math.floor((Math.random() * 90) + 80);
                    randomx=border.right;
                }
            }

            //Yoshi going left
            if (yoshistate === 'left'){
                randomleftx = randomleftx +15;
                document.getElementById('coin').style.left=randomleftx+'px';
                //check for coalition
                if (coinposi.left >= yoshiposi.right || coinposi.top >= yoshiposi.bottom || coinposi.right <= yoshiposi.left || coinposi.bottom <= yoshiposi.top)
                    {
                        
                    }
                    else
                    {
                    // overlap
                    var d = new Date();
                    var currentTime = d.getTime();
                    //console.log(currentTime - prevtime)

                    //prevent the score to be increased by 2 at a time
                    if (currentTime - prevtime >=500 ){
                    scorecounter=scorecounter+1;
                    console.log(scorecounter);
                    prevtime = currentTime;
                    }
                    
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
    document.onkeydown = keyHandler;//set up the keyboard
})(jQuery);