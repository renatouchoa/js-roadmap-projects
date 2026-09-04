function closeCookieConsent() {
    document.getElementById('cc').classList.add('closed');    
}

function showCookieConsent() {
    document.getElementById('cc').classList.remove('closed');    
} 

function saveCookieConsent(action) {
    const expirationDays = action === 'accepted' ? 365 : 1;
    const cookieConsent = {
        action,
        expires: (new Date()).getTime() + expirationDays * 24 * 60 * 60 * 1000
    };    
    localStorage.setItem('cookie_consent', JSON.stringify(cookieConsent));
}

window.addEventListener('load', (e) => {
    const cookieConsent = JSON.parse(localStorage.getItem('cookie_consent'));
    console.log(cookieConsent);
    if (cookieConsent === null || cookieConsent.expires <= (new Date).getTime()) {
        showCookieConsent();
    }
});

document.getElementById('cc-accept')
    .addEventListener('click', (e) => {
        e.stopPropagation();
        saveCookieConsent('accepted');
        closeCookieConsent();
        console.log('Accepted!');
    });

document.getElementById('cc-reject')
    .addEventListener('click', (e) => {
        e.stopPropagation();
        saveCookieConsent('rejected');
        closeCookieConsent();
        console.log('Rejected!');
    });