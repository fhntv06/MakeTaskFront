let body = document.querySelector("body");

let menuItem = document.querySelectorAll(".menu__item");
let arAnchorsMenuItem = document.querySelectorAll("a[href*='#']");

let headerMenuRect = document.querySelector(".header__menu__rect");
let headerMenuTopRect = document.querySelector(".header__menu__top-rect");
let headerMenuBottomRect = document.querySelector(".header__menu__bottom-rect");

let containerMenuVertical = document.querySelector(".container_menu-vertical");
let offsetTopContainerMenuVertical = containerMenuVertical.offsetTop;

let main = document.querySelector("main");

let arTypoHeadP = document.querySelectorAll(".typo__head p");
let classHave = false;

let typoContentR = document.querySelectorAll(".typo__content-r");
let containerContent = document.querySelector(".container__content");
let width = containerContent.offsetWidth;
let typoBody = document.querySelector(".typo__body");

let modal = document.querySelector(".modal");
let modalContent = document.querySelector(".modal__content");

// проверка на изменение экрана
window.addEventListener("resize", ()=>{
	width = containerContent.offsetWidth;
	// ширина для typo__content-r (строки секции "типография")
	for( let i = 0; i < typoContentR.length; i++ ){
		typoContentR[i].style.width = `${width}px`;
	}
});

// движение бокового меню
$(window).scroll(function(){
	if( window.scrollY > offsetTopContainerMenuVertical ){
		containerMenuVertical.style.top = `${window.scrollY - 300}px`;
	}
	else {
		containerMenuVertical.style.top = `${offsetTopContainerMenuVertical}px`;
	}
});

// плавный скролл + выделение пунктов меню  
for( let i = 0; i < arAnchorsMenuItem.length; i++ ){
	// скролл
  arAnchorsMenuItem[i].addEventListener("click", function (e) {
    e.preventDefault()
    const blockID = arAnchorsMenuItem[i].getAttribute("href").substr(1)  
    document.getElementById(blockID).scrollIntoView({
      behavior: "smooth",
      block: "start"
    })

		// выделение
		for( let i = 0; i < arAnchorsMenuItem.length; i++ ){
			menuItem[i].style.color = "";
		}
		menuItem[i].style.color = "rgb(62, 41, 227)";
  })
}

// ширина для typo__content-r (строки секции "типография")
for( let i = 0; i < typoContentR.length; i++ ){
	typoContentR[i].style.width = `${width}px`;
}

// слайдер typo__body секции "типография"
for( let i = 0; i < arTypoHeadP.length; i++ ){
	arTypoHeadP[i].addEventListener("click", function(){
		for( let i = 0; i < arTypoHeadP.length; i++ ){
			arTypoHeadP[i].classList.remove("p_active");	
		}
		this.classList.add("p_active");
		let setStyleLeft = this.dataset.tab * width;
		typoBody.style.left = `-${setStyleLeft}px`;
	});
}
arTypoHeadP[0].classList.add("p_active");

// проверка валидации E-mail
function ValidMail() {
	let re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
	let myMail = document.getElementById("email").value;
	let valid = re.test(myMail);
	if ( !valid ){
    document.querySelector(".text-error_hide").style.display = "block";
		document.querySelector("#email").style.borderBottom = "4px solid #E80F3B";
	}else{
		setTimeout(()=>{
			document.querySelector(".text-error_hide").style.display = "";
			document.querySelector("#email").style.borderBottom = "";
		}, 1000);
	}
	return valid;
}

// выпадающий список
$(".content__select").click(function(){
  $(this).toggleClass("open");
  $(".options",this).toggleClass("open");
	$(".ui__content__container .p_12").toggleClass("p_12-active");
});
$(".options li").click(function(){
	for(let i = 0; i < $(".options li").length; i++){
    $(".options li")[i].style.color = "";
  }
  let selection = $(this).text();
  let dataValue = $(this).attr("data-value");
	this.style.color = "#3D28E1";
	$(".ui__content__container .options").removeClass("p_12-active");
  $(".content__select__option span").text(selection);
  $(".content__select").attr("data-selected-value", dataValue);
});

// modal (открытие модального окна)
headerMenuRect.addEventListener("click", ()=>{
	modalContent.classList.toggle("modal__content-open");
	modal.classList.toggle("modal_opacity");
	
	main.classList.toggle("main_opacity");
	
	headerMenuTopRect.classList.toggle("top-rect-open");
	headerMenuBottomRect.classList.toggle("bottom-rect-open");

	body.classList.toggle("body_overflow-hide");
});




