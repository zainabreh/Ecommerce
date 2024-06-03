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
  getData();
  display();
})
function getProducts() {
  fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => {
    globalData = data;
    // console.log(data);
    generateHTML(data);
    filterData(data);
  });
}

function addTocart(id){
  cartItem.push(id);
  localStorage.setItem('cartItem',JSON.stringify(cartItem));
  count.innerText = cartItem.length;
}
console.log(`Items added to cart are ${cartItem}`);
console.log(cartItem);

function generateHTML(data) {
  let products = "";
  data.forEach((data) => {
    products += `<div class="card item-container">
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


