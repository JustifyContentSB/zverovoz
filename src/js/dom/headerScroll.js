export default () => {
    $(document).ready(function () {
        const menuLinks = $('.header__nav-link');
        const headerHeight = $('.header').height();

        function isSectionAtTop(sectionId) {
            const section = $('#' + sectionId);
            if (section) {
                const sectionTop = section.offset().top;
                const windowTop = $(window).scrollTop();

                return sectionTop <= windowTop + headerHeight + 30;
            }
        }

        function updateMenu() {
            menuLinks.each(function () {
                const link = $(this);
                const sectionId = link.attr('href').replace('#', '');
                if (sectionId) {
                    if (isSectionAtTop(sectionId)) {
                        link.addClass('is-active');
                    } else {
                        link.removeClass('is-active');
                    }
                }
            });
        }

        function removeActiveClassIfScrolledPast(sectionId) {
            const section = $('#' + sectionId);
            const sectionBottom = section.offset().top + section.outerHeight();
            const windowTop = $(window).scrollTop();

            if (sectionBottom < windowTop + headerHeight) {
                const link = $('a[href="#' + sectionId + '"]');
                link.removeClass('is-active');
            }
        }

        updateMenu();
        $(window).scroll(function () {
            updateMenu();
            menuLinks.each(function () {
                const sectionId = $(this).attr('href').replace('#', '');
                if (sectionId) {
                    removeActiveClassIfScrolledPast(sectionId);
                }
            });
        });
    });
};
