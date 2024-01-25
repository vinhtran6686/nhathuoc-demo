$(function () {
  $(document).ready(function () {
    var width = $(window).width(), responsive = width < 992;

    $('html').addClass('cart-html');

    $('.lc__news-list .lc__news-picture-post img').addClass('radius-8');

    $('.top-keyword-search').attr('style', 'display:none !important;');

    // var convertToAscii = function (str) {
    //   str = str.toLowerCase();
    //   // str = str.replace(/\u02C6|\u0306|\u031B/g, "");
    //   str = str
    //     .replace(/ /g, '-')
    //     .replace(/đ/g, 'd')
    //     .replace(/Đ/g, 'D')
    //     .replace(/-+-/g, '-')
    //     .replace(/ + /g, '-')
    //     .replace(/^\-+|\-+$/g, '')
    //     .replace(/^\-+|\-+$/g, '')
    //     .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    //     .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    //     .replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
    //     .replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
    //     .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    //     .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    //     .replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
    //     .replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
    //     .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    //     .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    //     .replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
    //     .replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
    //     .replace(
    //       /!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\:|\'| |\"|\&|\#|\[|\]|~/g,
    //       ' '
    //     )
    //     .replace(
    //       /!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g,
    //       ' '
    //     ).replace(/\u02C6|\u0306|\u031B/g, "");
    //   return str;
    // };

    $('.radio-group').checkForm();
    //
    function cardExpand() {
      var jsExpand = $('.js-expand');
      listDropdownAll = $('[list-dropdown]');


      jsExpand.each(function () {
        var $that = $(this);
        responsive && listDropdownAll.hide();
        $that.on('click', function () {
          var lcCard = $(this).closest('.lc__card'), isExpand = lcCard.is('.lc-expand'),

            dropdownItem = lcCard.find(listDropdownAll);
          var heightDropdown = dropdownItem.outerHeight();

          console.log('heightDropdown', heightDropdown);
          if (isExpand) {

            lcCard.removeClass('lc-expand').delay(30000);

            responsive && dropdownItem.slideUp();

          } else {
            responsive && $('.lc__card.lc-expand').find(listDropdownAll).slideUp();

            $('.lc__card.lc-expand').removeClass('lc-expand').delay(30000);

            lcCard.addClass('lc-expand').delay();

            responsive && dropdownItem.slideDown();

          }

        });
      });
    }

    //tab section link
    function targetTab() {
      var tabItem = $('.js-lc-tab');

      elasticSelector('.tab');

      elasticSelector('.group-alphabet');

      tabItem.click(function () {
        var that = $(this), target = that.attr('target');

        var targetTab = $('.target-tab');

        elasticTab(that);

        activeItem(tabItem, this);

        activeItem(targetTab, target);
      });
    }

    function alphaItemDrug() {
      var letterItem = $('.letter__group-item');

      var groupAlphabet = $('.group-alphabet');

      if (width > 992) {
        elasticSelector(groupAlphabet);

        letterItem.click(function () {
          var $that = $(this);

          elasticTab($that);

          activeItem(letterItem, this);
        });
      }

    }

    function activeItem(selectorItem, Item) {
      selectorItem.removeClass('active');
      $(Item).addClass('active');
    }

    //Elastic
    function elasticSelector(parent) {

      var parent = $(parent);

      var activeItem = parent.find('.active');

      var activeWidth = activeItem.innerWidth();

      $(".selector").css({
        "left": activeItem.position.left + "px",
        "width": activeWidth + "px"
      });
    }

    function elasticTab(that) {
      var activeWidth = that.innerWidth();

      var itemPos = that.position();

      $(".selector").css({
        "left": itemPos.left + "px",
        "width": activeWidth + "px"
      });
    }
    //slide
    function slide() {
      var swiper = new Swiper(".banner-slide", {
        autoplay: true,
        lazy: true,
        navigation: {
          nextEl: ".section-banner .swiper-button-next",
          prevEl: ".section-banner .swiper-button-prev",
        },

        breakpoints: {
          '992': {
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

    //search
    function lcSearch() {
      var input = $('.js-input-search');
      var suggestion = $('.js-suggest');
      var btnCancel = $('.form-group .lc__cancel');
      var btnBack = $('.js-go-back');
      var previousScrollY = 0;

      var enableScroll = () => {
        $('html').css({ marginTop: 0 }).removeClass('disable-scroll-safari');

        $('.modal-otp.js-modal-otp').removeClass('modal--is-visible');

        window.scrollTo(0, previousScrollY);
      }

      var backAndCancel = () => {
        $('.lc__form-search').removeClass('focus-search');

        // input.attr('placeholder', 'Nhập từ khóa...');

        responsive && $('html, body').removeClass('touch-action');

        $('.lc__mask').removeClass('lc__block');
      }

      input.off('keyup').on('keyup', function () {
        var that = $(this), value = that.val().trim();

        responsive && $('.fixed-top .none-drug').show();

        $('.lc__cancel').css('cssText', 'display : none !important');
        $('.lc__form-search').removeClass('focus-search');

        if (value.length > 0) {

          $('.lc__form-search').addClass('fixed-top');
          $('.section__search').addClass('search-mobile');
          $('.none-drug').hide();
          $('.lc__cancel').css('cssText', 'display : inline-flex !important');
          $('.lc__mask').addClass('lc__block');

        }

      }).click(function () {
        // previousScrollY = window.scrollY;
        $('.lc__mask').addClass('lc__block').css({
          'opacity': '1',
          'z-index': '1049',
          'visibility': 'visible'
        });

        if (responsive) {

          $('.lc__form-search').addClass('fixed-top');
          $('.section__search').addClass('search-mobile');
          $('.fixed-top .none-drug').show();

          $('html').css({

            marginTop: -previousScrollY,

          }).addClass('disable-scroll-safari');

          if ($(this).val().length > 0) {
            $('.fixed-top .none-drug').hide();
            // $(this).attr('placeholder', 'Tra cứu thuốc, hoạt chất, dược liệu...');
          }

        }

        var data = $('.show-result-suggest').children().length;
        if ($(this).val().length > 0 && data > 0) {
          $('.lc__form-search').addClass('focus-search');
        }

      });

      btnCancel.click(() => {
        input.val('').focus();
        $('.lc__cancel').css('cssText', 'display : none !important');
        backAndCancel();

        if (responsive) {
          $('.fixed-top .none-drug').show();
          // enableScroll();
        }
      });
      //   input.onfocus = function () {
      //     setTimeout(function() {
      //         window.scrollTo(0, 0);
      //         document.body.scrollTop = 0;
      //     }, 10)
      // }
      console.log(input);
      input.bind('focusin focus', function (e) {
        // e.preventDefault();
        // // alert(1);
        // window.scrollTo(0, 0);
        //   document.body.scrollTop = 0;
      })

      btnBack.click(() => {

        backAndCancel();

        $('.section__search').removeClass('search-mobile');

        $('.lc__form-search').removeClass('fixed-top');

        $('.lc__mask').css({
          'opacity': '0',
          'visibility': 'hidden'
        });

        input.val('');

        btnCancel.hide();

        enableScroll();

      });

      $('.lc__mask.lc__mask_search_suggest').click(function () {
        $(this).removeClass('lc__block');

        $('.lc__form-search').removeClass('focus-search');
        $('.section__search').removeClass('search-mobile');

        // enableScroll();

        // if($('.lc__filter-mobile').is('.isShowFilter')){
        //   let previousScrollY = 0;
        //   $('html').css({
        //     marginTop: 0,
        //   }).removeClass('disable-scroll-safari');;
        //   window.scrollTo(0, previousScrollY);
        // }

      });

    }

    //xem thêm sản phẩm cate
    function readMoreCateSP() {
      //load more
      var listWrap = $('.list-more-wrap');

      var btnLoadMore = $('.js-loadMore');

      if(responsive){
        batch = 10;
      }else{
        batch = 15;
      }

      listWrap.each(function () {

        var that = $(this), listItem = that.find('.list-more-item');

        listItem.hide();

        listItem.slice(0, batch).fadeIn();

      });

      btnLoadMore.each(function () {

        btnLoadMore.click(function (e) {
          e.preventDefault();

          $(this).hide();

          var parentListWrap = $(this).closest('.list-more-wrap');

          $('.list-more-item').show();
        });

      });

    }

    /**
     *
     * CATE THUOC LV.2
     *
    */
    function filterMobile() {
      var radios = $('.checkbox'),
        input = radios.find('input'),
        label = radios.find('label');

      input.attr('id', function (i) {
        return 'filter' + i;
      });
      label.attr('for', function (i) {
        return 'filter' + i;
      });

      var btnOpenFilter = $('.js-openfilter');

      var filterGroup = $('.lc__filter-group');

      btnOpenFilter.click(function () {

      });

      filterGroup.each(function () {
        var that = $(this), btnExpand = that.find('.js-expand-block');

        that.attr('expand', false);

        btnExpand.click(function () {

          var isExpand = $(this).parent().attr('expand') === 'true';

          if (isExpand) {

            $(this).parent().removeClass('expand-block').attr('expand', false);

          } else {

            // filterGroup.removeClass('expand-block').attr('expand', false);
            $(this).parent().addClass('expand-block').attr('expand', true);

          }


        });

      });

      $('.js-openfilter').click(function () {
        $('.lc__filter-mobile').addClass('isShowFilter');
        $('.lc__mask').css({
          'opacity': '1',
          'z-index': '2000',
          'visibility': 'visible'
        });
      });

      //close menu filter mobile
      function closeMask() {
        $('.lc__mask').css({
          'opacity': '0',
          'visibility': 'hidden'
        });
      }

      $('.lc__mask, .js-closefilter').click(function (e) {

        closeMask();

        $('.lc__filter-mobile').removeClass('isShowFilter');

      });

    }

    function filterAlphabet() {
      var itemAlphabet = $('.js-alph-item');

      itemAlphabet.each(function () {
        var that = $(this);

        that.click(function () {
          itemAlphabet.removeClass('active');
          that.addClass('active');
        });

      });
    }

    //description-box
    function descriptionBox() {
      // var btnReadMore = $('.js-read-more');
      // var boxContent = $('.box-contet'), heightBox = boxContent.height();
      // var defaultHeightContent = 43;

      // btnReadMore.on('click', function(){
      //   console.log(1);
      //     console.log(heightBox > defaultHeightContent);
      // });
    }

    function changeListView() {
      var btnChange = $('.js-changeview');
      var viewLayout = $('[aria-view="layout"]');
      var viewList = $('[aria-view="list"]');

      $(document).on('click', '.js-changeview', function () {
        var that = $(this);

        var isChecked = $('.toggle-input').prop('checked');

        if (isChecked) {
          viewLayout.addClass('checked');
          viewList.removeClass('checked');
        } else {
          viewLayout.removeClass('checked');
          viewList.addClass('checked');
        }

      });

    }

    //
    function init() {
      cardExpand();

      targetTab();

      slide();

      lcSearch();

      readMoreCateSP();

      //cate lv2
      filterMobile();

      filterAlphabet();

      alphaItemDrug();

      // descriptionBox();
      changeListView();
    };

    init();

  });
});

jQuery.fn.extend({
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