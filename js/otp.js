$(function () {
  $(document).ready(function () {

    $.ajaxSetup({ headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') } });


    $('body').off('click', '.btnSendOTP').on('click', '.btnSendOTP', function (e) {
      e.preventDefault();

      if ($('input[name = "phoneOtp"]').val().length == 0) {
        input_phone.classList.add('is-invalid');
        error_text.innerHTML = "Thông tin bắt buộc";
      } else {
        $('#dangnhapsodienthoai').removeClass('modal--is-visible');
        $('#dangnhapotp').addClass('modal--is-visible');
      }

      var that = $(this);
      that.prop("disabled", true);
      $('#codeBox1').val('');
      $('#codeBox2').val('');
      $('#codeBox3').val('');
      $('#codeBox4').val('');
      $('#codeBox5').val('');
      $('#codeBox6').val('');
      $('.inputOTP').removeClass('is-invalid');
      $('.alertOTP').hide();
      var that = $(this), data = {}, parent = that.parent(), ans = parent.parent().parent(), opt = {};

      data.phoneNumber = $('#phoneNumber').val();
      console.log("Data", data);
      $('.phoneSpan').html(data.phoneNumber);

      opt.method = "GET";
      opt.success = function (res, that, formData) {
        console.log(res);

      };

      opt.complete = function (data) {
        that.prop("disabled", false);
      };

      opt.error = function (jqXHR, exception) {

      };

      sendSer('/otp/sendVerification', data, that, opt);


    });


    $('body').off('click', '.btnLogin').on('click', '.btnLogin', function (e) {
      e.preventDefault();
      var that = $(this), data = {}, parent = that.parent(), ans = parent.parent().parent(), opt = {};

      var otpCode = $('#codeBox1').val() + $('#codeBox2').val() + $('#codeBox3').val() + $('#codeBox4').val() + $('#codeBox5').val() + $('#codeBox6').val();

      that.prop("disabled", true);
      that.html("ĐANG XỬ LÝ");
      $('.inputOTP').removeClass('is-invalid');
      $('.alertOTP').hide();
      data.phoneNumber = $('#phoneNumber').val();
      data.otpCode = otpCode;

      opt.method = "GET";
      opt.success = function (res, that, formData) {
        console.log(res);

        // thành công
        if (res.code == 0) {

          $('html').removeClass('disable-scroll-safari');
          $('.js-modal').removeClass('modal--is-visible');
          // redirect page
          window.location.replace("/profile");
          return;
        }

        // thất bại
        if (res.code == 1) {
          $('.inputOTP').removeClass('complete');
          $('.alertOTP').find('.alertMessage').html(res.message);
          $('.alertOTP').show();
          $('.inputOTP').addClass('is-invalid');
          that.prop("disabled", false);
          that.html("XÁC NHẬN");

        }
      };

      opt.complete = function (data) {

      };

      opt.error = function (jqXHR, exception) {
        that.prop("disabled", false);
        that.html("XÁC NHẬN");
      };

      sendSer('/otp/login', data, that, opt);
    });

    $('body').off('click', '.btnReSendOTP').on('click', '.btnReSendOTP', function (e) {
      e.preventDefault();
      $('.inputOTP').removeClass('is-invalid');
      var that = $(this), data = {}, parent = that.parent(), ans = parent.parent().parent(), opt = {};

      $('#codeBox1').val('');
      $('#codeBox2').val('');
      $('#codeBox3').val('');
      $('#codeBox4').val('');
      $('#codeBox5').val('');
      $('#codeBox6').val('');

      $('.alertResendOTP').show();
      $('.alertOTP').hide();

      data.phoneNumber = $('#phoneNumber').val();
      $('.phoneSpan').html(data.phoneNumber);

      opt.method = "GET";
      opt.success = function (res, that, formData) {
        console.log(res);
      };

      opt.complete = function (data) {

      };

      opt.error = function (jqXHR, exception) {

      };

      sendSer('/otp/sendVerification', data, that, opt);
    });




  });

});