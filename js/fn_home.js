$(function () {
  $(document).ready(function () {

    var width = $(window).width(), lc_tab = $('.lc-tab'), item_tab = $('.tabs-item');

    repsonsive = width < 992;

    $('.lc__news-picture-post').find('img').addClass('radius-8');
    $('.tab-none').remove();
    $('.tab-item-filter').children().first().addClass('active');

    //banner html
    $('.lc__link .link > .u-flex ').append('<i class="ic-angle-right m-l-8 fs-ui-13"></i>');

    function tabs() {
      // tab-filter
      let sectionTab =  $('.section-tab');

      sectionTab.each(function(){
        var that = $(this), lcTab = that.find('.lc-tab'), itemTab = that.find('.tabs-item'),
            searchGroup = that.find('.search__group'), width = $(window).width(), repsonsive = width < 992;

        lcTab.hide();
        lcTab.first().show().addClass('active');

        that.find('.js-order, .tabs').addClass('js-wrap-tab');

        that.find('.js-wrap-tab').each(function (index) {

          var $that = $(this), itemChild = $that.find('.tabs-item');

          itemChild.addClass(function (index) {
            return `tab${index + 1}`;
          });

          itemChild.click(function (i) {
            var $that = $(this), parent = $that.closest('.section-tab');
            var rel = $that.attr('rel');

            itemChild.removeClass('active');
            $that.addClass('active');

            console.log("parent.find('.' + rel)", parent)
            parent.find('.lc-tab').removeClass('active').hide();
            parent.find('#' + rel).show().addClass('active');
          });

          if (repsonsive) {
            that.find('.tab-container').addClass('swiper');
            that.find('.tab-wrapper').addClass('swiper-wrapper');
            that.find('.tabs-item').addClass('swiper-slide');

            var slidetab = new Swiper(".tab-container", {
              slidesPerView: 'auto',
              spaceBetween: 4
            });

            itemTab.click(function () {

              var index = $(this).index();

              (index < itemTab.length - 1) ? slidetab.slidePrev(index) : slidetab.slideNext(index);

            });

          }

        });

      });
    }

    var labelGroup = new Swiper(".label-group-slide", {
      slidesPerView: "auto",
      spaceBetween: 12,
      freeMode: true,
      slidesPerGroup: 2,
      navigation: {
        nextEl: ".lc__keyword-group .btn-next",
        prevEl: ".lc__keyword-group .btn-prev",
      },
    });

    function slice_item() {
      var width = $(window).width();
      var batch = 3, item = $('.js-splice').find('.purchase__image:not(:last-child)');
      // console.log(item);
      if (width <= 768) {
        item.hide();
        item.slice(0, batch).show();
      }

    };

    function search_scroll() {
      let input = $('.js-input-search');
      input.click(function () {
        previousScrollY = window.scrollY;
        $('.lc__mask').addClass('lc__block').css({
          'opacity': '1',
          'z-index': '1049',
          'visibility': 'visible'
        });
        $(this).closest('.section-search').addClass('is-open')
        if (width > 992) {
          $('html, body').animate({
            scrollTop: $('.section-search').offset().top - 50
          }, 800);
        };
      })
    };

    $('.lc__mask_search_suggest').click(function () {
      $(this).removeClass('lc__block').css({
        'opacity': '0',
        'visibility': 'hidden'
      });
    });

    function init() {

      slide();

      tabs();

      slice_item();

      search_scroll();

    }

    init();

  });
});

function slide() {
  var swiper = new Swiper(".banner-slide", {
    autoplay: true,
    lazy: true,
    //
    navigation: {
      nextEl: ".section-banner .swiper-button-next",
      prevEl: ".section-banner .swiper-button-prev",
    },
    breakpoints: {
      '768': {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      }
    }
  });

  var hotSale = new Swiper(".js-slide--hotsale", {
    slidesPerView: 6,
    spaceBetween: 24,
    slidesPerGroup: 6,
    navigation: {
      nextEl: ".lc__hotsale .sw-btn-next",
      prevEl: ".lc__hotsale .sw-btn-prev",
    },
    breakpoints: {
      '992': {
        slidesPerView: 'auto',
        slidesPerGroup: 2,
        spaceBetween: 8,
        // spaceBetween: 50
      }
    }
  });
};

const viewMoreProduct = () => {
  const $window = $(window), $getWidth = $window.width(), $mobile = $getWidth < 992, $desktop = $getWidth > 992;
  let lcTab = $('.lc-tab');
  var BATH;

  $mobile ? BATH = 4 : BATH = 10;

  lcTab.each(function () {
    let that = $(this), btnViewMore = that.find('.btn-viewmore-prod .btn');
    let itemCol = that.find('.col');

    itemCol.hide();
    itemCol.slice(0, BATH).show();

    let itemColHidden = that.find('.col:hidden').length;
    itemColHidden === 0 && that.find('.btn-viewmore-prod').hide()

    btnViewMore.click(function (e) {
      e.preventDefault()

      var that = $(this), parent = that.parent(), parentTab = that.closest('.lc-tab');

      var colHidden = parentTab.find('.col:hidden');

      if ($mobile) {
        BATH = 8;
      }
      colHidden.slice(0, BATH).show();

      parseInt(parentTab.find('.col:hidden').length) > 0 ? parent.show() : parent.hide();
    })
  })
}
viewMoreProduct();

jQuery.fn.extend({
  checkList: function () {
    return this.each(function (e) {
      var items = $(this).find('[item]');
      items.on('click', function () {
        items.removeClass('active');
        $(this).addClass('remove');
      });
    });
  },

  // hasScrollBar: function () {
  //   console.log(this.get(0).scrollHeight, this.height());
  //   return this.get(0).scrollHeight > this.height();
  // },

});