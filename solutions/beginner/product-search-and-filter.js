function filterByCategory(products, category) {
    return products.filter(product => product.category === category);
}

function filterByMaxPrice(products, maxPrice) {
    return products.filter(product => product.price < maxPrice);
}

function getInStockProducts(products) {
    return products.filter(product => product.inStock === true);
}

function findProductById(products, id) {
    return products.find(product => product.id === id)
}

function searchProducts(products, searchText) {
    let result = [];
    for (const product of products) {
        if(product.name.toLowerCase().includes(searchText.toLowerCase())) {
            result.push(product);
        }
    }
    return result;
}

// Sample checks ...

const products = [
  { id: 1, name: 'Notebook', category: 'stationery', price: 10, inStock: true },
  { id: 2, name: 'Desk Lamp', category: 'home', price: 35, inStock: false },
  { id: 3, name: 'Pen Set', category: 'stationery', price: 6, inStock: true },
  {
    id: 4,
    name: 'Water Bottle',
    category: 'fitness',
    price: 18,
    inStock: true,
  },
];

console.log(filterByCategory(products, 'stationery').map((product) => product.name));
console.log(filterByMaxPrice(products, 20).map((product) => product.name));
console.log(findProductById(products, 3));
console.log(searchProducts(products, 'pen').map((product) => product.name));
console.log(getInStockProducts(products).map((product) => product.name));
console.log(findProductById(products, 99));