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
// ============ change like buttom =================
// 
let likeBtns = document.querySelectorAll(".like");
likeBtns.forEach((btn) => btn.addEventListener("click", function () {
  // console.log("liked")
  // if (btn.classList.contains("liked")) {
  //   btn.classList.remove("liked");
  // } else {
  //   btn.classList.add("liked")
  // }
  btn.classList.toggle("liked")
})
)
// change modale window
let moreBtns = document.querySelectorAll(".more");
let modal = document.querySelector(".modal");
let close = document.querySelector(".btn-close")

function openModal() {
  modal.classList.remove("hide");
  modal.classList.add("show");
}
function closeModal() {
  modal.classList.remove("show");
  modal.classList.add("hide");
}
moreBtns.forEach((item) =>
  item.addEventListener("click", openModal)
);
close.addEventListener("click", closeModal)
modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    closeModal();
  }
})
// ====================== sliders ====================
//
// slick
$(".slider").slick({
  dots: true,
  infinite: true
});


// ================ OOP Counter =================

let decrementBtns = document.querySelectorAll(".decrement-button");
let incrementBtns = document.querySelectorAll(".increment-button");
let inputFields = document.querySelectorAll(".products-quantity input");

class Counter {
  constructor(incrementBtn, decrementBtn, inputField) {
    this.domRefs = {
      incrementBtn,
      decrementBtn,
      inputField,
    };
    this.toggleButtonState = function () {//делаем кнопку неактивной
      // мой вариант
      // +this.domRefs.inputField.value === 1 ?
      //   this.domRefs.decrementBtn.disabled = true :
      //   this.domRefs.decrementBtn.disabled = false;
      // +this.domRefs.inputField.value === 10 ?
      //   this.domRefs.incrementBtn.disabled = true :
      //   this.domRefs.incrementBtn.disabled = false;
      let count = +this.domRefs.inputField.value;
      this.domRefs.decrementBtn.disabled = count <= 1;
      this.domRefs.incrementBtn.disabled = count >= 10;
    };
    this.toggleButtonState();//вызыываем ее при запуске сразу, а потом при каждом нажатии кнопок

    // в середине самой функции конструктора контекст всегда правильный, а в дочерних функциях он теряется.
    //в контексте дочерней функции this выбрасывает ошибку Uncaught TypeError: this.domRefs is undefined, потому что указывает на кнопку, у которой нет понятия dom.Refs. значит нужно приязать контекст (методы call, apply, bind, см. теорию к уроку 19)

    this.increment = function () {
      // console.log(this);
      // let prevCount = +this.domRefs.inputField.value;
      // this.domRefs.inputField.value = prevCount + 1;// вместо двух строк одна
      this.domRefs.inputField.value = +this.domRefs.inputField.value + 1;
      this.toggleButtonState();
    };

    this.decrement = function () {
      // console.log(this);
      this.domRefs.inputField.value = +this.domRefs.inputField.value - 1;
      this.toggleButtonState();
    };

    // берем обертку -bind - и даем контекст - экземпляр функции-конструктора
    this.domRefs.incrementBtn.addEventListener(
      "click",
      this.increment.bind(this)
    );

    this.domRefs.decrementBtn.addEventListener(
      "click",
      this.decrement.bind(this)
    );
  }
}

// let counter = new Counter(
//   incrementBtns,
//   decrementBtns,
//   inputFields
// );
//для всех кнопок -+
let counters = [];
inputFields.forEach(
  (item, i) =>
  (counters[i] = new Counter(
    incrementBtns[i],
    decrementBtns[i],
    // inputFields[i] вместо него item, потому что на нем вызываем forEach
    item)
  )
);