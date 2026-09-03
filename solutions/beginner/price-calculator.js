
function calculate(price, percent) {
    return price * percent / 100;
}

function calculateDiscount(price, discountPercent) {
    return calculate(price, discountPercent);
}

function calculateTax(priceAfterDiscount, taxPercent) {
    return calculate(priceAfterDiscount, taxPercent);
}

function calculateFinalPrice(price, discountPercent, taxPercent) {
    price = price - calculateDiscount(price, discountPercent);
    return price + calculateTax(price, taxPercent);
}

function createPriceSummary(price, discountPercent, taxPercent) {
    const discount = calculateDiscount(price, discountPercent);
    const tax = calculateTax(price - discount, taxPercent);
    const finalPrice = calculateFinalPrice(price, discountPercent, taxPercent);
    return {
        price,
        discount,
        tax,
        finalPrice,
    }
}

console.log(createPriceSummary(100, 20, 10));
console.log(createPriceSummary(200, 25, 5));
console.log(createPriceSummary(50, 0, 10));