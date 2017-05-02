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
  function changeImgToBg(imgSel, parentSel) {
    if (!imgSel) {
      console.info('no img selector');
      return false;
    }

    var $parent, _this;

    $(imgSel).each(function() {
      _this = $(this);
      $parent = _this.closest(parentSel);
      $parent = $parent.length ? $parent : _this.parent();
      $parent.css('background-image', 'url(' + this.src + ')');
      _this.hide();
    });
  }
  changeImgToBg('.js-bg');

  // Magnific pop-up
  var magnificPopup = $.magnificPopup.instance; // save instance in magnificPopup variable

  $('.js-close-popup').on('click', magnificPopup.close);
  // Buy Form
  $('.js-open-buy-form').magnificPopup({
    items: {
      src: '#buy-form', // can be a HTML string, jQuery object, or CSS selector
      type: 'inline'
    },
    showCloseBtn: false
  });

  // Check amount of products to buy
  function activateBuyBtn() {
    var $btn = $(this).parents('tr').find('.ml-btn');
    if (+$(this).val() !== 0 && $(this).val() !== '') {
      $btn.removeClass('ml-btn--disabled');
    } else {
      $btn.addClass('ml-btn--disabled');
    }
  }
  $('.js-check-amount').on('change', activateBuyBtn);
  $('.js-check-amount').bind('keyup mouseup', activateBuyBtn);

  /**
   * Toggle radio buttons content
   * @param {String} radioName - radio buttons name value
   */
  function toggleContent(radioName) {
    var $content = $('[data-' + radioName + ']');
    $('input[name="' + radioName + '"]').on('change', function() {
      $content.css('height', '0px');
      $content.filter('[data-' + radioName + '="' + this.value + '"]').css('height', 'auto');
    });
  }

  toggleContent('pay-method');
  toggleContent('shipping');

  /**
   * Animate scroll to block
   * @param {jQueryObject} $element - element that trigger scroll
   */
  function animateScroll($element) {
    $element.on('click', function(e) {
      e.preventDefault();
      var blockOffset = $(this.hash).offset().top;
      $('body').stop().animate({scrollTop: blockOffset}, '500', 'swing');
    });
  }
  animateScroll($('.js-scroll-to'));

})(jQuery);
