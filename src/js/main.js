import $ from 'jquery';
import 'jquery-validation';

import './polyfills';

import Preload from './components/preload';

import Fancybox from './components/fancybox';

import LazyLoad from './components/lazyLoad';

import Scrollbar from './components/scrollbar';

import Swiper from './components/swiper';

import Tooltip from './components/tooltip';

import Phone from './components/phone';

import Datepicker from './components/datepicker';

import Select from './components/select';

import Accordion from './components/accordion';

import Tabs from './components/tabs';

window.$ = window.jQuery = $;

import buildHeaderLayout from './dom/header';
import buildHeaderScrollLayout from './dom/headerScroll';
import buildAnimationsLayout from './dom/animations';
import buildValidationLayout from './dom/validation';
import buildTransportationLayout from './dom/transportation';
import buildRoutesLayout from './dom/routes';
import buildSecondaryLayout from './dom/secondary';

$(function () {
    buildHeaderLayout();
    buildHeaderScrollLayout();
    buildAnimationsLayout();
    buildValidationLayout();
    buildTransportationLayout();
    buildRoutesLayout();
    buildSecondaryLayout();

    new Preload('[data-preload]');

    const fancybox = new Fancybox('[data-fancybox]');

    $.fn.modal = fancybox.open;
    $.fn.modalClose = fancybox.close;

    new LazyLoad('[data-src], [data-background-image]');

    new Scrollbar('[data-scrollbar]');

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

    new Tooltip('[data-tooltip]');

    new Phone('[data-phone]');

    new Datepicker('[data-datepicker]');

    new Select('[data-select]');

    new Accordion('[data-accordion]');

    new Tabs('[data-tabs]');

    $('.modal__close').on('click', function (e) {
        e.preventDefault();
        const modalId = $(this).closest('.modal').attr('id');
        fancybox.close(modalId);
    });
});
