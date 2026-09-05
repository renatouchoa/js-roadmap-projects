function activate(accordion, tabTarget) {
    const tabs = accordion.getElementsByClassName('accordion-tab');
    for(let tab of tabs) {
        if (tab === tabTarget) {
            if (tab.classList.contains('active')) {
                tab.classList.remove('active');
            } else {
                tab.classList.add('active');
            }
        } else {
            tab.classList.remove('active');
        }
    }
}

window.addEventListener('load', (e) => {
    const accordions = document.getElementsByClassName('accordion');
    for (let accordion of accordions) {
        const tabs = accordion.getElementsByClassName('accordion-tab');
        for (let tab of tabs) {
            const heading = tab.getElementsByClassName('accordion-heading')[0];
            heading.addEventListener('click', (e) => {
                e.stopPropagation();
                activate(accordion, tab);
            });
        }
    }
});

//document.getElementById().class