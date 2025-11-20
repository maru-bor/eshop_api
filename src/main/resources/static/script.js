
const productsList = document.getElementById('products');
let products = [{}]
const product = {
    name : String,
    price : Number,
}

fetch('/api/product')
.then(res => res.json())
.then(data => console.log(data))


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

