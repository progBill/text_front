var frequencies = (function(){
    this.name ="Frequencies";
    //extend an object
    for (var p in helper ){
//        console.log("Adding prop: " + p);
        this.p = p;
    }

    return{
        getHapaxes: function(){
            var hapaxes = [];
            for (var w in store.getLib()){
                hapaxes.append(w);
            }
            return hapaxes;
        },
        getLongest: function(){},
        out: function(){ console.log("logging") },
    }
})();

helper.getJson('/get_word_count', store.setLib);
//store.subscribe(frequencies.getHapaxes);

helper.onClickByClass('.jsHapaxes', helper.setTextByClass,
    { selector: '.whiteList', 
      data: 'blah-blah'//frequencies.getHapaxes()
    }
);

/*
store.subscribe('LIB_READY', function(){ console.log("tested")});
store.subscribe('LIB_READY', function(){ console.log("also tested")});
store.publish('LIB_READY');
*/


