let formeBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let formeClose = document.querySelector('#forme-close');
let cardd =document.getElementById("cardd");
formeBtn.addEventListener('click', () =>{
    loginForm.classList.add('active');
});
formeClose.addEventListener('click', () =>{
    loginForm.classList.remove('active');
});
function openconnexionCl(){
    cardd.style.transform = "rotateY(0deg)";
  }
  function openconnexionAg(){
      cardd.style.transform = "rotateY(-180deg)";
  }