import { Fancybox } from '@fancyapps/ui';

import Component from './component';

const title = 'Fancybox';

const l10n = {
    CLOSE: 'Закрыть',
    NEXT: 'Вперед',
    PREV: 'Назад',
    MODAL: 'Вы можете закрыть модальное окно нажатием клавиши ESC',
    ERROR: 'Произошла ошибка, попробуйте позже',
    IMAGE_ERROR: 'Ошибка при загрузке изображения',
    ELEMENT_NOT_FOUND: 'Ошибка при загрузке контента',
    AJAX_NOT_FOUND: 'Элемент не найден',
    AJAX_FORBIDDEN: 'Доступ к элементу запрещен',
    IFRAME_ERROR: 'Ошибка при загрузке страницы',
    TOGGLE_SLIDESHOW: 'Переключить слайд-шоу',
    TOGGLE_THUMBS: 'Переключить миниатюры',
    ZOOMIN: 'Увеличить',
    ZOOMOUT: 'Уменьшить',
};

const defaults = {
    autoFocus: false,
    dragToClose: false,
    closeSelector: '[data-close]',
    Carousel: {
        infinite: false,
    },
    Toolbar: {
        display: {
            left: ['infobar'],
            middle: ['zoomIn', 'zoomOut'],
            right: ['slideshow', 'thumbs', 'close'],
        },
    },
    Images: {
        zoom: false,
    },
    l10n,
};

export default class _Fancybox extends Component {
    static closeSelectors = [];

    constructor(...args) {
        super(title, defaults, ...args);

        this.init();
    }

    validate() {
        const { selector, warning } = this;

        if (typeof selector !== 'string') {
            warning.show('Неверный тип селектора!');

            return false;
        }

        return true;
    }

    init() {
        const { selector, options, close, validate } = this;
        const { closeSelector } = options;

        if (!super.validate(validate)) {
            return;
        }

        Fancybox.bind(selector, options);

        if (closeSelector && !_Fancybox.closeSelectors.includes(closeSelector)) {
            $(document).on('click', closeSelector, (e) => {
                e.preventDefault();

                close();
            });

            _Fancybox.closeSelectors.push(closeSelector);
        }
    }

    close = () => Fancybox.close();

    open = (id) => {
        const { close, options } = this;

        const src = `#modal-${id}`;

        if ($(src).length) {
            close();

            Fancybox.show(
                [
                    {
                        src,
                    },
                ],
                options,
            );
        }
    };
}
