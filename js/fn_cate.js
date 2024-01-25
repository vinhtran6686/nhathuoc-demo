
$(document).ready(function () {
  var width = $(window).width(), responsive = width < 992;
  // init drop down
  $('.cs-dropdown').cDropdown();


  // dynamic for color block
  $('.van-de-mau-sac_filter .js--color').each(function () {
    let colorAttr = $(this).attr('data-color')
    console.log(colorAttr);
  });



  /**
   * Category mobile show up
   * Click an icon -> show link product
   **/
  $('.js-category-show').each(function () {
    var icon = $(this).find('.ic-angle-down');
    var content = $(this).find('.cate-product_right');
    icon.on('click', function () {
      var parent = $(this).parent();
      parent.toggleClass('open');
      var contentStatus = content.css('display');
      if (contentStatus == 'block') {
        content.slideUp();
      } else {
        content.slideDown();
      }
    })
  });



  var swiper = new Swiper('.js-slide--related', {
    slidesPerView: 5,
    slidesPerGroup: 5,
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

  var swiper = new Swiper('.js-slide--together', {
    slidesPerView: 5,
    slidesPerGroup: 5,
    navigation: {
      nextEl: '.js-slide--together  + .next',
      prevEl: '.js-slide--together  + .next + .prev',
    },
    breakpoints: {
      992: {
        slidesPerView: 'auto',
        slidesPerGroup: 2,
      },
    },
  });


  var swiper = new Swiper('.js-slide--hotsale', {
    slidesPerView: 4,
    // spaceBetween: 24,
    slidesPerGroup: 4,
    navigation: {
      nextEl: '.js-slide--hotsale  + .next',
      prevEl: '.js-slide--hotsale  + .next + .prev',
    },
    breakpoints: {
      992: {
        slidesPerView: 'auto',
        slidesPerGroup: 2,
      },
    },
  });

  var labelGroup = new Swiper(".label-group-slide", {
    slidesPerView: "auto",
    spaceBetween: 12,
    freeMode: true,
    slidesPerGroup: 2,
    navigation: {
      nextEl: ".lc__keyword-group .btn-next",
      prevEl: ".lc__keyword-group .btn-prev",
    },
    breakpoints: {
      992: {
        slidesPerView: 'auto',
        spaceBetween: 8,
        slidesPerColumn: 2,
      },
    },
  });

  $('.lc__filter-group .group-button .btn').click(function () {
    $('.lc__filter-group .group-button .btn').removeClass('active');
    $(this).addClass('active');
  })

  //tab
  var lc_tab = $('.lc-tab'), tab_item = $('.tab-items');
  function tabs() {
    lc_tab.hide();
    lc_tab.first().show().addClass('active');
    tab_item.click(function () {
      tab_item.removeClass('active');
      $(this).addClass('active');
      var rel = $(this).attr('rel');

      lc_tab.hide().removeClass('active');
      $('#' + rel).show().addClass('active');

    })
  }
  tabs();

  // drop down filter
  function dropdownFilter() {
    var dropdown_menu = $('.js-dropdown-filter'),
      dropdown_button_text = dropdown_menu.siblings('.dropdown-button').find('.text-js'),
      item_link = dropdown_menu.find('.filter-comments');
    item_link.click(function () {
      var text = $(this).find('span').text();
      console.log(text);

      item_link.removeClass('active');
      $(this).addClass('active');
      dropdown_button_text.html(text);

      dropdown_menu.removeClass('open');
    })

  };
  dropdownFilter();

  // Event change view layout
  var viewWrap = $('.js-changeview');

  var checker = $('.toggle-view .toggle-input');
  var inner = $('.cate-highlight_inner');
  var listItem = $('.cate-highlight_inner .col-3');
  var product = $('.cate-highlight_inner .product');

  viewWrap.on('click', function () {
    var state = checker.prop('checked');
    if (state === false) {
      listItem.addClass('col-12 col-md-12');
      product.addClass('active');
      listItem.parent().addClass('list-layout');
      inner.removeClass('p-t-md-16');
    } else {
      listItem.parent().removeClass('list-layout');
      listItem.removeClass('col-12 col-md-12');
      product.removeClass('active');
      inner.addClass('p-t-md-16');
    }
  });

  // disableScrollSafari

  function disableScrollSafari() {
    var previousScrollY = 0;

    // Event close filter
    var filter = $('#filterside');
    function enableScroll() {
      $('html').css({
        marginTop: 0,
      }).removeClass('disable-scroll-safari');
      window.scrollTo(0, previousScrollY);
    }

    $('.js-closefilter').click(function () {
      filter.removeClass('active');
      enableScroll();
    });

    $('.lc__mask.lc__mask_search_suggest, .btnApplyPriceCate').click(function () {
      var isTrue = $('.isShowFilter');

      if ($('.lc__filter-mobile').is(isTrue)) {
        enableScroll();
      }

    });

    $('.js-openfilter').click(function () {
      filter.addClass('active');
      previousScrollY = window.scrollY;

      $('html').css({
        marginTop: -previousScrollY,
      }).addClass('disable-scroll-safari');
    });

    $(document).on('click', '.filter-side.active', function (e) {
      if ($('.filter-side').is(e.target) && $('.filter-side__inner').has(e.target).length === 0) {
        $('.filter-side').removeClass('active');
        enableScroll();
      }
    });

  }

  disableScrollSafari();


  // Event collapse filter mobile
  $('.js-collapse-filter').each(function () {
    var content = $(this).find('.filter-content');
    var title = $(this).find('.js-show');
    var first = $(this).find('.open').siblings('.filter-content');
    content.hide();
    first.show();
    title.click(function () {
      $(this).toggleClass('open');
      $(this).siblings('.filter-content').slideToggle('.2');
    })
  });

  // Cate full height
  $('[event-view]').each(function () {
    $(this).click(function () {
      $(this).parent().parent().addClass('full');
      $(this).parent().fadeOut();
    });
  });



  // Show description brand

  $('.js-more').each(function () {
    var show_char,
      ellipsestext = "...",
      more_text = 'Xem thêm',
      width = $(window).width();
    content = $(this).html();

    width <= 992 ? show_char = 200 : show_char = 600;

    console.log(show_char);

    if (content.length > show_char) {
      var c = content.substr(0, show_char);
      var h = content.substr(show_char, content.length - show_char);
      var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="#" class="link morelink">' + more_text + '</a></span>';
      $(this).html(html);
    }

  });

  $('.morelink').click(function (e) {
    e.preventDefault();
    $(this).parent().prev().toggle();
    $(this).prev().toggle();
    $(this).hide();
  })

});

function search_cate() {
  var convertToAscii = function (str) {
    str = str.toLowerCase();
    str = str
      .replace(/ /g, '-')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .replace(/-+-/g, '-')
      .replace(/ + /g, '-')
      .replace(/^\-+|\-+$/g, '')
      .replace(/^\-+|\-+$/g, '')
      .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
      .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
      .replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
      .replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
      .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
      .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
      .replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
      .replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
      .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
      .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
      .replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
      .replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
      .replace(
        /!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\:|\'| |\"|\&|\#|\[|\]|~/g,
        ' '
      )
      .replace(
        /!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g,
        ' '
      );
    return str;
  };

  //input search
  var box_search = $('.js-box-search');
  box_search.each(function () {

    var $that = $(this), input_search = $that.find('.form-search-input');
    var checkbox = $that.find('.checkbox');
    var clearBtn = $that.find('.form-search-close');
    clearBtn.hide();

    add_token_filter(checkbox);

    input_search.off('keyup').on('keyup', function () {

      var $that = $(this), value = convertToAscii($that.val().trim());

      var data_filter = $that.closest('.js-box-search').find('.checkbox:not(".filterAll")');

      var data_all = $that.closest('.js-box-search').find('.checkbox.filterAll');

      var valueInput = input_search.val();

      let js_box_search = $that.closest('.js-box-search');

      if (valueInput == '') {
        clearBtn.hide();
        data_all.show();
      } else {
        clearBtn.show();
        data_all.hide();
      };

      clearBtn.click(function () {
        input_search.val('');
        $(this).hide();
        data_all.show();

        data_filter.addClass('customShowMore').show();

        js_box_search.find('.link.cs-btn').remove();
        js_box_search.find('.search_action_show_more').showMoreItems({
          startNum: 7,
          afterNum: 7,
          original: true,
          moreText: 'Xem thêm',
          customBtnShowMore: [
            '<a class="link cs-btn">',
            '</a>'
          ],
          backMoreText: 'Thu gọn',
          searchFilter: true,
        });
      })

      data_filter.removeClass('customShowMore').hide();

      tokenFilter(data_filter, value);

      js_box_search.find('.link.cs-btn').remove();

      !js_box_search.find('.action_show_more').hasClass('search_action_show_more') && js_box_search.find('.action_show_more').addClass('search_action_show_more');

      js_box_search.find('.search_action_show_more').showMoreItems({
        startNum: 7,
        afterNum: 7,
        original: true,
        moreText: 'Xem thêm',
        customBtnShowMore: [
          '<a class="link cs-btn">',
          '</a>'
        ],
        backMoreText: 'Thu gọn',
        searchFilter: true,
      });

    });
  });

  function add_token_filter(item) {

    item.each(function () {

      var $that = $(this), checkbox = $that.not('.filterAll'), input = checkbox.find('input');

      var token_filter = convertToAscii(checkbox.find('.label-text').text());

      input.attr('data-search', token_filter);

    });
  }

  tokenFilter = function (nameFilter, searchSplit) {
    return nameFilter.filter(function () {
      var result = $(this).find('input[type="checkbox"]').attr('data-search').toLowerCase().indexOf(searchSplit) > -1;
      return result;
    }).closest('.checkbox').addClass('customShowMore').show();
  };

}
search_cate();

// $(window).bind('scroll', function () {
//   var navHeight = $(window).height();
//   if ($(window).scrollTop() > navHeight) {
//     $('.cate-highlight_title ').addClass('sticky');
//   } else {
//     $('.cate-highlight_title ').removeClass('sticky');
//   }
// });


jQuery.fn.extend({
  cDropdown: function () {
    return this.each(function () {
      var containermenu = $(this);
      var body = $('body');
      var arrow = containermenu.find('.c-dropdown-arrow');
      var itemmenu = containermenu.find('.dropdown-button'),
        itemmenuActive = containermenu.find('.dropdown-button.active'),
        search = containermenu.find('.dropdown-menu');
      input = containermenu.find('.form-search-input');
      iconClose = search.find('.js-close');

      iconClose.click(function () {
        $(this).closest('.dropdown-menu').removeClass('open');
        body.removeClass('disable-scroll');
      });

      itemmenu.click(function (e) {
        var submenuitem = containermenu.find('.dropdown-menu');

        itemmenu.toggleClass('active');
        submenuitem.toggleClass('open');
        arrow.addClass('active');
      });

      $(document).click(function (e) {
        if (
          !containermenu.is(e.target) &&
          containermenu.has(e.target).length === 0
        ) {
          var isopened = containermenu.find('.dropdown-menu').css('display');
          if (isopened == 'block') {
            containermenu.find('.dropdown-menu').removeClass('open');
            arrow.removeClass('active');
            itemmenu.removeClass('active');
          }
        }
      });
    });
  },
  checkList: function () {
    return this.each(function (e) {
      var option = $(this).find('.radio');
      option.on('click', function () {
        option.removeClass('checked');
        $(this).addClass('checked');
      });
    });
  },

  hasScrollBar: function () {
    console.log(this.get(0).scrollHeight, this.height());
    return this.get(0).scrollHeight > this.height();
  },
});
