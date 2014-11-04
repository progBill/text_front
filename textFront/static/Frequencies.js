function Frequencies (){ Helper.apply(this, arguments); }
// sort-of inheritence
Frequencies.prototype = Helper.prototype;
var frequencies = new Frequencies();

Frequencies.prototype.applyFilters = function( list ){
    var whiteList = [];
    var blackList = [];
    var returnList = [];

    if (frequencies.getTextByClass(".whiteList").length > 1){
         whiteList = frequencies.getTextByClass('.whiteList').replace(/, /g, ',').replace(/\n/g, '').split(',');
    }
    if (frequencies.getTextByClass(".blackList").length > 1){
         blackList = frequencies.getTextByClass('.blackList').replace(/, /g, ',').replace(/\n/g, '').split(',');
    }

    for (var w in list){
        if (list.hasOwnProperty(w)){
            var inWhite=true;
            var inBlack=false;
            // see if the list exists, then whether a particular word is on it
            if (whiteList.length > 0 && whiteList.indexOf(list[w]) === -1) inWhite = false;
            if (blackList.length > 0 && blackList.indexOf(list[w]) !== -1) inBlack = true;
            if (inWhite && !inBlack) {
                returnList.push(list[w]);
            }
        }
    }
    return returnList;
};
Frequencies.prototype.formatList= function( list ){
    for (var i in list){
        list[i] = list[i] + '<br />';
    }
    return list;
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

    var lib = store.getLib();
    var raw_hapaxes = [];
    for ( var i in lib){
        if (lib[i] === 1){
            raw_hapaxes.push(i);
        }
    };
    hapaxes = frequencies.applyFilters( raw_hapaxes );
    hapaxes = frequencies.formatList( hapaxes );
    frequencies.setTextByClass({selector:'.txtDisplay', data: hapaxes});
    frequencies.blitElem('.display');
};

/**
 * displays the list of longest words in descending length. If the number to display isn't given,
 * it defaults to 100
 */
Frequencies.prototype.displayLongest= function(){
    var num = frequencies.getTextByClass('.jsLen') || 100;
    var longWords = store.getList().sort(function(a, b){ return b.length-a.length; });
    longWords = frequencies.formatList( longWords );
    frequencies.setTextByClass({selector:'.txtDisplay',data:longWords.slice(0,num)});
    frequencies.blitElem('.display');
};
Frequencies.prototype.displayChart=function(){
    store.chunk_freq={};
    var words = store.getList();

    var chartWords = frequencies.applyFilters( words );
    frequencies.getJson('/get_word_freq_in_chunk','CHUNKS', JSON.stringify(chartWords));

};
Frequencies.prototype.makeChart=function(){
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

    frequencies.blitElem('#chart');
};

Frequencies.prototype.showParams = function( action ){
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
    frequencies.onClickByClass('.jsChart', frequencies.showParams, frequencies.displayChart);
}

store.subscribe('LIB_READY', turnTestsOn);
store.subscribe('CHUNKS', frequencies.makeChart);
frequencies.getJson('/get_word_count', 'LIB_READY');
frequencies.showElem('.display');


