function Store() { console.log("new store"); };
Store.prototype = {
    newAttr: function( x ){ this.x },
    setter: function( x,y ){ 
    if ( !this.x ){ 
        this.newAttr( x ); }; 
        this.x = y; 
        console.log(x + ": " + y);
    },
    getter: function( x ){ return this.x },
    subscribe: function( objFunc, x ){
        this.listeners( objFunc, x );
    },
};

