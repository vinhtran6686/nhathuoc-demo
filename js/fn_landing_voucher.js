import * as regexs from "./regixers.js";

const $window = $(window);
const width = $window.width(), mobile = width < 992, desktop = width > 992;
const sectionBanner = $('.section__banner');
const modalSuccess = $('#modalSuccess');
const modalFail = $('#modalFail');
const modalAlreadyReceived = $('#modalAlreadyReceived');
const sectionNav = $('.section__nav');
const btnVoucher = $('.js-voucher');
const inputPhone = $('input[phone]');
const inputEmail = $('input[email]');
const btnActionScroll = $('[toscroll]');

const regexPhone10 = regexs.vnfRegex10;
const regexPhoneHN = regexs.vnfRegex11;
const regexEmail = regexs.email;
const regexNumber = regexs.number;

const formatPhoneNumber = (str) => {
    let cleaned = ('' + str).replace(/\D/g, '');
    let match = cleaned.match(/^(\d{4})(\d{3})(\d{3})$/);
    if (match) {
        return '' + match[1] + ' ' + match[2] + ' ' + match[3]
    }
    ;
    return null
};

const featureValidate = () => {
    const regexPhone = ($val) => {
        const firstValue = parseInt($val.slice(0, 2));
        const HA_NOI = "02";
        if (firstValue === parseInt(HA_NOI)) {
            return regexPhoneHN.test($val);
        } else {
            return regexPhone10.test($val);
        }
    }

    const regexValueEmail = ($val) => {
        const testRegexEmal = regexEmail;
        if ($val.length > 0) return testRegexEmal.test($val);
    }

    const isEmail = ($val) => {
        var flag = true;
        (regexValueEmail($val) && $val.length > 0) && (flag = false);
        return flag;
    }

    return {
        testEmail: regexValueEmail,
        testPhone: regexPhone,
        isEmail: isEmail
    }
}

const scrollDistances = () => {
    const slideActive = $('.swiper-slide.active');
    const slideActiveInnerWidth = $('.swiper-slide.active').innerWidth();

    const slideItem = $('.swiper-slide.active').index();
    const sectionPages = $('.scroll-section');
    const scrollDistance = $(window).scrollTop();
    const getHeightNav = sectionNav.outerHeight();

    // console.log("slideActive", slideActive.position.left);

    sectionPages.each(function (i) {
        const that = $(this),
            positionTop = that.position().top - parseInt(getHeightNav + 80);
        if (positionTop <= scrollDistance) {
            $('.swiper-slide').removeClass('active');
            $('.swiper-slide').eq(i).addClass('active');
        }
    });
    $('.swiper-notification').remove();
}

const slideNav = new Swiper('.jsNav', {
    slidesPerView: 'auto',
    spaceBetween: 24,
    cssMode: true,
    mousewheel: true,
    keyboard: true,
    breakpoints: {
        992: {
            spaceBetween: 0,
            // centeredSlides: true
            // allowTouchMove: true,
        }
    },
})

// Cache selectors
var lastId,
    topMenu = $(".section__nav"),
    topMenuHeight = topMenu.outerHeight() + 15,
    // All list items
    menuItems = topMenu.find(".swiper-slide .nav__item"),
    swiperWrapper = $('.jsNav .swiper-wrapper');

// Anchors corresponding to menu items
var scrollItems = menuItems.map(function () {
    var item = $($(this).attr("toscroll"));
    if (item.length) {
        return item;
    }
});

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function (e) {
    var href = $(this).attr("toscroll"),
        offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 300);
    var parentIndex = $(this).parent().index();

    if (parentIndex > 0) {
        slideNav.slideTo(parentIndex);
        //   swiperWrapper.addClass('spacing-pl')
    } else {
        slideNav.slideTo(parentIndex);
        //   swiperWrapper.removeClass('spacing-pl')
    }
    e.preventDefault();
});

// Bind to scroll
$(window).scroll(function () {
    // Get container scroll position
    var fromTop = $(this).scrollTop() + topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function () {
        if ($(this).offset().top < fromTop)
            return this;
    });

    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    var slideIndex = menuItems.filter("[toscroll='#" + id + "']").parent().index();

    // console.log("slideIndex", slideIndex);

    slideNav.slideTo(slideIndex);
    if (lastId !== id) {
        // console.log("remove");
        lastId = id;
        // Set/remove active class
        menuItems.parent().removeClass("active").end().filter("[toscroll='#" + id + "']").parent().addClass("active");
    }

});

const featureNav = () => {
    // const slideItem = $('.swiper-slide');
    // var swiper = new Swiper(".jsNav", {
    //     slidesPerView: 'auto',
    //     spaceBetween: 24,
    //     cssMode: true,
    //     mousewheel: true,
    //     keyboard: true,
    //     allowTouchMove: false,
    //     breakpoints: {
    //         992: {
    //             spaceBetween: 8,
    //             // centeredSlides: true
    //             allowTouchMove: true,
    //         }
    //     },
    // });
    function scrollSlide($index, $centerSlide) {
        // var swiper2 = new Swiper(".jsNav", {
        //     slidesPerView: 'auto',
        //     spaceBetween: 24,
        //     cssMode: true,
        //     mousewheel: true,
        //     keyboard: true,
        //     allowTouchMove: false,
        //     breakpoints: {
        //         992: {
        //             spaceBetween: 8,
        //             centeredSlides: $centerSlide
        //         }
        //     },
        // });
        // swiper2.slideTo($index);
    }

    // $window.scroll(function () {
    // scrollDistances();
    // });


    btnActionScroll.off('click').click(function (e) {
        const parent = $(this).parent();
        const index = parent.index();
        const currLink = $(this).attr('toscroll');
        const getHeightNav = sectionNav.outerHeight();
        const position = $(currLink).offset().top - parseInt(getHeightNav);

        $('html,body').animate({
            scrollTop: position,
        }, 600);
    });

    // scrollDistances();
}

const featureboxVoucher = () => {
    inputPhone.on('keyup keydown', function () {
        const $that = $(this), $value = $that.val();
        this.value = this.value.replace(regexNumber, '');
        const $parseValue = parseInt($value.slice(0, 2));
        const HA_NOI = "02";
        const valueLength = $('input[phone]').val().length;
        const inventory = regexPhone10.test($that.val().slice(0, 2));

        $parseValue === parseInt(HA_NOI) ? inputPhone.attr('maxlength', '11') : inputPhone.attr('maxlength', '10');

        if (!featureValidate().testPhone($('input[phone]').val()) && (valueLength > 0)) {
            inputPhone.addClass('is-invalid').next().find('span').text('Số điện thoại không hợp lệ');
        } else {
            inputPhone.removeClass('is-invalid').next().find('span').text('Thông tin bắt buộc');
        }

        Number.isNaN($parseValue) && inputPhone.removeClass('is-invalid');
    });

    inputEmail.on('keyup keydown', function () {
        const that = $(this), $value = that.val();
        const flagEmail = featureValidate().isEmail($value);
        (flagEmail) && that.addClass('is-invalid');
        ($value.length === 0 || !flagEmail) && that.removeClass('is-invalid');
    });

    btnVoucher.click(function (e) {
        e.preventDefault();
        const valuePhone = inputPhone.val();
        const valueEmail = inputEmail.val();
        const checkMail = featureValidate().isEmail(valueEmail);
        const checkPhone = featureValidate().testPhone(valuePhone);
        if (!checkPhone) {
            inputPhone.addClass('is-invalid');
            return false;
        }
        if (checkMail && valueEmail.length > 0) {
            inputEmail.addClass('is-invalid');
            return false;
        }
        $(this).prop('disabled', true);
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            method: "post",
            dataType: "json",
            data: {
                phone: valuePhone
            },
            success: (result) => {
                $(this).prop('disabled', false);

                //call ict
                if (result.code == 0) {
                    $('#phoneNumber').text(formatPhoneNumber(result.voucher.phone));
                    modalSuccess.addClass('modal--is-visible');
                    result.isCallICT && callApiICT(valuePhone);
                } else if (result.code == 2) {
                    modalAlreadyReceived.addClass('modal--is-visible');
                    $('.phoneFail').text(formatPhoneNumber(valuePhone));
                } else {
                    modalFail.addClass('modal--is-visible');
                    $('.phoneFail').text(formatPhoneNumber(valuePhone));
                }
            },
            error: (error) => {
            }
        })
    });
}

const callApiICT = (phone) => {
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        method: "post",
        url: "/api/dac-quyen/ict",
        dataType: "json",
        data: {
            phone
        },
        success: (result) => {
            if (result.code == true) {
                console.log('Call ICT Success');
            }
            console.log('Call ICT NOTHING');
        },
        error: (error) => {
            console.log('Call ICT Fail');
        }
    })
};

const featureAccordion = (params) => {
    $('.section__accordion .js-accordion').each(function () {
        var ac_item = $(this).find('.js-acc');
        var content = $(this).find('.accordion-details');
        var link = content.find('a');

        content.hide();
        ac_item.first().addClass('open').find('.accordion-details').slideDown();

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
}

var lcDropdown = () => {
    var dropdown = $('.dropdown');
    dropdown.each(function () {
        var _that = $(this);
        var body = $('body');
        var listDropdown = _that.find('.dropdown-menu'),
            itemDropdown = listDropdown.find('.dropdown-menu-wrapper a');
        var itemmenu = _that.find('.dropdown-button'),
            search = _that.find('.dropdown-menu');

        itemmenu.click(function (e) {
            var submenuitem = _that.find('.dropdown-menu');
            $('.dropdown-button').removeClass('active');
            $(this).addClass('active');
            $('.dropdown .dropdown-menu').removeClass('open');
            submenuitem.addClass('open');
        });
        itemDropdown.on('click', function (e) {
            e.preventDefault();
            console.log(321)
            var that = $(this);
            var lcDropdown = that.closest('.dropdown'), menuDropdown = lcDropdown.find('.dropdown-menu');
            var contentButton = lcDropdown.find('.dropdown-button span');
            var thatIsActive = that.find('span').text() || that.text();
            itemDropdown.removeClass('active');
            that.addClass('active');
            contentButton.text(thatIsActive);
            menuDropdown.removeClass('open');
        })
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
}

const eventOutside = () => {
    var previousScrollY = 0;
    // click button
    $(document).off('click', '.js-voucher, .btn[aria-controls="program-rule"]').on('click', '.js-voucher, .btn[aria-controls="program-rule"]', function (e) {

        previousScrollY = window.scrollY;

        $('html').css({

            marginTop: -previousScrollY,

        }).addClass('disable-scroll-safari');

        // $('#' + $(this).attr('aria-controls')).addClass('modal--is-visible');
    });

    function enableScroll() {
        $('html').css({ marginTop: 0 }).removeClass('disable-scroll-safari');

        $('.modal-landing').removeClass('modal--is-visible');

        window.scrollTo(0, previousScrollY);
    }

    $(document).off('click', '.modal-landing .modal-close').on('click', '.modal-landing .modal-close, .modal-form button', function (e) {
        enableScroll();
    });

    function outsideRemoveScroll(e) {
        if ($('.modal.modal-landing').is(e.target) && $('.modal.modal-landing').has(e.target).length === 0) {
            enableScroll();
        }
    }

    $(document).on('click', function (e) {
        outsideRemoveScroll(e);
    });
};


const init = () => {
    featureboxVoucher();
    featureNav();
    featureAccordion();
    lcDropdown();
    eventOutside();
}
init();

$(document).ready(function () {
    $('body').addClass('landing-body');
    $('.check-form').checkForm();
    $('.modal-close').click(function () {
        $(this).closest('.modal').removeClass('modal--is-visible')
    })
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