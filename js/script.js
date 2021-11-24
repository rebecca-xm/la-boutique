function createProduct(parent, imgUrl, productTitle, textPrice, idProduct) {
  const product = document.createElement("div");
  product.className = "product";
  product.setAttribute("id", idProduct);

  createImg(product, imgUrl, productTitle);
  createText(product, productTitle, textPrice);
  parent.appendChild(product);

  product.addEventListener("click", (e) => {
    cartList.push(
      productsList.find(
        (product) => parseInt(e.currentTarget.id) === product.id
      )
    );
    alert(`Prodotto aggiunto al carrello: ${cartList.length}`);
  });
}

function createImg(parent, imgUrl, productTitle) {
  const image = document.createElement("img");
  image.src = imgUrl;
  image.alt = productTitle;
  parent.appendChild(image);
}

function createText(parent, productTitle, textPrice) {
  const title = document.createElement("h4");
  title.textContent = productTitle;
  const price = document.createElement("strong");
  price.textContent = `${textPrice} $`;
  parent.append(title, price);
}

const wrapperProducts = document.querySelector(".wrapper__products");

function renderProducts(listItems) {
  listItems.map((product) => {
    createProduct(wrapperProducts, product.image, product.title, product.price, product.id);
  });
}

// ASYNC AWAIT

const getProductsList = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  productsList = data;
  return renderProducts(data);
};

// AGGIUNGI AL CARRELLO

const cartBtn = document.querySelector(".cartBtn");
const cartList = [];
let productsList = [];

// cartBtn.addEventListener("click", () => {
//   console.log(cartList);
// });

getProductsList();

// DYNAMIC HERO

const overlay = document.querySelector(".overlay");

function dinHero() {
  setTimeout(function () {
    overlay.style.backgroundImage = "url(https://media.istockphoto.com/photos/this-one-match-perfect-with-me-picture-id1293366109)";
    setTimeout(function () {
      overlay.style.backgroundImage = "url(https://media.istockphoto.com/photos/let-me-assist-you-picture-id928999840)";
      setTimeout(function () {
        overlay.style.backgroundImage = "url(https://media.istockphoto.com/photos/luxury-retail-store-picture-id976604904)";
        dinHero();
      }, 3000);
    }, 3000);
  }, 3000);
}

dinHero();