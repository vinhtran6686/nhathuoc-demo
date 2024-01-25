$(function () {
  $(document).ready(function () {
    // lc_dropdown();
    $('.dropdown').cDropdown();
    $('.check-form').checkForm();

    var searchblock = $('.lch-search');
    $('.back-btn').click(function () {
      searchblock.removeClass('page-fixed');
    });

    load_more_shop();
  });
});
function load_more_shop() {
  //load more

  var batch = 5;
  var btn_loadMore = $('.js-loadMore');

  // $('.js-list-show').each(function () {
  var that = $('.article__group'), lc_tab = $('.lc__tab.active');

  var address_item = $('.article__group .lc__article');

  address_item.hide();
  address_item.slice(0, batch).fadeIn();

  parseInt(that.find('.lc__article:hidden').length) === 0 ?

    that.find('.rs-view').css('cssText', 'display : none !important')
    :
    that.find('.rs-view').css('cssText', 'display : flex !important')

  $('.article__group .js-loadMore').children('span').text(parseInt(that.find('.lc__article:hidden').length));

  // });

  btn_loadMore.each(function () {

    var $that = $(this);

    $that.off('click').on('click', function (e) {
      e.preventDefault();

      var parent = $(this).closest('.article__group');

      var itemHidden = parseInt(parent.find('.lc__article:hidden').length);

      $(this).find('span').text(itemHidden - batch);

      $(parent).find('.lc__article:hidden').slice(0, batch).css('cssText', 'display : block !important');

      $(parent).find('.lc__article:hidden').length === 0 && $(this).parent().css('cssText', 'display : none !important');
    });

  });
};

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
      var option = $(this).find('.js-check');
      option.on('click', function () {
        option.removeClass('active');
        $(this).addClass('active');
      });
    });
  },
  checkForm: function () {
    return $(this).each(function () {
      var radio = $(this).find('.radio');
      radio.click(function () {
        radio.removeClass('checked');
        $(this).addClass('checked');
      });
    });
  }
});
