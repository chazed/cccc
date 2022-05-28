let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
/*let formBtn = document.querySelector('#register-btn');
let registerForm = document.querySelector('.register-form-container');
let formClose = document.querySelector('#form-close');
let formeBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let formeClose = document.querySelector('#forme-close');*/
 
/*let videoBtn = document.querySelectorAll('.vid-btn');
let card =document.getElementById("card");
let notifbtn= document.querySelector('.notifi-box');

    function openinscriptionC(){
      card.style.transform = "rotateY(0deg)";
    }
    function openinscriptionAg(){
        card.style.transform = "rotateY(-180deg)";
    }

    menu.addEventListener('click', () =>{
        menu.classList.toggle('fa-times');
        navbar.classList.toggle('active');
    });
    */
    searchBtn.addEventListener('click', () =>{
        searchBtn.classList.toggle('fa-times');
        searchBar.classList.toggle('active');
    });
    
  /*  formBtn.addEventListener('click', () =>{
        registerForm.classList.add('active');
    });
    formeBtn.addEventListener('click', () =>{
        loginForm.classList.add('active');
    });
    
    formeClose.addEventListener('click', () =>{
        loginForm.classList.remove('active');
    });
    formClose.addEventListener('click', () =>{
        registerForm.classList.remove('active');
    });
    
    videoBtn.forEach(btn =>{
        btn.addEventListener('click', ()=>{
            document.querySelector('.controls .active').classList.remove('active');
            btn.classList.add('active');
            let src = btn.getAttribute('data-src');
            document.querySelector('#video-slider').src = src;
        });
    });*/
    var swiper = new Swiper(".review-slider", {
        spaceBetween: 20,
        loop:true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        breakpoints: {
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
        },
    });
    
    var box  = document.getElementById('box');
    var down = false;
    
    
  /*  function toggleNotifi(){
        if (down) {
            box.style.height  = '0px';
            box.style.opacity = 0;
            down = false;
        }else {
            box.style.height  = '510px';
            box.style.opacity = 1;
            down = true;
        }
    }
     */