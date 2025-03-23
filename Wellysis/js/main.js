// jQuery
$(function(){
    // $(".nav").css("display","none");
    // let bool = true;
    // $(".nav_btn").click(function(){
    //     if(bool){
    //         $(".nav").css("display","block");
    //     }
    //     else{
    //         $(".nav").css("display","none");
    //     }
    //     bool = !bool;
    // });
    $(".nav").css("display","none");
    $(".nav_btn").click(function(){
        $(".nav").toggle();
    })
});

// Swiper

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    autoHeight : true,
    centeredSlides: false,
    loop:true,
    autoplay: {
      delay : 6000,
      disableOnInteraction: false,
  },
  speed:500,
  });


  document.querySelector(".nav").style.removeProperty("display");
