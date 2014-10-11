function Helper( t ){ this.name= t; console.log("new helper: " + t); };
Helper.prototype = {
    getJson: function( url, cb){
        console.log("getting stuff");
        var ajax_req = new XMLHttpRequest();
        ajax_req.onreadystatechange = function(){
            console.log("ajax ready: " + ajax_req.readyState);
            // callback required 
            if ( ajax_req.readyState === 4 && cb ){
                cb( ajax_req.responseText );
                console.log("req: " + ajax_req.responseText );
            };
        ajax_req.open( "GET", url, true );
        ajax_req.send( null );
        }
    },
    setTextByClass: function( x ){
        console.log("setting text to: " + x.freq);
        var elem = document.querySelector( x.selector );
        elem.style.backgroundColor = '#FFFFFF';
        elem.value = x.freq;
    },
    getTextByClass: function( x ){
        return document.querySelector( x ).value;
    }, 
};

