import * as regexs from "./regixers.js";

let browserWindow = $(window),
    widtWindow = browserWindow.width(),
    webDesktop = widtWindow > 992,
    webTabletMobile = widtWindow < 992;

let jDocument = $(document);

const btnSubMit = $('.js-submit');
const btnClear = $('.js-clear');
const btnReset = $('.js-reset');
const btnCanCel = $('.js-close');

const checkForm = $('.check-form'), $radio = checkForm.find('.radio');
const formInputCompulsory = $('.js-info-textbox.compulsory');
const formInput = $('.js-info-textbox');
const inputPhone = $('input[name="phone"]');

const regexPhone10 = regexs.vnfRegex10;
const regexPhoneHN = regexs.vnfRegex11;
const regexNumber = regexs.number;

const modalWrap = $('.modal');
const modalSave = $('.modal-auto-save');
const modalReset = $('.modal-clear-form');

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

    return {
        testPhone: regexPhone
    }
}

jDocument.ready(function () {
    checkForm.checkForm();
});

jQuery.fn.extend({
    checkForm: function () {
        return $(this).each(function () {
            var radio = $(this).find('.radio');

            radio.click(function () {
                const parent = $(this).closest('.check-form');

                parent.removeClass('is-invalid');

                radio.removeClass('checked');
                $(this).addClass('checked');
            });
        });
    }
});

const addClassValidate = ($tag) => {
    $tag.addClass('is-invalid');
}

const removeClassValidate = ($tag) => {
    $tag.removeClass('is-invalid');
}

const fnCheckForm = () => {
    const isChecked = $radio.is('.checked');
    return isChecked;
}

const checkFormAddValidate = () => {
    if (!fnCheckForm()) {
        addClassValidate(checkForm);
    }
}

const checkFormInput = () => {

    formInputCompulsory.each(function (index) {
        const $that = $(this);
        const $value = $that.val();

        if (!$value.length) {
            $that.addClass('is-invalid');
        } else {
            $that.removeClass('is-invalid');
        }
    });
}

const userFocusForm = () => {
    formInput.each(function (index) {
        const $that = $(this);
        $that.on('keyup keydown paste', function () {
            $that.removeClass('is-invalid');
        });
    });

    inputPhone.on('keyup keydown', function () {
        const $that = $(this), $value = $that.val();
        this.value = this.value.replace(regexNumber, '');
        const $parseValue = parseInt($value.slice(0, 2));
        const HA_NOI = "02";
        const valueLength = $('input[name="phone"]').val().length;
        $parseValue === parseInt(HA_NOI) ? inputPhone.attr('maxlength', '11') : inputPhone.attr('maxlength', '10');

        if (!featureValidate().testPhone($('input[name="phone"]').val()) && (valueLength > 0)) {
            inputPhone.addClass('is-invalid').next().find('span').text('Số điện thoại không hợp lệ');
        } else {
            inputPhone.removeClass('is-invalid').next().find('span').text('Thông tin bắt buộc');
        }
        Number.isNaN($parseValue) && inputPhone.removeClass('is-invalid');
    });
}

const checkFormEmpty = () => {
    var flag = false;

    if (formInputCompulsory.is('.is-invalid') || checkForm.is('.is-invalid')) {
        flag = true;
    }
    return flag;
}

const resetForm = () => {
    formInput.each(function (index) {
        const $that = $(this);
        $that.val('').attr('placeholder', 'Nhập thông tin');
        checkForm.find('.radio').removeClass('checked');
        inputPhone.removeClass('is-invalid')
    });
}

const featureSubmit = () => {

    btnSubMit.click(function (e) {
        e.preventDefault();

        checkFormAddValidate();
        checkFormInput();

        if (checkFormEmpty()) {
            return false;
        }
    });

    btnReset.click(function (e) {
        e.preventDefault();

        modalReset.removeClass('modal--is-visible');

        resetForm();
    });

    btnCanCel.click(function (e) {
        e.preventDefault();

        modalWrap.removeClass('modal--is-visible');
    });
}

const init = () => {
    userFocusForm();
    featureSubmit();
}
init();