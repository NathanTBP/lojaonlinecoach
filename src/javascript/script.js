 document.querySelector('#button_entrar').addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById('card_login').style.display='block';
})

document.querySelector('#button_to_register').addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById('card_login').style.display='none';
    document.getElementById('card_register').style.display='block';
})

document.querySelector('#button_to_login').addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById('card_register').style.display='none';
    document.getElementById('card_login').style.display='block';
})

document.querySelector('#close_login').addEventListener("click", function() {
    document.getElementById('card_login').style.display='none';
})

document.querySelector('#close_register').addEventListener("click", function() {
    document.getElementById('card_register').style.display='none';
})

