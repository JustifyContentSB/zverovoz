export default class {
    constructor(name) {
        this.name = name;
    }

    show = (message, e) => {
        const { name } = this;

        let text = name ? `%c[${name}]: %c${message}` : `%c${message}`;
        let styles = name ? ['font-weight: bold; color: red;', ''] : [''];

        if (e) {
            text += `\n%c${e}`;
            styles.push('');
        }

        // eslint-disable-next-line
        console.log(text, ...styles);
    };
}
