function containsOnlyNumbers(str) {
    return /^[0-9]+$/.test(str);
}

function containsOnlyAmount(str) {
    return /^[0-9,.]+$/.test(str);
}

function containsOnlyStrings(str) {
    return /^[a-z,A-Z ' ']+$/.test(str);
}
function containsOnlyEmail(str) {
    return /^[a-z,A-Z,@,.,0-9]+$/.test(str);
}

function containsOnlyMonthYear(str) {
    return /^[0-9,/]+$/.test(str);
}

function containsOnlyCV(str) {
    return /^[0-9]+$/.test(str);
}

function containsOnlyPhone(str) {
    return /^[0-9,+]+$/.test(str);
}

export { containsOnlyNumbers, containsOnlyStrings, containsOnlyMonthYear, containsOnlyCV, containsOnlyEmail, containsOnlyPhone, containsOnlyAmount }