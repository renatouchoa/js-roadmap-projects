import Menu from "./menu.js";

export default class Dropdown {

    dropdownElement;

    toggleElement;

    menu;

    state;

    constructor(dropdown) {
        this.dropdownElement = dropdown;
        this.fetchToggle();
        this.fetchMenu();
    }

    fetchToggle() {
        this.toggleElement = this.dropdownElement.querySelector('.dropdown-toggle');
        this.toggleElement.addEventListener('click', e => {
            e.stopPropagation();
            this.toggle();
        });
        this.toggleElement.addEventListener('focusout', e => {
            setTimeout(e => {
                this.collapse();
            }, 200);
        });
    }

    fetchMenu() {
        this.menu = new Menu(this.dropdownElement.querySelector('.dropdown-menu'));
        this.collapse();
    }

    expand() {
        this.menu.show();
        this.state = 'expanded';
    }

    collapse() {
        this.menu.hide();
        this.state = 'collapsed';
    }

    toggle() {
        if (this.state === 'expanded') {
            this.collapse();
            return;
        }
        this.expand();
    }

}