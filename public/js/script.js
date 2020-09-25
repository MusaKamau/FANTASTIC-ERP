const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav__links');
  const navLinks = document.querySelectorAll('.nav__links li');


  burger.addEventListener('click', () => {
    // Toggle nav
    nav.classList.toggle('nav-active')

     // animate  nav__links
    navLinks.forEach((link, index) => {
      if(link.style.animation){
        link.style.animation = ``
      }else{
        link.style.animation = `navLinksFade 0.5s ease forwards ${index / 7 + 0.5}s`
      }
    })

    // Burger annimation
    burger.classList.toggle('toggle');
  })


}

const app = () => {
  navSlide();
}

app();
