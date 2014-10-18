function Frequencies (name){
    Helper.apply(this, arguments);
};
// sort-of inheritence
Frequencies.prototype = Helper.prototype;
Frequencies.prototype.getHapaxes = function(){
    var hapaxes = [];
    var lib = store.getLib();
    for (var w in lib){
        if (lib[w]===1){
            hapaxes.push(w+='<br />');
        }
    }
    frequencies.hideElem('.params');
    frequencies.setTextByClass({selector:'.txtDisplay', data:hapaxes});
};
Frequencies.prototype.getLongest= function(){
   this.getJson('/get_longest_word'); 
};

/**
 * Setup 
 */
function turnTestsOn(){
    frequencies.onClickByClass('.jsHapaxes', frequencies.getHapaxes);
};

/**
 * behavior hooks
 */
var frequencies = new Frequencies("Freqs");
store.subscribe('LIB_READY', turnTestsOn);
frequencies.getJson('/get_word_count', 'LIB_READY');
frequencies.showElem('.display');

