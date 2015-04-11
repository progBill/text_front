var Home = Object.create(Helper);

Home.getText = function( ){
    home.getJson('/get_idx', 'TEXT_SET', this.innerHTML );
};
Home.displayText= function(){
    home.setTextByClass({selector: '.jsSelectedText', data:store.getter('selectedTitle')});
    home.setTextByClass({selector: '.mainColumn', data:store.text }); 
};
Home.setBookClick= function(){
    var texts = document.querySelector(".jsBook").getElementsByTagName("a");
    for(var i=0; i<texts.length; i++){
        var title = texts[i].innerHTML;
        texts[i].addEventListener('click', home.getText);
    };
};

var home = Object.create( Home );
store.subscribe('TEXT_SET', home.displayText);
home.setBookClick();

