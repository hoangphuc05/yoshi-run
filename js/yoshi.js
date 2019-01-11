
console.log('tester');
console.log('clicked');



var img = document.getElementById('img');


/////////////////////////////////
var yoshi = {
    state: 'right',
    images : {
        left: "images/yoshirunleft.gif",
        right: "images/yoshirunright.gif",
    },



    go_left : function() { this.state = 'left', img.setAttribute("src","images/yoshirunright.gif")},
    go_right : function() { this.state = 'right', img.setAttribute("src","images/yoshirunleft.gif")},

    change_direction : function() {
        console.log('finc');
        if ( this.state === 'right' ) {this.go_left(), console.log('rightcall')}
        else if ( this.state === 'left' ) this.go_right();
    },

}
function clickHandler(event){
    yoshi.change_direction();
}

var test123=yoshi.state;
document.getElementById("body").addEventListener("click",clickHandler);