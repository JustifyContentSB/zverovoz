export default () => {
    $(document).ready(function () {
        const { swiper } = window.swipers.routes;
        const swiperCities = window.swipers.cities.swiper;

        function toggleRoutesTabs() {
            const activeSlide = $(swiper.slides[swiper.activeIndex]);
            const locationAttr = activeSlide.find('.routes__slide').attr('data-location');

            const routesTabsBtn = $('.routes__tabs-btn[data-location="' + locationAttr + '"]');

            $('.routes__tabs-btn').removeClass('is-active');
            $(routesTabsBtn).addClass('is-active');
        }

        toggleRoutesTabs();

        $('.routes__tabs-btn').on('click', function (e) {
            e.preventDefault();

            $('.routes__tabs-btn').removeClass('is-active');
            $(this).addClass('is-active');

            const location = $(this).attr('href').replace('#', '');

            const swiperSlide = $('.routes__slide[data-location="' + location + '"]')
                .parent()
                .index();

            const swiperCitiesSlide = $('.cities__slide[data-location="' + location + '"]')
                .parent()
                .index();

            if (swiper) {
                swiper.update();
                swiperCities.update();
                swiper.slideTo(swiperSlide);
                swiperCities.slideTo(swiperCitiesSlide);
            }
        });

        $('.routes').on('click', '.swiper-control', function () {
            const clickedElement = $(this);

            if (clickedElement.hasClass('swiper-control--prev')) {
                swiperCities.slidePrev();
            } else if (clickedElement.hasClass('swiper-control--next')) {
                swiperCities.slideNext();
            }

            toggleRoutesTabs();
        });

        swiper.on('slideChange', function () {
            toggleRoutesTabs();
        });
    });
};
