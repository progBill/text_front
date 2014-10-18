function Helper( name ){this.name= name};

Helper.prototype.getTextByClass = function( x ){
    return document.querySelector( x ).value;
};

Helper.prototype.setTextByClass = function(x){
    var elem = document.querySelector( x.selector );
    elem.style.backgroundColor = '#FFFFFF';
    var content='';

    if(typeof(x.data)==='object'){
        for (var word in x.data){ content += x.data[word] + '\n'; }
    } else {
        content = x.data;
    }

    elem.innerHTML = content;
};
Helper.prototype.showElem = function( cls ){
    var elem = document.querySelector( cls );
    elem.style.display = 'inline';
};
Helper.prototype.hideElem= function( cls ){
    var elem = document.querySelector( cls );
    elem.style.display = 'none';
};
Helper.prototype.onClickByClass = function(cls, cb, args){
    document.querySelector( cls ).addEventListener('click', function(){ cb(args) });
};

Helper.prototype.getJson = function(url, tag){
    var ajax_req = new XMLHttpRequest();
    ajax_req.onreadystatechange = function(){
        if ( ajax_req.readyState === 4 ){
            var data = {};
            JSON.parse(ajax_req.responseText, function(k,v){ data[k] = v; });
            store.lib = data;
            store.publish( tag );
        };
    }
    ajax_req.open( "GET", url, true );
    ajax_req.send( null );
};

Helper.prototype.out = function( x ){ console.log(x); };
