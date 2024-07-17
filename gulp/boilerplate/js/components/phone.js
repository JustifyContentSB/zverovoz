import IMask from 'imask';

import Component from './component';

const title = 'Phone';

const defaults = {
    masks: [
        {
            mask: '8 (000) 000-00-00',
            startsWith: '8',
            maxLength: 11,
        },
        {
            mask: '+7 (000) 000-00-00',
            startsWith: ['+', '9'],
            maxLength: 12,
        },
        {
            mask: '+7 (000) 000-00-00',
        },
    ],
    maskOptions: {
        lazy: false,
    },
};

export default class extends Component {
    constructor(...args) {
        super(title, defaults, ...args);

        this.init();
    }

    init() {
        super.init((el) => {
            const {
                options: { masks, maskOptions },
            } = this;

            const mask = IMask(el, {
                mask: masks,
                ...maskOptions,
            });

            $(el).on('blur', (e) => {
                const { isComplete } = mask.masked;

                if (!isComplete) {
                    $(e.target).val('');
                }
            });
        });
    }
}
