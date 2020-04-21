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