function hasMinimumLength(password) {
    return password.length >= 8;
}

function hasNumber(password) {
    for (c of password) {
        if (c >= '0' && c <= '9') return true;
    }
    return false;
}

function hasUppercaseLetter(password) {
    for (c of password) {
        if (c >= 'A' && c <= 'Z') return true;
    }
    return false;
}

function getFailedRules(password) {
    let failedRules = [];
    if (!hasMinimumLength(password)) {
        failedRules.push('minimum length');
    }
    if (!hasNumber(password)) {
        failedRules.push('number');
    }
    if (!hasUppercaseLetter(password)) {
        failedRules.push('uppercase letter');
    }
    return failedRules;
}

function validatePassword(password) {
    const failedRules = getFailedRules(password);
    return {
        valid: failedRules.length === 0,
        failedRules,
    }
}

// Sample checks ...

console.log(validatePassword('hello'));
console.log(validatePassword('Hello123'));
console.log(validatePassword('hello123'));
console.log(validatePassword('HELLOABC'));

/*

Expected output ...

{ valid: false, failedRules: ["minimum length", "number", "uppercase letter"] }
{ valid: true, failedRules: [] }
{ valid: false, failedRules: ["uppercase letter"] }
{ valid: false, failedRules: ["number"] }

*/