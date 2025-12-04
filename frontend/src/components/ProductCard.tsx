
export default function ProductCard() {
     return(
            <>
                <div id="product-card">
                <h2>Product Name</h2>
                   <div id="product-info" >
                      <p id="desc"> Product Description</p>
                      <p id="price"> Price: 100 </p>

                      <button onClick={addToCart}>Add test product</button>
                      <button onClick={removeFromCart}>Remove test product</button>
                   </div>
                </div>


            </>
        );
}
