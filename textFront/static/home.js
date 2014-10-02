
$( document ).ready(function(){
    $txtDisplay = $('.txtDisplay');

    /**
     * stuff that happens when you select a text 
     * from the left menu bar
     **/
    $('.leftbar a').click(function(e){
        e.preventDefault();
        $.getJSON('/get_text', { text_id: $(this).attr('href').slice(1) })
            .done(function( json ){
                $txtDisplay.html( json.textbody );
            });
        $('.right-container li').removeClass('pure-menu-disabled');
        $txtDisplay.css('background-color','white');
    });

});




