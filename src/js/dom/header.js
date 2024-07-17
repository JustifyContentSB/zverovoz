export default () => {
    $('.header__burger').on('click', function (e) {
        e.preventDefault();

        $('.header').toggleClass('is-active');
        $('body').toggleClass('no-scroll');
    });

    const $document = $(document),
        $header = $('.header'),
        className = 'is-fixed';

    let scrollSize = 200;

    if ($(window).width() < 1331 && $(window).width() > 1199) {
        scrollSize = 20;
    } else if ($(window).width() < 1200 && $(window).width() > 575) {
        scrollSize = 16;
    } else {
        scrollSize = 18;
    }

    $document.scroll(function () {
        if ($document.scrollTop() >= scrollSize) {
            $header.addClass(className);
        } else {
            $header.removeClass(className);
        }
    });
};
