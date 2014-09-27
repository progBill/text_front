
$( document ).ready(function(){
    $txtDisplay = $('.txtDisplay');
    $('.leftbar a').click(function(e){
        e.preventDefault();
        $.getJSON('/get_text', { text_id: $(this).attr('href').slice(1) })
            .done(function( json ){
                $txtDisplay.html( json.textbody );
                $txtDisplay.css('background-color','white');
                $('.right-container li').removeClass('pure-menu-disabled');
            });
    });
});


