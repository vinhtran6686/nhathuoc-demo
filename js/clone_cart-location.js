let browserWindow = $(window),
  widtWindow = browserWindow.width(),
  webDesktop = widtWindow > 992,
  webTabletMobile = widtWindow < 992;

let jDocument = $(document);

var blockUser = $('.js-info');
var btnEdit = $('.js-edit');
var tabInforUser = $('.js-table-info');
var cartForm = $('.cart-bottom__form');

//payment
var formPayments = $('.cart-bottom__payments');
formPaymentsCheckForm = $('.cart-bottom__payments .check-form'),
  formItemPayments = $('.cart-bottom__payments .radio'),
  isCheckedItemPayments = formItemPayments.is('.checked');

//convert các string to ascii
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
//load dom
jDocument.ready(function () {

  $('html').addClass('cart-html');
  $('body').addClass('cart-body');
  $('.ic-cancel').removeClass('ic-cancel').addClass('ic-close');
  $('.check-form').checkForm();

  //ngân hàng
  var blockBank = () => {
    var list = $('.js--check-list');
    list.checkList();
  }

  //slide sp vừa xem, slide sp để dành mua sau
  var slideGlobal = () => {
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
      spaceBetween: 20,
      navigation: {
        nextEl: '.js-slide--promo  + .sw-next',
        prevEl: '.js-slide--promo  + .sw-next + .sw-prev',
      },
      breakpoints: {
        4000: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        992: {
          slidesPerView: 'auto',
          // slidesPerGroup: 2,
          spaceBetween: 12
        },
      },
    });
  }

  //gọi function
  let initInDocument = () => {
    blockBank();
    slideGlobal();
  }

  initInDocument();

});
//các hàm thừa kế
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
      var formReceiving = $('.form-receiving');
      radio.click(function () {
        var _that = $(this);
        var formUser = _that.closest('.cart-bottom__form').find('.radio');

        radio.removeClass('checked');
        $(this).addClass('checked');


        var isRadioUserChecked = formUser.is('.checked'),
          isJsTabsChecked = $('.js-cart-tabs .js-tabs').is('.checked');
        var itemTabs = _that.closest('.js-cart-tabs').find('.radio');
        var isRadioReceivingChecked = itemTabs.is('.checked');

        //thông tin khách hàng
        if (isRadioUserChecked && !isJsTabsChecked) {
          formReceiving.slideDown();
        }

        //hình thức nhận hàng
        if (isRadioReceivingChecked) {
          $('.sectionTPQuan').slideDown();
        }
        // console.log(_that.parent());
        _that.closest('.check-form').removeClass('is-invalid');
      });
    });
  }
});
//thêm attr for & id vào (label & input)
function idConnetcFor() {
  var radios = $('.radio'),
    input = radios.find('input'),
    label = radios.find('label');

  input.attr('id', function (i) {
    return 'ex' + i;
  });
  label.attr('for', function (i) {
    return 'ex' + i;
  });
}
//check radio giới tính anh/chị - hình thức nhận hàng
var getInfoFormUser = function (element) {

  var nameRadio,
    nameSex,
    nameAddress,
    getReceiving;

  var checkForm = $('.check-form');
  let radioChecked = $(`${element} .no-gutters.check-form .radio.checked`);
  var isRadioChecked = radioChecked.is('.checked');
  var nameLabelAddress = $(`${element} .address-item .radio.checked .lct-txt`);

  checkForm.each(function () {

    var nameRadioChecked = radioChecked.children();

    if (isRadioChecked) {
      nameRadio = nameRadioChecked.text().trim();
      getReceiving = radioChecked.children().text().trim();
      nameAddress = nameLabelAddress.text().trim();

    } else {
      $(this).closest(element).find('.no-gutters.check-form').eq(0).addClass('is-invalid');
    }

  });

  const newInfoUser = {
    isRadioChecked: isRadioChecked,
    nameRadio: nameRadio,
    nameSex: nameSex,
    nameAddress: nameAddress,
    getReceiving: getReceiving
  }
  return newInfoUser;
}
//check number phone
var phoneRegex = function (number) {
  // var vnfRegex = /([\+84|84|0]+(2|3|5|7|8|9|1[2|6|8|9]))+([0-9]{8}|[0-9]{9})\b/;

  // return vnfRegex.test(number);
  var vnf_regex_10 = /([\+84|84|0]+(2|3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/,

    vnf_regex_11 = /([\+84|84|0]+(2|3|5|7|8|9|1[2|6|8|9]))+([0-9]{9})\b/;

  if (parseInt(number.slice(0, 2)) === 02) {
    return vnf_regex_11.test(number);
  } else {
    return vnf_regex_10.test(number);
  }
}
//kiểm tra email hợp lệ hay ko
function isEmail() {
  var valueMail = $('input[name="email"]');
  return (!testMail(valueMail.val()) && valueMail.val().length > 0);
}
// console.log(isEmail());

function importEmail() {
  if (isEmail()) {
    $('input[name="email"]').removeClass('is-invalid');
  }
}
//check email
function testMail($email) {
  var regex = /^[a-z0-9]+([-._][a-z0-9]+)*@([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,4}$/;

  if ($email.length > 0) {
    return regex.test($email);
  }
}
//check thuế
function isCheckedIputTax() {
  var inputTax = $('.js-check-tax input[type="checkbox"]');
  return inputTax.is(':checked');
}
//check input thuế rỗng
function emptyInputTax() {
  var _val1 = $('.tax0').val().length,
    _val2 = $('.tax1').val().length,
    _val3 = $('.tax2').val().length;

  return (_val1 && _val2 && _val3);
}
//check class invalid tax thuế
function addClassValidate() {
  var inputTax = $('.js-input-tax');
  inputTax.each(function (index) {

    if (isCheckedIputTax() && $(`.tax${index}`).val().length === 0) {
      $(this).addClass('is-invalid');
    }

    inputTax.keyup(function () {
      $(this).removeClass('is-invalid');
    });
  });
}
//sự kiện checked radio
function eventChangeInputTax() {
  var inputCheckTax = $('.js-check-tax input[type="checkbox"]'),
    infoTax = $('.cart-tax-info');
  inputTax = $('.js-input-tax');
  inputCheckTax.change(function () {

    if (isCheckedIputTax()) {

      inputTax.val('');
      infoTax.slideDown();
      $('.check-tax label').css('font-weight', '500');

    } else {

      $('.check-tax label').css('font-weight', 'normal');
      infoTax.slideUp();
      $("input:checkbox").prop('checked');
      inputTax.removeClass('is-invalid');

    }

  });
}

function checkNameNotNumber(value) {
  var regexName = /\d+/g;
  return regexName.test(value);
}

function isValidCharacter(text) {
  const validCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  return validCharacterRegex.test(text);
}
//báo lỗi thông tin khách hàng rỗng hoặc sai định dạng
function formValidateUser() {
  var inputNameUser = $('.form-input[name="ho_ten"]');
  var isRadioChecked = getInfoFormUser('.cart-bottom__form');
  var valuePhone = $('.form-input[name="phone"]').val();
  var checkNameUser = !checkNameNotNumber(inputNameUser.val());

  // console.log(checkNameUser);
  return isRadioChecked.isRadioChecked && phoneRegex(valuePhone) && isInvalidCompulsoryInput() && checkNameUser;
}

//check input rỗng
function isInvalidCompulsoryInput() {
  var check_length;
  return check_length = $('.compulsory.js--info-input').filter(function (e) {
    return !this.value.trim();
  }).length < 1;
}

function alertErrFormUser() {
  //check input unser
  blockUser.each(function () {
    var childInput = $(this).find('.js--info-input.compulsory:not(:last-child)');
    // console.log(childInput);
    childInput.val() != undefined &&
      childInput.val().length === 0 && childInput.addClass('is-invalid');

  });
}
//check họ tên
function formUserName() {
  var inputNameUser = $('.form-input[name="ho_ten"]'),
    checkNameUser = checkNameNotNumber(inputNameUser.val());

  checkNameUser ?
    $('[name="ho_ten"] + .alert span').text('Họ tên không đúng định dạng')
    :
    $('[name="ho_ten"] + .alert span').text('Thông tin bắt buộc');
}

//collapse form thông tin khách hàng
function infoUser() {
  var result = getInfoFormUser('.cart-bottom__form');
  var valueMail = $('input[name="email"]');
  let checkMail = testMail(valueMail.val());

  //báo lỗi khi nhập email sai định dạng
  alertErrFormUser();

  function showTableUser() {
    cartForm.slideUp();
    $('.cart__info-user, .table-user').fadeIn();
  }
  // importEmail();
  if (formValidateUser()) {

    if (!isCheckedIputTax()) {
      checkMailShowTableUser();
    }

    tabInforUser.each(function (index) {
      var valuUser, valTable;

      !isCheckedIputTax() && $('.js-input-tax').val('');

      valuUser = blockUser.eq(index).find('input').val();

      valTable = tabInforUser.eq(index).find('.js-tab-val');

      valTable.text(valuUser);

      tabInforUser.eq(0).find('.js-tab-val').text(`${result.nameRadio} ${blockUser.eq(0).find('input').val()}`);

      if (valuUser != undefined) {
        valuUser.length === 0 ? $(this).hide() : $(this).show();
      }
    });
  }

  function checkMailShowTableUser() {
    (valueMail.val().length > 0) ? (checkMail) && showTableUser() : showTableUser();
  }

  addClassValidate();

  var inputTax = $('.js-input-tax'),
    isInValid = inputTax.is('.is-invalid');

  (isCheckedIputTax() && !isInValid && formValidateUser()) && checkMailShowTableUser();
}

//khi user thao tác vào các ô input họ tên, sđt, email
function userFocusInput() {
  var formUser = $('.js-info');
  inputUser = formUser.find('.js--info-input:not(:last-child)');

  formUser.each(function () {
    var formReceivingInput = $('.form-receiving .form-group .form-input');
    var formInput = $(this).find('.js--info-input:not(:last-child)');

    formReceivingInput.on('keyup', function () {
      $(this).val().length > 0 && $(this).removeClass('is-invalid');
    });

    var input = inputUser;
    _name = $('[name="ho_ten"]');
    _number = $(this).find('input[name="phone"]');
    _email = $('input[name="email"]');

    formInput.on('keydown keyup', function (e) {
      var _that = $(this);
      var inputPhone = $('input[name="phone"]').val();

      $(this).val().length > 0 && $(this).removeClass('is-invalid');

      if (/\D/g.test(inputPhone)) {
        this.value = this.value.replace(/\D/g, '');
      }

      if (_that.is('[name="ho_ten"]')) {
        var valueName = _name.val().trim(),
          valueNameLength = valueName.length > 0;
        let arrayName = valueName.split(' ');
        checkName(valueName);
        (e.altKey || e.shiftKey) && e.preventDefault();
      }

      function checkName(value) {
        console.log(checkNameNotNumber(value), valueNameLength, isValidCharacter(value));
        if ((checkNameNotNumber(value) || isValidCharacter(value)) && valueNameLength) {
          $('[name="ho_ten"]').addClass('is-invalid').next('.alert').find('span').text('Họ tên không đúng định dạng');
          return true;
        }
      }

    });

    _number.on('keydown keyup', function () {

      var $that = $(this);
      const HA_NOI = 02;

      var valueInt = parseInt($that.val().slice(0, 2));

      var valueLength = $('input[name="phone"]').val().length;

      const inventory = /([\+84|84|0]+(2|3|5|7|8|9|1[2|6|8|9]))+([0-9]{0})\b/.test($that.val().slice(0, 2));

      valueInt === HA_NOI ? $(this).attr('maxlength', '11') : $(this).attr('maxlength', '10');

      if (!phoneRegex($('input[name="phone"]').val()) && (valueLength > 0)) {
        $(this).addClass('is-invalid').next().find('span').text('Số điện thoại không hợp lệ');

      } else {
        $(this).removeClass('is-invalid').next().find('span').text('Thông tin bắt buộc');
      }

      Number.isNaN(valueInt) && _number.removeClass('is-invalid');

    });

    _email.on('keydown keyup', function () {
      var $that = $(this), $val = $(this).val();

      if (!(testMail($val) && $val.length > 0)) {
        $that.addClass('is-invalid');
      }
      // console.log($val.length === 0);
      if ($val.length === 0 && !testMail($val)) {
        $that.removeClass('is-invalid');
      }

    });


  });
}

//tabs chọn hàng
function tabReceive() {
  var tabItem = $('.js-tabs');
  let listTab = ["tab1", "tab2"];
  $('.block-dropdown-city').hide();
  tabItem.click(function (e) {
    e.preventDefault();
    var _that = $(this);
    var attrTab = _that.attr('data-tab');
    var attrDrug = _that.attr('data-drug')
    var dropdownCity = $('.dropdown-city .dropdown-button');
    var buttonDropdown = $('.dropdown-city .dropdown-button');
    var inputAddressTab2 = $('#tab2 .form-group .form-input');

    // infoUser();
    $(this).addClass('active').siblings().removeClass('active');
    $('.tabs').hide();
    $('.tab-content .tab-location').removeClass('active');

    $(`#${attrDrug}`).addClass('active');
    $(`#${attrTab}`).show();

    resetBlockReceiving();
    $(".drug2").hasClass('active') ? $('.block-dropdown-city').show() : $('.block-dropdown-city').hide();
    buttonDropdown.attr('data-city', '');
    inputAddressTab2.val('');
    dropdownCity.removeClass('is-invalid');

    $('.block-dropdown-city')
  });
}

//các dropdown city
function dropdownCity() {
  var selectCity = $('.dropdown-city');
  let listTab = ["tab1", "tab2"];
  var formWard = $('.select__region_ward'),
    formAdress = $('.select__region_ward + .form-group');

  // dropdown
  var dropdownCity = $('.select__region_city'),
    dropdownDistrict = $('.select__region_district'),
    dropdownWard = $('.select__region_ward');

  // button
  var buttonDropdownCity = $('.select__region_city .dropdown-button'),
    buttonDistrict = $('.select__region_district .dropdown-button'),
    buttonWard = $('.select__region_ward .dropdown-button');

  //payment
  var formPayments = $('.cart-bottom__payments');

  selectCity.click(function (e) {

    var itemTabs = $('.js-tabs.active').attr('data-tab');

    //check active
    var isActiveCity = $(this).is('.select__region_city');
    var isActiveDistrict = $(this).is('.select__region_district');
    var isActiveWard = $(this).is('.select__region_ward');

    //attr
    var attrButtonCity = buttonDropdownCity.attr('data-city'),
      attrdDistrict = buttonDistrict.attr('data-city'),
      isAttrButtonCity = attrButtonCity === "";

    selectCity.removeClass('active');
    $(this).addClass('active');

    var blockLocation = $('.location-block');

    var checkAttrButtonCity = () => {
      if (isAttrButtonCity) {
        $('.select__region_district .dropdown-menu').removeClass('open');
        buttonDropdownCity.addClass('is-invalid');
        buttonDropdownCity.nextAll('.alert').find('span').text('Mời bạn chọn Tỉnh/Thành');
      }
    }

    var cityIsAcTive = (block1, block2 = '') => {
      if (isActiveCity) {
        !isAttrButtonCity && block1.slideDown();
      }
    }

    var districtActive = () => {
      if (attrdDistrict) {
        formWard.slideDown();
        formAdress.slideDown();
      }
    }

    //nhận hàng tại nhà thuốc
    if (listTab[0] === itemTabs) {
      cityIsAcTive(blockLocation);
      formWard.hide();
      formAdress.hide();
    }
    console.log(listTab[1], itemTabs);
    //giao hàng tận nơi
    if (listTab[1] === itemTabs) {
      if ($(e.target).parent().is('.select__region_city ')) {
        infoUser();
      }
      blockLocation.hide();
      districtActive();
    }

    //dropdown chọn quận/huyện báo lỗi khi chưa chọn tỉnh thành
    if (isActiveDistrict) {
      checkAttrButtonCity();
    }

  });

  var formAddress = $('#tab2 .form-group .form-input');
  formAddress.on('click', function () {
    //attr
    var attrButtonWard = buttonWard.attr('data-city');
    isAttrButtonWard = attrButtonWard === "";

    formPayments.slideDown();
    showNoteDate();

    if (!attrButtonWard) {
      buttonWard.addClass('is-invalid');
      $('.select__region_ward .alert span').text('Mời bạn chọn phường/xã');
    }
  });
}

//lấy địa chỉ
function getAddressUser() {
  let listTab = ["tab1", "tab2"];
  var itemTabs = $('.js-tabs.checked').attr('data-tab');

  var note1 = $('#tab1 .note').children().val(),
    note2 = $('#tab2 .note').children().val(),

    receiveAddress = $('.table-receive .js-table-info'),
    radioReceiving = getInfoFormUser('.form-receiving'),

    date = $("[name='ngaySelected']").val(),
    time = $('[name="gioSelected"]').val();

  function showTableReceive() {
    receiveAddress.eq(2).children('.js-tab-val').text() === '' ?
      receiveAddress.eq(2).hide() : receiveAddress.eq(2).show();

    $('.table-receive').fadeIn();
    $('.form-receiving').fadeOut();
  }

  function showInfoReceive(address, date, note, time) {

    var tableInfoAddress = receiveAddress, last = $('.js-tab-val:last-child');

    tableInfoAddress.each(function (index) {

      tableInfoAddress.eq(0).find('.js-tab-val:first-child').text(radioReceiving.nameRadio);

      tableInfoAddress.eq(0).find(last).text(address);

      tableInfoAddress.eq(1).find(last).text(`${time}, ${date}`);

      $('.table-receive').find('.js-table-info').eq(2).find('.js-tab-val:last-child').text(note);

      tableInfoAddress.find('.js-table-info').eq(2).find('.js-tab-val:last-child').text().length === 0 ?
        tableInfoAddress.eq(2).hide() : tableInfoAddress.eq(2).show()
    });
  }

  //nhận hàng tại nhà thuốc
  if (listTab[0] === itemTabs) {
    showInfoReceive(radioReceiving.nameAddress, date, note1, time);
    showTableReceive();
  }

  //giao hàng tận nơi
  if (listTab[1] === itemTabs) {
    var buttonCity = $('.select__region_city .dropdown-button');

    buttonDistrict = $('.select__region_district .dropdown-button');

    buttonWard = $('.select__region_ward .dropdown-button');

    var nameCity = buttonCity.find('span').text().trim();

    nameDistrict = buttonDistrict.find('span').text().trim();

    nameWard = buttonWard.find('span').text().trim();

    nameAddress = $('#tab2 .form-group .form-input').val();

    let infoReceive = `${nameAddress}, ${nameWard}, ${nameDistrict}, ${nameCity}`;

    receiveAddress.eq(2).children('.js-tab-val').text() === '' ?
      receiveAddress.eq(2).hide() : receiveAddress.eq(2).show();

    if (!$('.select__region_ward .dropdown-button').attr('data-city') === '') {
      infoReceive = `${nameAddress}, ${nameDistrict}, ${nameCity}`;
    }

    showInfoReceive(infoReceive, date, note2, time);

    if (nameAddress.length === 0) {
      $('#tab2 .form-group input').addClass('is-invalid');
    }

    if (nameAddress.length != 0 && buttonWard.attr('data-city') != '') {
      $('.table-receive').fadeIn();
      $('.form-receiving').slideUp();
    }
  }
}

//ẩn hình thức thanh toán
var resetBlockReceiving = () => {
  //payment
  var formPayments = $('.cart-bottom__payments'),
    itemPayments = $('.cart-bottom__payments .radio.checked');

  formPayments.hide();
  itemPayments.removeClass('checked');
  hideResetBlockLocation();

  $('#tab2 .form-group input').removeClass('is-invalid');
}

//hình thức thanh toán
function formPayment() {
  var itemPayment = $('.cart-bottom__payments .radio');

  itemPayment.click(function (e) {
    infoUser();
    getAddressUser();
  });

}
function isInvalidCity(tokenCity) {
  $('.dropdown-city').each(function (key, item) {
    var dropdownButton = $(this).children('.dropdown-button');

    if ($('.js-tabs.active').attr('data-tab') === 'tab2') {
      dropdownButton.attr('data-city') === '' ?
        $(this).children('.dropdown-button').addClass('is-invalid')
        :
        $(this).children('.dropdown-button').removeClass('is-invalid')
    } else {

      // (tokenCity === '') && $(this).children('.dropdown-button').addClass('is-invalid');
    }

  });
}
//input nhập địa chỉ
function formInputAdress() {
  var nameAddress = $('#tab2 .form-group .form-input').val();

  if (nameAddress.length === 0) {
    $('#tab2 .form-group input').addClass('is-invalid');
  }

}
//submit
function submitCart() {

  //formUser()
  var formUser = ('.cart-bottom__form');

  //formAddress
  var selectCity = $('.dropdown-city');
  let listTab = ["tab1", "tab2"];

  var tabReceving = $('.js-cart-tabs'),
    radioReceiving = $('.js-cart-tabs .radio'),
    isCheckedRadioAddress = radioReceiving.is('.checked');

  var buttonFinal = $('.js-final');

  buttonFinal.click(function () {
    //nhận hàng tại nhà thuốc
    var cartTabs = $('.js-cart-tabs'),
      itemTabs = $('.js-tabs.active').attr('data-tab'),
      isCheckedItemTabs = $('.js-tabs.active').is('.active');
    isVisible = $('.form-receiving').is(':visible');
    console.log(itemTabs);
    var attrDropdownCity = $('.dropdown-city .dropdown-button').attr('data-city');
    nameAddress = $('#tab2 .form-group .form-input').val();

    var isAlert = $('.is-alert');
    // alertLabelText = $('.is-alert span').text('Thông tin bắt buộc');

    // nhận hàng tại nhà thuốc
    var listTab0 = () => {
      if (listTab[0] === itemTabs) {
        var addressInner = $('.feature__location-inner'),
          addressItem = $('.address-item .radio');

        (!addressItem.is('.checked')) && addressInner.addClass('is-invalid');

      }
    }

    //giao hàng tận nơi
    var listTab1 = () => {
      if (listTab[1] === itemTabs) {

      }
    }

    alertErrFormUser();

    addClassValidate();

    formValidateUser();

    if (isCheckedRadioAddress) {
      tabReceving.addClass('is-invalid')
    }

    if (isVisible) {
      formInputAdress();

      getInfoFormUser('.form-receiving');

      (!isCheckedItemTabs) && cartTabs.addClass('is-invalid');

      isInvalidCity(attrDropdownCity);

      listTab0();

      listTab1();

      var isCheckedItemPayments = formPaymentsCheckForm.find('.radio').is('.checked');

      (!isCheckedItemPayments) && formPaymentsCheckForm.addClass('is-invalid');

    }

  });
}

function buttonEdit() {
  btnEdit.each(function (index) {
    var valuUser, valTable;
    valTable = tabInforUser.find('.js-tab-val');

    var formInputInValidUser = $('.cart-bottom__form .form-input.is-invalid');
    formInputInValidReceiving = $('#tab2 .form-input.is-invalid')

    btnEdit.click(function () {
      var table = $(this).closest('.table'),
        tableReceive = table.find(tabInforUser).children('.js-tab-val');

      if (table.is('.table-user')) {

        cartForm.fadeIn();
        $('.table-user').fadeOut();

        blockUser.eq(0).find('input').focus();
        $(this).closest('.table-user').find(tabInforUser).children('.js-tab-val').text('');
        formInputInValidUser.removeClass('is-invalid');
      }

      if (table.hasClass('table-receive')) {

        tableReceive.text('');
        $('.table-receive').fadeOut();
        $('.form-receiving').fadeIn();
        formInputInValidReceiving.removeClass('is-invalid');
      }

    });
  });
}

function updateFlowCart() {
  // thông tin khách hàng
  var formInfoUser = $('.cart-bottom__form');
  var isChecked = $('.cart-bottom__form .radio.checked');

  //hình thức nhận hàng
  var formReceiving = $('.form-receiving'),
    sectionTPQuan = $('.sectionTPQuan');
  itemTabs = $('.js-tabs');
  blockTabs = $('.tabs');
  blockLocation = $('.location-block');

  var tableUser = $('.table-user');
  let listTab = ["tab1", "tab2"];
  var itemAttrTabs = $('.js-tabs.checked').attr('data-tab');

  var formWard = $('.select__region_ward'),
    formAdress = $('.select__region_ward + .form-group');

  //payment
  var formPayments = $('.cart-bottom__payments');

  blockTabs.hide();
  formWard.hide();
  tableUser.hide();
  formAdress.hide();
  formPayments.hide();
  formReceiving.hide();
  sectionTPQuan.hide();
  blockLocation.hide();

  hideResetBlockLocation();
  dropdownCity();

  eventChangeInputTax();

  buttonEdit();
}

function hideResetBlockLocation() {
  var date = $('.date'), note = $('.note');

  var formWard = $('.select__region_ward'),
    formAdress = $('.select__region_ward + .form-group');
  blockLocation = $('.location-block');
  itemBlockLocation = $('.address-item .checked');

  itemBlockLocation.removeClass('checked');
  blockLocation.hide();
  formWard.hide();
  formAdress.hide();
  date.hide();
  note.hide();
}

function showNoteDate() {
  var date = $('.date'), note = $('.note');
  date.slideDown();
  note.slideDown();
}

//search city
function dropdownSearch() {
  var inputSearchDropdown = $('.js-search');
  inputSearchDropdown.each(function () {
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
        $('.lc-banking .dropdown-menu').removeClass('open');
        filterCity.show();
        banking_filter_city.show();
        btn_close.hide();
        bankingDropdown.removeClass('open');
        banking.removeClass('form-fixed');
      }
    }).on('click', function () {
      if (webTabletMobile) {
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
          dataShortName = $(this).attr('data-short-name') || '';
          $(this).attr('token-filter', `${convertToAscii(bankingName)} ${convertToAscii(dataShortName)}`);
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
      inputSearchDropdown.val('');
      item_city.show();
      $('.js--city-list').children().each(function () {
        $(this).show();
      });
    });

  });
}

// dropdown
var lcDropdown = () => {

  var dropdown = $('.dropdown');

  dropdown.each(function () {
    var _that = $(this);
    var body = $('body');

    var listDropdown = _that.find('.dropdown-menu'),
      itemDropdown = listDropdown.find('.js-dropdown-list a');

    var itemmenu = _that.find('.dropdown-button'),
      search = _that.find('.dropdown-menu');
    input = _that.find('.form-search-input');
    iconClose = search.find('.js-close');

    iconClose.click(function () {
      $(this).closest('.dropdown-menu').removeClass('open');
      body.removeClass('disable-scroll');
    });

    itemmenu.click(function (e) {
      var submenuitem = _that.find('.dropdown-menu');

      $('.dropdown-button').removeClass('active');
      $(this).addClass('active');

      $('.dropdown .dropdown-menu').removeClass('open');
      submenuitem.addClass('open');
    });

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

  $(document).click(function (e) {
    if (!dropdown.is(e.target) && dropdown.has(e.target).length === 0) {
      var isopened = dropdown.find('.dropdown-menu').css('display');
      if (isopened == 'block') {
        dropdown.find('.dropdown-menu').removeClass('open');
        dropdown.find('.dropdown-button').removeClass('active');
      }
    }
  });

  dropdownSearch();
}

function ctaStickyMobile() {
  var width = $(window).width();

  if (width <= 992) {
    var lastKnownScrollPosition = 0;

    browserWindow.scroll(function () {
      var height_ele = $('.cart-cta.sticky-top').position().top;

      $('.cart-cta.sticky-top .cart-cta__btn').hide();
      lastKnownScrollPosition = browserWindow.scrollTop() - 26;
      console.log("heigh_ele", height_ele);
      console.log('lastKnownScrollPosition', lastKnownScrollPosition);
      if (lastKnownScrollPosition > height_ele) {
        $('.cart-cta.sticky-top').addClass('fixed-bottom').removeClass('box-shad-none');
        $('.cart-cta.sticky-top .cart-cta__btn').show();
      } else {
        $('.cart-cta.sticky-top').removeClass('fixed-bottom').addClass('box-shad-none');
      }
    })
  }
}

function vuLoadMoreShop() {
  //load more
  var btn_loadMore = $('.js-loadMore'), batch = 5;;
  var formPayments = $('.cart-bottom__payments');

  $('.feature__location-inner').each(function () {
    var that = $(this), addressItem = that.find('.address-item');
    addressItem.hide();
    addressItem.slice(0, batch).fadeIn();

    var countItemHidden = that.find('.address-item:hidden').length;

    countItemHidden === 0 && $(this).find('.rs-view').css('cssText', 'display : none !important');

    $(this).find(btn_loadMore).children('span').text(parseInt(countItemHidden));

    addressItem.click(function () {
      showNoteDate();
      formPayments.slideDown();
    });

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
function receiving_select_drug() {
  $('.js-expand-location').on('click', function () {
    $('.none-drug, #tab1, #tab1 .location-block, #tab1 .note, #tab1 .date, .block-dropdown-city').show();
    $('.option-location').slideUp();
  });
};
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
function scroll(element) {
  $("html, body").animate({
    scrollTop: $(element).offset().top - 50
  }, 600);
}

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
};

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
};


let initGloBal = () => {
  idConnetcFor();

  vuLoadMoreShop();

  userFocusInput();

  tabReceive();

  updateFlowCart();

  lcDropdown();

  ctaStickyMobile();

  formPayment();

  //button submit cart
  submitCart();

  receiving_select_drug();
}
initGloBal();