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

// FORM
var form = document.querySelector('#mail__form');
form.onsubmit = function(e) {
    var email = this.email,
        checkbox = this.checkbox,
        message = document.getElementById('message'),
        msg = "";
    if(email.value === "") {
        msg += "Wypełnij pole email <br/>";
    }
    if(email.value !== "") {
        var reg = /\S+@\S+\.\S+/;
        test = reg.test(email.value);
        if(!test) {
            msg += "Wpisz poprawnie adres email <br/>";
        }
    }
    if(!checkbox.checked) {
        msg += "Zaznacz zgodę warunków bezpieczeństwa"
    }
    if(msg === "") {
        message.classList.remove("messageError");
        message.classList.add("messageSuccess");
        message.innerHTML = "Form sended...";
        // send form - not for real
        // return true;
    } else {
        message.classList.remove("messageSuccess");
        message.classList.add("messageError");
        message.innerHTML = msg;
        // send form stoped
        // return false;  
    }
    e.preventDefault();
};

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



const sliderImg = document.getElementsByClassName('slider_img__item');
const sliderBtnRight = document.querySelector('.fa-chevron-right');
const sliderBtnLeft = document.querySelector('.fa-chevron-left');

let slideIndex = 0;
let n = 1 ;

(function carusel () {
    for(let i=0; i<sliderImg.length; i++) {
        sliderImg[slideIndex].classList.remove("active");
        sliderImg[slideIndex].classList.add("slider_img__item");
    }

    slideIndex++

    if(slideIndex >= sliderImg.length) {
        slideIndex = 0;
    }

    sliderImg[slideIndex].classList.add("active");
    
    setTimeout(carusel, 5000)
  
})();


function showImagesinSlider () {

    for( i = 0; i < sliderImg.length; i++){
        sliderImg[i].classList.add("slider_img__item")    
        sliderImg[slideIndex].classList.add("active")

    }
};


sliderBtnRight.addEventListener('click', () => {
    sliderImg[slideIndex].classList.remove("active")

    if (slideIndex >= sliderImg.length - 1) {
    	slideIndex = 0
    } else {
        slideIndex += n
    	showImagesinSlider();
    }
});

    

sliderBtnLeft.addEventListener('click', () => {
    sliderImg[slideIndex -1].classList.remove("active")

	if (slideIndex <= 0){
		slideIndex = sliderImg.length - 1;
	} else {
        slideIndex -= n
        showImagesinSlider();
         
	}
});


