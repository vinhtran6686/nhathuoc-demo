(function ($) {
  $(document).ready(function () {
    smoothScroll();
    slideNomal();
    slideBanner();
    showMoreLess();
    removeSlideMobile();
    $('.check-form').checkList();
  });
})(window.jQuery);
let $window = $(window), $width = $window.width(), $mobile = $width < 992, $desktop = $width > 992;
function smoothScroll() {
  var scrollLink = $('.scroll');
  // Smooth scrolling
  scrollLink.click(function (e) {
    e.preventDefault();
    $('body,html').animate({
      scrollTop: $(this.hash).offset().top - 50
    }, 1000);
  });
  // Active link switching
  $(window).scroll(function () {
    var scrollbarLocation = $(this).scrollTop();
    scrollLink.each(function () {
      var sectionOffset = $(this.hash).offset().top - 70;
      if (sectionOffset <= scrollbarLocation) {
        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');
      }
    })
  })
}
function slideNomal() {
  if ($desktop) {
    var swiper = new Swiper('.js-slide--related', {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 24,
      navigation: {
        nextEl: '.js-slide--related + .next',
        prevEl: '.js-slide--related + .next + .prev',
      },
      breakpoints: {
        992: {
          slidesPerView: 'auto',
          slidesPerGroup: 2,
        },
      },
    });
  }
}
function slideBanner() {
  if ($desktop) {
    var swiper = new Swiper('.js-slide--related-banner', {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 24,
      slidesPerColumn: 2,
      slidesPerColumnFill: 'row',
      navigation: {
        nextEl: '.js-slide--related-banner + .next',
        prevEl: '.js-slide--related-banner + .next + .prev',
      },
      breakpoints: {
        992: {
          slidesPerView: 'auto',
          slidesPerGroup: '2',
        },
      },
    });
  }
  if ($mobile) {
    $('.slideBanner').addClass('js-loadmore-wrap');
    loadmoreProduct();
  }
}
function showMoreLess() {
  $('.loadMoreComments').click(function () {
    $('.lc-landing-thele').toggleClass('more-text');
    if ($('.loadMoreComments .txt').text() == "Xem thêm thể lệ") {
      $('.loadMoreComments .txt').text("Thu gọn thể lệ")
    } else {
      $('.loadMoreComments .txt').text("Xem thêm thể lệ")
    }
    if ($('.loadMoreComments .txt-m').text() == "Xem thêm thể lệ") {
      $('.loadMoreComments .txt-m').text("Thu gọn thể lệ")
    } else {
      $('.loadMoreComments .txt-m').text("Xem thêm thể lệ")
    }
  });
}

function removeSlideMobile() {
  var width = $(window).width(),
    repsonsive = width < 992;
  if (repsonsive) {
    $('.lc-landing-content .products-relate').removeClass('swiper-wrapper');
  }
}

const loadmoreProduct = () => {
  let wrapLoadMore = $('.js-loadmore-wrap');
  var bath = 8;
  wrapLoadMore.each(function (index) {
    let that = $(this), itemCol = that.find('.itemCol');
    let btnLoadmore = that.find('.js-btn-loadmore a');
    itemCol.hide();
    itemCol.slice(0, bath).show();
    var itemColHiddens = that.find('.itemCol:hidden');
    btnLoadmore.click(function (e) {
      e.preventDefault();
      var itemColHidden = $(this).closest('.js-loadmore-wrap').find('.itemCol:hidden');
      itemColHidden.slice(0, bath).show();
      parseInt($(this).closest('.js-loadmore-wrap').find('.itemCol:hidden').length) === 0 && $(this).hide();
    });
  });
}

var lcDropdown = () => {
  var dropdown = $('.dropdown');
  dropdown.each(function () {
    var _that = $(this);
    var body = $('body');
    var listDropdown = _that.find('.dropdown-menu'),
      itemDropdown = listDropdown.find('.js-dropdown-list a');
    var itemmenu = _that.find('.dropdown-button'),
      search = _that.find('.dropdown-menu');
    input = _that.find('.form-search-input');
    iconClose = search.find('.js-close');
    iconClose.click(function () {
      $(this).closest('.dropdown-menu').removeClass('open');
      body.removeClass('disable-scroll');
    });
    itemmenu.click(function (e) {
      var submenuitem = _that.find('.dropdown-menu');
      $('.dropdown-button').removeClass('active');
      $(this).addClass('active');
      $('.dropdown .dropdown-menu').removeClass('open');
      submenuitem.addClass('open');
    });
    itemDropdown.on('click', function (e) {
      e.preventDefault();
      var that = $(this);
      var lcDropdown = that.closest('.dropdown'), menuDropdown = lcDropdown.find('.dropdown-menu');
      var contentButton = lcDropdown.find('.dropdown-button span');
      var thatIsActive = that.find('span').text() || that.text();
      itemDropdown.removeClass('active');
      that.addClass('active');
      contentButton.text(thatIsActive);
      menuDropdown.removeClass('open');
    })
  });

  $(document).click(function (e) {
    if (!dropdown.is(e.target) && dropdown.has(e.target).length === 0) {
      var isopened = dropdown.find('.dropdown-menu').css('display');
      if (isopened == 'block') {
        dropdown.find('.dropdown-menu').removeClass('open');
        dropdown.find('.dropdown-button').removeClass('active');
      }
    }
    var targetInput = $('.lc-banking .js-search');
    if (!targetInput.is(e.target)) {
      $('.lc-banking .dropdown-menu').removeClass('open');
    }
  });
}

$('#scrollsection5 .js-accordion').each(function () {
  var ac_item = $(this).find('.js-acc');
  var content = $(this).find('.accordion-details');
  var link = content.find('a');
  content.hide();
  ac_item.first().addClass('open').find('.accordion-details').slideDown()
  ac_item.click(function () {
    var $that = $(this), is_open = $that.is('.open');
    if (is_open) {
      $that.removeClass('open').find('.accordion-details').slideUp();
    } else {
      ac_item.removeClass('open').find('.accordion-details').slideUp();
      $that.addClass('open').find('.accordion-details').slideDown();
    }
  });
});

const init = () => {
  loadmoreProduct();
  lcDropdown();
}
init();
jQuery.fn.extend({
  checkList: function () {
    return this.each(function (e) {
      var option = $(this).find('.radio');
      option.on('click', function () {
        option.removeClass('checked');
        $(this).addClass('checked');
      });
    });
  },
});