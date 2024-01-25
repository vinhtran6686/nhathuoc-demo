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

  });



  var width = $(window).width();
  repsonsive = width < 992;

  if (repsonsive) {

    function scroll_mobile() {

      var height = $('.detail_main').outerHeight();

      position_top_main = $('.detail_main').position().top - 50;

      var height_position = $(window).scrollTop() - position_top_main;

      height_position > 0 ?
        $('.detail_main .row .col-3').addClass('fixed-top').css('position', 'fixed').show()
        :
        $('.detail_main .row .col-3').removeClass('fixed-top').css('position', 'relative').hide();

      height_position > height && $('.detail_main .row .col-3').removeClass('fixed-top').css('position', 'relative').hide();

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
  var $sections = $($('.heading__medicine').get().reverse());

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

        var parent = $(this).parent('[wrap-list]');

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
  $('.medicine__section > ul').addClass('list list-group list-disc m-b-24 m-b-md-16');

  $('.medicine__section > h2').addClass('ppc-typography-heading4 m-b-12 m-b-md-8');
  $('.medicine__section > h3').addClass('ppc-typography-heading5 m-b-12 m-b-md-8');
  $('.medicine__section > h4').addClass('ppc-typography-heading6 m-b-12 m-b-md-8');
  $('.medicine__section meta[charset="utf-8"]').parent().remove();
  $('.medicine__section p a').addClass('link');
});
