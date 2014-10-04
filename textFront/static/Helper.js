
function Helper( name ){};

Helper.prototype.make_ajax_request = function( cb, url ){
    // will not work in old MS browsers
    var ajax_req = new XMLHttpRequest();
    ajax_req.onreadystatechange = function(){
        if (ajax_req.readyState === 4 ){
            cb( ajax_req.responseText );
        }
    };

    ajax_req.open( "GET", url, true );
    ajax_req.send( null );
};


