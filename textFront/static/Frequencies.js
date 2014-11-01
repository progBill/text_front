function Frequencies (){ Helper.apply(this, arguments); }
// sort-of inheritence
Frequencies.prototype = Helper.prototype;
var frequencies = new Frequencies();

Frequencies.prototype.applyFilters = function(){
    var whiteList = [];
    var blackList = [];
    var returnList = [];
    var lib = store.getLib();
    if (frequencies.getTextByClass(".whiteList").length > 1){
         whiteList = frequencies.getTextByClass('.whiteList').replace(/, /g, ',').replace(/\n/g, '').split(',');
    }
    if (frequencies.getTextByClass(".blackList").length > 1){
         blackList = frequencies.getTextByClass('.blackList').replace(/, /g, ',').replace(/\n/g, '').split(',');
    }
    for (var w in lib){
        if (lib.hasOwnProperty(w)){
            var inWhite=true;
            var inBlack=false;
            // see if the list exists, then whether a particular word is on it
            if (whiteList.length > 0 && whiteList.indexOf(w) === -1) inWhite = false;
            if (blackList.length > 0 && blackList.indexOf(w) !== -1) inBlack = true;
            if (inWhite && !inBlack) returnList.push(w);
        }
    }
    return returnList;
};
Frequencies.prototype.formatList= function( list ){
    for (var i in list){
        i = i + '<br />';
    }
};
Frequencies.prototype.blitElem= function( elem ){
    frequencies.hideElem('.params');
    frequencies.hideElem('.display');
    frequencies.hideElem('#chart');

    frequencies.showElem( elem );
};

/**
 * displays the list of all tokens with their counts in parens
 */
Frequencies.prototype.displayAll = function(){
    var allWords = [];
    var lib = store.getLib();
    for (var w in lib){
      if (lib.hasOwnProperty(w)){
        allWords.push(w+= ' ( ' + lib[w] + ' )<br />');
        }
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
    frequencies.blitElem('.display');
};
/**
 * HAPAXES
 * displays list of all singly occuring words
 */
Frequencies.prototype.displayHapaxes = function(){
    var hapaxes = frequencies.applyFilters();
//    hapaxes = frequencies.formatList( hapaxes );
    frequencies.setTextByClass({selector:'.txtDisplay', data: hapaxes});
    frequencies.blitElem('.display');
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
    var longWords= frequencies.applyFilters();
    longWords = longWords.sort(function(a, b){ return b.length-a.length; }).slice(0, num);
    frequencies.setTextByClass({selector:'.txtDisplay',data:longWords});
};
Frequencies.prototype.displayChart=function(){
    store.chunk_freq={};
    var chartWords = frequencies.applyFilters();
    frequencies.getJson('/get_word_freq_in_chunk','CHUNKS', chartWords);

};
Frequencies.prototype.makeChart=function(){
    frequencies.showElem('#chart');
    frequencies.hideElem('.params');
    var chart1 = new Highcharts.Chart({
        chart: {
            renderTo: 'chart',
            type: 'spline',
        },
        title: { text: 'Frequencies' },
        //xAxis: { categories: ['Chunk'] },
        yAxis: { title: { text: 'Count' } },
    });

    for ( var i in store.chunk_freq ){
        chart1.addSeries({
            name:i, data:store.chunk_freq[i]
        });
    }
};


Frequencies.prototype.showParams = function( action ){
console.log(action);
    frequencies.setTextByClass({selector:'.whiteList', data:''});
    frequencies.setTextByClass({selector:'.blackList', data:''});
    frequencies.onClickByClass('.jsTaskExecute', action);
    frequencies.blitElem('.params');
};

/////////  SETUP
function turnTestsOn(){
    frequencies.onClickByClass('.jsAll-Tokens', frequencies.displayAll);
    frequencies.onClickByClass('.jsHapaxes', frequencies.showParams, frequencies.displayHapaxes);
    frequencies.onClickByClass('.jsLong-Words', frequencies.showParams, frequencies.displayLongest);
    frequencies.onClickByClass('.jsChart', frequencies.showParams, frequencies.paramChart);
}

store.subscribe('LIB_READY', turnTestsOn);
store.subscribe('CHUNKS', frequencies.makeChart);
frequencies.getJson('/get_word_count', 'LIB_READY');
frequencies.showElem('.display');


