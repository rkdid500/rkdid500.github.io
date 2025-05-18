gsap.registerPlugin(ScrollTrigger);
  
  const horizontal = document.querySelector('.horizontal');
  const panels = gsap.utils.toArray('.panel');
  const panelCount = panels.length;


    document.querySelectorAll(".split").forEach(text => {
  let theText = text.innerText;
  let newText = "";
  let line = ".bar";

  for(let i=0; i<text.innerText.length; i++){
      newText += "<span aria-hidden='true'>";
      if (text.innerText[i] == " "){
          newText += " "
      } else {
          newText += text.innerText[i];
      }
      newText += "</span>";
  }
  text.innerHTML = newText;
  text.setAttribute("aria-label", theText);
});
    gsap.from(".split span",{
      y:100,
      autoAlpha:0,
      duration:3,
      scrub:true,
      ease: "circ.out",
      stagger:{
        amount:1,
        from:"random"
      }
    });
    
    // 디자인 소개 구간간

    // console.clear();

    // ScrollTrigger.create({
    //     // animation:ani1,
    //     trigger:".section03",
    //     markers:true, 
    //     start:"center center", 
    //     end:"+=1500",
    //     pin:true,
    //     // scrub:true,
    //     id:"box1",
    //     // anticipatePin:2,
    //   });
    
    const sections = gsap.utils.toArray(".slide");
    const images = gsap.utils.toArray(".image").reverse();
    const slideImages = gsap.utils.toArray(".slide_img");
    const outerWrappers = gsap.utils.toArray(".slide_outer");
    const innerWrappers = gsap.utils.toArray(".slide_inner");
    const count = document.querySelector(".count");
    const wrap = gsap.utils.wrap(0, sections.length);
    let animating;
    let currentIndex = 0;
    
    gsap.set(outerWrappers, { xPercent: 100 });
    gsap.set(innerWrappers, { xPercent: -100 });
    gsap.set(".slide:nth-of-type(1) .slide_outer", { xPercent: 0 });
    gsap.set(".slide:nth-of-type(1) .slide_inner", { xPercent: 0 });
    
    function gotoSection(index, direction) {
     animating = true;
     index = wrap(index);
    
     let tl = gsap.timeline({
      defaults: { duration: 1, ease: "expo.inOut" },
      onComplete: () => {
       animating = false;
      }
     });
    
     let currentSection = sections[currentIndex];
     let heading = currentSection.querySelector(".slide_heading");
     let nextSection = sections[index];
     let nextHeading = nextSection.querySelector(".slide_heading");
    
     gsap.set([sections, images], { zIndex: 0, autoAlpha: 0 });
     gsap.set([sections[currentIndex], images[index]], { zIndex: 1, autoAlpha: 1 });
     gsap.set([sections[index], images[currentIndex]], { zIndex: 2, autoAlpha: 1 });
    
     tl
      .set(count, { text: index + 1 }, 0.32)
      .fromTo(
       outerWrappers[index],
       {
        xPercent: 100 * direction
       },
       { xPercent: 0 },
       0
      )
      .fromTo(
       innerWrappers[index],
       {
        xPercent: -100 * direction
       },
       { xPercent: 0 },
       0
      )
      .to(
       heading,
       {
        "--width": 800,
        xPercent: 30 * direction
       },
       0
      )
      .fromTo(
       nextHeading,
       {
        "--width": 800,
        xPercent: -30 * direction
       },
       {
        "--width": 200,
        xPercent: 0
       },
       0
      )
      .fromTo(
       images[index],
       {
        xPercent: 125 * direction,
        scaleX: 1.5,
        scaleY: 1.3
       },
       { xPercent: 0, scaleX: 1, scaleY: 1, duration: 1 },
       0
      )
      .fromTo(
       images[currentIndex],
       { xPercent: 0, scaleX: 1, scaleY: 1 },
       {
        xPercent: -125 * direction,
        scaleX: 1.5,
        scaleY: 1.3
       },
       0
      )
      .fromTo(
       slideImages[index],
       {
        scale: 2
       },
       { scale: 1 },
       0
      )
      .timeScale(0.8);
    
     currentIndex = index;
    }
    
    Observer.create({
     type: "wheel,touch,pointer",
     preventDefault: true,
     wheelSpeed: -1,
     onUp: () => {
      console.log("down");
      if (animating) return;
      gotoSection(currentIndex + 1, +1);
     },
     onDown: () => {
      console.log("up");
      if (animating) return;
      gotoSection(currentIndex - 1, -1);
     },
     tolerance: 10
    });
    
    document.addEventListener("keydown", logKey);
    
    function logKey(e) {
     console.log(e.code);
     if ((e.code === "ArrowUp" || e.code === "ArrowLeft") && !animating) {
      gotoSection(currentIndex - 1, -1);
     }
     if (
      (e.code === "ArrowDown" ||
       e.code === "ArrowRight" ||
       e.code === "Space" ||
       e.code === "Enter") &&
      !animating
     ) {
      gotoSection(currentIndex + 1, 1);
     }
    }

// 마지막 자기소개 구간간

    const ani2 = gsap.timeline({
      defaults:{autoAlpha:0,}
    });
    ani2.from(".section04",{
      y:-50,
    })
    ScrollTrigger.create({
      animation:ani2,
      trigger:".section04",
      //markers:true, 
      start:"top top", 
      // end:"+=2000",
      pin:true,
      scrub:true,
      id:"box2",
      anticipatePin:1,
    });

    gsap.utils.toArray(".section_content").forEach((item) => {
      ScrollTrigger.create({
          trigger: item,
          start: "top 30%",
          end: "bottom 70%",
          scrub:true,
          onEnter: () => {animate(item)}, 
      });
  
      item.style.opacity = "0";
  });

  const animate = (item) => {
    gsap.fromTo(item, 
        {autoAlpha: 0, x: 0, y: 0 ,scale:0}, 
        {autoAlpha: 1, x: 0, y: 100, duration: 2, overwrite: "auto", ease: "expo",scale:0.8}
    )
}

const lenis = new Lenis();

lenis.on('scroll', (e) => {
    console.log(e);
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


// section03 구간 (디자인소개)

// console.clear();

// ScrollTrigger.create({
//     // animation:ani1,
//     trigger:".section03",
//     markers:true, 
//     start:"center center", 
//     end:"+=2000",
//     pin:true,
//     scrub:true,
//     id:"box1",
//     anticipatePin:2,
//   });

// const sections = gsap.utils.toArray(".slide");
// const images = gsap.utils.toArray(".image").reverse();
// const slideImages = gsap.utils.toArray(".slide_img");
// const outerWrappers = gsap.utils.toArray(".slide_outer");
// const innerWrappers = gsap.utils.toArray(".slide_inner");
// const count = document.querySelector(".count");
// const wrap = gsap.utils.wrap(0, sections.length);
// let animating;
// let currentIndex = 0;

// gsap.set(outerWrappers, { xPercent: 100 });
// gsap.set(innerWrappers, { xPercent: -100 });
// gsap.set(".slide:nth-of-type(1) .slide_outer", { xPercent: 0 });
// gsap.set(".slide:nth-of-type(1) .slide_inner", { xPercent: 0 });

// function gotoSection(index, direction) {
//  animating = true;
//  index = wrap(index);

//  let tl = gsap.timeline({
//   defaults: { duration: 1, ease: "expo.inOut" },
//   onComplete: () => {
//    animating = false;
//   }
//  });

//  let currentSection = sections[currentIndex];
//  let heading = currentSection.querySelector(".slide_heading");
//  let nextSection = sections[index];
//  let nextHeading = nextSection.querySelector(".slide_heading");

//  gsap.set([sections, images], { zIndex: 0, autoAlpha: 0 });
//  gsap.set([sections[currentIndex], images[index]], { zIndex: 1, autoAlpha: 1 });
//  gsap.set([sections[index], images[currentIndex]], { zIndex: 2, autoAlpha: 1 });

//  tl
//   .set(count, { text: index + 1 }, 0.32)
//   .fromTo(
//    outerWrappers[index],
//    {
//     xPercent: 100 * direction
//    },
//    { xPercent: 0 },
//    0
//   )
//   .fromTo(
//    innerWrappers[index],
//    {
//     xPercent: -100 * direction
//    },
//    { xPercent: 0 },
//    0
//   )
//   .to(
//    heading,
//    {
//     "--width": 800,
//     xPercent: 30 * direction
//    },
//    0
//   )
//   .fromTo(
//    nextHeading,
//    {
//     "--width": 800,
//     xPercent: -30 * direction
//    },
//    {
//     "--width": 200,
//     xPercent: 0
//    },
//    0
//   )
//   .fromTo(
//    images[index],
//    {
//     xPercent: 125 * direction,
//     scaleX: 1.5,
//     scaleY: 1.3
//    },
//    { xPercent: 0, scaleX: 1, scaleY: 1, duration: 1 },
//    0
//   )
//   .fromTo(
//    images[currentIndex],
//    { xPercent: 0, scaleX: 1, scaleY: 1 },
//    {
//     xPercent: -125 * direction,
//     scaleX: 1.5,
//     scaleY: 1.3
//    },
//    0
//   )
//   .fromTo(
//    slideImages[index],
//    {
//     scale: 2
//    },
//    { scale: 1 },
//    0
//   )
//   .timeScale(0.8);

//  currentIndex = index;
// }

// Observer.create({
//  type: "wheel,touch,pointer",
//  preventDefault: true,
//  wheelSpeed: -1,
//  onUp: () => {
//   console.log("down");
//   if (animating) return;
//   gotoSection(currentIndex + 1, +1);
//  },
//  onDown: () => {
//   console.log("up");
//   if (animating) return;
//   gotoSection(currentIndex - 1, -1);
//  },
//  tolerance: 10
// });

// document.addEventListener("keydown", logKey);

// function logKey(e) {
//  console.log(e.code);
//  if ((e.code === "ArrowUp" || e.code === "ArrowLeft") && !animating) {
//   gotoSection(currentIndex - 1, -1);
//  }
//  if (
//   (e.code === "ArrowDown" ||
//    e.code === "ArrowRight" ||
//    e.code === "Space" ||
//    e.code === "Enter") &&
//   !animating
//  ) {
//   gotoSection(currentIndex + 1, 1);
//  }
// }