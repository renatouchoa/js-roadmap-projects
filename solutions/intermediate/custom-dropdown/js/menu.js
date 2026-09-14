class MenuItem {

    element;

    content = '';

    selected = false;

    constructor(menuItemElement, actionFn) {
        this.element = menuItemElement;
        this.setUnselected();
        this.content = this.element.textContent;
        this.element.addEventListener('click', e => {
            e.stopPropagation();
            actionFn(this);
        });
    }

    setSelected() {
        this.selected = true;
        this.element.classList.add('selected');
    }

    setUnselected() {
        this.selected = false;
        this.element.classList.remove('selected');
    }

    getContent() {
        return this.content;
    }

}

export default class Menu {

    menuElement;

    selectedMenuItem;

    menuItems = [];

    constructor(menuElement, actionFn) {
        this.menuElement = menuElement;
        const menuItemElements = this.menuElement.getElementsByTagName('li');
        for (const menuItemElement of menuItemElements) {
            const menuItem = new MenuItem(menuItemElement, menuItem => {
                this.select(menuItem);
                actionFn(menuItem);
            });
            this.menuItems.push(menuItem);
        }
    }

    select(menuItemActioned, actionFn) {
        this.menuItems.forEach(menuItem => {
            if (menuItem === menuItemActioned) {
                this.selectedMenuItem = menuItemActioned;
                menuItem.setSelected();
                return;
            }
            menuItem.setUnselected();
        });
    }

    show() {
        this.menuElement.hidden = false;
    }

    hide() {
        this.menuElement.hidden = true;
    }

}