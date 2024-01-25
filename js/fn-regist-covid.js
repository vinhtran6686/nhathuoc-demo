//code Đạt thêm vào
var inputFiles = [];
let browserWindow = $(window), repsonsive = browserWindow.width();
$(function () {
    $(document).ready(function () {
        lc_dropdown();
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

// end NguyenND2

//scroll
function scroll(element) {
    $("html, body").animate({
        scrollTop: $(element).offset().top - 50
    }, 900);
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
    });

    itemDropdown();
    search();
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


function valid_user() {

    var is_radio_check = is_radio('.form-groups');

    if(!detect_phone($('input[phone]').val()) && $('input[phone]').val().length > 1){
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
            // console.log(2);
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

        });

        $number.on('keydown keyup', function () {

            var $that = $(this), ha_noi = 02;

            var valueInt = parseInt($that.val().slice(0, 2));

            var valueLength = $('input[phone]').val().length;

            const inventory = /([\+84|84|0]+(2|3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/.test($that.val().slice(0, 2));

            valueInt === ha_noi ? $(this).attr('maxlength', '11') : $(this).attr('maxlength', '10');

            // console.log(10 > valueLength, valueLength > 1,!inventory, !detect_phone($('input[phone]').val()));

            if (!detect_phone($('input[phone]').val()) && !inventory && (valueLength >= 1)) {

                $(this).addClass('is-invalid').next().find('span').text('Số điện thoại không hợp lệ');

            } else {
                $(this).removeClass('is-invalid').next().find('span').text('Thông tin bắt buộc');
            }

            Number.isNaN(valueInt) && $number.removeClass('is-invalid');

        });

    });
}

//lấy thông tin họ tên, sđt khách hàng
function getInfoUser() {

    var table_user = $('.js-table-info'),

        table_td_user = $('.js-info'),

        get_name_sex = is_radio('.form-groups');

    input_addclass_valid();
    user_keyup();

    if (valid_user()) {
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
        $('.select__region_city .dropdown-menu').removeClass('open');
    }
}

//kiểm tra data-city có dữ liệu hay không
function isInvalid_City(tokenCity) {
    $('.dropdown-city').each(function (key, item) {
        var dropdown_button = $(this).children('.dropdown-button');

        dropdown_button.attr('data-city') === '' ?
            $(this).children('.dropdown-button').addClass('is-invalid')
            :
            $(this).children('.dropdown-button').removeClass('is-invalid');

        // console.log(tokenCity);
        // (tokenCity === '') && $(this).children('.dropdown-button').addClass('is-invalid');


    });
};

$('.lc__card-dropdown .form-group input').off('keyup').on('keyup', function () {
    $(this).val().length > 0 && $(this).removeClass('is-invalid');
});

function check_city() {

    $('.select__region_city').on('click touchend', function () {
        getInfoUser();
    });

    $('.select__region_district').click(function () {

        var select_city = $('.select__region_city .dropdown-button'),
            width = $(window).width();

        $('.select__region_city').trigger('click');

        if (select_city.attr('data-city') === '') {

            $(this).find('.dropdown-menu').removeClass('open').prev().removeClass('is-invalid');

            valid_user() && repsonsive();
        }

        function repsonsive() {
            if (width < 768) {
                select_city.addClass('is-invalid').next().next().find('span').text('Chọn Tỉnh/Thành')
            } else {
                select_city.addClass('is-invalid').next().next().find('span').text('Vui lòng chọn Tỉnh/Thành');
            }
        }
    });
}

//lấy thông tin địa, chỉ khách hàng
function getAddressUser() {
    isInvalid_City($('.dropdown-city .dropdown-button.active').attr('data-city'));

    var tableInfoAddress = $('.table-user .js-table-info:last-child .js-tab-val'),

        checkInputAddress = !$('.lc__card-dropdown .form-group input').hasClass('is-invalid'),

        check_receiving = !$('.lc__card-dropdown .dropdown-city .dropdown-button').hasClass('is-invalid');

    name_city = $('.select__region_city .dropdown-button span').text().trim();

    name_district = $('.select__region_district .dropdown-button span').text().trim();

    name_ward = $('.dropdown-ward .dropdown-button span').text().trim();

    name_address = $('.lc__card-dropdown .form-group input').val();

    if (check_receiving && checkInputAddress && is_input_empty()) {
        tableInfoAddress.text(`${name_address}, ${name_ward}, ${name_district}, ${name_city}`);
        isCheckDrugCovid();
    }
}

function search() {
    //search city
    var input_search = $('.js-search');
    input_search.each(function () {
        var that = $(this);
        var wrapper = that.closest('.dropdown-menu-top').next('.js--city-list'),
            item_city = wrapper.children(),
            btn_close = that.next();

        btn_close.hide();

        loopItem(item_city);

        that.off('keyup').on('keyup', function () {

            loopItem(item_city);

            var searchVal = $(this).val().trim(),
                filterCity = wrapper.find('[token-filter]'),
                searchSplit = convertToAscii(searchVal);

            $(this).next().show();

            if (searchVal != '') {

                filterCity.hide();

                tokenFilter(filterCity, searchSplit);

            } else {
                filterCity.show();

                btn_close.hide();
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

                    $('.select__region_city .dropdown-menu').removeClass('open');

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

function isCheckDrugCovid(){
    var isChecked = $('.form-product-item').is('.checked');
    var drugCheckForm = $('.block-drug .check-form');

    isChecked ?
        drugCheckForm.removeClass('is-invalid')
        :
        drugCheckForm.addClass('is-invalid');

    // console.log("isChecked", isChecked);
    return isChecked;
}

function submit() {
    var submit = $('.js-submit a');

    submit.click(function (e) {

        e.preventDefault();

        getInfoUser();

        valid_user() && getAddressUser();
    });
}

// call function
function init() {

    user_keyup();

    search();

    checked_radio();

    check_city();

    submit();
}
init();


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
                if (!containermenu.is(e.target) && containermenu.has(e.target).length === 0) {
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
