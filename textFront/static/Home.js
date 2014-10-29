function Home (){ Helper.apply(this, arguments) };
Home.prototype = Helper.prototype;

var home = new Home();

Home.prototype.getText = function( title ){
    home.getJson('/get_idx', 'TEXT_SET', this.innerHTML );
};
Home.prototype.displayText= function(){
    home.setTextByClass({selector: '.txtDisplay', data:store.text }); 
};
Home.prototype.setBookClick= function(){
    var texts = document.querySelector(".leftbar").getElementsByTagName("a");
    for(var i=0; i<texts.length; i++){
        var title = texts[i].innerHTML;
        texts[i].addEventListener('click', home.getText);
    };
};

store.subscribe('TEXT_SET', home.displayText);
home.setBookClick();


