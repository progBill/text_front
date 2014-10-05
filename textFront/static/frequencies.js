
var Frequencies = function(){
    Helper.apply(this, arguments);
    this.name = name;
    var big_freq = '';

};

Frequencies.prototype = Helper.prototype;

var f = new Frequencies("Frequencies");
f.big_freq = 'testing';
f.getJson('/get_word_count', f.setTextByClass, '.txtDisplay'); 

