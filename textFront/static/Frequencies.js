function Frequencies (){ Helper.apply(this, arguments); };
// sort-of inheritence
Frequencies.prototype = Helper.prototype;
var frequencies = new Frequencies();

/**
 * displays the list of all tokens with their counts in parens
 */
Frequencies.prototype.displayAll = function(){
    frequencies.hideElem('.params');
    frequencies.showElem('.display');
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
/**
 * HAPAXES
 * displays list of all singly occuring words
 */
Frequencies.prototype.displayHapaxes = function(){

    frequencies.hideElem('.params');
    frequencies.showElem('.display');
    var lib = store.getLib();
    var hapaxes = [];
////BEGIN PARAM PROCESSING
    var whiteList = [];
    var blackList = [];
    if (frequencies.getTextByClass(".whiteList").length > 1){
         whiteList = frequencies.getTextByClass('.whiteList').replace(/, /g, ',').replace(/\n/g, '').split(',');
    }
    if (frequencies.getTextByClass(".blackList").length > 1){
         blackList = frequencies.getTextByClass('.blackList').replace(/, /g, ',').replace(/\n/g, '').split(',');
    }
    for (var w in lib){
        var inWhite=true;
        var inBlack=false;
        // see if the list exists, then whether a particular word is on it
        if (whiteList.length > 0 && whiteList.indexOf(w) === -1) inWhite = false;
        if (blackList.length > 0 && blackList.indexOf(w) !== -1) inBlack = true;
        if (inWhite && !inBlack ){ hapaxes.push(w+='<br />'); }
    }
////END PARAM PROCESSING

    frequencies.setTextByClass({selector:'.txtDisplay', data:hapaxes});
};

/**
 * displays the list of longest words in descending length. If the number to display isn't given,
 * it defaults to 100
 */
Frequencies.prototype.displayLongest= function(){
    var num = frequencies.getTextByClass('.whiteList') || 100;
    frequencies.hideElem('.params');
    frequencies.showElem('.display');
    var lib = store.getLib();
    var longWords= [];
////BEGIN PARAMS
    var whiteList = [];
    var blackList = [];
    if (frequencies.getTextByClass(".whiteList").length > 1){
         whiteList = frequencies.getTextByClass('.whiteList').replace(/, /g, ',').replace(/\n/g, '').split(',');
    }
    if (frequencies.getTextByClass(".blackList").length > 1){
         blackList = frequencies.getTextByClass('.blackList').replace(/, /g, ',').replace(/\n/g, '').split(',');
    }
    for (var w in lib){
        var inWhite=true;
        var inBlack=false;
        // see if the list exists, then whether a particular word is on it
        if (whiteList.length > 0 && whiteList.indexOf(w) === -1) inWhite = false;
        if (blackList.length > 0 && blackList.indexOf(w) !== -1) inBlack = true;
        if (inWhite && !inBlack ){ longWords.push(w+='<br />'); }
    }
////END PARAMS
    longWords = longWords.sort(function(a, b){ return b.length-a.length; }).slice(0, num);
    frequencies.setTextByClass({selector:'.txtDisplay',data:longWords});
};

/**
 * Utilities and Setup 
 */


Frequencies.prototype.paramHapaxes = function(){
    frequencies.hideElem('.display');
    frequencies.showElem('.params');
    frequencies.setTextByClass({selector:'.whiteList', data:''});
    frequencies.setTextByClass({selector:'.blackList', data:''});
    frequencies.onClickByClass('.jsTaskExecute', frequencies.displayHapaxes);

};
Frequencies.prototype.paramLongest = function(){
    frequencies.hideElem('.display');
    frequencies.showElem('.params');
    frequencies.setTextByClass({selector:'.whiteList', data:''});
    frequencies.setTextByClass({selector:'.blackList', data:''});
    frequencies.onClickByClass('.jsTaskExecute', frequencies.displayLongest);
};
function turnTestsOn(){
    frequencies.onClickByClass('.jsHapaxes', frequencies.paramHapaxes);
    frequencies.onClickByClass('.jsAll-Tokens', frequencies.displayAll);
    frequencies.onClickByClass('.jsLong-Words', frequencies.paramLongest);
//    frequencies.onClickByClass('.jsLong-Words', frequencies.displayLongest);
};

store.subscribe('LIB_READY', turnTestsOn);
frequencies.getJson('/get_word_count', 'LIB_READY');
frequencies.showElem('.display');



