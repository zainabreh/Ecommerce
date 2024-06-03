let extractingData;

function getData(){
    extractingData = cartItem.map((item)=>{
        for(let i=0; i<globalData.length; i++){
            if(item == globalData[i].id){
                return globalData[i];
            }
        }
    })
}
console.log(`Get Data function is called ${getData}`);
console.log(`cartItem is called ${cartItem}`);
console.log(`GlobalData function is called ${globalData}`);
console.log(`Extracting Data is called ${extractingData}`);


function display(){
    let productcart = document.querySelector(".productcart");
    let providingHTML;

    if(!extractingData || extractingData.length === 0){
        providingHTML = `<h1>No Items Added</h1>`
    }
     else{
         extractingData.map((ele) => {
               providingHTML += generatehtml(ele);
            });
        } 
        productcart.innerHTML = providingHTML;
        console.log(`Display function is called ${providingHTML}`);
    
}



function generatehtml(prod){
    return `
    
            <div class="itemCard">

                <div class="delete">
                    <i class="fa-solid fa-xmark" onclick="deleteItem()"></i>
                </div>

                <div class="image">
                    <img src="${prod.image}" alt="product-image" class="prod-cart-image">
                </div>
    
                <div class="itemDetail">
                    
                    <div class="cart-item-name">
                    ${prod.title}
                    </div>
                    
                    <div class="price">
                        $ ${prod.price}
                    </div>
    
                    <div class="cart-return">
                        <span class="return-date">2 days</span> return available
                    </div>
    
                    <div class="cart-delivery">
                        Delivered by <span class="delivery-date">4,Nov,2024</span> 
                    </div>
    
                </div>
        </div>
    ` 
}

