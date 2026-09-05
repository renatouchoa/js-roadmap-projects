const RTA_LIMIT = 100;

function updateCowntDown(textarea, cowntdown) {
    const chars = textarea.value.length;
    if (chars >= RTA_LIMIT) {
        textarea.parentElement.classList.add('full');
        textarea.parentElement.classList.remove('almost');
        if (chars > RTA_LIMIT) {
            textarea.value = textarea.value.slice(0, RTA_LIMIT);
            chars--;
        }
    } else if (chars >= RTA_LIMIT * 0.8) {
        textarea.parentElement.classList.remove('full');
        textarea.parentElement.classList.add('almost');
    } else {
        textarea.parentElement.classList.remove('full');
        textarea.parentElement.classList.remove('almost');
    }
    cowntdown.innerHTML = `${chars} / ${RTA_LIMIT}`;
}

window.addEventListener('load', (e) => {
    rtas = document.getElementsByClassName('rta');
    for (rta of rtas) {
        const countdown = document.createElement('span');
        countdown.className = 'rta-countdown';
        rta.appendChild(countdown);
        const textarea = rta.getElementsByTagName('textarea')[0];
        textarea.addEventListener('keyup', (e) => {
            updateCowntDown(textarea, countdown);
        });
        updateCowntDown(textarea, countdown);
    }
});

//document.getElementById().class