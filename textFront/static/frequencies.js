
$( document ).ready(function(){
    $.getJSON('/get_word_count')
        .done(function( json ){ 
            //$('.txtDisplay').html( json.textbody );

            var listString = '';
            for ( elem in json.textbody ){
                listString += json.textbody[elem] + ': ' + elem + '<br />'
            }

            $('.txtDisplay').html( listString );
            $('.txtDisplay').css( 'background-color','white' );

        });
});


