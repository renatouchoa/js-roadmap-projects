export default class Icon {

    static #ICON_SET = {
        'default': 'file-code',
        'javascript': 'javascript',
        'java': 'filetype-java',
        'css': 'css',
        'markdown': 'filetype-md',
        'python': 'filetype-py',
        'ruby': 'filetype-rb',
        'sql': 'filetype-sql',
        'xml': 'filetype-xml',
        'html': 'filetype-html',
        'star': 'star',
        'fork': 'shuffle',
        'issue': 'exclamation-circle',
        'watching': 'eye',
    }

    static build(icon) {
        icon = icon.toLowerCase();
        const iconElement = document.createElement('i');
        const className = this.#ICON_SET[icon] || this.#ICON_SET['default'];
        iconElement.className = `bi bi-${className}`;
        return iconElement;
    }

}