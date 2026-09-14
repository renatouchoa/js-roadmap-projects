class MenuItem {

}

export default class Menu {

    menuElement;

    constructor(menuElement) {
        this.menuElement = menuElement;
    }

    show() {
        this.menuElement.hidden = false;
    }

    hide() {
        this.menuElement.hidden = true;
    }

}