;(function($) {
  // Main menu
  $('#ml-menu')
    .mmenu({
      // options
      extensions: ['border-none', 'theme-black', 'fullscreen'],
      offCanvas: {
        zposition: 'front',
        position: 'bottom'
      },
      navbars: {
        content: ['close']
      }
    }, {
      // configuration
      clone: true
    });
})(jQuery);
