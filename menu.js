//const nav = document.querySelector('nav');

$(window).scroll(function(){
    const top = $(window).scrollTop();

    if (top > 300){
        $('nav').addClass('small');
    } else {
        $('nav').removeClass('small');
    }
});

const body = document.querySelector('body');
const btnUp = document.createElement('button');
btnUp.classList.add('up_button');
body.appendChild(btnUp);

$(window).scroll(function(){
    const top = $(window).scrollTop();

    if (top > 300){
        btnUp.classList.remove('hidden');
    } else {
        btnUp.classList.add('hidden');
    }
});

btnUp.addEventListener('click', () => {
    $('html, body').animate({scrollTop:0}, '200');
})