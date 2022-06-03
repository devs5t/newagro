let menu = document.querySelector(".menu");
let menuClose = document.querySelector(".menu_close");
let navigation = document.querySelector(".navigation");

let navMain = document.querySelector(".nav__main");
let navCont = document.querySelector(".nav__contact");
let navRS = document.querySelector(".nav__rrss");

if (screen.width < 834){
const openMenu = () => {
  navigation.style.display = "flex";
  menu.style.display = "none";
  menuClose.style.display = "block";
};
menu.addEventListener("click", openMenu);

const closeMenu = () => {
   navigation.style.display = "none";
  menu.style.display = "block";
  menuClose.style.display = "none";
};

menuClose.addEventListener("click", closeMenu);
navMain.addEventListener("click", closeMenu);
navCont.addEventListener("click", closeMenu);
}


/* ----- cards ----- */
let button1 = document.getElementById("but1");
let butText1 = document.querySelector("#but1 > .card__but--text");
let chevDown1 = document.querySelector("#but1 > .card__but--down");
let chevRight1 = document.querySelector("#but1 > .card__but--right");
let info1 = document.getElementById("info1");
let card1 = document.getElementById("card1");
let text1 = document.querySelector(".card__det--text1");
let textDet1 = document.querySelector(".elTexto1");
let span1 = document.querySelector('.card__det--span1')

let button2 = document.getElementById("but2");
let butText2 = document.querySelector("#but2 > .card__but--text");
let chevDown2 = document.querySelector("#but2 > .card__but--down");
let chevRight2 = document.querySelector("#but2 > .card__but--right");
let info2 = document.getElementById("info2");
let card2 = document.getElementById("card2");
let text2 = document.querySelector(".card__det--text2");
let textDet2 = document.querySelector(".elTexto2");
let span2 = document.querySelector('.card__det--span2')

let button3 = document.getElementById("but3");
let butText3 = document.querySelector("#but3 > .card__but--text");
let chevDown3 = document.querySelector("#but3 > .card__but--down");
let chevRight3 = document.querySelector("#but3 > .card__but--right");
let info3 = document.getElementById("info3");
let card3 = document.getElementById("card3");
let text3 = document.querySelector(".card__det--text3");
let textDet3 = document.querySelector(".elTexto3");
let span3 = document.querySelector('.card__det--span3')

const bajarInfo1 = () => {
  info1.classList.toggle("bajar");
  info2.classList.remove("bajar");
  info3.classList.remove("bajar");
  card1.classList.toggle("lightBlue");
  card2.classList.remove("turquoise");
  card3.classList.remove("grey");
  text1.classList.toggle("fontWhite");
  span1.classList.toggle("fontWhite");
  textDet1.classList.toggle("fontWhite");
  text2.classList.remove("fontBlue");
  span2.classList.remove("fontBlue");
  textDet2.classList.remove("fontBlue");
  text3.classList.remove("fontViolet");
  span3.classList.remove("fontViolet");
  textDet3.classList.remove("fontViolet");
  button1.classList.add("ampliado1");
  butText1.style.display = "block";
  chevDown1.style.display = "block";
  chevDown1.style.transform = "rotate(0)";
  chevRight1.style.display = "none";
  button2.classList.remove("ampliado2");
  butText2.style.display = "none";
  chevDown2.style.display = "none";
  chevDown2.style.transform = "rotate(0)";
  chevRight2.style.display = "block";
  button3.classList.remove("ampliado3");
  butText3.style.display = "none";
  chevDown3.style.display = "none";
  chevDown3.style.transform = "none";
  chevRight3.style.display = "block";
};
button1.addEventListener("click", bajarInfo1);

const bajarInfo2 = () => {
  info1.classList.remove("bajar");
  info2.classList.toggle("bajar");
  info3.classList.remove("bajar");
  card1.classList.remove("lightBlue");
  card2.classList.toggle("turquoise");
  card3.classList.remove("grey");
  text1.classList.remove("fontWhite");
  span1.classList.remove("fontWhite");
  textDet1.classList.remove("fontWhite");
  text2.classList.toggle("fontBlue");
  span2.classList.toggle("fontBlue");
  textDet2.classList.toggle("fontBlue");
  text3.classList.remove("fontViolet");
  span3.classList.remove("fontViolet");
  textDet3.classList.remove("fontViolet");
  button1.classList.remove("ampliado1");
  butText1.style.display = "none";
  chevDown1.style.display = "none";
  chevDown1.style.transform = "none";
  chevRight1.style.display = "block";
  button2.classList.add("ampliado2");
  butText2.style.display = "block";
  chevDown2.style.display = "block";
  chevDown2.style.transform = "rotate(0)";
  chevRight2.style.display = "none";
  button3.classList.remove("ampliado3");
  butText3.style.display = "none";
  chevDown3.style.display = "none";
  chevDown3.style.transform = "none";
  chevRight3.style.display = "block";
};
button2.addEventListener("click", bajarInfo2);

const bajarInfo3 = () => {
  info1.classList.remove("bajar");
  info2.classList.remove("bajar");
  info3.classList.toggle("bajar");
  card1.classList.remove("lightBlue");
  card2.classList.remove("turquoise");
  card3.classList.toggle("grey");
  text1.classList.remove("fontWhite");
  span1.classList.remove("fontWhite");
  textDet1.classList.remove("fontWhite");
  text2.classList.remove("fontBlue");
  span2.classList.remove("fontBlue");
  textDet2.classList.remove("fontBlue");
  text3.classList.toggle("fontViolet");
  span3.classList.toggle("fontViolet");
  textDet3.classList.toggle("fontViolet");
  button1.classList.remove("ampliado1");
  butText1.style.display = "none";
  chevDown1.style.display = "none";
  chevDown1.style.transform = "none";
  chevRight1.style.display = "block";
  button2.classList.remove("ampliado2");
  butText2.style.display = "none";
  chevDown2.style.display = "none";
  chevDown2.style.transform = "rotate(0)";
  chevRight2.style.display = "block";
  button3.classList.add("ampliado3");
  butText3.style.display = "block";
  chevDown3.style.display = "block";
  chevDown3.style.transform = "rotate(0)";
  chevRight3.style.display = "none";
};
button3.addEventListener("click", bajarInfo3);

//--------------- efecto menu ---------------//
let barNav = $('nav')
function navHeight (){
  barNav.toggleClass('scrollNav', scrollY > 200)
    $('.brand').toggleClass('scrollBrand', scrollY > 200)
}
window.addEventListener('scroll', navHeight)


let btnUp = $('.btnUp')
function btnUpShow (){
  btnUp.toggleClass('showUp', scrollY > 600)
}
window.addEventListener('scroll', btnUpShow)

/* ----- pop up ----- */

let popUp = document.querySelector('.popUp')
let closePop = document.querySelector('.closePop')
let closePop2 = document.querySelector('.closePop2')

function startPopUp(){
  setTimeout(function showPopUp(){   
    popUp.style.display ="flex";
  }, 4000 );
}
  
startPopUp()

function cerrarPop (e) {
  e.preventDefault()
    /* popUp.style.display = "none";   */
    popUp.classList.add('popUpNone');
}
closePop.addEventListener('click', cerrarPop);

