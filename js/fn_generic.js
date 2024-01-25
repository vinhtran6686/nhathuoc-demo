$(function () {
  $(document).ready(function () {


    //slides

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

    $('.js-accordion a,.lc__cmt-content a').addClass('link');

    $('.lc-detail .js-accordion').each(function () {
      var ac_item = $(this).find('.js-acc');
      var content = $(this).find('.accordion-details');
      var link = content.find('a');
      content.hide();

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

  });





  $('.ppc-typhography').outerHeight() >= 1300 ? $('.lc__btn-overlay').show() : $('.lc__btn-overlay').hide();

  var width = $(window).width();
  repsonsive = width < 992;

  if (repsonsive) {

    function scroll_mobile() {

      var height = $('.detail_main').outerHeight();

      position_top_main = $('.detail_main').position().top - 50;

      var height_position = $(window).scrollTop() - position_top_main;

      height_position > 0 ?
        $('.detail_main .row .col-3').addClass('fixed-top')
        :
        $('.detail_main .row .col-3').removeClass('fixed-top')

      height_position > height && $('.detail_main .row .col-3').removeClass('fixed-top');

    }

    $(this).scroll(function () {
      scroll_mobile();
    });

    $('.js-dropdown').click(function () {
      $(this).toggleClass('expand');
      $('.fixed-top').toggleClass('expand-overlay');
    });

    $('#navigation ul li a').click(function () {
      $('.js-dropdown').removeClass('expand');
      $('.fixed-top').removeClass('expand-overlay');
    });
  };


  $(document).on('click', '[to-scroll]', function (e) {
    e.preventDefault();

    var link = $(this).attr('to-scroll'),
      position_content = $('.col-8').offset().top,
      height_content = $('.ppc-typhography').outerHeight();

    let animate = function (position) {
      $('body,html').animate({ scrollTop: position }, 900);
    }

    if ($(link).length > 0) {

      var position = $(link).offset().top - 50;

      if (position - position_content < 1300) {
        animate(position)

      } else {
        animate(position);
        $('.lc__btn-overlay').fadeOut();
        $('.ppc-typhography').addClass('full-typhography');

      }
    }
  });

  //menu scroll NguyênND

  // cache the navigation links
  var $navigationLinks = $('#navigation > ul > li > a');
  // cache (in reversed order) the sections
  var $sections = $($('.heading-drugs').get().reverse());

  // map each section id to their corresponding navigation link
  var sectionIdTonavigationLink = {};
  $sections.each(function () {

    var id = $(this).attr('id');
    sectionIdTonavigationLink[id] = $(
      '#navigation > ul > li > a[href=\\#' + id + ']'
    );

  });

  // throttle function, enforces a minimum time interval
  function throttle(fn, interval) {
    var lastCall, timeoutId;
    return function () {
      var now = new Date().getTime();
      if (lastCall && now < lastCall + interval) {
        // if we are inside the interval we wait
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
          lastCall = now;
          fn.call();
        }, interval - (now - lastCall));
      } else {
        // otherwise, we directly call the function
        lastCall = now;
        fn.call();
      }
    };
  }

  function highlightNavigation() {
    // get the current vertical position of the scroll bar
    var scrollPosition = $(window).scrollTop();

    // iterate the sections
    $sections.each(function () {
      var currentSection = $(this);
      // get the position of the section
      var sectionTop = currentSection.offset().top;
      var width = $(window).width();

      // if the user has scrolled over the top of the section
      if (scrollPosition >= sectionTop - 70) {
        // get the section id
        var id = currentSection.attr('id');
        // get the corresponding navigation link
        var $navigationLink = sectionIdTonavigationLink[id];

        var nav_text = $navigationLink.text();

        if (repsonsive) {
          $('.table-heading').text(nav_text);
        }
        // if the link is not active
        // console.log(!$navigationLink.hasClass('active'));
        if (!$navigationLink.hasClass('active')) {
          // remove .active class from all the links
          $navigationLinks.removeClass('active');
          // add .active class to the current link
          $navigationLink.addClass('active');
        }
        // we have found our section, so we return false to exit the each loop
        return false;
      }
    });
  }
  $(window).scroll(throttle(highlightNavigation, 100));

  function load_thuoc_lien_quan() {
    //load more
    var btn = $('.js-loadmore');
    var group_list = $('[list-group]'),
      width = $(window).width();
    batch = 6;

    group_list.each(function () {

      var that = $(this), item = that.find('[list-item]'), parent = that.parent('[wrap-list]'),
        btn_load = parent.find('.js-loadmore');

      item.hide();
      item.slice(0, batch).fadeIn();

      item.length < batch ? btn_load.hide() : btn_load.show();

      var countItemHidden = parent.find('[list-item]:hidden').length;
      countItemHidden === 0 && btn.hide();

    })

    btn.each(function () {
      btn.click(function (e) {
        e.preventDefault();

        var parent = $(this).parent('[wrap-list');

        $(parent).find('[list-item]:hidden').slideDown('.2');

        $(parent).find('[list-item]:hidden').length === 0 && $(this).fadeOut();
      });
    });
  }
  load_thuoc_lien_quan();


  function containerElasticTab() {
    //tab section link
    function targetTab() {
      var tabItem = $('.js-tabSelector');

      elasticSelector('.js-tabElastic');

      tabItem.on('click touchstart', function (e) {
        e.preventDefault();
        var that = $(this), target = that.attr('target');

        elasticTab(that);

        activeItem(tabItem, this);

        if(target === "large-text"){
          $('.generic-drugs, .medicine__section').addClass('large-text')
        }else{
          $('.generic-drugs, .medicine__section').removeClass('large-text');
        }

      });
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
      var activeHeight = activeItem.innerHeight();

      $(".js-selector").css({
        "left": activeItem.position.left + "px",
        "width": activeWidth + "px",
        "height": activeHeight + "px"
      });
    }

    function elasticTab(that) {
      var activeWidth = that.innerWidth();
      var activeHeight = that.innerHeight();
      // console.log("activeHeight", activeHeight);
      var itemPos = that.position();
      // console.log(itemPos);
      $(".js-selector").css({
        "left": itemPos.left + "px",
        "width": activeWidth + "px"
      });
    }

    targetTab();
  }
  containerElasticTab();

  $('.dropdown').cDropdown();

  // $('.generic-drugs p').each(function () {
  //   var firstChild = $(this).contents()[0];
  //   if ($(firstChild).is('strong')) {
  //     $(this).addClass('m-b-8');
  //   } else {
  //     $(this).addClass('m-b-16');
  //   }

  // })

  // $('.generic-drugs').each(function () {
  //   $(this).find('h3').addClass('ppc-typography-heading5 fs-p-md-16 m-b-12');
  // });

  $('.generic-drugs > ul').addClass('list list-group list-disc');

  // $('.generic-drugs > h2').addClass('ppc-typography-heading4 fs-p-md-18 m-b-12');

  // $('.alert .alert-description > p').addClass('paragraph paragraph-normal m-b-8');
  $('.alert .alert-description > ul').addClass('list list-group list-disc');

  $('.generic-drugs meta[charset="utf-8"]').parent().remove();

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

