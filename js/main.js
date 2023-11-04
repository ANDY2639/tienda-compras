main();

function main() {
  let { pathname } = window.location;

  if (pathname.includes("products")) {
    getProducts();
  }

  if (pathname.includes("users")) {
    getUsers();
  }
}

async function fetchData(url) {
  try {
    setLoader();
    const data = await (await fetch(url)).json();
    unsetLoader();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function Loader() {
  let span = document.createElement("span");
  span.classList.add("loader");
  return span;
}

function setLoader() {
  document.body.appendChild(Loader());
}

function unsetLoader() {
  let myBody = document.body;
  let span = document.querySelector(".loader");

  myBody.removeChild(span);
}

async function getLocalStorageByKeyOrFetch(key, url) {
  if (
    !localStorage.getItem(key) ||
    JSON.parse(localStorage.getItem(key)).length == 0
  ) {
    const data = await fetchData(url);
    localStorage.setItem(key, JSON.stringify(data));
    return data;
  }

  return JSON.parse(localStorage.getItem(key));
}

async function getProducts() {
  const products = await getLocalStorageByKeyOrFetch(
    "products",
    "https://fakestoreapi.com/products"
  );
  const parentProducts = document.querySelector("#products");

  let productsDivs = "";
  products.forEach((p) => (productsDivs += templateProduct(p)));
  parentProducts.innerHTML += productsDivs;
}

async function getUsers() {
  const users = await getLocalStorageByKeyOrFetch(
    "users",
    "https://fakestoreapi.com/users"
  );
  const parentTBody = document.querySelector("#tbody");

  let trContents = "";
  users.forEach((u) => (trContents += templateRowUser(u)));
  parentTBody.innerHTML += trContents;
}

function templateProduct(product) {
  return `
    <div class="product">
      <img class="product__img" src="${product.image}" alt="imagen producto">
      <div class="product__content">
        <h4 class="product__name">${product.title}</h4>
        <span class="product__price">$ ${product.price}</span>
        <div class="product__buttons">
          <button class="product__btn product__btn--detail">Detalles</button>
          <button class="product__btn product__btn--add" onclick="addCart(${product.id})">Agregar</button>
        </div>
      </div>
    </div>
  `;
}

function templateRowUser(user) {
  return `
    <tr>
      <td>${user.name.firstname} ${user.name.lastname}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td><a href="https://fakestoreapi.com/users/${user.id}">User #${user.id}</a></td>
    </tr>
  `;
}
