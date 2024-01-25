var width = $(window).width(), repsonsive = width < 992;
$(function () {
    $(document).ready(function () {
        $('html').addClass('cart-html');
        $('body').addClass('cart-body');

        lc_dropdown();

        //check list banking
        var list = $('.js--check-list');
        list.checkList()

        //slide
        slide();
        option_select();
        //remove hover giỏ hàng trên header
        // lch-cart wrapperCartHeaderDes  lc-tooltip lc-tooltip-grayscale lc-tooltip-bottom lc-tooltip-hover
        // lch-cart wrapperCartHeaderDes
        $('.lch-cart').removeClass('lc-tooltip lc-tooltip-grayscale lc-tooltip-bottom lc-tooltip-hover');

    });
});

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
// NguyeND2

function NguyenND2() {
    // Show input voucher
    $('.js-voucher').on('click', function () {
        $(this).hide();
        $('.voucher-input').addClass('active');
    });

    // Collpase footer
    // var coll = $('.title-colapse');
    // coll.each(function () {
    //     $(this).on('click', function () {
    //         if (parseInt($(window).width()) < 768) {
    //             $(this).toggleClass('active');
    //             var content = $(this).next();
    //             var isBlock = $(this).next().css('display');
    //             var boxShadow = $(this).parent().parent();
    //             // console.log(boxShadow);
    //             if (isBlock == 'block') {
    //                 content.slideUp();
    //                 boxShadow.removeClass('active');
    //             } else {
    //                 content.slideDown();
    //                 boxShadow.addClass('active');
    //             }
    //         }
    //     });
    // });

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

}

// end NguyenND2

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

function btn_count() {
    $(document).click('.button-count', function () {
        $('.js-prd-drug').css('pointer-events', 'unset');
    });
}

function option_select() {
    //check active option-select (quy cách)
    var list = $('.js-select');
    list.each(function () {
        var option = $(this).find('.option');
        option.on('click', function () {
            option.removeClass('active');
            $(this).addClass('active');
        });
    });
}

function valid_user() {
    var is_radio_check = is_radio('.cart-bottom__form');

    if (!detect_phone($('input[phone]').val()) && $('input[phone]').val().length > 1) {
        $('input[phone]').addClass('is-invalid').next().find('span').text('Số điện thoại không hợp lệ');
    }

    return is_radio_check.is_radio_check && is_input_empty() && detect_phone($('input[phone]').val());
}

//click vào radio removeClass is-invalid
function checked_radio() {
    //checkform
    var checkform = $('.check-form');

    checkform.each(function () {
        var radio = $(this).find('.radio');
        radio.click(function () {
            radio.removeClass('checked');
            $(this).addClass('checked');

            $(this).hasClass('checked') && radio.closest('.check-form').removeClass('is-invalid');

        });
    });
}

//check input unser
function input_addclass_valid() {

    var form_user = $('.js-info');
    form_user.each(function () {
        var childInput = $(this).find('.js--info-input:not(:last-child)');

        childInput.val() != undefined &&
        childInput.val().length === 0 && childInput.addClass('is-invalid');

    });

}

//check input rỗng
function is_input_empty() {
    //check length input
    var check_length;
    return check_length = $('.compulsory.js--info-input').filter(function () {
        return !this.value.trim();
    }).length < 1;
}

//validate phone number
function detect_phone(number) {
    // var vnf_regex = /([\+84|84|0]+(2|3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;

    var vnf_regex_10 = /([\+84|84|0]+(2|3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/,

        vnf_regex_11 = /([\+84|84|0]+(2|3|5|7|8|9|1[2|6|8|9]))+([0-9]{9})\b/;

    if (parseInt(number.slice(0, 2)) === 02) {
        return vnf_regex_11.test(number);
    } else {
        return vnf_regex_10.test(number);
    }
}

//check radio giới tính anh/chị
function is_radio(element) {

    var get_name, get_sex, getReceiving,
        is_radio_check = $(`${element} .no-gutters.check-form`).find('.radio.checked').hasClass('checked');

    $('.check-form').each(function () {

        var sex_checked = $(this).closest(element).find('.radio.checked').children().find('input'),
            radio_checked = $(this).closest(element).find('.radio.checked').children();

        if ($(this).closest(element).find('.no-gutters.check-form .radio').hasClass('checked')) {

            get_name = radio_checked.text().trim();
            get_sex = sex_checked.data('title');

            getReceiving = $(this).closest(element).find('.radio.js-tabs.checked').children().text().trim();

        } else {
            $(this).closest(element).find('.no-gutters.check-form').eq(0).addClass('is-invalid');
        }

    });

    return {
        is_radio_check: is_radio_check,
        get_name: get_name,
        get_sex: get_sex,
        getReceiving: getReceiving,
    };
}

//user nhập thông tin remove is_invalid
function user_keyup() {

    var form_user = $('.js-info');

    input = form_user.find('.js--info-input:not(:last-child)');

    form_user.each(function () {

        var input = $(this).find('.js--info-input:not(:last-child)').addClass('compulsory'),

            $name = $(this).find('input[name]');
        $number = $(this).find('input[phone]');

        input.on('keydown keyup', function (e) {

            if (/\D/g.test($('input[phone]').val())) {
                this.value = this.value.replace(/\D/g, '');
            }

            $(this).val().length > 0 && $(this).removeClass('is-invalid');

            if (input.is('[name="ho_ten"]')) {

                var key = e.keyCode;

                (e.ctrlKey || e.altKey) && e.preventDefault();

            }

        });

        $number.on('keydown keyup', function () {

            var $that = $(this), ha_noi = 02;

            var valueInt = parseInt($that.val().slice(0, 2));

            var valueLength = $('input[phone]').val().length;

            const inventory = /([\+84|84|0]+(2|3|5|7|8|9|1[2|6|8|9]))+([0-9]{0})\b/.test($that.val().slice(0, 2));

            // console.log(!inventory);

            valueInt === ha_noi ? $(this).attr('maxlength', '11') : $(this).attr('maxlength', '10');

            if (!detect_phone($('input[phone]').val()) && !inventory && (valueLength > 0)) {

                $(this).addClass('is-invalid').next().find('span').text('Số điện thoại không hợp lệ');

            } else {
                $(this).removeClass('is-invalid').next().find('span').text('Thông tin bắt buộc');
            }

            Number.isNaN(valueInt) && $number.removeClass('is-invalid');

        });

        $('input[name="email"]').on('keydown keyup', function () {
            var $that = $(this), $val = $(this).val();
            // console.log(!validateEmail($val), $val.length > 2);
            if (!(validateEmail($val) && $val.length > 0)) {
                add_valid_email();
            }else{
                $that.removeClass('is-invalid').next('.is-alert').remove();
            }

            if ($val.length === 0 && !validateEmail($val)) {
                $that.removeClass('is-invalid').next('.is-alert').remove();
            }
        });

    });
}

//lấy thông tin họ tên, sđt khách hàng
function getInfoUser() {

    var cart_form = $('.cart-bottom__form'),

        table_user = $('.js-table-info'),

        table_td_user = $('.js-info'),

        get_name_sex = is_radio('.cart-bottom__form');

    input_addclass_valid();

    user_keyup();

    // console.log(3);
    if (valid_user()) {
        // console.log(4);
        cart_form.fadeOut();

        $('.cart__info-user, .table-user').fadeIn();
        //
        table_user.each(function (index) {
            var valUser, valTable;

            valUser = table_td_user.eq(index).find('input').val();
            valTable = table_user.eq(index).find('.js-tab-val');
            valTable.text(valUser);

            table_user.eq(0).find('.js-tab-val').text(`${get_name_sex.get_name} ${table_td_user.eq(0).find('input').val()}`);

            if (valUser != undefined) {
                valUser.length === 0 ? $(this).hide() : $(this).show();
            }
        });

    } else {
        scroll(cart_form);
        $('.cart-bottom__payments .check-form .radio').removeClass('checked');
        $('.select__region_city .dropdown-menu').removeClass('open');
    }
}


$('#tab2 .form-group input').off('keyup').on('keyup', function () {
    $(this).val().length > 0 && $(this).removeClass('is-invalid');
});

function getAddressUser() {

    var note1 = $('#tab1 .note').children().val(), note2 = $('#tab2 .note').children().val(),

        receive = $('.table-receive'),

        tableInfoAddress = receive.find('.js-table-info'),

        checkInputAddress = !$('#tab2 .form-group input').hasClass('is-invalid'),

        check_receiving = !$('.form-receiving .dropdown-city .dropdown-button').hasClass('is-invalid'),

        date = $("[name='ngaySelected']").val(), time = $('[name="gioSelected"]').val();

    isInvalid_City($('.dropdown-city .dropdown-button.active').attr('data-city'));

    // console.log(checkInputAddress);
    function showTableReceive() {
        var target_drug = $('.js-tabs.active').attr('target');

        tableInfoAddress.eq(2).children('.js-tab-val').text() === '' ?
            tableInfoAddress.eq(2).hide() : tableInfoAddress.eq(2).show();

        // $('.table-receive').fadeIn().attr('expand', target_drug);
        // $('.form-receiving').fadeOut();

        if (true) {
            $('.table-receive').fadeIn().attr('expand', target_drug);
            $('.form-receiving').fadeOut();
            scroll('.js-info-user');
        }
        else {
            setTimeout(function () {
                $('.cart-bottom__payments .check-form .radio').removeClass('checked').find('input[name="payment"]').prop('checked', false);
            }, 50);
        }
    }

    function showInfoReceive(address, date, note, time) {

        var table_info = receive.find('.js-table-info'), last = $('.js-tab-val:last-child'),
            text_drug = $('.js-tabs.active .label-text').text().trim();
        table_info.each(function (index) {

            table_info.eq(0).find('.js-tab-val:first-child').text(text_drug);

            table_info.eq(0).find(last).text(address);

            table_info.eq(1).find(last).text(`${time}, ${date}`);

            $('.table-receive').find('.js-table-info').eq(2).find('.js-tab-val:last-child').text(note);

            table_info.find('.js-table-info').eq(2).find('.js-tab-val:last-child').text().length === 0 ?
                table_info.eq(2).hide() : table_info.eq(2).show()
        });

    }

    var nhan_tai_nha_thuoc = $('.js-tabs.active').is('[data-drug="drug1"]'),
        giao_tan_noi = $('.js-tabs.active').is('[data-drug="drug2"]');

    if (nhan_tai_nha_thuoc) {
        // console.log(1);
        let addressNT = $('#drug1 > p').text();
        showInfoReceive(addressNT, date, note1, time);
        showTableReceive();
        // scroll('.table-user');
    }

    if (giao_tan_noi) {

        name_city = $('.block-dropdown-city .select__region_city .dropdown-button span').text().trim();

        name_district = $('.block-dropdown-city .select__region_district .dropdown-button span').text().trim();

        name_ward = $('.dropdown-ward .dropdown-button span').text().trim();

        name_address = $('#tab2 .form-group input').val();
        // showInfoReceive(`${name_address}, ${name_ward}, ${name_district}, ${name_city}`, date, note2, time);
        // showTableReceive();
        // scroll('.table-user');
        if (check_receiving && checkInputAddress && is_input_empty()) {
            //dat them - bo validate phuong
            let infoReceive = `${name_address}, ${name_ward}, ${name_district}, ${name_city}`;
            if ($('.dropdown-ward').children('.dropdown-button').attr('data-city') === '') {
                infoReceive = `${name_address}, ${name_district}, ${name_city}`;
            }

            showInfoReceive(infoReceive, date, note2, time);
            showTableReceive();
            scroll('.table-user');
        }
    }
}

// //validate dropdown city
function isInvalid_City(tokenCity) {
    // console.log(tokenCity);
    $('.dropdown-city').each(function (key, item) {
        var dropdown_button = $(this).children('.dropdown-button'),
            giao_tan_noi = $('.js-tabs.active').is('[data-drug="drug2"]');
        //dat them - bo validate phuong
        if (giao_tan_noi) {
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
            // $(this).children('.dropdown-button').removeClass('is-invalid')
        }

    });
};

function checkFormCity(payment) {

    var form_user = is_radio('.cart-bottom__form'),

        checkInputAddress = !$('#tab2 .form-group input').hasClass('is-invalid'),

        check_receiving = !$('.form-receiving .dropdown-city .dropdown-button').hasClass('is-invalid');

    var drug1 = $('.js-tabs.active').is('[data-drug="drug1"]'),
        drug2 = $('.js-tabs.active').is('[data-drug="drug2"]');
    // debugger;
    if (drug1) {
        if ((form_user.check_form_radio && is_input_empty())) {
            payment.addClass('checked');
        }
    }

    if (drug2) {
        (check_receiving && checkInputAddress && is_input_empty()) ?
            payment.addClass('checked')
            :
            $('.cart-bottom__payments .check-form .radio').removeClass('checked');

    }
}

// //
function check_city_drug() {

    function tax($this) {
        if (checkbox_tax()) {

            class_invalid();
            keyup_input_tax();

        } else {
            check_mail();
        }
    }

    $('.select__region_city.blockCityFinal').on('click touchend', function () {
        if ($('.js-tabs.active').is('[data-drug="drug2"]')) {
            valid_user() ? tax() : check_mail();
        }
    });

    $('.select__region_district.blockCityFinal').click(function () {

        var select_city = $('.select__region_city.blockCityFinal .dropdown-button'),
            width = $(window).width();

        if (select_city.attr('data-city') === '') {

            $(this).find('.dropdown-menu').removeClass('open').prev().removeClass('is-invalid');

            if (width < 768) {
                select_city.addClass('is-invalid').next().next().find('span').text('Chọn Tỉnh/Thành')
                $('.option-location .select__region_district').addClass('is-invalid').next().next().find('span').text('Chọn Tỉnh/Thành')
            } else {
                select_city.addClass('is-invalid').next().next().find('span').text('Vui lòng chọn Tỉnh/Thành');
            }
        }
    });

    $('.select__region_ward').click(function () {
        if ($('.select__region_district.blockCityFinal .dropdown-button').attr('data-city') === '') {
            $('.select__region_district.blockCityFinal .dropdown-button').addClass('is-invalid').next().next().find('span').text('Vui lòng chọn Quận/Huyện');
            $('.select__region_district.blockCityFinal').trigger('click');
        }
    });

    $('.option-location').each(function () {
        var button_district = $(this).find('.select__region_district');

        button_district.on('click', function () {
            var width = $(window).width();
            var $that = $(this), city = $that.closest('.option-location').find('.select__region_city .dropdown-button');

            if (city.attr('data-city') === '') {

                $(this).find('.dropdown-menu').removeClass('open').prev().removeClass('is-invalid');

                if (width < 768) {
                    city.addClass('is-invalid');
                    $that.closest('.option-location').find('.alert span').text('Chọn Tỉnh/Thành');
                } else {
                    city.addClass('is-invalid');
                    $that.closest('.option-location').find('.alert span').text('Vui lòng chọn Tỉnh/Thành');
                }
            }
        });
    });


}

//button chỉnh sửa
function button_edit() {
    var button_edit = $('.js-edit'), blockUser = $('.js-info'), tabInforUser = $('.js-table-info'), table = $('.js-info-user'),

        form_input_user = $('.cart-bottom__form');

    button_edit.each(function (index) {
        var valuUser, valTable;

        valTable = tabInforUser.find('.js-tab-val');

        button_edit.on('click touchend', function () {
            var table = $(this).closest('.table'), table_receive = table.find(tabInforUser).children('.js-tab-val');
            // $('.cart-bottom__payments .check-form .radio').removeClass('checked');

            if (table.hasClass('table-user')) {

                form_input_user.fadeIn().attr('expand', 'receive');
                $('.table-user').fadeOut();
                blockUser.eq(0).find('input').focus();
                $(this).closest('.table-user').find(tabInforUser).children('.js-tab-val').text('');

            }
            if (table.hasClass('table-receive')) {
                table_receive.text('');
                $('.table-receive').fadeOut().attr('expand', 'false');
                $('.form-receiving').fadeIn();
            }

        });
    });
}

//kiểm tra checkbox có checked hay không
function checkbox_tax() {
    var input_tax = $('.js-check-tax input[type="checkbox"]');
    return input_tax.is(':checked');
}

//thuế check input rỗng
function empty_input_tax() {
    var val1 = $('.tax0').val().length, val2 = $('.tax1').val().length, val3 = $('.tax2').val().length;
    return (val1 && val2 && val3);
}

//check class invalid tax thuế
function class_invalid() {
    var input_tax = $('.js-input-tax');

    input_tax.each(function (index) {

        if ($(`.tax${index}`).val().length > 0) {
            $(`.tax${index}`).removeClass('is-invalid');

        } else {
            $('.cart-bottom__payments .check-form .radio').removeClass('checked');
            $('.select__region_city .dropdown-menu').removeClass('open');
            $(this).addClass('is-invalid');
        }

        if (empty_input_tax() > 0) {
            check_mail();
        }

    });
}

//keyup remove is-invalid thuế
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

//nếu checkbox thuế được checked & ko checked
function check_tax() {
    var input_tax = $('.js-check-tax input[type="checkbox"]'),
        tax_info = $('.cart-tax-info');

    $('.check-tax label').css('font-weight', 'normal');

    input_tax.change(function () {
        var mail = $('input[name="email"]');
        input_addclass_valid();

        if (valid_user()) {
            $('.js-cart-tabs, .dropdown-button').removeClass('is-invalid');

            !validateEmail(mail.val()) && mail.val().length > 0 ? add_valid_email() + $("input:checkbox").prop('checked', false) : tax_info.slideDown();

            $(this).removeClass('drop-checked');

        } else {
            tax_info.slideUp();
            $("input:checkbox").prop('checked', false);
            is_email() ? add_valid_email() : mail.nextAll('.is-alert').remove();
        }

        //
        if (checkbox_tax()) {
            // tax_info.slideDown();
            $('.check-tax label').css('font-weight', '500');
        } else {

            $('.js-input-tax').val('');
            $('.check-tax label').css('font-weight', 'normal');
            tax_info.slideUp();
            $("input:checkbox").prop('checked');
            $('.js-input-tax').removeClass('is-invalid');
        }

    });

}
function is_email() {
    var mail_val = $('input[name="email"]');
    // console.log(validateEmail(mail_val.val()), mail_val.val().length > 0);
    return !validateEmail(mail_val.val()) && mail_val.val().length > 0;
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
    var valid = validateEmail(mail_val.val().trim());
    if (!valid && mail_val.val().trim().length > 0) {
        $('.cart-bottom__payments .check-form .radio').removeClass('checked');
        $('.select__region_city.blockCityFinal .dropdown-menu.open').removeClass('open');

        add_valid_email();

        // console.log(1);
    } else {
        // console.log(2);
        // debugger
        $('input[name="email"]').removeClass('is-invalid');
        mail_val.nextAll('.is-alert').remove();
        getInfoUser();

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

//hinh thuc thanh toan
function payments() {
    var payments = $('.cart-bottom__payments'), paymentsItem = payments.find('.check-form .radio');
    $('.table-receive').hide();

    paymentsItem.click(function () {
        var input_email = $('input[name="email"]');

        $('#tab2 .form-group .form-input').val().length <= 0 ?
            $('#tab2 .form-group .form-input').addClass('is-invalid')
            :
            $('#tab2 .form-group .form-input').removeClass('is-invalid');

        valid_user() ? is_tax_address() : check_mail();

        checkFormCity($(this));

        empty_input_tax() && getAddressUser();
        //
        function is_tax_address() {
            if (checkbox_tax()) {

                class_invalid();
                keyup_input_tax();

            } else {
                check_mail();
                // console.log(validateEmail(input_email.val()), input_email.val().length > 0);
                (!validateEmail(input_email.val()) && input_email.val().length > 0) ? false : getAddressUser();
            }
        }
    });
}

//slide
function slide() {
    var swiper = new Swiper('.js-slide--later', {
        slidesPerView: 5,
        slidesPerGroup: 5,
        navigation: {
            nextEl: '.js-slide--later + .next',
            prevEl: '.js-slide--later + .next + .prev',
        },
        breakpoints: {
            992: {
                slidesPerView: 'auto',
                slidesPerGroup: 2,
            },
        },
    });
    var swiper = new Swiper('.js-slide--together', {
        slidesPerView: 5,
        slidesPerGroup: 5,
        navigation: {
            nextEl: '.js-slide--together  + .sw-next',
            prevEl: '.js-slide--together  + .sw-next + .sw-prev',
        },
        breakpoints: {
            992: {
                slidesPerView: 'auto',
                slidesPerGroup: 2,
            },
        },
    });

    var swiper = new Swiper('.js-slide--promo', {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 20,
        navigation: {
            nextEl: '.js-slide--promo  + .sw-next',
            prevEl: '.js-slide--promo  + .sw-next + .sw-prev',
        },
        breakpoints: {
            992: {
                slidesPerView: 'auto',
                slidesPerGroup: 2,
                spaceBetween: 12
            },
        },
    });
}

//tìm kiếm thành phố & ngân hàng
function search() {
    //search city
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
            } else {
                filterCity.show();
                banking_filter_city.show();
                btn_close.hide();
                bankingDropdown.removeClass('open');
                banking.removeClass('form-fixed');
            }
        })

        $('.lc-banking .js-search').on('click', function () {
            // console.log(1);
            if (repsonsive) {
                $('.lc-banking .js--focus-input').addClass('form-fixed');
                $('.lc-banking .dropdown-menu').addClass('open');
            }
        });

        $('.lc-banking .bank-close').on('click', function () {
            // console.log(1);
            if (repsonsive) {
                $('.lc-banking .js--focus-input').removeClass('form-fixed');
                $('.lc-banking .dropdown-menu').removeClass('open');
            }

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

                    $(this).closest('.select__region_city').find('.dropdown-button + .dropdown-menu').removeClass('open');

                    // if ($('.js-tabs.active').attr('data-tab') === 'tab1') {
                    //     $('.select__region_district').find('.dropdown-button').removeClass('is-invalid');
                    // }

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

//xem thêm địa chỉ
function load_more_shop() {
    //load more
    var btn_loadMore = $('.js-loadMore'), batch = 5;

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

            // scroll('.feature__location-inner');
            parseInt($('.address-item:hidden').length) > 0 ?
                $(this).find('span').text(parseInt($('.address-item:hidden').length))
                :
                $(this).css('cssText', 'display : none !important');
        });
    });

}

// ----location-----
var drug1 = $('[target="drug1"]'), drug2 = $('[target="drug2"]');

// location= true
function enable_location() {
    return $('.form-receiving').attr('location') != 'true';
}

function check_receving_location() {
    var checkClass = $('.form-receiving').hasClass('form-receiving-location');
    return checkClass;
}

function target_drug(that) {
    $('.js-select-all .option, .tab-item.active, .tab-location').removeClass('active');
    $(('.') + that.attr('target')).addClass('active').show();
}

//click chọn hình thức giao hàng ở sản phẩm
function select_option() {
    var select_all = $('.js-select-all');
    var is_expand_drug = $('.table-receive');

    var css_tab = function () {

        $('.js-tabs').css('pointer-events', 'unset');
        $('.js-tabs.active').css('pointer-events', 'none');
    }

    function check_table_expand(attr) {
        if (is_expand_drug.is(attr)) {
            $('.table-receive').fadeOut();
            $('.form-receiving').fadeIn();
            $('.cart-bottom__payments .radio').removeClass('checked');
        }
    }

    select_all.each(function () {

        var option = $(this).find('.option');

        option.on('click', function () {
            $('.block-dropdown-city .dropdown-button').attr('data-city', '');
            $('.tab-location').hide();

            target_drug($(this));

            $('.js-prd-drug').css('pointer-events', 'unset');

            if (!$(this).is('.drug1')) {

                $('.option-location').slideUp();

                select_all.find('.col-alert-success').hide();

                $('.cart-bottom__payments .radio:first-child').removeClass('disable');

                css_tab();

                $('#tab1, #tab1 .location-block').hide();

                $('.block-dropdown-city').show();
                // scroll('.cart-bottom__form');

                check_table_expand('[expand="drug1"]') && check_table_expand();

                $('.option.drug2.active').css('pointer-events', 'none');
            } else {
                // console.log(2);
                $('.option.drug2').css('pointer-events', 'unset');

                css_tab();
                $('.block-dropdown-city').hide();
                $('#tab1, #tab1 .note, #tab1 .date').show();

                check_table_expand('[expand="drug2"]') && check_table_expand();
            }

        });
    });
}

//hình thức nhận hàng có location
function form_receiving_locationparams() {
    var productUpdate = $('.product-location');

    $('.js_tabs').attr('target', function (i) {
        return 'drug' + (i + 1);
    });

    // productUpdate.hide();

    $('.tab-item').each(function () {

        $('.tab-location, .block-dropdown-city').hide();
        $('.tab-location:first-child').show();

        $(this).click(function (e) {
            e.preventDefault();

            var $that = $(this);

            $('.tab-location').hide();
            $('#' + $that.attr('target')).show();

            target_drug($that);

            $('.tab-item').css('pointer-events', 'unset');

            $that.css('pointer-events', 'none');

            if ($that.is('[data-tab="tab2"]')) {

                $('#tab1 .location-block, #tab1 .note, #tab1 .date, .form-chuyenhang, .col-alert-success,.option-location').hide();

                $('.cart-bottom__payments .radio:first-child').removeClass('disable');

                $('.block-dropdown-city').show();
                $('.block-dropdown-city .dropdown-button').removeClass('is-invalid').attr('data-city', '');

                productUpdate.removeClass('product-location-update');
            } else {

                $('.block-dropdown-city .dropdown-button').removeClass('is-invalid');
                $('.block-dropdown-city').hide();
                $('#tab1 ,#tab1 .note, #tab1 .date').show();
                productUpdate.addClass('product-location-update');
            }

            $('.tab-location').hide();
            $('.' + $that.attr('target')).show();

        });
    });
}

//chuyển hàng về
function form_chuyenhang() {

    var move_drug = $('.js-move-drug');

    move_drug.each(function (e) {
        var that = $(this);

        that.click(function () {
            var parent = that.closest('.js-select-all'), alert_success = parent.find('.col-alert-success');

            alert_success.fadeIn();

            $('.form-chuyenhang').show();
            $('.cart-bottom__payments .radio:first-child').addClass('disable');

            $('.option-location').slideUp();

            // scroll(that);
        });

    });
}

//chọn nhà thuốc khác
function product_select_drug() {
    var btn_select_address_drug = $('.cart-product .js-prd-drug');

    btn_select_address_drug.each(function () {
        var that = $(this);

        that.on('click', function (e) {
            e.preventDefault();
            var parent = that.closest('.product-location'), block_location = parent.find('.option-location');

            $(btn_select_address_drug).removeClass('active').css('pointer-events', 'unset');
            $(that).addClass('active').css('pointer-events', 'none');


            $('.form-chuyenhang, .option-location, .col-alert-success,.block-dropdown-city,.tabs .location-block').hide();
            block_location.fadeIn();

            $('.select__region_city .dropdown-button').removeClass('is-invalid');
            // parent.find('.col-alert-success').hide();
            // scroll(parent);
        });
    });
}

function receiving_select_drug() {
    $('.js-expand-location').on('click', function () {
        $('.none-drug, #tab1, #tab1 .location-block, #tab1 .note, #tab1 .date, .block-dropdown-city').show();
        $('.option-location').slideUp();
    });
}

//scroll
function scroll(element) {
    $("html, body").animate({
        scrollTop: $(element).offset().top - 50
    }, 600);
}

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
            var thatIsActive = that.find('span').text();

            itemDropdown.removeClass('active');
            that.addClass('active');

            contentButton.text(thatIsActive);

            menuDropdown.removeClass('open');
        })

    });
}

//CTA fixed-bottom
// var width = $(window).width();
// repsonsive = width < 992;

function ctaSticky() {
    var width = $(window).width();
    repsonsive = width < 992;
    if (width <= 992) {
        $('.sticky-top').addClass('fixed-bottom');
        $('.cs-col.sticky-top').attr('scoll', true);
        var stickyTop = $('.cs-col.sticky-top'), browserWindow = $(window);
        var isScroll = $('.cs-col.sticky-top').attr('scoll');

        if(isScroll === true){
            var heightSticky = stickyTop.height();
            var offsetTopSticky = stickyTop.offset().top;
            var heightCart = parseInt($('.cart').height() + heightSticky);
            browserWindow.scroll(function () {
                var windowScrollTop = parseInt(browserWindow.scrollTop() + offsetTopSticky);

                if(windowScrollTop > heightCart){
                    $('.sticky-top').removeClass('fixed-bottom');
                }else{
                    $('.sticky-top').addClass('fixed-bottom');
                }

                console.log("height cart", heightCart, windowScrollTop, offsetTopSticky);
            });
        }

    }
}
ctaSticky();
//fix scroll safari

// Click touch tooltip mb
if (($(window).width()) < 992) {
    $('.js-tooltip-open').on('click', function (e) {
        $(this).removeClass('lc-tooltip-hover');
        console.log($(e.target).is($(this)));
        if ($(e.target).is($(this))) {
            $(this).addClass('visibility');
        } else {
            $(this).removeClass('visibility')
        }
    });
}
function promotionModalEvent() {
    var previousScrollY = 0;

    // click button
    function enableScroll() {
        $('html').css({ marginTop: 0 }).removeClass('disable-scroll-safari');

        $('.modal-promotion').removeClass('modal--is-visible');

        window.scrollTo(0, previousScrollY);
    }

    if (repsonsive) {
        function disableScroll() {
            previousScrollY = window.scrollY;

            $('html').css({

                marginTop: -previousScrollY,

            }).addClass('disable-scroll-safari');
        }

        $(document).on('click', '.select__region_city .dropdown-button,.select__region_award .dropdown-button, .form-search_wrap .js-input', function () {
            // disableScroll();
        });

        $(document).on('click', '.select__region_district .dropdown-button', function () {
            // var select_city = $('.select__region_city'), city_button = select_city.find('.dropdown-button');

            // if (city_button.attr('data-city') !== '') {
            //     // checkScroll();
            //     disableScroll();
            // }
        });

        $(document).on('click', '.js-close, .item-region, .select--bankcode, .bank-close', function (e) {
            // enableScroll();
        });

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
        // console.log(1111);
        outside_remove_scroll(e);
    });
};

// call function
function init() {
    NguyenND2();

    btn_count();

    lc_dropdown();

    option_select();

    checked_radio();

    button_edit();

    check_tax();

    user_keyup();

    payments();

    load_more_shop();

    form_receiving_locationparams();

    form_chuyenhang();

    select_option();

    product_select_drug();

    receiving_select_drug();

    check_city_drug();

    search();

    // disableScrollOpenDropdown();

    // fixScrollSafari();
    promotionModalEvent();
}
init();


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
