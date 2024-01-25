$(function () {
  $(document).ready(function () {
    // Init dropdown
    // $('.dropdown').cDropdown();
    $('.check-form').checkList();
    var repsonsive = $(window).width() < 992;


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

    //search city
    function dropdownSearch() {
      var input_search = $('.js-search');
      input_search.each(function () {
        var that = $(this);
        var wrapper = that.closest('.dropdown-menu-top').next('.js--city-list'),
          item_city = wrapper.children(),
          btn_close = that.next(),
          banking_wrapper = that.closest('.js--focus-input').children('.dropdown-menu').find('.js--city-list'),
          banking_item = banking_wrapper.children();

        btn_close.hide();
        loopItem(item_city);
        loopItem(banking_item);
        that.off('keyup');
        that.on('keyup', function () {

          loopItem(item_city);
          loopItem(banking_item);

          var searchVal = $(this).val().trim(),
            filterCity = wrapper.find('[token-filter]'),
            searchSplit = convertToAscii(searchVal),
            banking = $(this).closest('.cs-form-search');

          bankingDropdown = $(this).closest('.form-search_wrap').next('.dropdown-menu'),
            banking_filter_city = banking_wrapper.find('[token-filter]');

          $(this).next().show();
          if (searchVal != '') {

            bankingDropdown.addClass('open');
            filterCity.hide();
            banking_filter_city.hide();
            tokenFilter(filterCity, searchSplit);
            tokenFilter(banking_filter_city, searchSplit);
            banking.addClass('form-fixed');

            // $('html,body').removeClass('cart-html cart-body');
            // $('html').addClass('touch-action');

          } else {
            $('.lc-banking .dropdown-menu').removeClass('open');
            filterCity.show();
            banking_filter_city.show();
            btn_close.hide();
            bankingDropdown.removeClass('open');
            banking.removeClass('form-fixed');
          }
        }).on('click', function () {
          // console.log(1);
          if (repsonsive) {
            $('.js--focus-input').addClass('form-fixed');
          }
        });

        $(document).on('click', '.select--bankcode', function () {
          $('.js--focus-input').removeClass('form-fixed');
        });

        //function loop item
        function loopItem(items) {
          items.each(function () {

            var nameCity = $(this).text();
            dataCityName = $(this).attr(
              'token-filter', `${convertToAscii(nameCity)}`
            );
            var a = $(this)
              .closest('.js--focus-input')
              .children('.dropdown-menu')
              .children()
              .find('a');
            a.each(function () {
              var bankingName = $(this).find('span').text().trim();
              data_short_name = $(this).attr('data-short-name');
              // $(this).attr('token-filter', `${convertToAscii(bankingName)} ${convertToAscii(data_short_name)}`);
              $(this).attr('token-filter', `${convertToAscii(bankingName)}`);
            });
            items.click(function (e) {
              e.preventDefault();
              var name = $(this).text(),
                nameOption = $(this).parent().prev().parent().prev().find('span'),
                input = $(this).closest('.dropdown-menu').removeClass('open');
              nameOption.text(name);

              $(this).parent().closest('.dropdown-menu').prev().attr('data-city', name.trim());

              items.removeClass('active');

              $(this).addClass('active');

              $(this).parent().closest('.dropdown-menu').prev().removeClass('is-invalid');

              if ($('.js-tabs.checked').attr('data-tab') === 'tab1') {
                $('.select__region_district').find('.dropdown-button').removeClass('is-invalid');
              }

              $('body').removeClass('disable-scroll');
            });
          });
        }

        // function search filter
        tokenFilter = function (nameFilter, searchSplit) {
          return nameFilter.filter(function () {
            var result = $(this).attr('token-filter').toLowerCase().indexOf(searchSplit) > -1;
            return result;
          }).show();
        };

        btn_close.bind('click', function () {
          $(this).hide();
          input_search.val('');
          item_city.show();
          $('.js--city-list').children().each(function () {
            $(this).show();
          });
        });

      });
    }
    dropdownSearch();

    // dropdown function

    function lc_dropdown() {

      var dropdown = $('.dropdown');

      dropdown.each(function () {
        var $that = $(this);
        var body = $('body');
        var arrow = $that.find('.dropdown-arrow');

        var itemmenu = $that.find('.dropdown-button'),

          itemmenuActive = $that.find('.dropdown-button.active'),
          search = $that.find('.dropdown-menu');
        input = $that.find('.form-search-input');
        iconClose = search.find('.js-close');

        iconClose.click(function () {
          $(this).closest('.dropdown-menu').removeClass('open');
          body.removeClass('disable-scroll');

          if (repsonsive) {
            // $('html').css('touch-action','unset');

            $('html, body').removeClass('overflow-hidden');
          }

        });

        itemmenu.click(function (e) {
          var submenuitem = $that.find('.dropdown-menu');

          $('.dropdown-button').removeClass('active');
          $(this).addClass('active');

          $('.dropdown .dropdown-menu').removeClass('open');
          submenuitem.addClass('open');

          if (repsonsive) {
            // $('html').css('touch-action','none');
            // $('html, body').addClass('overflow-hidden');
          }
        });
      });

      $(document).click(function (e) {
        if (!dropdown.is(e.target) && dropdown.has(e.target).length === 0) {
          var isopened = dropdown.find('.dropdown-menu').css('display');
          if (isopened == 'block') {
            dropdown.find('.dropdown-menu').removeClass('open');
            dropdown.find('.dropdown-button').removeClass('active');
          }
        }
      });

      itemDropdown();
    };
    lc_dropdown();
  });

  // scroll behavior menu bar

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 500) {
      $(".wrap-navbar-tab").addClass("sticky-behavior");
    } else {
      $(".wrap-navbar-tab").removeClass("sticky-behavior");
    }
  });
});

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
