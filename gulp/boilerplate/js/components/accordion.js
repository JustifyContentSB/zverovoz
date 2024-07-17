import Component from './component';

const title = 'Accordion';

const defaults = {
    duration: 300,
};

export default class extends Component {
    constructor(...args) {
        super(title, defaults, ...args);

        this.init();
    }

    init() {
        super.initHandlers({
            click: {
                title: this.onTitleClick,
            },
        });
    }

    onTitleClick(e) {
        e.preventDefault();

        const { target: el } = e;
        const { toggle } = this;

        toggle(el);
    }

    getElements = (el) => {
        const { parseDataSelector } = this;

        const { selector } = parseDataSelector();
        const { selector: itemSelector } = parseDataSelector('item');
        const { selector: contentSelector } = parseDataSelector('content');

        const $root = $(el).is(selector) ? $(el) : $(el).closest(selector);
        const $item = $(el).closest(itemSelector);
        const $content = $item.find(contentSelector);
        const $siblings = $item.siblings();
        const $siblingsContent = $siblings.find(contentSelector);

        return {
            $root,
            $item,
            $content,
            $siblings,
            $siblingsContent,
        };
    };

    show = (el) => {
        const { options, parseDataSelector, getElements } = this;
        const { duration } = options;
        const { attr: activeAttr } = parseDataSelector('active');
        const { $item, $content, $siblings, $siblingsContent } = getElements(el);

        $content.slideDown(duration, () => {
            $siblings.removeClass('is-active');
        });

        $item.data('active', true).attr(activeAttr, '');
        $siblings.data('active', false).attr(activeAttr, null);

        $siblingsContent.slideUp(duration);
    };

    hide = (el) => {
        const { options, parseDataSelector, getElements } = this;
        const { duration } = options;
        const { attr: activeAttr } = parseDataSelector('active');
        const { $item, $content } = getElements(el);

        $content.slideUp(duration, () => {
            $item.removeClass('is-active');
        });

        $item.data('active', false).attr(activeAttr, null);
    };

    toggle = (el) => {
        const { getElements, show, hide } = this;
        const { $item } = getElements(el);

        if ($item.data('active') || $item.hasClass('is-active')) {
            hide(el);
        } else {
            show(el);
        }
    };
}
