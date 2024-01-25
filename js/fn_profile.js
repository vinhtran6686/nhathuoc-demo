$(function () {
  $(document).ready(function () {
    // dropdown
    $('.dropdown').cDropdown();

    // tab-filter
    var lc_tab = $('.lc-tab'),
      item_tab = $('.tab-item'),
      search_group = $('.search__group');

    lc_tab.hide();
    lc_tab.first().show().addClass('active');

    $('.js-order,.content-item .tab').addClass('js-wrap-tab');
    $('.js-wrap-tab').each(function (index) {

      var $that = $(this), children_item = $that.find('.tab-item');

      children_item.addClass(function (index) {
        return `tab${index + 1}`;
      });

      children_item.click(function (i) {

        var $that = $(this);
        var rel = $that.attr('rel');
        var empty_check = $('#' + rel).find('.js-item').length;

        $('.js-wrap-tab .tab-item').removeClass('active');
        $('.' + rel).addClass('active');

        lc_tab.hide().removeClass('active');

        if (rel === 'tab1') {
          search_group.show();
        } else {
          if (empty_check === 0) {
            search_group.hide();
          } else {
            search_group.show();
          }
        }

        $('#' + rel).show().addClass('active');

        // check_search();
        load_more_product();
      });

    });

    // tab-content
    var item = $('.tab__content-item'),
      content_item = $('.content-item');
    item.click(function () {

      item.removeClass('active');
      $(this).addClass('active');

      var content = $(this).attr('content');

      content_item.removeClass('active');
      $('#' + content).addClass('active');

      // check_search();
      load_more_product();
    });

    $('.js-back').click(function () {
      content_item.removeClass('active');
      item.removeClass('active');
    });

    // show profile
    var order_status = $('.order__status');
    var tab_parent = $('.tab__content');
    var btn_logout = $('.btn-logout');

    if ($(window).width() <= 992) {
      $('.js-profile').click(function () {
        $(this).addClass('active');
        order_status.show();
        btn_logout.show();
        tab_parent.addClass('show');
        content_item.removeClass('active').addClass('tab-fixed');
      });
    }

    // back to default

    $('.js-order').click(function () {
      $('.js-profile').removeClass('active');
      order_status.fadeOut();
      btn_logout.fadeOut();
      tab_parent.removeClass('show');
      content_item.removeClass('tab-fixed');
      $('#donhangcuatoi').addClass('active');
    });

    // show rename block

    var renameBlock = $('.rename__bill');
    var input = $('.input-rename');
    var heading = $('.cart-title_head');
    var cartTitle = $('.cart-title');
    $('.js-rename').click(function () {
      var name = heading.text().trim();

      input.val(name);
      cartTitle.hide();
      renameBlock.fadeIn();
    });

    $('.js-updateName').click(function () {
      var value = input.val();

      heading.text(value);
      renameBlock.hide();
      cartTitle.fadeIn();

    });


    load_more_product();
  });

});


function reloadModalEvent() {
  let previousScrollY = 0;

  // click button
  // $(document).on('click', '.js-check-form', function (e) {
  //   previousScrollY = window.scrollY;

  //   $('html').css({ marginTop: -previousScrollY });

  //   $('html, body').addClass('disable-scroll-safari');

  //   $('#' + $(this).attr('aria-controls')).addClass('modal--is-visible');
  // });

  // $(document).on('click', '.js-modal-close', function (e) {

  //   $('html').css({ marginTop: 0 }).removeClass('disable-scroll-safari');

  //   window.scrollTo(0, previousScrollY);

  //   $('.js-modal').removeClass('modal--is-visible');
  // });

  // function outside_remove_scroll(e) {
  //   if ($('.modal').is(e.target) && $('.modal').has(e.target).length === 0) {
  //     $('.js-modal').removeClass('modal--is-visible');
  //     $('html').css({
  //       marginTop: 0,
  //       overflow: 'hidden visible',
  //       left: 'auto',
  //       right: 'auto',
  //       top: 'auto',
  //       bottom: 'auto',
  //       position: 'static',
  //     });
  //     window.scrollTo(0, previousScrollY);
  //   }
  // }

  //click outside
  // $(document).click(function (e) {
  //   outside_remove_scroll(e);
  // });

  // $('.modal').scroll(function(){
  //   var height = $('.modal-header').outerHeight();
  //   console.log(height, );
  //   if($('.modal').scrollTop()>=height){
  //     // console.log(1);
  //     $('.modal-order .modal-header').addClass('sticky-top');
  //     // $('.lc-head__cs').css('top', height);
  //     $('#chitietdonhang .modal-box').css('overflow','unset');
  //   }
  //   else{
  //     // console.log(2);
  //     $('.modal-order .modal-header').removeClass('sticky-top');
  //   }
  // });

};

reloadModalEvent();

// function check_search() {
//   // $('.lc-tab.active .lc__section .js-item').length > 0 ?
//   //   $('.search__group').show() : $('.search__group').hide();

//   var item_length = $('.lc-tab.active .lc__section .js-item').length
// };

function load_more_product() {
  //load more

  var batch = parseInt($('.lc-tab.active .js-list-show').attr('batch'));
  var btn_loadMore = $('.js-loadMore');

  // $('.js-list-show').each(function () {
  var that = $('.js-list-show'), lc_tab = $('.lc-tab.active');

  var js_item = $('.lc-tab.active .js-list-show .js-item');

  js_item.hide();
  js_item.slice(0, batch).fadeIn();

  parseInt(lc_tab.find('.js-item:hidden').length) === 0 ?

    lc_tab.find('.btn-loadmore').css('cssText', 'display : none !important')
    :
    lc_tab.find('.btn-loadmore').css('cssText', 'display : flex !important')

  $('.lc-tab.active .js-loadMore').children('span').text(parseInt(lc_tab.find('.js-item:hidden').length));

  // });

  btn_loadMore.each(function () {

    var $that = $(this);

    $that.off('click').on('click', function (e) {
      e.preventDefault();

      var parent = $(this).closest('.js-list-show');

      var itemHidden = parseInt(parent.find('.js-item:hidden').length);

      $(this).find('span').text(itemHidden - batch);

      $(parent).find('.js-item:hidden').slice(0, batch).css('cssText', 'display : block !important');

      $(parent).find('.js-item:hidden').length === 0 && $(this).parent().css('cssText', 'display : none !important');
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
      var option = $(this).find('.radio');
      option.on('click', function () {
        option.removeClass('checked');
        $(this).addClass('checked');
      });
    });
  },
});