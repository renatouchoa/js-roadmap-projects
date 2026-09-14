import Dropdown from "./dropdown.js";

const dropdowns = [];

window.addEventListener('load', e => {
    const dropdownsElements = document.getElementsByClassName('dropdown');
    for (const d of dropdownsElements) {
        dropdowns.push(new Dropdown(d));
    }
});