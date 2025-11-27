const productsList = document.getElementById('products');
let products = []
const button = document.getElementById('button')

getProducts()

function getProducts(){
    fetch('/api/product')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            products = data;
            renderProducts()
        })
}

function renderProducts() {
    productsList.innerHTML = '';
    for (const product of products) {
        const div = document.createElement('div')
        div.className = 'productContainer'

        const p = document.createElement('p');
        p.textContent = `Produkt: ${product.name}, ${product.description}, ${product.price}`;

        div.appendChild(p)

        productsList.appendChild(div);
    }
}


button.addEventListener("click", () => {
    fetch('/api/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Shoe',
            description: "Dobre boty.",
            price: 100
        })
    })
        .then(res => {
            if (res.ok) {
                console.log("Produkt přidán!");
                getProducts();
            } else {
                console.error("Chyba při přidávání produktu:", res.status);
            }
        })
        .catch(err => console.error("Chyba:", err));
});


