const phoneRegex = function (number) {
    var vnf_regex_10 = /([\+0]+(2|3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/,

        vnf_regex_11 = /([\+84|84|0]+(2|3|5|7|8|9|1[2|6|8|9]))+([0-9]{9})\b/;

    if (parseInt(number.slice(0, 2)) === 02) {
        return vnf_regex_11.test(number);
    } else {
        return vnf_regex_10.test(number);
    }
}

//khi user thao tác vào các ô input họ tên, sđt, email
function targetPhone() {
    const _phone = $('.js--info-input[phone]');
    const inputPhone = _phone.val();

    _phone.on('keydown keyup', function () {
        var $that = $(this);

        const HA_NOI = 02;

        var valueInt = parseInt($that.val().slice(0, 2));
        var valueNow = $that.val();
        var valueLength = $that.val().length;

        const inventory = /([\+84|84|0]+(2|3|5|7|8|9|1[2|6|8|9]))+([0-9]{0})\b/.test($that.val().slice(0, 2));

        valueInt === HA_NOI ? $(this).attr('maxlength', '11') : $(this).attr('maxlength', '10');

        if (/\D/g.test(valueNow)) {
            this.value = this.value.replace(/\D/g, '');
        }

        if (!phoneRegex($that.val()) && (valueLength > 0)) {
            $(this).addClass('is-invalid').next().find('span').text('Số điện thoại không hợp lệ');

        } else {
            $(this).removeClass('is-invalid').next().find('span').text('Thông tin bắt buộc');
        }

        Number.isNaN(valueInt) && _phone.removeClass('is-invalid');
    });
}

//báo lỗi thông tin khách hàng rỗng hoặc sai định dạng
function formValidateUser() {
    var valuePhone = $('.form-input[phone]').val();

    return phoneRegex(valuePhone);
}

function addAttrCheckBox() {
    var radios = $('.checkbox'),
        input = radios.find('input'),
        label = radios.find('label');
    // console.log(input);
    input.attr('id', function (i) {
        return 'checkbox' + i;
    });
    label.attr('for', function (i) {
        return 'checkbox' + i;
    });
}

const submit = (params) => {
    const btnSubmit = $('.js-submit');
    const _phone = $('.js--info-input[phone]');

    btnSubmit.click(function(e){
        e.preventDefault();

        if(!formValidateUser()){
            _phone.addClass('is-invalid');
        }
    });
}

const init = () => {
    $('html').addClass('covid-html');

    addAttrCheckBox();
    targetPhone();

    submit();
}
init();