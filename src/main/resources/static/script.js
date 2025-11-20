
const productsList = document.getElementById('products');
let products = [{}]
const product = {
    name : String,
    price : Number,
}

function renderProducts() {
    productsList.innerHTML = '';
    for (const [name, price] of products) {
        const li = document.createElement('li');
        li.innerHTML = `Produkt: ${name}, ${price}`;
        productsList.appendChild(li);
    }
}

fetch('/api/product')
.then(res => res.json())
.then(data => {
    console.log(data);
    products.push(data)
    renderProducts();
})


fetch('api/product', {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
         name : 'Shoe',
         price: 100
    })
})
    .then(res => res.status)
    .then(status => console.log(status))

