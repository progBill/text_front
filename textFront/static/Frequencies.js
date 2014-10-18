function Frequencies (){
    Helper.apply(this, arguments);
};
// sort-of inheritence
Frequencies.prototype = Helper.prototype;
Frequencies.prototype.getAll = function(){
    frequencies.hideElem('.params');
    var allWords = [];
    var lib = store.getLib();
    for (var w in lib){
        allWords.push(w+= ' ( ' + lib[w] + ' )<br />');
    }
    allWords = allWords.sort(function(a, b){ 
        var a1 = a.lastIndexOf('( ')+1;
        var a2 = a.lastIndexOf(' )');
        var aNum= a.slice(a1,a2);
        var b1 = b.lastIndexOf('( ')+1;
        var b2 = b.lastIndexOf(' )');
        var bNum= b.slice(b1,b2);

        return bNum - aNum;
     });

    frequencies.setTextByClass({selector: '.txtDisplay', data:allWords });
};
Frequencies.prototype.getHapaxes = function(){

    frequencies.hideElem('.params');
    var hapaxes = [];
    var lib = store.getLib();
    for (var w in lib){
        if (lib[w]===1){
            hapaxes.push(w+='<br />');
        }
    }
    frequencies.setTextByClass({selector:'.txtDisplay', data:hapaxes});
};
Frequencies.prototype.getLongest= function(num){
    var num = num || 100;
    frequencies.hideElem('.params');
    var lib = store.getLib();
    var longWords = [];
    for (var w in lib){
        longWords.push(w+='<br />');
    }
    var longestWords = longWords.sort(function(a, b){ return b.length-a.length; }).slice(0, num);
    frequencies.setTextByClass({selector:'.txtDisplay',data:longestWords});
};

/**
 * Setup 
 */
function turnTestsOn(){
    frequencies.onClickByClass('.jsHapaxes', frequencies.getHapaxes);
    frequencies.onClickByClass('.jsAll-Tokens', frequencies.getAll);
    frequencies.onClickByClass('.jsLong-Words', frequencies.getLongest);
};

/**
 * behavior hooks
 */
var frequencies = new Frequencies("Freqs");
store.subscribe('LIB_READY', turnTestsOn);
frequencies.getJson('/get_word_count', 'LIB_READY');
frequencies.showElem('.display');



