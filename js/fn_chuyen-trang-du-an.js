(function($) {
    $(document).ready(function() {
        smoothScroll();
    });
})(window.jQuery);


function smoothScroll() {
    var scrollLink = $('.scroll');

    // Smooth scrolling
    scrollLink.click(function(e) {
        e.preventDefault();
        $('body,html').animate({
        scrollTop: $(this.hash).offset().top - 50
        }, 1000 );
    });

    // Active link switching
    $(window).scroll(function() {
        var scrollbarLocation = $(this).scrollTop();

        scrollLink.each(function() {

        var sectionOffset = $(this.hash).offset().top - 70;

        if ( sectionOffset <= scrollbarLocation ) {
            $(this).parent().addClass('active');
            $(this).parent().siblings().removeClass('active');
        }
        })

    })
}
