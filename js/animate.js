//fadeInUp

/*$('.onas__info, .logo')
         .waypoint( function(dir) {
             if ( dir === 'down' )
                 $(this)
                 .removeClass('fadeOutDown')
                 .addClass('fadeInUp');
             else
                 $(this)
                 .removeClass('fadeInUp')
                 .addClass('fadeOutDown');
         }, {
             offset: '90%'
         })
          .waypoint( function(dir) {
             if ( dir === 'down' )
                 $(this)
                 .removeClass('fadeInUp')
                 .addClass('fadeOutDown');
             else
                 $(this)
                 .removeClass('fadeOutDown')
                 .addClass('fadeInUp');
         }, {
             offset: -50
         })
*/

//zoomInDown

$('.onas__info')
         .waypoint( function(dir) {
             if ( dir === 'down' )
                 $(this)
                 .removeClass('fadeOutDown')
                 .addClass('zoomInDown');
             else
                 $(this)
                 .removeClass('zoomInDown')
                 .addClass('fadeOutDown');
         }, {
             offset: '80%'
         })
          .waypoint( function(dir) {
             if ( dir === 'down' )
                 $(this)
                 .removeClass('zoomInDown')
                 .addClass('fadeOutDown');
             else
                 $(this)
                 .removeClass('fadeOutDown')
                 .addClass('zoomInDown');
         }, {
             offset: -50
         })

// bounceInDown

$('.logo')
         .waypoint( function(dir) {
             if ( dir === 'down' )
                 $(this)
                 .removeClass('fadeOutDown')
                 .addClass('bounceInDown');
             else
                 $(this)
                 .removeClass('bounceInDown')
                 .addClass('fadeOutDown');
         }, {
             offset: '90%'
         })
          .waypoint( function(dir) {
             if ( dir === 'down' )
                 $(this)
                 .removeClass('bounceInDown')
                 .addClass('fadeOutDown');
             else
                 $(this)
                 .removeClass('fadeOutDown')
                 .addClass('bounceInDown');
         }, {
             offset: -50
         })   

