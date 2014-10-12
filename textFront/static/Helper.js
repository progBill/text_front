function Helper( name ){this.name= name};


Helper.prototype.getTextByClass = function( x ){
    return document.querySelector( x ).value;
};


Helper.prototype.setTextByClass = function(x){
    var elem = document.querySelector( x.selector );
    elem.style.backgroundColor = '#FFFFFF';
    elem.value = x.data;
};


Helper.prototype.onClickByClass = function(cls, cb, args){
    document.querySelector( cls ).addEventListener('click', function(){ cb(args); } );
};


Helper.prototype.getJson = function(url, cb){
    var ajax_req = new XMLHttpRequest();
    ajax_req.onreadystatechange = function(){
        // callback required
        if ( ajax_req.readyState === 4 && cb ){
            var data = {};
            JSON.parse(ajax_req.responseText, function(k,v){ data[k] = v; });
            for (var k in data){
                cb( k, data[k] );
            }
        };
    }
    ajax_req.open( "GET", url, true );
    ajax_req.send( null );
};


Helper.prototype.out = function(x ){ console.log(x); };
