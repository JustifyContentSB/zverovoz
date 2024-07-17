import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { CSSPlugin } from 'gsap/CSSPlugin';

export default () => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(CSSPlugin);

    if ($(window).width() > 767) {
        let tlFirst = gsap.timeline({
            scrollTrigger: '.work__list',
        });

        gsap.utils.toArray('.work__item--first').forEach((item, index) => {
            tlFirst.fromTo(
                item,
                {
                    y: 200,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'slow(0.7, 0.7, false)',
                    onComplete: function () {
                        item.classList.add('is-active');
                    },
                },
                index * 0.3,
            );
        });

        // Анимация для .work__item--secondary
        let tlSecondary = gsap.timeline({
            scrollTrigger: {
                trigger: '.work__list',
                start: 'top top',
            },
        });

        gsap.utils.toArray('.work__item--secondary').forEach((item, index) => {
            tlSecondary.fromTo(
                item,
                {
                    y: 200,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'slow(0.7, 0.7, false)',
                    onComplete: function () {
                        item.classList.add('is-active');
                    },
                },
                index * 0.3,
            );
        });

        gsap.fromTo(
            '.restrictions__item',
            {
                y: 200,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                scrollTrigger: {
                    trigger: '.section--restrictions .section__header',
                    start: 'bottom bottom',
                },
                stagger: 0.3,
                ease: 'slow(0.7,0.7,false)',
            },
        );
    }

    function transportationImgAnimation() {
        gsap.fromTo(
            '.transportation__img',
            {
                x: -200,
                opacity: 0,
            },
            {
                x: 0,
                opacity: 1,
                duration: 0.5,
                scrollTrigger: {
                    trigger: '.transportation__middle',
                    start: 'center center',
                },
            },
        );
    }

    if ($(window).width() > 991) {
        transportationImgAnimation();

        $('.transportation__tabs-btn').on('click', function () {
            transportationImgAnimation();
        });
    }
};
