
function Helper( t ){ this.name= t; };

Helper.prototype = {
    getJson: function( url, cb, args ){
        // will not work in old MS browsers
        var ajax_req = new XMLHttpRequest();
        // code to be called when the server serves
        ajax_req.onreadystatechange = function(){
            // if a callback has been defined, fire it, else just return the value

            if ( ajax_req.readyState === 4 && cb ){
                cb({selector:args, freq:ajax_req.responseText});
            } else if (ajax_req.readyState === 4 && !cb ) {
                return ajax_req.responseText;
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
    getTextByClass: function( x ){
        return document.querySelector( x ).value;
    }, 
};


