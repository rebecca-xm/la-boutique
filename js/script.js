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
    const localStorageValue = localStorage.getItem("totCartitems");
    if (localStorageValue) {
      cartList = JSON.parse(localStorageValue);
    }

    cartList.push(
      productsList.find(
        (product) => parseInt(e.currentTarget.id) === product.id
      )
    );
    setCartProductsNum();

    // Nel caso in cui volessimo aggiungere una interazione col LocalStorage
    localStorage.setItem("totCartitems", JSON.stringify(cartList));

    // console.log("LOCAL STORAGE ==>", localStorageValue);

    // MODALE AGGIUNTA PRODOTTI AL CARRELLO
    const modal = document.querySelector(".modal");
    modal.style.display = "flex";

    setTimeout(() => {
      modal.style.display = "none";
    }, 2000);
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

// FUNZIONE MOSTRA CARRELLO
function handleShowCartBtn() {
  showCartBtn.setAttribute("disabled", true);
  document
    .querySelectorAll(".product")
    .forEach(product => wrapperProducts.removeChild(product));

  renderProducts(JSON.parse(localStorageTot) || cartList);

  // setTimeout(() => {
  //   wrapperProducts.classList.remove("sideVireAnim");
  // }, 1000);
}

// FUNZIONE FILTRO RICERCA
function handleFilterSearch() {
  document
    .querySelectorAll(".product")
    .forEach((product) => wrapperProducts.removeChild(product));

  renderProducts(
    productsList.filter((product) =>
      product.title
        .toLowerCase()
        .includes(inputFilterSearch.value.toLowerCase())
    )
  );
}

  // Async await
  const getProductsList = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    productsList = data;

    // Nella eventualit?? di aggiungere una quantit?? per prodotto
    // productsList = data.map((product) => {
    //   product.quantity = 0;
    //   return product;
    // });

    return renderProducts(data);
  };

  let productsList = [];
  const wrapper = document.querySelector(".wrapper");
  const wrapperProducts = document.querySelector(".wrapper__products");

  // Parte inerente alla logica del carrello
  let cartList = [];

  const localStorageTot = localStorage.getItem("totCartitems");
  const cartBtn = document.querySelector(".cartBtn");
  const cartProductsNum = document.querySelector(".cartProductsNum");
  const clearCartBtn = document.querySelector(".clearCart");
  const showCartBtn = document.querySelector(".showCartBtn");
  const showSearchResultBtn = document.querySelector(".showSearchResultBtn");
  const inputFilterSearch = document.querySelector(".inputFilterSearch");

  // Flusso generale
  const parsedTotCardItemsLen =
    JSON.parse(localStorage.getItem("totCartitems"))?.length || 0;

  cartProductsNum.textContent = `Numero prodotti: ${parsedTotCardItemsLen || 0}`;
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

  // SEZIONE RECENSIONI
  let reviews = new Array();
  reviews[0] = "Il pi?? bell'e-commerce di sempre!";
  reviews[1] = "Ottimo rapporto qualit?? prezzo :)";
  reviews[2] = "Negozio fantastico!";

  let counter = 0;
  function loop() {
    if (counter > 2) counter = 0;
    document.getElementById('box__reviews').firstElementChild.innerHTML = reviews[counter];
    counter++;
    setTimeout(loop, 2000);
  }
  loop();

  // MOSTRA CARRELLO
  showCartBtn.addEventListener("click", handleShowCartBtn);

  // RICERCA PRODOTTI
  showSearchResultBtn.addEventListener("click", handleFilterSearch);