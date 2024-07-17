import $ from 'jquery';

import './polyfills';

import Preload from './components/preload';

/* if:fancybox */
import Fancybox from './components/fancybox';
/* /if:fancybox */

/* if:lozad */
import LazyLoad from './components/lazyLoad';
/* /if:lozad */

/* if:simplebar */
import Scrollbar from './components/scrollbar';
/* /if:simplebar */

/* if:swiper */
import Swiper from './components/swiper';
/* /if:swiper */

/* if:tippy */
import Tooltip from './components/tooltip';
/* /if:tippy */

/* if:mask */
import Phone from './components/phone';
/* /if:mask */

/* if:datepicker */
import Datepicker from './components/datepicker';
/* /if:datepicker */

import Select from './components/select';

import Accordion from './components/accordion';

import Tabs from './components/tabs';

window.$ = window.jQuery = $;

$(function () {
    new Preload('[data-preload]');

    /* if:fancybox */
    new Fancybox('[data-fancybox]');
    /* /if:fancybox */

    /* if:lozad */
    new LazyLoad('[data-src], [data-background-image]');
    /* /if:lozad */

    /* if:simplebar */
    new Scrollbar('[data-scrollbar]');
    /* /if:simplebar */

    /* if:swiper */
    new Swiper('[data-swiper]', {
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
            992: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 3,
            },
        },
    });
    /* /if:swiper */

    /* if:tippy */
    new Tooltip('[data-tooltip]');
    /* /if:tippy */

    /* if:mask */
    new Phone('[data-phone]');
    /* /if:mask */

    /* if:datepicker */
    new Datepicker('[data-datepicker]');
    /* /if:datepicker */

    new Select('[data-select]');

    new Accordion('[data-accordion]');

    new Tabs('[data-tabs]');
});
