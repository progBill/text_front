function Frequencies (name){
    Helper.apply(this, arguments);
};
// sort-of inheritence
Frequencies.prototype = Helper.prototype;
Frequencies.prototype.getHapaxes = function(){
    var hapaxes = [];
console.log(store.getLib());
    for (var w in store.getLib()){
        hapaxes.append(w);
    }
    frequencies.setTextByClass({selector:'.whiteList', data:hapaxes});
};

var frequencies = new Frequencies("Freqs");
//store.subscribe('LIB_READY', frequencies.getHapaxes); //function(){ console.log("Hapaxed")});
store.subscribe('LIB_READY', function(){ frequencies.setTextByClass({selector:'.blackList',data:frequencies.getHapaxes()}); });

frequencies.getJson('/get_word_count', store.setter);

store.subscribe('LIB_READY', function(){ console.log("tested")});
store.subscribe('LIB_READY', function(){ console.log("also tested")});
//store.publish('LIB_READY');


