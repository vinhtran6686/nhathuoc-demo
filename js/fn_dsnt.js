$(function () {
  $(document).ready(function () {
    // dropdown
    $(".dropdown").cDropdown();
    $(".js-check-list").checkForm();

    $(".dropdown-menu-wrapper a").click(function () {
      window.location = $(this).attr("href");
    });

    var convertToAscii = function (str) {
      str = str.toLowerCase();
      str = str
        .replace(/ /g, "-")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .replace(/-+-/g, "-")
        .replace(/ + /g, "-")
        .replace(/^\-+|\-+$/g, "")
        .replace(/^\-+|\-+$/g, "")
        .replace(/ì|í|ị|ỉ|ĩ/g, "i")
        .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
        .replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I")
        .replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y")
        .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
        .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
        .replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E")
        .replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U")
        .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
        .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
        .replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A")
        .replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O")
        .replace(
          /!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\:|\'| |\"|\&|\#|\[|\]|~/g,
          " "
        )
        .replace(
          /!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g,
          " "
        );
      return str;
    };

    //search city
    var input_search = $(".js-search");
    input_search.each(function () {
      var that = $(this);
      var wrapper = that.closest(".dropdown-menu-top").next(".js--city-list"),
        item_city = wrapper.children(),
        btn_close = that.next();
      // banking_wrapper = that.closest('.js--focus-input').children('.dropdown-menu').find('.js--city-list'),
      // banking_item = banking_wrapper.children();

      btn_close.hide();
      loopItem(item_city);
      // loopItem(banking_item);
      that.off("keyup");
      that.on("keyup", function () {
        loopItem(item_city);
        // loopItem(banking_item);

        var searchVal = $(this).val().trim(),
          filterCity = wrapper.find("[token-filter]"),
          searchSplit = convertToAscii(searchVal);
        // banking = $(this).closest('.cs-form-search');

        // (bankingDropdown = $(this)
        //   .closest('.form-search_wrap')
        //   .next('.dropdown-menu')),
        //   (banking_filter_city = banking_wrapper.find('[token-filter]'));

        $(this).next().show();
        if (searchVal != "") {
          // bankingDropdown.addClass('open');
          filterCity.hide();
          // banking_filter_city.hide();
          tokenFilter(filterCity, searchSplit);
          // banking.addClass('form-fixed');
        } else {
          filterCity.show();
          // banking_filter_city.show();
          btn_close.hide();
          // bankingDropdown.removeClass('open');
          // banking.removeClass('form-fixed');
        }
      });

      //function loop item
      function loopItem(items) {
        items.each(function () {
          var nameCity = $(this).text();
          dataCityName = $(this).attr(
            "token-filter",
            `${convertToAscii(nameCity)}`
          );
          // var a = $(this)
          //   .closest('.js--focus-input')
          //   .children('.dropdown-menu')
          //   .children()
          //   .find('a');
          // a.each(function () {
          //   var bankingName = $(this).find('span').text().trim();
          //   data_short_name = $(this).attr('data-short-name');
          //   $(this).attr('token-filter', `${convertToAscii(bankingName)} ${convertToAscii(data_short_name)}`);
          //   // $(this).attr('token-filter', `${convertToAscii(bankingName)}`);
          // });
          items.click(function (e) {
            e.preventDefault();
            var name = $(this).text(),
              nameOption = $(this).parent().prev().parent().prev().find("span"),
              input = $(this).closest(".dropdown-menu").removeClass("open");
            nameOption.text(name);

            $(this)
              .parent()
              .closest(".dropdown-menu")
              .prev()
              .attr("data-city", name.trim());

            items.removeClass("active");
            $(this).addClass("active");

            // isInvalid_City($(this).parent().closest('.dropdown-menu').prev().attr('data-city'));

            $(this)
              .parent()
              .closest(".dropdown-menu")
              .prev()
              .removeClass("is-invalid");

            if ($(".js-tabs.checked").attr("data-tab") === "tab1") {
              $(".select__region_district")
                .find(".dropdown-button")
                .removeClass("is-invalid");
            }
          });
        });
      }

      // function search filter
      tokenFilter = function (nameFilter, searchSplit) {
        return nameFilter
          .filter(function () {
            var result =
              $(this).attr("token-filter").toLowerCase().indexOf(searchSplit) >
              -1;
            return result;
          })
          .show();
      };

      btn_close.bind("click", function () {
        $(this).hide();
        input_search.val("");
        item_city.show();
        $(".js--city-list")
          .children()
          .each(function () {
            $(this).show();
          });
      });
    });

    $(".select__region_district.blockCityFinal").click(function () {
      var select_city = $(".select__region_city.blockCityFinal"),
        width = $(window).width(),
        city_button = select_city.find(".dropdown-button");

      if (city_button.attr("data-city") === "") {
        $(this)
          .find(".dropdown-menu")
          .removeClass("open")
          .prev()
          .removeClass("is-invalid");

        if (width < 768) {
          city_button
            .addClass("is-invalid")
            .next()
            .next()
            .find("span")
            .text("Chọn Tỉnh/Thành");
        } else {
          city_button
            .addClass("is-invalid")
            .next()
            .next()
            .find("span")
            .text("Vui lòng chọn Tỉnh/Thành");
        }
      }
    });

    function checkedShow() {
      var checklist = $(".js-check-list .address-item");
      var dsnt_info = $(".lc__dsnt-info");
      dsnt_info.hide();
      dsnt_info.first().show().addClass("active");
      checklist.click(function () {
        // $("html").addClass("disable-scroll-safari");
        var attr = $(this).attr("aria-tab");
        dsnt_info.hide().removeClass("active");
        $("#" + attr).show();
        $(".tab-fixed").addClass("active");
      });
    }

    function tabEvent() {
      var dropdownGroup = $(".dropdown-group");
      var lc__tab = $(".lc__tab");

      $(".js-tab .tab-item").click(function () {
        var attr = $(this).attr("rel");

        $(".js-tab .tab-item").removeClass("active");
        $(this).addClass("active");

        lc__tab.removeClass("active");
        $("#" + attr).addClass("active");

        if (attr === "tab2") {
          dropdownGroup.fadeOut();
        } else {
          dropdownGroup.fadeIn();
        }

        load_more_shop();
      });
    }

    function closeTabFixed() {
      $(".js-back").click(function () {
        $(".tab-fixed").removeClass("active");
        $("html").removeClass("disable-scroll-safari");
      });
    }

    // gallery
    function gallery() {
      const lgDemoUpdateSlides = document.getElementById("list-gallery");

      lightGallery(lgDemoUpdateSlides, {
        addClass: "lg-update-slide-demo",
        // dynamic: true,
        plugins: [lgAutoplay, lgFullscreen, lgZoom, lgThumbnail],
        speed: 500,
        download: false,
        pager: false,
        hash: false,

        animateThumb: true,
        zoomFromOrigin: false,

        allowMediaOverlap: false,
        toggleThumb: false,
        closable: true,
        // subHtmlSelectorRelative: true,
        appendSubHtmlTo: ".lg-outer",
        mobileSettings: {
          closable: false,
        },
      });
    }

    function addBtnCloseMobile() {
      var width = $(window).width();
      repsonsive = width < 992;
      if (repsonsive) {
        $(".js-close-gallery").remove();

        $("body").append(`
            <button type="button" aria-label="Close gallery" class="lg-close lg-icon btn btn-lg circle js-close-gallery close-fixed p-x-0"> <i class="ic-close fs-ui-15"></i></button>
            `);

        $(".js-close-gallery").addClass("show-icon");

        $("html, body").addClass("disable-scroll");
      }
    }

    //đóng gallery
    $(document).on("click",'.js-close-gallery', function () {
      $(this).remove();

      $(".swiper-button-prev.btn-prev.slide-control").trigger("click");

      $(".lg-update-slide-demo")
        .removeClass("lg-show lg-show-in")
        .css("pointer-events", "none");

      if (repsonsive) {
        $("html,body").removeClass("disable-scroll");
      }

      $("html").removeClass("lg-on");
    });

    var width = $(window).width();

    function check_slide_show_hide() {
      let slide = $(".js-gallery").find(".slide-gallery");
      let show_gallery = $(".btn-view");
      console.log(slide.length);
      if(width > 992){
        if(slide.length > 3 && show_gallery.length){
          slide.hide();
          slide.slice(0, 3).show();
        }
      }else{
        if(slide.length > 3 && show_gallery.length){
          slide.hide();
          slide.slice(0, 2).show();
        }
      }
    }
    check_slide_show_hide();

    $('.js-open-gallery').on("click", function (e) {
      $(".lg-update-slide-demo")
        .addClass("lg-show lg-show-in")
        .css("pointer-events", "unset");
      $(".js-gallery .slide-gallery:nth-child(4)").trigger("click");
      addBtnCloseMobile();
    });

    gallery(true);

    $('.slide-gallery picture').on("click", function (e) {
      $(".lg-update-slide-demo")
      .addClass("lg-show lg-show-in")
      .css("pointer-events", "unset");

      $(this).closest(".slide-gallery").trigger("click");

      addBtnCloseMobile();
    });

    function init() {
      tabEvent();
      checkedShow();
      load_more_shop();
      closeTabFixed();
      var pathName = window.location.pathname.substr(19, 10);
      if (pathName.length > 5) {
        $("#block2").show();
        $("#block1").hide();
      } else {
        $("#block2").hide();
        $("#block1").show();
      }
    }
    init();
  });
});

function load_more_shop() {
  //load more

  var batch = 5;
  var btn_loadMore = $(".js-loadMore");

  // $('.js-list-show').each(function () {
  var that = $(".feature__location-inner"),
    lc_tab = $(".lc__tab.active");

  var address_item = $(
    ".lc__tab.active .feature__location-inner .address-item"
  );

  address_item.hide();
  address_item.slice(0, batch).fadeIn();

  parseInt(lc_tab.find(".address-item:hidden").length) === 0
    ? lc_tab.find(".btn-loadmore").css("cssText", "display : none !important")
    : lc_tab.find(".btn-loadmore").css("cssText", "display : flex !important");

  $(".lc__tab.active .js-loadMore")
    .children("span")
    .text(parseInt(lc_tab.find(".address-item:hidden").length));

  // });

  btn_loadMore.each(function () {
    var $that = $(this);

    $that.off("click").on("click", function (e) {
      e.preventDefault();

      var parent = $(this).closest(".feature__location-inner");
      parent.removeClass('full');
      var itemHidden = parseInt(parent.find(".address-item:hidden").length);

      $(this)
        .find("span")
        .text(itemHidden - batch);

      $(parent)
        .find(".address-item:hidden")
        .slice(0, batch)
        .css("cssText", "display : block !important");

      $(parent).find(".address-item:hidden").length === 0 &&
        $(this).parent().css("cssText", "display : none !important");
    });
  });
}

jQuery.fn.extend({
  cDropdown: function () {
    return this.each(function () {
      var containermenu = $(this);
      var body = $("body");
      var arrow = containermenu.find(".c-dropdown-arrow");
      var itemmenu = containermenu.find(".dropdown-button"),
        itemmenuActive = containermenu.find(".dropdown-button.active"),
        search = containermenu.find(".dropdown-menu");
      input = containermenu.find(".form-search-input");
      iconClose = search.find(".js-close");

      iconClose.click(function () {
        $(this).closest(".dropdown-menu").removeClass("open");
        body.removeClass("disable-scroll");
      });

      itemmenu.click(function (e) {
        var submenuitem = containermenu.find(".dropdown-menu");

        itemmenu.toggleClass("active");
        submenuitem.toggleClass("open");
        arrow.addClass("active");
      });

      $(document).click(function (e) {
        if (
          !containermenu.is(e.target) &&
          containermenu.has(e.target).length === 0
        ) {
          var isopened = containermenu.find(".dropdown-menu").css("display");
          if (isopened == "block") {
            containermenu.find(".dropdown-menu").removeClass("open");
            arrow.removeClass("active");
            itemmenu.removeClass("active");
          }
        }
      });
    });
  },
  checkForm: function () {
    return $(this).each(function () {
      var radio = $(this).find(".radio");
      radio.click(function () {
        radio.removeClass("checked");
        $(this).addClass("checked");
      });
    });
  },
});


const disableScrollDropdown = () => {
  var repsonsive = $(window).width() < 992;
  const selectCity = $('.select__city'), selectDistrict = $('.select__district');
  const currentCity = $('.select__city .currentCity'), currentDistrict = $('.select__district .currentDistrict');

  const selectRegion = $('.dropdown');
  const btnClose = $('.dropdown-menu .js-close');

  var previousScrollY = 0;

  function disableScroll() {
    previousScrollY = window.scrollY;

    $('html').css({marginTop: -previousScrollY}).addClass('disable-scroll-safari');
  }

  function enableScroll() {
    $('html').css({ marginTop: 0 }).removeClass('disable-scroll-safari');

    window.scrollTo(0, previousScrollY);
  }
  if(repsonsive){

    currentCity.click(function (params) {
      disableScroll();
      console.log(321)
    })

    currentDistrict.click(function(e){
      console.log(123)
      if(selectCity.attr('data-city') != ""){
          disableScroll();
      }

    });

    btnClose.click(function (params) {
      enableScroll();
    })
  }

}
disableScrollDropdown();