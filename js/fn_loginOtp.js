
/****  Define all selector ****/
const input_phone = document.querySelector('input[name="phoneOtp"]');
const error_text = document.querySelector('input[name="phoneOtp"] + .alert span');
const confirm_btn = document.querySelector('.js-check-phone');
const send_otp = document.querySelector('.js-send-otp');
const change_phone = document.querySelector('.js-change-back');
const modal_phone = document.querySelector('#dangnhapsodienthoai');
const modal_code = document.querySelector('#dangnhapotp');
const inputs = document.querySelectorAll('.otp__item > .input-control');

const event_click = new Event('click');
const intRegex = /\d+/g;

/** Method and event **/

// validate phone otp
function detect_phoneChange(number) {
  var split_number = parseInt(number.slice(0, 2));
  console.log(split_number);
  var vnf_regex = /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/g;

  if (split_number === 02) {
    input_phone.setAttribute("maxlength", "11");
  } else {
    input_phone.setAttribute("maxlength", "10");
  }
  return vnf_regex.test(number);

};

function onFocusInputSuccess() {
  setTimeout(() => {
    $('.input-control').parent().removeClass('complete');
    inputs[0].focus();
    inputs[0].parentElement.classList.add('complete');
  }, 300);
}

function validate_phone(e) {
  var value_phone = this.value;

  if (intRegex.test(value_phone)) {
    this.value = this.value.replace(/\D/g, '');
  }

  if (!detect_phoneChange(value_phone) && this.value.length >= 1) {
    this.classList.add('is-invalid');
    error_text.innerHTML = 'Số điện thoại không hợp lệ';
    confirm_btn.classList.add('disable');
  } else {
    this.classList.remove('is-invalid');
    error_text.innerHTML = "";
    confirm_btn.classList.remove('disable');
    if (e.which == 13) {
      confirm_btn.dispatchEvent(event_click);
      onFocusInputSuccess();
      return false;
    }
  }
};

function eventClickConfirm() {
  if (input_phone.value.length === 0) {
    input_phone.classList.add('is-invalid');
    error_text.innerHTML = "Thông tin bắt buộc";
    this.classList.add('disable');
  } else {
    modal_phone.classList.remove('modal--is-visible');
    modal_code.classList.add('modal--is-visible');
    onFocusInputSuccess();
  }
};


// Control event otp
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('keydown', function (event) {
    if (event.key === "Backspace") {
      if (inputs[i].value == '') {
        inputs[i].parentElement.classList.remove('complete');
        if (i > 0) {
          inputs[i - 1].focus();
        }
      } else {
        inputs[i].value = '';
        inputs[i].parentElement.classList.remove('complete');
        inputs[i].classList.remove('is-invalid');
      }
    };

    if (event.key === "ArrowLeft" && i !== 0) {
      inputs[i - 1].focus();
    };

    if (event.key === "ArrowRight" && i !== inputs.length - 1) {
      inputs[i + 1].focus();
    };

    if (event.key != "ArrowLeft" && event.key != "ArrowRight") {
      inputs[i].setAttribute("type", "text");
      inputs[i].value = ''; // Bug Fix: allow user to change a random otp digit after
    };
  });

  inputs[i].addEventListener('input', function () {
    var parent = this.parentElement;

    if (!intRegex.test(this.value)) {
      this.value = this.value.replace(/\D/g, '');
    }

    if (i === inputs.length - 1 && inputs[i].value !== '') {
      inputs[i].blur();
      return false;
    } else if (!inputs[i].value == '') {
      inputs[i + 1].focus();
      inputs[i + 1].parentElement.classList.add('complete');
      parent.classList.add('complete');
    }
  });



};

// handle timer
function handle_countdown() {
  function startCountdown(seconds) {
    let counter = seconds;
    let timer = document.getElementById('timer');

    timer.style.display = "inline"

    const interval = setInterval(() => {
      timer.innerText = ` (sau ${counter} giây)`;
      counter--;

      if (counter < 0) {
        clearInterval(interval);
        send_otp.classList.remove('disable')
        timer.remove();
      }
    }, 1000);

    $(document).on('click', '.js-modal-close', function (e) {
      clearInterval(interval);
      $('#timer').text('');
      $('.js-send-otp').removeClass('disable');
    });

    $(document).on('click', '.modal-otp', function (e) {
      if ($(this).is(e.target) && $(this).has(e.target).length === 0) {
        clearInterval(interval);
        $('#timer').text('');
        $('.js-send-otp').removeClass('disable');
      }
    });
  };

  $('.js-change-back').click(function () {
    $('#dangnhapotp').removeClass('modal--is-visible');
    $('#dangnhapsodienthoai').addClass('modal--is-visible');
    $('.input-control').val('');
    $('.input-control').parent().removeClass('complete');
    setTimeout(function () { $('input[name="phoneOtp"]').val('').focus() }, 500);
  });

  $('.js-send-otp').click(function () {
    var html_timer = "<span id='timer' class='txt-primary-700'></span>";
    $('.input-control').val('').parent().removeClass('complete');
    onFocusInputSuccess();
    $(this).addClass('disable');
    $(this).append(html_timer);
    startCountdown(60);
  });
}

handle_countdown();

/*** Binding event to element **/
input_phone.addEventListener('keyup', validate_phone);
input_phone.addEventListener('keydown', validate_phone);
input_phone.addEventListener('keypress', validate_phone);
confirm_btn.addEventListener('click', eventClickConfirm);


// Modal Event

function otpModalEvent() {
  var previousScrollY = 0;
  // click button
  $(document).on('click', '.js-open-otp', function (e) {

    previousScrollY = window.scrollY;

    $('html').css({

      marginTop: -previousScrollY,

    }).addClass('disable-scroll-safari');

    $('#' + $(this).attr('aria-controls')).addClass('modal--is-visible');
    $('.lc__side-menu').removeClass('show');
  });

  function enableScroll() {
    $('html').css({ marginTop: 0 }).removeClass('disable-scroll-safari');

    $('.modal-otp.js-modal-otp').removeClass('modal--is-visible');

    window.scrollTo(0, previousScrollY);
  }

  $(document).on('click', '.modal-otp .js-modal-close', function (e) {
    enableScroll();
  });

  function outside_remove_scroll(e) {
    if ($('.modal.modal-otp').is(e.target) && $('.modal.modal-otp').has(e.target).length === 0) {
      enableScroll();
    }
  }

  //click outside
  // $(document).on('click', '.modal-otp', function (e) {
  //   console.log(1111);
  //   outside_remove_scroll(e);
  // });



};

otpModalEvent();