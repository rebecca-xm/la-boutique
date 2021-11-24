function setCartProductsNum() {
  cartProductsNum.textContent = `Numero prodotti: ${cartList.length}`;
}

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
    setCartProductsNum();
    // alert(`Prodotto aggiunto al carrello, numero prodotti: ${cartList.length}`);

    // MODALE AGGIUNTA PRODOTTI AL CARRELLO
    const modal = document.querySelector(".modal");                              
    modal.style.display = "flex";

    setTimeout(() => {
      modal.style.display = "none";
    }, 2000);

    // Nel caso in cui volessimo aggiungere una interazione col LocalStorage
    localStorage.setItem("totCartitems", cartList.length);
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

function renderProducts(listItems) {
  listItems.map((product) => {
    createProduct(
      wrapperProducts,
      product.image,
      product.title,
      product.price,
      product.id
    );
  });
}

// Async await
const getProductsList = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  productsList = data;

  // Nella eventualità di aggiungere una quantità per prodotto
  // productsList = data.map((product) => {
  //   product.quantity = 0;
  //   return product;
  // });

  return renderProducts(data);
};

let productsList = [];
const wrapperProducts = document.querySelector(".wrapper__products");

// Parte inerente alla logica del carrello
let cartList = [];

const localStorageTot = localStorage.getItem("totCartitems");
const cartBtn = document.querySelector(".cartBtn");
const cartProductsNum = document.querySelector(".cartProductsNum");
const clearCartBtn = document.querySelector(".clearCart");

// Flusso generale
if (localStorageTot) {
  cartProductsNum.textContent = `Numero prodotti: ${localStorageTot}`
};

getProductsList();

clearCartBtn.addEventListener("click", () => {
  cartList.length = 0;
  setCartProductsNum();
  localStorage.removeItem("totCartitems");
});

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