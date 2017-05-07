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
  var mySwiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: false,
    speed: 1000,
    pagination: '.swiper-pagination',
    paginationClickable: true,
    effect: 'fade',
    fade: {
      crossFade: false
    }
  });

  // Swiper Progress Bar
  var autoplay = 10000;
  var swiperProgress = {
    progress: null,
    width: 1,
    autoplayTime: autoplay / 100,
    isPaused: false,
    id: null,
    init: function() {

      this.progress = document.querySelector('.swiper-progress');
      if (!this.progress) {
        return
      }
      this.id = setInterval(this.updateProgress.bind(this), this.autoplayTime);
    },
    updateProgress: function() {
      if (!this.isPaused) {
        if (this.width >= 100) {
          mySwiper.slideNext();
          this.width = 0;
        } else {
          this.width += 1;
          this.progress.style.width = this.width + '%';
        }
      }
    },
    play: function() {
      this.isPaused = false;
    },
    pause: function() {
      this.isPaused = true;
    }
  };
  swiperProgress.init();
  // Swiper stop on hover
  $('.swiper-container').hover(function() {
    swiperProgress.pause();
  }, function() {
    swiperProgress.play();
  });

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
    if (+$(this).val() > 0 && $(this).val() !== '') {
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

  // Custom input='number' style
  /**
   * Controll input number
   * @param {jQueryObject} $input - input for controll
   * @param {String} dir - direction of controll ['up', 'down']
   */
  function numberControll($input, dir) {
    var maxVal = $input.attr('max') ? +$input.attr('max') : 9999;
    var minVal = $input.attr('min') ? +$input.attr('min') : -9999;
    var val = $input.val();
    switch (dir) {
      case 'up':
        val++;
        if (val > maxVal) { return; }
        break;
      case 'down':
        val--;
        if (val < minVal) { return; }
        break;
    }
    $input.val(val);
    $input.trigger('change');
  }
  $('.js-number-plus').on('click', function(e) {
    e.preventDefault();
    var $input = $(this).parents().siblings('.custom-number__field');
    numberControll($input, 'up');
  });
  $('.js-number-minus').on('click', function(e) {
    e.preventDefault();
    var $input = $(this).parents().siblings('.custom-number__field');
    numberControll($input, 'down');
  });


})(jQuery);
