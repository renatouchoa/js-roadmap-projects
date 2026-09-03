const isPositive = (number) => {
    return number > 0;
}

const isNegative = (number) => {
    return number < 0;
}

const isZero = (number) => {
    return number == 0;
}

const isEven = (number) => {
    return number % 2 == 0;
}

const describeNumber = (number) => {
    return {
        positive: isPositive(number),
        negative: isNegative(number),
        zero: isZero(number),
        even: isEven(number),
        odd: !isEven(number)
    };
}

console.log(describeNumber(8));
console.log(describeNumber(-3));
console.log(describeNumber(0));
console.log(describeNumber(7));