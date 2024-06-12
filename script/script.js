let container = document.querySelector(".product_container");
let navitems = document.querySelectorAll(".nav-item")
let count = document.querySelector(".count")
let cartItem = [];
let globalData;
window.addEventListener("load",()=>{
  getProducts();
  let bag = localStorage.getItem("cartItem")
  cartItem = bag ? JSON.parse(bag) : [];
  count.innerText = cartItem.length;
})
// localStorage.clear()


function getProducts() {
  fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => {
    globalData = data;
    console.log(globalData);
    generateHTML(globalData);
    filterData(globalData);
  });
}

function addTocart(id){
  cartItem.push(id);
  localStorage.setItem('cartItem',JSON.stringify(cartItem));
  count.innerText = cartItem.length;
}

function generateHTML(data) {
  let products = "";
  data.forEach((data) => {
    products += `<div class="card item-container" onclick="prodDetail(${data.id})">
          <a href="/pages/productDetail.html">
            <img src=${data.image} class="prod-img"  alt="...">
          </a>
          <hr/>
          <div class="ratings">
            &nbsp;&nbsp;&nbsp;${data.rating.rate} ⭐ | ${data.rating.count}
          </div>
        <div class="card-body">
          <h5 class="card-title">${data.title}</h5>
          
          <p class="card-price"><span class="price">Price:</span>&nbsp;$&nbsp;${data.price}</p>

          <button class="btn btn-primary cartbtn" onclick="addTocart(${data.id})"><i class="fa-solid fa-cart-shopping">&nbsp;</i>Add to Cart</button>
        </div>
      </div>
        `;
  });
  if(container){
    container.innerHTML = products;
  }
}

function filterData(data) {
  navitems.forEach((navitem)=>{
    navitem.addEventListener("click",(e)=>{
      let filterData;
      let selectedItem = e.target.textContent.trim().toLowerCase();

      if(selectedItem == "all"){
        filterData = data;
      }else{
        filterData = data.filter(e=>e.category.trim().toLowerCase().includes(selectedItem))
      }
      generateHTML(filterData)    
    })
  })
}

function prodDetail(prodID){
  console.log("Product detail page called");
  localStorage.setItem('cartItem',JSON.stringify(cartItem));
  count.innerText = cartItem.length;

  let productDetail = document.getElementsByClassName("productDetail")
  
    for(let i=0; i<globalData.length; i++){
        if(prodID == globalData[i].id){
            let prodHTML =  `
                        <div class="card mb-3" style="max-width: 940px;">
                <div class="row g-0">
                  <div class="col-md-4" >
                    <img src="${prodID.image}" class="img-fluid rounded-start Prodimage" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h2 class="card-title" style="font-weight: 700;">${prodID.title}</h2>
                      <h5 style="font-weight: 700; margin-block: 20px;">
                        $${prodID.price}
                      </h5>
                      
                      <p class="card-text">${prodID.description}</p>

                      <button class="btn btn-primary cartbtn" onclick="addTocart(${data.id})"><i class="fa-solid fa-cart-shopping">&nbsp;</i>Add to Cart</button>
                      
                    </div>
                  </div>
                </div>
            </div>
            `
            productDetail.innerHTML = prodHTML;
        }
    }

}
