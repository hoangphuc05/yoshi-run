var yoshi = {

    images : {
        left: "images/"
    },



    go_left : function() { this.state = 'left', this.image.left},
    go_right : function() { this.state = 'right'},

    change_direction : function() {
        if ( this.state === 'right' ) this.go_left();
        else if ( this.state === 'left' ) this.go_right();
    },




}