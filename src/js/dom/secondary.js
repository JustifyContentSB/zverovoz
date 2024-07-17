export default () => {
    $('[name="form-date"]').on('focus', function () {
        $(this).addClass('focused');
    });

    $('.header__nav-link').on('click', function () {
        $('body').removeClass('no-scroll');
        $('.header').removeClass('is-active');
    });
};
