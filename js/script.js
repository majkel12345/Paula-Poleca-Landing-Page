var nav = document.querySelector("#nav");
var menu = document.querySelector("#nav .icon");
menu.onclick = function() {
    nav.classList.toggle('responsive');
}

var option = document.querySelectorAll('.nav a:not(.icon)');
option.forEach(function(item){
    item.onclick = function() {
        if(nav.classList.contains('responsive'))
            nav.classList.toggle('responsive');
    }
});



