let formBtn = document.querySelector('#register-btn');
let registerForm = document.querySelector('.container text-center');
let card =document.getElementById("card");
formBtn.addEventListener('click', () =>{
    registerForm.classList.add('active');
});

formClose.addEventListener('click', () =>{
    registerForm.classList.remove('active');
});
function openinscriptionC(){
    card.style.transform = "rotateY(0deg)";
  }
  function openinscriptionAg(){
      card.style.transform = "rotateY(-180deg)";
  }
