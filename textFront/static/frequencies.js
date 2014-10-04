
function setTxtDisplay( txt ){
    var elem = document.querySelector('.txtDisplay');
    elem.innerHTML = txt; 
    elem.style.backgroundColor = '#FFFFFF';
};

var h = new Helper('Freqy');
h.make_ajax_request(setTxtDisplay, '/get_word_count');




