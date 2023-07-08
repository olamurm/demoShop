//
// ============= по клику на кнопку ADD TO CART изменяется значение счетчика корзины
// 
// находим элемент с ID "products-count" - счетчик
let productsCountEL = document.getElementById("products-count");
// находим все элементы (поэтому querySelectorAll а не querySelector) с классом ".cart" - кнопки, вернет NodeList
let addToCartBtns = document.querySelectorAll(".cart");

// console.log(productsCountEL); // <div id="products-count">0</div>
// console.log(addToCartBtns); // NodeList(9)[button.cart, button.cart, button.cart, button.cart, button.cart, button.cart, button.cart, button.cart, button.cart]
//
// for (let i = 0; i < addToCartBtns.length; i++) {
//   addToCartBtns[i].addEventListener("click", function () {
//     console.log("clicked");
//   });
// }
//
// каждый элемент псевдомассива addToCartBtns с классом ".cart" (кнопку) мы назвали "btn"
addToCartBtns.forEach((btn) =>
  // "addEventListener" - метод прослушиватель событий типа "клик". если кликнули по кнопке "btn" начинает работать функция
  btn.addEventListener("click", function () {
    // +- класс
    btn.classList.toggle("cart-clicked");
    // проверка, была ли уже нажата кнопка
    if (btn.classList.contains("cart-clicked")) {
      //с помощью TextContent мы узнаем текстовое значение счетчика, делаем его числом и к нему добавляем 1
      productsCountEL.textContent = +productsCountEL.textContent + 1;
    } else {
      productsCountEL.textContent = +productsCountEL.textContent - 1;
    }
  })
);
// находим все элементы (поэтому querySelectorAll а не querySelector) с классом ".like" - кнопки, вернет NodeList
// change like state
// let likeBtns = document.getElementsByClassName("like");//==> HTMLCollection(9)
// for (let i = 0; i < likeBtns.length; i++) {
//   LikeBtns[i].addEventListener("click", function () {
//     console.log("clicked");
//   });
// }
//
// ================== change like buttom========================
// 
let likeBtns = document.querySelectorAll(".like");
likeBtns.forEach((btn) =>
  btn.addEventListener("click", function () {
    // console.log("liked")
    // if (btn.classList.contains("liked")) {
    //   btn.classList.remove("liked");
    // } else {
    //   btn.classList.add("liked")
    // }
    btn.classList.toggle("liked");
  })
);
//
// ================= change modale window========================
// 
let moreBtns = document.querySelectorAll(".btn-more-details");
let modal = document.querySelector(".modal");
let close = document.querySelector(".btn-close");

function openModal() {
  modal.classList.remove("hide");
  modal.classList.add("show");
}
function closeModal() {
  modal.classList.remove("show");
  modal.classList.add("hide");
}
moreBtns.forEach((item) => item.addEventListener("click", openModal));

close.addEventListener("click", closeModal);

modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    closeModal();
  }
});
//
// ====================== sliders ====================
//
// slick
$(".slider").slick({
  dots: true,
  infinite: true
});
