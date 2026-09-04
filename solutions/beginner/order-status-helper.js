function isPaid(order) {
    return order.payment.status === 'paid';
}

function hasShipped(order) {
    return order.shipping.status === 'shipped';
}

function getDeliveryMessage(order) {
    if (hasShipped(order)) {
        return `Order shipped. Estimated delivery: ${order.shipping.estimatedDelivery}`;
    }
    return 'Order has not shipped yet.';
}

function needsAttention(order) {
    return !isPaid(order) || !hasShipped(order);
}

function createOrderSummary(order) {
    let itemCount = 0;
    for (const item of order.items) {
        itemCount += item.quantity;
    }
    return {
        id: order.id,
        customerName: order.customer.name,
        paid: isPaid(order),
        shipped: hasShipped(order),
        itemCount,
        deliveryMessage: getDeliveryMessage(order),
        needsAttention: needsAttention(order),
    };
}

// Sample checks ...

const order = {
    id: 'ORD-1001',
    customer: {
        name: 'Ava Stone',
        email: 'ava@example.com',
    },
    payment: {
        status: 'paid',
    },
    shipping: {
        status: 'shipped',
        estimatedDelivery: '2026-06-18',
    },
    items: [
        { name: 'Notebook', quantity: 2 },
        { name: 'Pen Set', quantity: 1 },
    ],
};

console.log(createOrderSummary(order));
console.log(isPaid(order));
console.log(hasShipped(order));

const pendingOrder = {
    ...order,
    payment: { status: 'unpaid' },
    shipping: { status: 'processing', estimatedDelivery: '2026-06-18' },
};
console.log(needsAttention(pendingOrder));
console.log(getDeliveryMessage(pendingOrder));

/*

Expected output ...

{ id: "ORD-1001", customerName: "Ava Stone", paid: true, shipped: true, itemCount: 3, deliveryMessage: "Order shipped. Estimated delivery: 2026-06-18.", needsAttention: false }
true
true
true
Order has not shipped yet.

*/