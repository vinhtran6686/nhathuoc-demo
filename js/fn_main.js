
$(document).ready(function () {
  menuFooter();
  slideAllPage();
  removeItemBuyLater();
  headerEvent();
  $(document).on('click touch', '.close-md', function () {
    var notifyMb = $('.notify-boxMB');
    notifyMb.removeClass('open');
    $('#textSuccessHeaderMB').addClass('fade');
  });
});

// function for footer all page
function menuFooter() {
  // Collpase footer
  var coll = $('.title-colapse');
  coll.each(function () {
    $(this).on('click', function () {
      if (parseInt($(window).width()) < 768) {
        $(this).toggleClass('active');
        var content = $(this).next();
        var isBlock = $(this).next().css('display');
        var boxShadow = $(this).parent().parent();
        // console.log(boxShadow);
        if (isBlock == 'block') {
          content.slideUp();
          boxShadow.removeClass('active');
        } else {
          content.slideDown();
          boxShadow.addClass('active');
        }
      }
    });
  });
};

// function remove item later for all page
function removeItemBuyLater() {
  $(document).on('click', '.btnDeleteItemBuyLater', function () {
    var that = $(this), data = that.data(), parent = that.parent(), ans = parent.parent().parent(), opt = {},
      closest = that.closest('.itemBuyLater');
    e.preventDefault();

    opt.begin = function (that, formData) {
      closest.remove();

      if (!$('.itemBuyLater').length) {
        $('.titleBuyLater').attr('style', 'display:none !important');
      }
    };

    opt.success = function (res, that, formData) {

    };

    sendSer('/cart/removeItemBuyLater', data, that, opt);

  });
};

// function event init slide for all page
function slideAllPage() {
  var slideGroup1 = new Swiper(".js-slide--later", {
    slidesPerView: 5,
    slidesPerGroup: 5,
    navigation: {
      nextEl: ".js-slide--later + .sw-btn-next",
      prevEl: ".js-slide--later + .sw-btn-next + .sw-btn-prev",
    },
    breakpoints: {
      992: {
        slidesPerView: 'auto',
        slidesPerGroup: 2,
      },
    },
  });

  var slideGroup2 = new Swiper(".js-slide--together", {
    slidesPerView: 5,
    slidesPerGroup: 5,
    navigation: {
      nextEl: ".js-slide--together +.sw-btn-next",
      prevEl: ".js-slide--together + .sw-btn-next + .sw-btn-prev",
    },
    breakpoints: {
      992: {
        slidesPerView: 'auto',
        slidesPerGroup: 2,
      },
    },
  });

  var swiper = new Swiper('.js-slide--promo', {
    spaceBetween: 20,
    navigation: {
      nextEl: '.js-slide--promo  + .sw-next',
      prevEl: '.js-slide--promo  + .sw-next + .sw-prev',
    },
    breakpoints: {
      4000: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      992: {
        slidesPerView: 'auto',
        // slidesPerGroup: 2,
        spaceBetween: 12
      },
    },
  });
};


// function header for all page
function headerEvent() {
  $('.nav-hover').each(function () {
    $(this).mouseenter(function () {

      $(this).find('.lc__dropdown-menu').addClass('lc__block');

      $('.lc__dropdown-menu').is('.lc__block') && $('.lc__mask').addClass('lc__block').css('z-index', '1060');;

    }).mouseleave(function () {

      // $(this).find('.lc__dropdown-menu').removeClass('lc__block');
      $('.lc__mask, .lc__dropdown-menu').removeClass('lc__block');

    });
  });

  $('.lc__dropdown-menu').each(function () {
    var item = $(this).find('.js-hover-tab'),
      content_tab = $(this).find('.sub-nav-right'),
      item_tab = $(this).find('.sub-nav-item');
    content_tab.hide();
    content_tab.first().show();
    item.mouseenter(function () {
      var that = $(this),
        index = that.attr('id');

      that.addClass('active');
      that.siblings().removeClass('active');

      content_tab.hide();
      $(`[tab-index="${index}"]`).show();
    }).mouseleave(function () {
    });
  })

  $('.js-open-side').click(function () {
    $('.lc__side-menu').addClass('show');
    $('html').addClass('disable-scroll-safari');
  });
  $('.js-close-side').click(function () {
    $('.lc__side-menu').removeClass('show');
    $('html').removeClass('disable-scroll-safari');
  });

  $('.lc__side-menu').click(function (e) {
    if ($(this).is(e.target) && $(this).has(e.target).length === 0) {
      $(this).removeClass('show');
      $('html').removeClass('disable-scroll-safari');
    }
  })

  $('.js-down').each(function () {
    var ac_item = $(this).find('.lc__nav-ic'),
      content = $(this).find('.lc__dropdown-list');
    content.hide();
    ac_item.click(function () {
      var that = $(this),
        is_open = that.is('.ac-down');
      if (is_open) {
        that.removeClass('ac-down');
        content.removeClass('show').slideUp();
      } else {
        that.addClass('ac-down');
        content.slideDown();
      }
    });
  });

}
