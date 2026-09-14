import Menu from "./menu.js";

export default class Dropdown {

    dropdownElement;

    toggleElement;

    menu;

    collapsed;

    constructor(dropdownElement) {
        this.dropdownElement = dropdownElement;
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
        this.menu = new Menu(this.dropdownElement.querySelector('.dropdown-menu'), menuItem => {
            this.setToggleContent(menuItem.getContent());
            this.setToggleActioned();
            setTimeout(() => {
                this.collapse();
            }, 200);
        });
        this.collapse();
    }

    setToggleContent(content) {
        this.toggleElement.textContent = content;
    }

    setToggleActioned() {
        this.toggleElement.classList.add('actioned');
    }

    expand() {
        this.menu.show();
        this.collapsed = false;
    }

    collapse() {
        this.menu.hide();
        this.collapsed = true;
    }

    toggle() {
        if (this.collapsed) {
            this.expand();
            return;
        }
        this.collapse();
    }

}