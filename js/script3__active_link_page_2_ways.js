const nav = document.querySelector("#nav");
const humberger = document.querySelector("#nav .icon");
const links = document.querySelectorAll('.nav a:not(.icon)');

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
    links.forEach(item => {
        item.classList.remove('active');
        if(item.href === page) {
            setActive(item);
        };
    });
    if(page.indexOf('#') === -1) {
        document.getElementById('glowna').classList.add('active');
    }
};

// run active link page
mainActive();

// toggle responsive humberger
humberger.onclick = function() {
    nav.classList.toggle('responsive');
}

// nav responsive & set active link
links.forEach(function(item) {
    item.onclick = function() {
        if(nav.classList.contains('responsive')) {
            nav.classList.toggle('responsive');
        }
        links.forEach(it => {
            it.classList.remove('active');
        });
        setActive(item)
    }
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


