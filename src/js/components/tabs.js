import Component from './component';

const title = 'Tabs';

const defaults = {};

export default class Tabs extends Component {
    constructor(...args) {
        super(title, defaults, ...args);

        if (Tabs.instance) {
            return Tabs.instance;
        }

        Tabs.instance = this;

        this.init();
    }

    init() {
        super.initHandlers({
            click: {
                link: this.onLinkClick,
            },
        });
    }

    onLinkClick(e) {
        const { target: el } = e;

        const href = $(el).attr('href');
        const $target = $(href);

        e.preventDefault();

        if ($target.length) {
            $(el).parent().addClass('is-active').siblings().removeClass('is-active');
            $target.addClass('is-active').siblings().removeClass('is-active');
        }
    }
}
