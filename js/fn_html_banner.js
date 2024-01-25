(function ($) {
  $(document).ready(function () {
    slideBanner();
  });
})(window.jQuery);

function slideBanner() {
  var swiper = new Swiper('.js-slide--banner', {
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 24,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.js-slide--banner + .next',
      prevEl: '.js-slide--banner + .next + .prev',
    },
    breakpoints: {
      992: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 15,
      },
    },

    breakpoints: {
      767: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0,
        pagination: {
          el: ".swiper-pagination",
        },
      },
    },
  });
}

