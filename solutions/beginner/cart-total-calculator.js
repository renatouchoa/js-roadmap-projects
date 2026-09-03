function calculateSubtotal(items) {
    let subtotal = 0;
    const list = Array.isArray(items) ? items : [items];
    list.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    return subtotal;
}

function calculateDiscount(subtotal, discountPercent) {
    return subtotal * discountPercent / 100.0;
}

function calculateTax(amountAfterDiscount, taxPercent) {
    return amountAfterDiscount * taxPercent / 100.0;
}

function createCartSummary(items, discountPercent, taxPercent) {
    const subtotal = calculateSubtotal(items);
    const discount = calculateDiscount(subtotal, discountPercent);
    const tax = calculateTax(subtotal - discount, taxPercent);
    const total = subtotal - discount + tax;
    return {
        subtotal,
        discount,
        tax,
        total
    };
}

const cartItems = [
    { name: 'Notebook', price: 10, quantity: 2 },
    { name: 'Pen', price: 2, quantity: 5 },
    { name: 'Bag', price: 30, quantity: 1 },
];


console.log(createCartSummary(cartItems, 10, 5));
console.log(calculateSubtotal(cartItems));

const singleItemCart = [{ name: 'Mouse', price: 25, quantity: 2 }];
console.log(createCartSummary(singleItemCart, 0, 10));