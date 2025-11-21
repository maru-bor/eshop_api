let isLoggedIn = false
const loginForm = document.getElementById("login")

let username = ""
let password = ""

const productsList = document.getElementById('products');
let products = []

const product = {
    name : String,
    description: String,
    price : Number,
}

function renderProducts() {
    productsList.innerHTML = '';
    for (const product of products) {
        const li = document.createElement('li');
        li.innerHTML = `Produkt: ${product.name},${product.description} , ${product.price}`;
        productsList.appendChild(li);
    }
}

function handleLogin(){
    console.log(username)
    console.log(password)
    if (username && password) {
        isLoggedIn = true
        renderLoginForm()
        renderProducts()
    }
}

function renderLoginForm() {
    if (!isLoggedIn){
        loginForm.innerHTML = `
        <div>
            <div>
                <label for="username">Username:</label>
                <input id="username" type="text" placeholder="Username" />
            </div>
            <div>
                <label for="password">Password: </label>
                <input id="password" type="password" placeholder="Password" />
            </div>
            <button id="loginBtn">Log In</button>
        </div>
    `;

        const usernameInput = document.getElementById("username");
        usernameInput.addEventListener("input", e => {
            username = e.target.value
        });

        const passwordInput = document.getElementById("password");
        passwordInput.addEventListener("input", e => {
            password = e.target.value
        });

        document.getElementById("loginBtn").addEventListener("click", handleLogin);
    } else {
        loginForm.innerHTML = "";
    }
}


renderLoginForm();

fetch('/api/product')
.then(res => res.json())
.then(data => {
    console.log(data);
    products = data;
})

fetch('api/product', {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name : 'Shoe',
        description: "Dobre boty.",
        price: 100
    })
})
    .then(res => res.status)
    .then(status => console.log(status))

