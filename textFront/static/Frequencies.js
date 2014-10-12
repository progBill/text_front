function Frequencies (name){};
// sort-of inheritence
Frequencies.prototype = Object.create(Helper.prototype);
Frequencies.prototype.getHapaxes = function(){
    var hapaxes = [];
    for (var w in store.getLib()){
        hapaxes.append(w);
    }
    store.publish('HAPAXES');
    this.setTextByClass('.whiteList',hapaxes);
};

var frequencies = new Frequencies("Freqs");
store.subscribe('HAPAXES', function(){ console.log("Hapaxed")});


frequencies.getJson('/get_word_count', store.setter);


store.subscribe('LIB_READY', function(){ console.log("tested")});
store.subscribe('LIB_READY', function(){ console.log("also tested")});
store.publish('LIB_READY');
