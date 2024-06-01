let extractingData;
onload()
function onload (){
    getData();
    display();
}

function getData(){
    extractingData = cartItem.map(item=>{
        for(let i=0; i<data.length; i++){
            if(item == data[i].id){
                return data[i];
            }
        }
    })
}


function display(){
    let productcart = document.querySelector(".productcart");
    let providingHTML="";

    if(!extractingData || extractingData == 0){
        providingHTML = `<h1>No Items Added</h1>`
    }else{
        extractingData.forEach((ele) => {
            providingHTML += generatehtml(ele);
        });
    }
    productcart.innerHTML = providingHTML;
}


function generatehtml(id){
    return `
    
            <div class="itemCard">

                <div class="delete">
                    <i class="fa-solid fa-xmark" onclick="deleteItem()"></i>
                </div>

                <div class="image">
                    <img src="${id.image}" alt="product-image" class="prod-cart-image">
                </div>
    
                <div class="itemDetail">
                    
                    <div class="cart-item-name">
                    ${id.title}
                    </div>
                    
                    <div class="price">
                        $ ${id.price}
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

