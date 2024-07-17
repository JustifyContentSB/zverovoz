export default () => {
    $('.transportation__tabs-btn').on('click', function (e) {
        e.preventDefault();
        const id = $(this).attr('href').replace('#', '');

        $('.transportation__tabs-item').removeClass('is-active');
        $(this).parent().addClass('is-active');

        $('.transportation__item').removeClass('is-active');
        $('.transportation__item#' + id).addClass('is-active');
    });
};
