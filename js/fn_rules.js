$(function () {
  $(document).ready(function () {
    $('.js-rule li').click(function () {
      $('.js-rule li').removeClass('active');
      $(this).addClass('active');
    });

    $(document).on("click", "[to-scroll]", function (e) {
      e.preventDefault();
      var link = $(this).attr("to-scroll");
      if ($(link).length > 0) {
        var position = $(link).offset().top - 50;
        $("body,html").animate(
          {
            scrollTop: position,
          },
          1000
        );
      }
    });
  });
});
