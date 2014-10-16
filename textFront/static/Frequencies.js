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
            hapaxes.push(w);
        }
    }
    frequencies.setTextByClass({selector:'.whiteList', data:hapaxes});
};
Frequencies.prototype.getLongest= function(){
    var longest=[];
    var lib = store.getLib();
    for (var w in lib){
        
    }
};
/**
 * Setup 
 */
function turnTestsOn(){
    frequencies.onClickByClass('.jsHapaxes', frequencies.setTextByClass, {selector:'.blackList',data:'this be a test, yo'});
//    frequencies.onClickByClass('.fMenu', function(){ $('.bdy').css('background-color','red'); });
    frequencies.onClickByClass('.fMenu', frequencies.showElem, '.params');
    frequencies.getHapaxes();
};
var frequencies = new Frequencies("Freqs");
store.subscribe('LIB_READY', turnTestsOn);

/**
 * behavior hooks
 */

frequencies.getJson('/get_word_count');
frequencies.showElem('.display');
