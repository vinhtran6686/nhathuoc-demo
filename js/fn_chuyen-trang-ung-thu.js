(function ($) {
    $(document).ready(function () {
        tabContent();
        addBody();
    });
})(window.jQuery);

let $window = $(window), $width = $window.width(), desktop = $width > 992, mobile = $width < 992;

function addBody() {
    $("body").addClass("lc-wrap-chuyen-trang-ung-thu");
}

function tabContent() {
    // $('html, body').animate({
    //     scrollTop: $('.wrap-lc-ung-thu-tabs-nav').offset().top
    // }, 2000, 'swing');



    $('.lc-ung-thu-tabs-wrap').addClass('swiper jsNavSlide');
    $('.lc-ung-thu-tabs-nav').addClass('swiper-wrapper');
    $('.lc-ung-thu-tabs-nav li').addClass('swiper-slide');

    var swipperDesktop = new Swiper('.jsNavSlide', {
        slidesPerView: 'auto',
        freeMode: true,
        mousewheel: true,
    });

    setTimeout(() => {
        let itemSlide = $('.swiper-slide');
        itemSlide.each(function (index, value) {
            if($(this).hasClass('active')){
                swipperDesktop.slideTo(index);
            }
        });
    }, 300);
}

const fnScrollTo = () => {
    const li = $('.lc-ung-thu-tabs-nav li');
    li.on('click', function (e) {
        // e.preventDefault();
        $(document).off("scroll");

        $('.lc-ung-thu-tabs-nav li').each(function () {
            $(this).removeClass('active');
        })

        $(this).addClass('active');

        const itemsActive = $('.lc-ung-thu-tabs-nav li.active');
        var myScrollPos = itemsActive.offset().left + itemsActive.outerWidth(true) / 2 + $('.lc-ung-thu-tabs-nav').scrollLeft() - $('.lc-ung-thu-tabs-nav').width() / 2;

        $('.lc-ung-thu-tabs-nav').animate({
            scrollLeft: myScrollPos
        }, 500, 'swing');

    });

    const pageSection3 = $('.lc-ung-thu-section-3 .lc-ung-thu-content'), offsetTop = parseInt(pageSection3.offset().top) - 24;

    $window.scroll(function () {
        const winScrollTop = $(this).scrollTop();
        const contentHeight = $('.lc-ung-thu-tabs-content').height();

        if (winScrollTop > offsetTop) {
            $('.wrap-lc-ung-thu-tabs-nav').addClass('active');
        } else {
            $('.wrap-lc-ung-thu-tabs-nav').removeClass('active');
        }
    })
}


let init = () => {
    fnScrollTo();
}
init();