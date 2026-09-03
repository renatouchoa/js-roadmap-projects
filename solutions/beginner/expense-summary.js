function calculateTotal(expenses) {
    let total = 0;
    expenses.forEach(item => {
        total += item.amount;
    });
    return total;
}

function calculateCategoryTotal(expenses, category) {
    let expensesByCategory = expenses.filter(item => item.category === category);
    return calculateTotal(expensesByCategory);
}

function findLargestExpense(expenses) {
    let largestAmountItem = {amount: -1};
    expenses.forEach(item => {
        if (item.amount > largestAmountItem.amount) {
            largestAmountItem = item;
        }
    })
    return largestAmountItem;
}

function createExpenseSummary(expenses) {
    return {
        total: calculateTotal(expenses),
        foodTotal: calculateCategoryTotal(expenses, 'food'),
        transportTotal: calculateCategoryTotal(expenses, 'transport'),
        largestExpense: findLargestExpense(expenses)
    }
}

// Sample checks

const expenses = [
  { id: 1, category: 'food', amount: 24 },
  { id: 2, category: 'transport', amount: 15 },
  { id: 3, category: 'food', amount: 18 },
  { id: 4, category: 'books', amount: 40 },
];

console.log(createExpenseSummary(expenses));
console.log(calculateCategoryTotal(expenses, 'food'));
console.log(calculateCategoryTotal(expenses, 'health'));
console.log(findLargestExpense(expenses));