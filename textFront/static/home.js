$( document ).ready(function(){
    $txtDisplay = $('.txtDisplay');
    /**
     * stuff that happens when you select a text 
     * from the left menu bar
     **/

    $('.leftbar a').click(function(e){
        e.preventDefault();
        $.ajax({ url:'/get_idx', 
                data:$(this).attr('href').slice(1),
                success: function( json ){ 
                    $txtDisplay.html( json.textbody );
                    $('.right-container li').removeClass('pure-menu-disabled');
                    $txtDisplay.css('background-color','white');
                }
        });
    });

});

