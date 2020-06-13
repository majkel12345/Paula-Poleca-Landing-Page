// bounceInDown Logo

$('.logo')
    .waypoint( function(dir) {
        if ( dir === 'down' )
            $(this)
            .addClass('bounceInDown')
            .removeClass('fadeOutDown');
        else
            $(this)
            .addClass('fadeOutDown')
            .removeClass('bounceInDown');
        }, {
            offset: '80%'
        })
    .waypoint( function(dir) {
        if ( dir === 'down' )
            $(this)
            .addClass('fadeOutDown')
            .removeClass('bounceInDown');
        else
            $(this)
            .addClass('bounceInDown')
            .removeClass('addHidden')
            .removeClass('fadeOutDown');
         }, {
             offset: -95
         })   
         
//zoomInDown O nas

$('.onas__info')
    .waypoint( function(dir) {
        if ( dir === 'down' )
            $(this)
            .addClass('zoomInDown')
            .removeClass('addHidden');
        else
            $(this)
            .addClass('addHidden')
            .addClass('.onas__info')
            .removeClass('zoomInDown');
    }, {
        offset: '80%'
    })
    .waypoint( function(dir) {
        if ( dir === 'down' )
            $(this)
            .addClass('zoomInDown')
            .removeClass('addHidden');
        else
            $(this)
            .addClass('.onas__info');
    }, {
        offset: -95
    })