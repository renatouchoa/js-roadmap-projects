import { DateTime } from "./node_modules/luxon/build/es6/luxon.mjs";

document.getElementById('bd-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const bdInputed = document.getElementById('bd-input');
    const bdResult = document.getElementById('bd-result');
    if (bdInputed.value.trim() == '') {
        bdResult.textContent = '';
        return;
    }
    const bd = DateTime.fromISO(bdInputed.value);
    const diff = bd.diffNow(['years', 'months', 'days']).toObject();
    const years = diff.years * -1;
    const months = diff.months * -1;
    const days = diff.days * -1;
    bdResult.textContent = `You are ${years} year${years == 1 ? '' : 's'}, ${months} month${months == 1 ? '' : 's'} and ${days.toFixed(0)} day${days == 1 ? '' : 's'}`;
})