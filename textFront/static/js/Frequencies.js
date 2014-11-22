var Frequencies = Object.create(Helper);

Frequencies.applyFilters = function( list ){
    var whiteList = [];
    var blackList = [];
    var returnList = [];

    if (Frequencies.getTextByClass(".whiteList").length > 1){
         whiteList = Frequencies.getTextByClass('.whiteList').replace(/, /g, ',').replace(/\n/g, '').split(',');
    }
    if (Frequencies.getTextByClass(".blackList").length > 1){
         blackList = Frequencies.getTextByClass('.blackList').replace(/, /g, ',').replace(/\n/g, '').split(',');
    }

    for (var w in list){
        if (list.hasOwnProperty(w)){
            var inWhite=true;
            var inBlack=false;
            // see if the list exists, then whether a particular word is on it
            if (whiteList.length > 0 && whiteList.indexOf(list[w]) === -1){ inWhite = false; }
            if (blackList.length > 0 && blackList.indexOf(list[w]) !== -1){ inBlack = true; }
            if (inWhite && !inBlack) {
                returnList.push(list[w]);
            }
        }
    }
    return returnList;
};
Frequencies.formatList= function( list ){
    for (var i in list){
        list[i] = list[i] + '<br />';
    }
    return list;
};
Frequencies.blitElem= function( elem ){
    Frequencies.hideElem('.params');
    Frequencies.hideElem('.display');
    Frequencies.hideElem('#chart');

    Frequencies.showElem( elem );
};

/**
 * displays the list of all tokens with their counts in parens
 */
Frequencies.displayAll = function(){
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

    Frequencies.setTextByClass({selector: '.txtDisplay', data:allWords });
    Frequencies.blitElem('.display');
};
/**
 * HAPAXES
 * displays list of all singly occuring words
 */
Frequencies.displayHapaxes = function(){

    var lib = store.getLib();
    var raw_hapaxes = [];
    for ( var i in lib){
        if (lib[i] === 1){
            raw_hapaxes.push(i);
        }
    };
    hapaxes = Frequencies.applyFilters( raw_hapaxes );
    hapaxes = Frequencies.formatList( hapaxes );
    Frequencies.setTextByClass({selector:'.txtDisplay', data: hapaxes});
    Frequencies.blitElem('.display');
};

/**
 * displays the list of longest words in descending length. If the number to display isn't given,
 * it defaults to 100
 */
Frequencies.displayLongest= function(){
    var num = Frequencies.getTextByClass('.jsLen') || 100;
    var longWords = store.getList().sort(function(a, b){ return b.length-a.length; });
    longWords = Frequencies.formatList( longWords );
    Frequencies.setTextByClass({selector:'.txtDisplay',data:longWords.slice(0,num)});
    Frequencies.blitElem('.display');
};
Frequencies.displayChart=function(){
    store.chunk_freq={};
    var words = store.getList();

    var chartWords = Frequencies.applyFilters( words );

    Frequencies.getJson('/get_word_freq_in_chunk','CHUNKS', JSON.stringify(chartWords));

};
Frequencies.makeChart=function(){

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

    Frequencies.blitElem('#chart');
};

Frequencies.showParams = function( action ){
    Frequencies.setTextByClass({selector:'.whiteList', data:''});
    Frequencies.setTextByClass({selector:'.blackList', data:''});
    Frequencies.onClickByClass('.jsTaskExecute', action);
    Frequencies.blitElem('.params');
};

var frequencies = Object.create( Frequencies );
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

