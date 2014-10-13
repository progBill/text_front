function Frequencies (name){
    Helper.apply(this, arguments);
};
// sort-of inheritence
Frequencies.prototype = Helper.prototype;
Frequencies.prototype.getHapaxes = function(){
    var hapaxes = ['testor'];
    for (var w in store.getLib()){
        hapaxes.push(w);
    }
    frequencies.setTextByClass({selector:'.whiteList', data:hapaxes});
};

var frequencies = new Frequencies("Freqs");

store.subscribe('LIB_READY', frequencies.getHapaxes);

frequencies.onClickByClass('.jsHapaxes', frequencies.setTextByClass, {selector:'.blackList',data:'this be a test, yo'});
frequencies.getJson('/get_word_count');


