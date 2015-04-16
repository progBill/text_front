Helper= {
    getTextByClass: function( x ){
        return document.querySelector( x ).value;
    },
    setTextByClass: function(x){
        var elem= document.querySelector( x.selector );
        var content='';

        if(typeof(x.data)==='object'){
            for (var word in x.data){ content += x.data[word] + '\n'; }
        } else {
            content= x.data;
        }
        elem.innerHTML= content;
    },
    showElem: function( cls ){
        var elem= document.querySelector( cls );
        if (!elem) { document.getElementById( cls ); };
        elem.style.display= 'inline-block';
    },
    hideElem: function( cls ){
        var elem= document.querySelector( cls );
        elem.style.display= 'none';
    },
    onClickByClass: function(cls, cb, args){
        targetElem = document.querySelector( cls );
        newElem = targetElem.cloneNode(true);
        targetElem.parentNode.replaceChild(newElem, targetElem);
        
        
        document.querySelector( cls ).addEventListener('click', function(){ cb(args) } );
    },
    getJson: function(url, tag, requestArgs){
        var reqArgs= requestArgs || null;
        var ajaxRequest= new XMLHttpRequest();
        ajaxRequest.onreadystatechange= function(){
            if ( ajaxRequest.readyState === 4 ){    
                var data= {};
                JSON.parse(ajaxRequest.responseText, function(k,v){ data[k]= v; });
                switch( url ){
                    case '/get_idx':
                        store.text= data['textbody'];
                        store.setter("selectedTitle", reqArgs);
                        break;
                    case '/get_word_count':
                        store.lib= data;
                        break;
                    case '/get_word_freq_in_chunk':
                        var test= JSON.parse(ajaxRequest.responseText);
                        for (var i in test){
                            if ( typeof(store.chunk_freq) ==='undefined' ){ store.chunk_freq={}; }
                            store.chunk_freq[i]=test[i];
                        }
                        break;
                    case '/get_saved_task':

                        store.setter('saved_task',data);
                        break;
                }
                store.publish( tag );
            }
        };
        ajaxRequest.open( "POST", url, true );
        ajaxRequest.send( reqArgs );
    }
};


