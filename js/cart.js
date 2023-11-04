let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

Cart();

function Cart() {
  displayCartCount();
}

function displayCartCount() {
  let navbarItems = document.querySelector(".navbar__items");
  if (countCart() > 0) {
    navbarItems.classList.remove("hidden");
    navbarItems.innerHTML = countCart();
  } else {
    navbarItems.classList.add("hidden");
  }
}

function cleanCart() {
  localStorage.removeItem("cartItems");
  cart = [];
  displayCartCount();
}

function countCart() {
  return cart.length;
}

function addCart(prodId, qty = 1) {
  let index = cart.findIndex((prod) => prod.id === prodId);

  if (index !== -1) {
    if (cart[index].stock <= cart[index].qty) {
      console.log("item stock: superado");
      console.log("stock:  " + cart[index].stock);
      console.log("quantity:  " + cart[index].qty);
      return false;
    }

    qty > 1 ? (cart[index].qty = qty) : (cart[index].qty += qty);
  } else {
    const products = JSON.parse(localStorage.getItem("products"));
    let product = products.find((prod) => prod.id === prodId);
    let {
      id,
      title,
      price,
      image,
      rating: { count: stock },
    } = product;
    cartProduct = { id, title, price, image, stock, qty };
    cart = [...cart, cartProduct];
  }

  localStorage.setItem("cartItems", JSON.stringify(cart));
  displayCartCount();
}

function removeCart(prodId) {
  let index = cart.findIndex((prod) => prod.id === prodId);

  if (index !== -1) {
    cart.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(cart));
  } else {
    console.log("Producto no encontrado");
  }

  displayCartCount();
}
