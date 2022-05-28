let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');


let notifbtn= document.querySelector('.notifi-box');
notifbtn.addEventListener('click', () =>{
  notifbtn.classList.toggle('notifi-item');
  notifbtn.classList.toggle('active');
});
    
    menu.addEventListener('click', () =>{
        menu.classList.toggle('fa-times');
        navbar.classList.toggle('active');
    });