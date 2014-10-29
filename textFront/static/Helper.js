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

Helper.prototype.getJson = function(url, tag, requestArgs){
    var reqArgs = requestArgs || null;
    var ajaxRequest = new XMLHttpRequest();
    ajaxRequest.onreadystatechange = function(){
        if ( ajaxRequest.readyState === 4 ){
            var data = {};
            JSON.parse(ajaxRequest.responseText, function(k,v){ data[k] = v; });
            // TODO: this assignment should be in the store
            switch( url ){
                case '/get_word_count':
                    store.lib = data;
                    break;
                case '/get_word_freq_in_chunk':
                    var test = JSON.parse(ajaxRequest.responseText);
                    for (var i in test){
                        if ( typeof(store.chunk_freq) ==='undefined' ){ store.chunk_freq={}; }
                        store.chunk_freq[i]=test[i];
                    }
            }
            store.publish( tag );
        };
    }
    ajaxRequest.open( "POST", url, true );
    ajaxRequest.send( reqArgs );
};

Helper.prototype.out = function( x ){ console.log(x); };



