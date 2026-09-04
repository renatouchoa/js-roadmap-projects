const tabsComponents = document.getElementsByClassName('tabs');

function getTabsLinks(tabsComponent) {
    return tabsLinks = tabsComponent
            .getElementsByClassName('tabs-links')[0]
            .getElementsByClassName('tabs-link');
}

function activate(tabsComponent, tabsLinkId) {
    let tabsContentSelectedId;
    for (let tabsLink of getTabsLinks(tabsComponent)) {
        if (tabsLink.getAttribute('id') === tabsLinkId) {
            tabsLink.classList.add('selected');
            tabsContentSelectedId = tabsLink.getAttribute('tab-for');
        } else {
            tabsLink.classList.remove('selected');
        }
    }
    let contentTabs = tabsComponent
        .getElementsByClassName('tabs-content')[0]
        .getElementsByClassName('tabs-content-tab');        
    for (let contentTab of contentTabs) {
        if (contentTab.id === tabsContentSelectedId) {
            contentTab.classList.add('selected');
        } else {
            contentTab.classList.remove('selected');
        }
    }
}

for (let tabsComponent of tabsComponents) {
    for (let tabsLink of getTabsLinks(tabsComponent)) {
        tabsLink.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            activate(tabsComponent, tabsLink.getAttribute('id'));
        });      
    }
}

//document.getElementById().i