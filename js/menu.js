//const nav = document.querySelector('nav');

$(window).scroll(function(){
    const top = $(window).scrollTop();

    if (top > 300){
        $('nav').addClass('small');
        $('.translate').addClass('small__button')
    } else {
        $('nav').removeClass('small');
        $('.translate').removeClass('small__button')
    }
});

const body = document.querySelector('body');
const btnUp = document.createElement('button');
const iTag = document.createElement('i');
iTag.classList.add('up');

//btnUp.classList.add('up_button');
body.appendChild(iTag);

$(window).scroll(function(){
    const top = $(window).scrollTop();

    if (top > 300){
        iTag.classList.remove('hidden');
    } else {
        iTag.classList.add('hidden');
    }
});

iTag.addEventListener('click', () => {
    $('html, body').animate({scrollTop:0}, '200');
})