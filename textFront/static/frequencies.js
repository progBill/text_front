
var Frequencies = function(){
    Helper.apply(this, arguments);
    this.name = name;
    var big_freq = '';
};

Frequencies.prototype = Helper.prototype;
Frequencies.prototype.setFreq = function(x){ this.big_freq = x };
var f = new Frequencies("Frequencies");

var data = f.getJson('/get_word_count'); //, f.setTextByClass, '.whiteList'); 
f.setFreq( data );


console.log( data );
