let container = document.querySelector(".product_container");
let navitems = document.querySelectorAll(".nav-item")
window.addEventListener("load",()=>{
  getProducts();

})
function getProducts() {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      console.log(data.map(c=>c.category));
      generateHTML(data);
      filterData(data);
    });
}

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

          <button class="btn btn-primary cartbtn"><i class="fa-solid fa-cart-shopping">&nbsp;</i>Add to Cart</button>
        </div>
      </div>
        `;
  });
  container.innerHTML = products;
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


