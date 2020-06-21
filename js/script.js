(function() {

// NAV-MENU
// ====================================
var nav = document.querySelector("#nav");
var menu = document.querySelector("#nav .icon");
var options = document.querySelectorAll('.nav a:not(.icon)');

// active link 
const setActive = function(item) {
    let active = item.href.slice(item.href.indexOf('#')+1);
    switch(active) {
        case 'glowna': 
            item.classList.add('active');
            break;
        case 'oferta': 
            item.classList.add('active');
            break;
        case 'onas': 
            item.classList.add('active');
            break;
        default:
    }
}

// active link page
const mainActive = function() {
    let page = document.location.href;
    let links = document.querySelectorAll('.nav a:not(.icon)');
    let chosenLink = false;
    links.forEach(item => {

        item.classList.remove('active');
        if(item.href === page) {
            chosenLink = true;
            setActive(item);
        };
    });
    if(page.indexOf('#') === -1) {
        document.getElementById('mainPage').classList.add('active');
    }
};

// run active link page
mainActive();

// toggle responsive menu
menu.onclick = function() {
    nav.classList.toggle('responsive');
}

// menu responsive & set active link
options.forEach(function(item) {
    item.onclick = function() {
        if(nav.classList.contains('responsive')) {
            nav.classList.toggle('responsive');
        }
        options.forEach(it => {
            it.classList.remove('active');
        });
        setActive(item)
    }
});

const linkLogo = document.querySelector('.nav__link.logo');
linkLogo.addEventListener('click', function() {
    console.log('home');
    setActive(document.getElementById('mainPage'));

});


// COOKIE
// ====================================
const cookieNoticeBtn = document.querySelector('#cookie-accept');
const cookieNoticeBanner = document.querySelector('.cookie__notice');
const cookieDataResult = localStorage.getItem('cookie');

cookieNoticeBtn.addEventListener('click', () => {
        cookieNoticeBanner.style.display = 'none'
        const coockieData = localStorage.setItem('cookie', 'ok')
});

(function(){ 
    const cookieDataResult = localStorage.getItem('cookie');

    if (cookieDataResult === 'ok'){
        cookieNoticeBanner.style.display = 'none'
    
}})();


// SLIDER
// ====================================
const sliderImg = document.getElementsByClassName('slider_img__item');
const sliderBtnRight = document.querySelector('.fa-chevron-right');
const sliderBtnLeft = document.querySelector('.fa-chevron-left');

let slideIndex = 0;
let n = 0 ;

function showImagesinSlider () {

    for( i = 0; i < sliderImg.length; i++){
        sliderImg[slideIndex].classList.add("active")
    }

};


sliderBtnRight.addEventListener('click', () => {
    sliderImg[slideIndex].classList.remove("active")



    if (slideIndex >= 4) {
        slide = sliderImg[0]
        slideIndex = 0
        slide.classList.add("active")
    } else {
        slideIndex = slideIndex + 1
        showImagesinSlider();
    }

    }

);

    

sliderBtnLeft.addEventListener('click', () => {
    sliderImg[slideIndex].classList.remove("active")
    
	if (slideIndex <= 0){
        slide = sliderImg[5]
        slideIndex = 5;
        slide.classList.add("active")
	} else {
        console.log(slideIndex)
        slideIndex = slideIndex - 1
        showImagesinSlider();
         
	}
});

(function carusel () {
    for(let i=0; i<sliderImg.length; i++) {
        sliderImg[slideIndex].classList.remove("active");
    }

    slideIndex++

    if(slideIndex >= sliderImg.length) {
        slideIndex = 0;
    }

    sliderImg[slideIndex].classList.add("active");
    
    setTimeout(carusel, 5000)
  
})();

const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(".fas.fa-times")

// Translate

const buttonTrans = document.querySelector('.button__translate');
let langPl = true;

buttonTrans.addEventListener('click', () => {
    if(langPl) {
        buttonTrans.innerHTML = 'Polski <span><img src="./img/Flag/pl.png"/></span>';
        const words = document.querySelectorAll('[data-en]');   
        Array.from(words).forEach(word => {
            word.setAttribute('data-pl', word.innerText);       
            word.innerText = word.getAttribute('data-en');
        });
    } else {
        buttonTrans.innerHTML = 'English <span><img src="./img/Flag/eng.png"/></span>';
        const words = document.querySelectorAll('[data-pl]');
        Array.from(words).forEach(word => {
            word.setAttribute('data-en', word.innerText);
            word.innerText = word.getAttribute('data-pl');
            word.removeAttribute('data-pl');
        });
      }
      langPl = !langPl;
});

})();

