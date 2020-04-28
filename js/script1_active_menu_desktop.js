var nav = document.querySelector("#nav");
var menu = document.querySelector("#nav .icon");
menu.onclick = function() {
    nav.classList.toggle('responsive');
}

const setActive = function() {

}

var option = document.querySelectorAll('.nav a:not(.icon)');
option.forEach(function(item){
 
    item.onclick = function() {
        if(nav.classList.contains('responsive')) {
            nav.classList.toggle('responsive');

        }

        option.forEach(it => {
            // console.log(it);
                console.log(it);
                it.classList.remove('active');
        });

        // console.log(this);
        // this.classList.remove('active');  

        // console.log(item.href);
        // console.log(item.href.slice(item.href.indexOf('#')+1));
        let active = item.href.slice(item.href.indexOf('#')+1);
        switch(active) {
            case 'glowna': 
                console.log(active);
                item.classList.add('active');
                break;
            case 'oferta': 
                console.log(active);
                item.classList.add('active');
                break;
            case 'onas': 
                console.log(active);
                item.classList.add('active');
                break;
            default:
                console.log('default');
        }
    }
});

// var navLink = document.querySelectorAll('.nav .nav__link');
// navLink.forEach(function(item){
//     item.classList.remove('active'); 
//     item.addEventListener('click', function() {


//         navLink.forEach(it => {
//             // console.log(it);
//             if(it.className === 'nav__link') {
//                 console.log(it);
//                 it.classList.remove('active');
//             }
//         });

//         let active = item.href.slice(item.href.indexOf('#')+1);

//         switch(active) {
//             case 'onas': 
//                 console.log(active);
//                 item.classList.add('active');
//                 break;
//             case 'glowna': 
//                 console.log(active);
//                 item.classList.add('active');
//                 break;
//             default:
//                 console.log('default');
//         }
//     })
// });


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