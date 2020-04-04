$(document).ready(function() {

    $('.main_btna, .main_btn, a[href="#sheldure"]').on('click', function() {
        $('.overlay').animate({
            opacity: 'toggle'
        }, 500);

        $('.modal').slideDown(500);
    });

    $('.close').on('click', function() {
        $('.overlay').animate({
            opacity: 'toggle'
        }, 500);

        $('.modal').slideUp(500);
    });
});