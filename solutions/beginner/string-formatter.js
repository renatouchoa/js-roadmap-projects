
const cleanText = text => text.trim();

function capitalize(text) {
    text = cleanText(text).toLowerCase();
    let firstLetter = text.substring(0, 1).toUpperCase();
    return `${firstLetter}${text.substring(1)}`;
}

function formatDisplayName(firstName, lastName) {
    firstName = capitalize(firstName);
    lastName = capitalize(lastName);
    return `${firstName} ${lastName}`;
}

console.log(formatDisplayName('  ava', 'STONE  '));
console.log(formatDisplayName('nOAh', '  kim'));
console.log(formatDisplayName('  mINA  ', 'pATEL'));