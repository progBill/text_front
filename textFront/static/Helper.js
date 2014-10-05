
function Helper( t ){ this.name= t; };

Helper.prototype = {
    getJson: function( url, cb, a){
        // will not work in old MS browsers
        var ajax_req = new XMLHttpRequest();
        // code to be called when the server serves
        ajax_req.onreadystatechange = function(){
            if ( ajax_req.readyState === 4 ){
    
                cb({selector:a, freq:ajax_req.responseText});
            }
        };
        ajax_req.open( "GET", url, true );
        ajax_req.send( null );
    },
    setTextByClass: function( x ){
        var elem = document.querySelector( x.selector );
        elem.style.backgroundColor = '#FFFFFF';
        elem.innerHTML = x.freq;
    },
 
};


