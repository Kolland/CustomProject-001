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

  // Swiper Slider
  var mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    loop: true,
    autoplay: 5000
  })

  // Image to Background
  function changeImgToBg( imgSel, parentSel){

    if (!imgSel) {
      console.info('no img selector');
      return false;
    }

    var $parent, _this;

    $(imgSel).each(function(){
      _this = $(this);
      $parent = _this.closest( parentSel );
      $parent = $parent.length ? $parent : _this.parent();
      $parent.css( 'background-image' , 'url(' + this.src + ')' );
      _this.hide()
    });

  }

  changeImgToBg('.js-bg');
})(jQuery);
