$(function () {
  $(document).ready(function () {

    $('.dropdown').cDropdown();

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

    hasScrollBar: function () {
      // console.log(this.get(0).scrollHeight, this.height());
      return this.get(0).scrollHeight > this.height();
    },
  });

});