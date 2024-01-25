// init swiper slide
var repsonsive = $(window).width() < 992;
var formName = $('.js-info input[name="ho_ten"]').val(),
    formPhone = $('.js-info input[name="phone"]').val(),
    formEmail = $('.js-info input[name="email"]').val();
$(function () {
    $(document).ready(function () {
        var getCookie = $.cookie('ho_ten');

        if (getCookie != '' && getCookie != null) {
            setTimeout(function () {
                //check out step 1
                dataLayer.push({ ecommerce: null });

                dataLayer.push({
                    'event': 'checkout',
                    'platform': device,
                    'ecommerce': {
                        'checkout': {
                            'actionField': {
                                'step': 'Thông tin khách hàng',
                                'option': {
                                    'name': formName,
                                    'phone': formPhone,
                                    'email': formEmail,
                                }
                            },
                        }
                    }
                });
            }, 500);
        }

        $('html').addClass('cart-html');
        $('body').addClass('cart-body');
        $('.ic-cancel').removeClass('ic-cancel').addClass('ic-close');
        // $('.dropdown').cDropdown();
        //check list banking
        var list = $('.js--check-list');
        list.checkList();



        // $('.check-form').checkForm();

    });
});

// Click touch tooltip mb
if (($(window).width()) < 992) {
    $('.js-tooltip-open').on('click', function (e) {
        $(this).removeClass('lc-tooltip-hover');
        if ($(e.target).is($(this))) {
            $(this).addClass('visibility');
        } else {
            $(this).removeClass('visibility')
        }
    });
}

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
var radios = $('.radio'),
    input = radios.find('input'),
    label = radios.find('label');

input.attr('id', function (i) {
    return 'ex' + i;
});
label.attr('for', function (i) {
    return 'ex' + i;
});

//dropdown
var dropdown = $('.dropdown');
// $('.form-search-input').focus();
dropdown.each(function (e) {
    var btn_dropdown = $(this).children('.dropdown-button.active');
    $(document).on('click', btn_dropdown, function (e) {
        var input = $(this).next().children().find('.form-search-input');
        input.focus();
    });
});



// Show input voucher
$('.js-voucher').on('click', function () {
    $(this).hide();
    $('.voucher-input').addClass('active');
});

// Collpase footer
var coll = $('.title-colapse');
coll.each(function () {
    $(this).on('click', function () {
        if (parseInt($(window).width()) < 768) {
            $(this).toggleClass('active');
            var content = $(this).next();
            var isBlock = $(this).next().css('display');
            var boxShadow = $(this).parent().parent();

            if (isBlock == 'block') {
                content.slideUp();
                boxShadow.removeClass('active');
            } else {
                content.slideDown();
                boxShadow.addClass('active');
            }
        }
    });
});

//demo
var link = $('.item-link');
var coll = link.next();
link.on('click', function () {
    var parent = $(this).closest('.menu-parent_item');
    var content = $(this).parent().next();
    var isBlock = content.css('display');
    parent.removeClass('active');
    if (isBlock == 'block') {
        content.slideUp();
        parent.removeClass('active');
    } else {
        content.slideDown();
        parent.addClass('active');
    }
});

coll.on('click', function () {
    var parent = $(this).closest('.menu-parent_item');
    var content = $(this).parent().next();
    var isBlock = content.css('display');
    parent.removeClass('active');
    if (isBlock == 'block') {
        content.slideUp();
        parent.removeClass('active');
    } else {
        content.slideDown();
        parent.addClass('active');
    }
});

//  detect ouside navigation mobile
var elementToToggle = $('.js-detect');
$(document).mouseup(function (event) {
    if ($(event.target).closest(elementToToggle).length === 0) {
        $('.lc-sidemenu').removeClass('active');
    }
});

// active navigation header
var itemList = $('.js-navmenu');
itemList.each(function () {
    var link = $(this).children().find('a');
    link.on('click', function () {
        link.removeClass('active');
        $(this).addClass('active');
    });
});

// Open side menu
$('.js-opensideMenu').on('click', function () {
    var sidemenu = $('#sidemenu');
    sidemenu.addClass('active');
});

$('.js-closeside').on('click', function () {
    var sidemenu = $('#sidemenu');
    sidemenu.removeClass('active');
});

//product count
// function productCount() {
//   var btn_count = $('.js-product--count');
//   const MIN = 0,
//     MAX = 999;

//   btn_count.each(function () {
//     var btn = $(this).find('.button-count'),
//       input = $(this).find('.number-product');
//     //
//     btn.first().on('click', function () {
//       // debugger;
//       num = parseInt(input.val());
//       // console.log(num);
//       num > 1 && input.val(num - 1);
//       // console.log(num);
//       num == 2 && btn.first().addClass('disabled');
//       num == MAX && btn.last().removeClass('disabled');
//     });

//     //
//     btn.last().click(function () {
//       num = parseInt(input.val());
//       num < MAX && input.val(num + 1);
//       num > MIN && btn.first().removeClass('disabled');
//       num == 998 && btn.last().addClass('disabled');
//     });
//   });
// }
// productCount();

//Delete product from the shopping cart
// var removeElement = $('.js-remove');
// removeElement.on('click', function (evt) {
//   $(this).closest('.cart-product').remove();
// });

//check active option-select (quy cách)
var list = $('.js-select');
list.each(function () {
    var option = $(this).find('.option');
    option.on('click', function () {
        option.removeClass('active');
        $(this).addClass('active');
    });
});

//check focus input
var parentInput = $('.js--focus-input');
parentInput.each(function () {
    var input = $(this).find('.js-input'), close = input.next('.form-search-close'), val = input.val();
    close.hide();
    close.click(function () {
        input.val('');
        $(this).hide();
        $(this).closest('.js--focus-input').find('.dropdown-menu').removeClass('open');
    });
});

//checkform
var checkform = $('.check-form'), group = $('.form-group'),
    js_tabs = $('.js-tabs');


checkform.each(function () {
    var radio = $(this).find('.radio');
    radio.click(function () {
        radio.removeClass('checked');
        $(this).addClass('checked');

        $(this).hasClass('checked') && radio.closest('.check-form').removeClass('is-invalid');

        $('.lc-banking .dropdown-menu').removeClass('open');
    });
});

//tabs chọn hàng
// $('.tabs').hide();
// $('.tabs:first-child').show();

js_tabs.click(function (e) {
    e.preventDefault();
    var tab_id = $(this).attr('data-tab'), input_tax = $('.js-input-tax');

    if (!DETECT_PHONE($('input[phone]').val()) && $('input[phone]').val().trim().length > 0) {
        $('input[phone]').addClass('is-invalid').next().find('span').text('Số điện thoại không hợp lệ');
    }

    if ($(this).hasClass('checked')) {
        $('.form-receiving .dropdown-button, #tab2 .form-group .form-input').removeClass('is-invalid');
    }

    if (checkbox_tax()) {

        class_invalid();

        keyup_input_tax();

    } else {
        check_mail();
    }

    if ($('.drop-checked').hasClass('drop-checked')) {
        getInfoUser();
        $(this).addClass('checked');
    }

    vuLoadMoreShop();
    // $('.tabs').hide();
    // $('#' + tab_id).show();
});

// close bank fixed mobile
var itemBank = $('.bank-close');
itemBank.click(function () {
    var wrap = $(this).parent().parent().parent();
    var menu = $(this).parent().parent().next();
    wrap.removeClass('form-fixed');
    menu.removeClass('open');
});


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
            $('.lc-banking .dropdown-menu').addClass('open');
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
                    $(this).attr('token-filter', `${convertToAscii(bankingName)} ${convertToAscii(data_short_name)}`);
                    // $(this).attr('token-filter', `${convertToAscii(bankingName)}`);
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

var childInput, blockUser = $('.js-info'), tabInforUser = $('.js-table-info'), table = $('.js-info-user'),
    cartForm = $('.cart-bottom__form'), btnEdit = $('.js-edit');

childInput = blockUser.find('.js--info-input');

blockUser.each(function () {

    var childInput = $(this).find('.js--info-input:not(:last-child)').addClass('compulsory'),
        $number = $(this).find('input[phone]');

    childInput.on('keydown keyup', function (i) {

        if (/\D/g.test($('input[phone]').val())) {
            this.value = this.value.replace(/\D/g, '');
        }

        $(this).val().length > 0 && $(this).removeClass('is-invalid');
    });

    $number.on('keydown keyup', function () {
        var $that = $(this), ha_noi = 02;

        var valueInt = parseInt($that.val().slice(0, 2));

        var valueLength = $('input[phone]').val().length;

        const inventory = /([\+84|84|0]+(2|3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/.test($that.val().slice(0, 2));

        valueInt === ha_noi ? $number.attr('maxlength', '11') : $number.attr('maxlength', '10');

        if (!DETECT_PHONE($('input[phone]').val()) && (valueLength > 0)) {

            $number.addClass('is-invalid').next().find('span').text('Số điện thoại không hợp lệ');

        } else {
            $number.removeClass('is-invalid').next().find('span').text('Thông tin bắt buộc');
        }

        Number.isNaN(valueInt) && $number.removeClass('is-invalid');

    });

    $('input[name="email"]').on('keydown keyup', function () {
        var $that = $(this), $val = $(this).val();

        if (!(validateEmail($val) && $val.length > 0)) {
            add_valid_email();
        } else {
            $that.removeClass('is-invalid').next('.is-alert').remove();
        }

        if ($val.length === 0 && !validateEmail($val)) {
            $that.removeClass('is-invalid').next('.is-alert').remove();
        }
    });

});

function is_email() {
    var inputMail = $('input[name="email"]');
    var valMail = inputMail.val();

    return !validateEmail(valMail) && valMail.length > 0;
}

function add_valid_email() {

    $('input[name="email"]').addClass('is-invalid').next('.is-alert').remove();

    $('input.is-invalid[name="email"]').parent('.js-info').append(`
            <div class="alert alert-md alert-danger alert-des m-t-8 alert-sm-md is-alert">
                <i class="ic-minus alert-ic-md bg-danger alert-ic-sm-md"></i>
                <span class="">Địa chỉ email không hợp lệ</span>
            </div>
    `)
}

function check_mail() {
    var mail_val = $('input[name="email"]');
    if (!validateEmail(mail_val.val()) && mail_val.val().length > 0) {

        // js_tabs.removeClass('checked');

        add_valid_email();

    } else {
        getInfoUser();
        $('input[name="email"]').nextAll('.is-alert').remove();
    }
}

//check email
function validateEmail($email) {
    // var regex = /^[a-z0-9]+([-._][a-z0-9]+)*@([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,4}$/;
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if ($email.length === 0) {

        return false;

    } else {

        return regex.test($email) && /^(?=.{1,64}@.{4,64}$)(?=.{6,100}$).*/;
    }
}

function checkInfoUser() {
    var result = isRadio('.cart-bottom__form');
    result;

    if (!DETECT_PHONE($('input[phone]').val()) && $('input[phone]').val().length > 0) {
        $('input[phone]').addClass('is-invalid').next().find('span').text('Số điện thoại không hợp lệ');
    }

    return result.check_form_radio && isInvalid() && DETECT_PHONE($('input[phone]').val());
}

//check input unser
function input_user() {
    blockUser.each(function () {
        var childInput = $(this).find('.js--info-input:not(:last-child)');

        childInput.val() != undefined &&
            childInput.val().length === 0 && childInput.addClass('is-invalid');

    });
}

//lấy thông tin khách hàng
function getInfoUser() {

    input_user();
    var result = isRadio('.cart-bottom__form');
    result;

    if (checkInfoUser()) {
        // if(!validateTaxCart()) return;

        cartForm.fadeOut();
        $('.cart__info-user, .table-user').fadeIn();
        //
        tabInforUser.each(function (index) {
            var valuUser, valTable;

            valuUser = blockUser.eq(index).find('input').val();
            valTable = tabInforUser.eq(index).find('.js-tab-val');
            valTable.text(valuUser);

            if (!checkbox_tax()) {
                $('.js-input-tax').val('');
            }

            tabInforUser.eq(0).find('.js-tab-val').text(`${result.getText} ${blockUser.eq(0).find('input').val()}`);
            if (valuUser != undefined) {
                valuUser.length === 0 ? $(this).hide() : $(this).show();
            }

        });

        var getCookie = $.cookie('ho_ten');
        // if(getCookie == '' || getCookie == null){
        setTimeout(function () {
            //check out step 1
            dataLayer.push({ ecommerce: null });

            dataLayer.push({
                'event': 'checkout',
                'platform': device,
                'ecommerce': {
                    'checkout': {
                        'actionField': {
                            'step': 'Thông tin khách hàng',
                            'option': {
                                'name': formName,
                                'phone': formPhone,
                                'email': formEmail,
                            }
                        },
                    }
                }
            });

        }, 500);
    } else {
        $('.cart-bottom__payments .check-form .radio').removeClass('checked');

        $("html, body").animate({
            scrollTop: $('.cart-bottom__form').offset().top
        }, 900);
        return false;
    }
    return true;
}

//nhap địa chỉ
$('#tab2 .form-group input').on('keyup', function () {
    $(this).val().length > 0 && $(this).removeClass('is-invalid');
});

//lấy địa chỉ
function getAddressUser() {

    var IS_CITY = isInvalid_City($('.dropdown-city').children('.dropdown-button').attr('data-city'));
    IS_CITY;

    var note1 = $('#tab1 .note').children().val(), note2 = $('#tab2 .note').children().val(),

        receive = $('.table-receive'), radioReceiving = isRadio('.form-receiving'),

        radioForm = isRadio('.cart-bottom__form'), form_receiving = $('.form-receiving'),

        check_receiving = !form_receiving.find('.dropdown-city:not(.select__region_ward)').children('.dropdown-button').hasClass('is-invalid'),

        tableInfoAddress = receive.find('.js-table-info'),

        date = $("[name='ngaySelected']").val(), time = $('[name="gioSelected"]').val();

    checkInputAddress = !$('#tab2').find('.form-group').children('input').hasClass('is-invalid');

    function showTableReceive() {

        getInfoUser();

        tableInfoAddress.eq(2).children('.js-tab-val').text() === '' ?
            tableInfoAddress.eq(2).hide() : tableInfoAddress.eq(2).show();

        let isValidTime = validateTimeSelected();
        // let isValidTime = true;
        if (isValidTime) {

            var tabsChecked = $('.js-tabs.checked').find('.radioGiaoHang + span').text().trim;
            dataLayer.push({ ecommerce: null });
            dataLayer.push({
                'event': 'checkoutShippingInfo',
                'platform': device,
                'ecommerce': {
                    'checkout_option': {
                        'actionField': {
                            'step': 'Thông tin nhận hàng',
                            'option': tabsChecked
                        }
                        // products
                    }
                },
            });

            $('.table-receive').fadeIn();
            $('.form-receiving').fadeOut();
        }
        return isValidTime;
    }

    function showInfoReceive(address, date, note, time) {

        var table_info = receive.find('.js-table-info'), last = $('.js-tab-val:last-child');

        table_info.each(function (index) {

            table_info.eq(0).find('.js-tab-val:first-child').text(radioReceiving.getSex);

            table_info.eq(0).find(last).text(address);

            table_info.eq(1).find(last).text(`${time}, ${date}`);

            $('.table-receive').find('.js-table-info').eq(2).find('.js-tab-val:last-child').text(note);

            table_info.find('.js-table-info').eq(2).find('.js-tab-val:last-child').text().length === 0 ?
                table_info.eq(2).hide() : table_info.eq(2).show()
        });

    }

    if ($('.js-tabs.checked').attr('data-tab') === 'tab1') {
        if (radioReceiving.check_form_radio && radioForm.check_form_radio && isInvalid() && check_receiving) {
            showInfoReceive(radioReceiving.getAddress, date, note1, time);
            let isValidTime = showTableReceive();
            // isValidTime ? scroll('.table-user') : scroll('.formHinhThucNhanHang');
        }
    }

    if ($('.js-tabs.checked').attr('data-tab') === 'tab2') {

        name_city = $('.select__region_city').children('.dropdown-button').find('span').text().trim();

        name_district = $('.select__region_district').children('.dropdown-button').find('span').text().trim();

        name_ward = $('.dropdown-ward').children('.dropdown-button').find('span').text().trim();

        name_address = $('#tab2 .form-group input').val();

        // $('.table-receive').find('.js-table-info').eq(1).hide();
        if (radioReceiving.check_form_radio && check_receiving && radioForm.check_form_radio && checkInputAddress && isInvalid()) {
            //dat them - bo validate phuong
            let infoReceive = `${name_address}, ${name_ward}, ${name_district}, ${name_city}`;
            if ($('.dropdown-ward').children('.dropdown-button').attr('data-city') === '') {
                infoReceive = `${name_address}, ${name_district}, ${name_city}`;
            }

            showInfoReceive(infoReceive, date, note2, time);
            showTableReceive();
            // scroll('.table-user');
        }

        // $('.none-drug').show();
    }
}

function isInvalid_City(tokenCity) {
    $('.dropdown-city').each(function (key, item) {
        var dropdown_button = $(this).children('.dropdown-button');
        //dat them - bo validate phuong
        if ($('.js-tabs.checked').attr('data-tab') === 'tab2') {
            if ($(this).hasClass('dropdown-ward')) {
                $(this).children('.dropdown-button').removeClass('is-invalid')
            } else {
                dropdown_button.attr('data-city') === '' ?
                    $(this).children('.dropdown-button').addClass('is-invalid')
                    :
                    $(this).children('.dropdown-button').removeClass('is-invalid')
            }
        } else {
            (tokenCity === '') && $(this).children('.dropdown-button').addClass('is-invalid');
        }

    });
}

function checkFormCity(payment) {

    var radioForm = isRadio('.cart-bottom__form'), form_receiving = $('.form-receiving'),
        checkInputAddress = !$('#tab2').find('.form-group').children('input').hasClass('is-invalid');
    check_receiving = !form_receiving.find('.dropdown-city:not(.select__region_ward)').children('.dropdown-button').hasClass('is-invalid');


    if ($('.js-tabs.checked').attr('data-tab') === 'tab1') {
        if ((radioForm.check_form_radio && isInvalid() && check_receiving)) {
            payment.addClass('checked');
        } else {
            $('.cart-bottom__payments .check-form .radio').removeClass('checked');
        }
    }

    if ($('.js-tabs.checked').attr('data-tab') === 'tab2') {
        if (check_receiving && checkInputAddress && isInvalid()) {
            payment.addClass('checked');
        } else {
            $('.cart-bottom__payments .check-form .radio').removeClass('checked');
        }
    }

}

btnEdit.each(function (index) {
    var valuUser, valTable;
    valTable = tabInforUser.find('.js-tab-val');

    btnEdit.click(function () {
        var table = $(this).closest('.table'), table_receive = table.find(tabInforUser).children('.js-tab-val');

        $('.form-input.is-invalid').removeClass('is-invalid');
        if (table.hasClass('table-user')) {

            cartForm.fadeIn();
            $('.table-user').fadeOut();
            blockUser.eq(0).find('input').focus();
            $(this).closest('.table-user').find(tabInforUser).children('.js-tab-val').text('');

        } else if (table.hasClass('table-receive')) {
            table_receive.text('');
            $('.table-receive').fadeOut();
            $('.form-receiving').fadeIn();
        }

    });
});

//chọn hình thức nhận hàng & thanh toán
var payments = $('.cart-bottom__payments'), paymentsItem = payments.find('.check-form').children('.radio');
$('.table-receive').hide();

paymentsItem.click(function () {

    $('#tab2').find(group).children().val().length <= 0 ?

        $('#tab2').find(group).children().addClass('is-invalid')
        :
        $('#tab2').find(group).children().removeClass('is-invalid');

    if (checkInfoUser()) {
        checkBoxTax();

    } else {

        check_mail();

    }

    if (empty_input_tax()) {
        getAddressUser();
    }

    $('.cart-bottom__payments .check-form .radio').removeClass('checked');
    checkFormCity($(this));

    function checkBoxTax() {
        if (checkbox_tax()) {

            class_invalid();
            keyup_input_tax();

        } else {
            check_mail();

            (!validateEmail($('input[name="email"]').val()) && $('input[name="email"]').val().length > 0) ? '' : getAddressUser();
        }
    }

    $('.lc-banking .dropdown-menu').removeClass('open');
});

$('.select__region_district').click(function () {
    var select_city = $('.select__region_city'), width = $(window).width(),
        district_button = $(this).find('.dropdown-button'), city_button = select_city.find('.dropdown-button');

    if (city_button.attr('data-city') === '') {
        $(this).find('.dropdown-menu').removeClass('open').prev().removeClass('is-invalid');
        $('body').removeClass('disable-scroll');
        (width < 768) ?
            city_button.addClass('is-invalid').next().next().find('span').text('Chọn Tỉnh/Thành')
            :
            city_button.addClass('is-invalid').next().next().find('span').text('Vui lòng chọn Tỉnh/Thành');
    }
});

$('.select__region_ward').click(function () {
    if ($('.select__region_district').find('.dropdown-button').attr('data-city') === '') {
        $('.select__region_district').find('.dropdown-button').addClass('is-invalid').next().next().find('span').text('Vui lòng chọn Quận/Huyện');
        $('.select__region_district').trigger('click');
    }
});
//responsive
// $(window).resize(function () {});
var width = $(window).width();
if (width < 768) {
    $('[data-tab="tab1"] label span').text('Nhận tại nhà thuốc');
}

function vuLoadMoreShop() {
    //load more
    var btn_loadMore = $('.js-loadMore'), batch = 5;;

    $('.feature__location-inner').each(function () {
        var that = $(this), address_item = that.find('.address-item');
        address_item.hide();
        address_item.slice(0, batch).fadeIn();

        var countItemHidden = that.find('.address-item:hidden').length;

        countItemHidden === 0 && $(this).find('.rs-view').css('cssText', 'display : none !important');

        $(this).find(btn_loadMore).children('span').text(parseInt(countItemHidden));
    });

    btn_loadMore.each(function () {
        var block_location = $(this).closest('.feature__location-inner');

        btn_loadMore.click(function (e) {
            e.preventDefault();

            var parent = $(this).closest('.feature__location-inner');
            $(parent).find('.address-item:hidden').slice(0, batch).css('cssText', 'display : block !important');
            $(parent).find('.address-item:hidden').length === 0 && $(this).parent().css('cssText', 'display : none !important');

            $('.feature__location-inner').animate({
                scrollTop: $(this).offset().top,
            }, 1500);

            parseInt($('.address-item:hidden').length) > 0 ?
                $(this).find('span').text(parseInt($('.address-item:hidden').length))
                :
                $(this).css('cssText', 'display : none !important');
        });
    });
}

vuLoadMoreShop();

//check thuế
function checkbox_tax() {
    var input_tax = $('.js-check-tax input[type="checkbox"]');
    return input_tax.is(':checked');
}
//check input rỗng
function empty_input_tax() {
    var val1 = $('.tax0').val(), val2 = $('.tax1').val().length, val3 = $('.tax2').val().length;
    return (val1 && val2 && val3);
}

//check class invalid tax thuế
function class_invalid() {
    var input_tax = $('.js-input-tax');

    input_tax.each(function (index) {

        if ($(`.tax${index}`).val().length > 0) {
            $(`.tax${index}`).removeClass('is-invalid');
        } else {
            // js_tabs.removeClass('checked');
            $(this).addClass('is-invalid');
        }

        if (empty_input_tax() > 0) {
            check_mail();
        }

    });
}

//keyup remove is-invalid
function keyup_input_tax() {
    var input_tax = $('.js-input-tax');

    input_tax.each(function () {
        $(this).off('keyup').on('keyup', function () {
            var that = $(this), value = that.val();

            if (value.length > 0) {
                that.removeClass('is-invalid');

            }

        });
    });

}

function check_tax() {
    var input_tax = $('.js-check-tax input[type="checkbox"]'),
        tax_info = $('.cart-tax-info');
    $('.check-tax label').css('font-weight', 'normal');
    input_tax.change(function () {
        var mail = $('input[name="email"]');
        input_user();

        //
        if (checkbox_tax()) {
            tax_info.slideDown();
            $('.js-input-tax').val('');
            $('.check-tax label').css('font-weight', '500');
        } else {
            $('.check-tax label').css('font-weight', 'normal');
            tax_info.slideUp();
            $("input:checkbox").prop('checked');
            $('.js-input-tax').removeClass('is-invalid');
        }

    });

}
check_tax();


//check input rỗng
var isInvalid = function () {
    var check_length;
    return check_length = $('.compulsory.js--info-input').filter(function () {
        return !this.value.trim();
    }).length < 1;
}

//check number phone
var DETECT_PHONE = function (number) {
    var vnf_regex_10 = /([\+84|84|0]+(2|3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/,

        vnf_regex_11 = /([\+84|84|0]+(2|3|5|7|8|9|1[2|6|8|9]))+([0-9]{9})\b/;

    if (parseInt(number.slice(0, 2)) === 02) {
        return vnf_regex_11.test(number);
    } else {
        return vnf_regex_10.test(number);
    }
}

//check radio giới tính anh/chị - hình thức nhận hàng
var isRadio = function (element) {

    var getText, getSex, getAddress, getReceiving,
        check_form_radio = $(`${element} .no-gutters.check-form`).find('.radio.checked').hasClass('checked');

    $('.check-form').each(function () {

        var sex_checked = $(this).closest(element).find('.radio.checked').children().find('input'),
            radio_checked = $(this).closest(element).find('.radio.checked').children();

        if ($(this).closest(element).find('.no-gutters.check-form .radio').hasClass('checked')) {

            getText = radio_checked.text().trim();
            getSex = sex_checked.data('title');
            getReceiving = $(this).closest(element).find('.radio.js-tabs.checked').children().text().trim();

            getAddress = radio_checked.children('.address-name').find('.lct-txt').text().trim();

        } else {
            $(this).closest(element).find('.no-gutters.check-form').eq(0).addClass('is-invalid');
        }

    });

    return {
        check_form_radio: check_form_radio,
        getText: getText,
        getSex: getSex,
        getReceiving: getReceiving,
        getAddress: getAddress
    };
}

function scroll(element) {
    $("html, body").animate({
        scrollTop: $(element).offset().top - 50
    }, 900);
}

function ctaSticky() {
    var width = $(window).width();

    if (width <= 992) {
        $('.sticky-top').addClass('fixed-bottom');

        $('.cs-col.sticky-top').attr('scoll', true);
        var stickyTop = $('.cs-col.sticky-top'), browserWindow = $(window);
        var heightSticky = stickyTop.height();
        var isScroll = $('.cs-col.sticky-top').attr('scoll');

        if (isScroll === true) {

            var heightSticky = stickyTop.height();
            var offsetTopSticky = stickyTop.offset().top;
            var heightCart = parseInt($('.cart').height() + heightSticky);

            browserWindow.scroll(function () {
                var windowScrollTop = parseInt(browserWindow.scrollTop() + offsetTopSticky);
                browserWindow.scroll(function () {
                    var windowScrollTop = parseInt(browserWindow.scrollTop() + offsetTopSticky);

                    if (windowScrollTop > heightCart) {
                        $('.sticky-top').removeClass('fixed-bottom');
                    } else {
                        $('.sticky-top').addClass('fixed-bottom');
                    }

                });

            })
        }
    }
}
ctaSticky();

function disableScrollOpenDropdown() {

    $(document).on('click', '.dropdown-menu-wrapper a.item-region,.dropdown-menu-wrapper .js-check', function () {
        if (repsonsive) {
            $('body').removeClass('disable-scroll');
        }
    });
}

function itemDropdown() {
    var lcDropdown = $('.dropdown');

    lcDropdown.each(function () {
        var that = $(this);
        var listDropdown = that.find('.dropdown-menu'), itemDropdown = listDropdown.find('.js-dropdown-list a');

        itemDropdown.on('click', function (e) {
            e.preventDefault();

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
}

// disableScrollOpenDropdown();
/**********************
 *
 * cart promo
 *
 **********************/
var swiper = new Swiper('.js-swiper-promo', {
    spaceBetween: 16,
    slidesPerView: 3,
    slidesPerGroup: 3,
    navigation: {
        nextEl: '.js-swiper-promo  + .sw-next',
        prevEl: '.js-swiper-promo  + .sw-next + .sw-prev',
    },
    breakpoints: {
        992: {
            slidesPerView: 'auto',
            slidesPerGroup: 2,
            spaceBetween: 12
        },
    },
});

jQuery.fn.extend({
    checkList: function () {
        return this.each(function (e) {
            var option = $(this).find('.js-check');
            option.on('click', function () {
                option.removeClass('active');
                $(this).addClass('active');
            });
        });
    },

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

lc_dropdown();

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

        });

        itemmenu.click(function (e) {
            var submenuitem = $that.find('.dropdown-menu');

            $('.dropdown-button').removeClass('active');
            $(this).addClass('active');

            $('.dropdown .dropdown-menu').removeClass('open');
            submenuitem.addClass('open');
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
        // $('.lc-banking .dropdown-menu').removeClass('open');
        var targetInput = $('.lc-banking .js-search');

        if(!targetInput.is(e.target)){
            $('.lc-banking .dropdown-menu').removeClass('open');
        }

    });

    itemDropdown();
}


function promotionModalEvent() {
    var previousScrollY = 0;

    // click button
    function enableScroll() {
        $('html').css({ marginTop: 0 }).removeClass('disable-scroll-safari');

        $('.modal-promotion').removeClass('modal--is-visible');

        window.scrollTo(0, previousScrollY);
    }
    $(document).on('click', '.modal-promotion', function (e) {
        enableScroll();
    });

    function outside_remove_scroll(e) {
        if ($('.modal.modal-promotion').is(e.target) && $('.modal.modal-promotion').has(e.target).length === 0) {
            enableScroll();
        }
    }

    //click outside
    $(document).on('click', '.modal-promotion', function (e) {
        outside_remove_scroll(e);
    });
};

promotionModalEvent();


