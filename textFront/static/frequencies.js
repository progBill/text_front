var Frequencies = function(name){
    Helper.apply(this, arguments);
    this.name = name;
    this.big_freq = new Store();
    console.log("new " + this.name);
};
Frequencies.prototype = Helper.prototype;
Frequencies.prototype.setFreq= function (x) {
    var i;
    console.log("Freq.big_freq: " + x );
    for (i in x) {
        this.big_freq.newAttr(i[0]);
        this.big_freq.setter(i[0],i[1]);
    }
};
Frequencies.prototype.getHapaxes = function(x) {};
Frequencies.prototype.out = function(x){console.log(x);}

var f = new Frequencies("Frequencies");
f.getJson('/get_word_count', f.out);
f.setTextByClass({selector: '.whiteList', freq:f.big_freq});

