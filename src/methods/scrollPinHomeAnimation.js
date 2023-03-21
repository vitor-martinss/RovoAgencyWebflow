// function scrollPinHomeAnimation() {
//   // function gsapFadeInAnimation() {
//   //   const staticFadeInAnimation = gsap.utils.toArray(
//   //     '[data-static-gsap="fade-in"]'
//   //   );
//   //   staticFadeInAnimation.forEach((staticFadeIn, i) => {
//   //     let delayedAnimation = 0;
//   //     if (staticFadeIn.hasAttribute("data-gsap-delay")) {
//   //       delayedAnimation =
//   //         Number(staticFadeIn.getAttribute("data-gsap-delay")) / 1000;
//   //     }

//   //     gsap.fromTo(
//   //       staticFadeIn,
//   //       {
//   //         autoAlpha: 0
//   //       },
//   //       {
//   //         duration: 0.5,
//   //         autoAlpha: 1,
//   //         delay: delayedAnimation
//   //       }
//   //     );
//   //   });
//   // }

//   // function gsapScrollTriggerFadeUp() {
//   //   const fadeUpContainer = gsap.utils.toArray('[data-gsap="fade-up"]');

//   //   fadeUpContainer.forEach((fadeUp, i) => {
//   //     const animationFadeUp = gsap.fromTo(
//   //       fadeUp,
//   //       {
//   //         autoAlpha: 0,
//   //         y: 50
//   //       },
//   //       {
//   //         duration: 0.5,
//   //         autoAlpha: 1,
//   //         y: 0
//   //       }
//   //     );
//   //     ScrollTrigger.create({
//   //       trigger: fadeUp,
//   //       start: "10% 80%",
//   //       animation: animationFadeUp,
//   //       toggleActions: "play none none none",
//   //       once: true
//   //     });
//   //   });
//   // }

//   function removeGsapAttributeValue() {
//     const staticFadeInAnimation = gsap.utils.toArray(
//       '[data-static-gsap="fade-in"]'
//     );
//     const fadeUpContainer = gsap.utils.toArray('[data-gsap="fade-up"]');

//     staticFadeInAnimation.forEach((staticFadeIn, i) => {
//       staticFadeIn.setAttribute("data-static-gsap", "");
//     });

//     fadeUpContainer.forEach((fadeUp, i) => {
//       fadeUp.setAttribute("data-gsap", "");
//     });
//   }

//   function gsapScrollTriggerAnimation() {
//     removeGsapAttributeValue();
//     gsap.to(window, {
//       duration: 0,
//       scrollTo: {
//         y: 0,
//         offsetY: 0
//       }
//     });
//   }

//   gsap.registerPlugin(ScrollTrigger);

//   const panels = gsap.utils.toArray(".rovo-js-gsap-pin");

//   //panels.pop(); // get rid of the last one (don't need it in the loop)
//   panels.forEach((panel, i) => {
//     //Get total scroll
//     //  getTotalScroll = () => {
//     //   let totalScroll = 0;
//     //   panel.forEach((section) => {
//     //     totalScroll += section.offsetHeight;
//     //   });
//     //   totalScroll -= win.h;
//     //   return totalScroll;
//     // };
//     let tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: panel,
//         start: "top top",
//         //end: "+=" + panel.offsetHeight,
//         markers: true,
//         pinSpacing: false,
//         pin: true,
//         scrub: true,
//         snap: {
//           snapTo: 1,
//           duration: { min: 0.2, max: 1 },
//           delay: 0.1,
//           ease: "power1.inOut"
//         },

//         //snap: 10,
//         // snap: {
//         //   snapTo: (value) => {
//         //     let labels = Object.values(tl.labels);

//         //     const snapPoints = labels.map((x) => x / tl.totalDuration());
//         //     const proximity = 0.1;

//         //     console.log(tl.labels, tl.totalDuration(), labels, snapPoints);

//         //     for (let i = 0; i < snapPoints.length; i++) {
//         //       if (
//         //         value > snapPoints[i] - proximity &&
//         //         value < snapPoints[i] + proximity
//         //       ) {
//         //         return snapPoints[i];
//         //       }
//         //     }
//         //   },
//         //   duration: { min: 0.2, max: 0.6 }
//         // },
//         // set the transformOrigin so that it's in the center vertically of the viewport when the element's bottom hits the bottom of the viewport
//         onRefresh: () =>
//           gsap.set(panel, {
//             transformOrigin:
//               "center " + (panel.offsetHeight - window.innerHeight / 2) + "px"
//           })
//       }
//     });

//     tl.fromTo(
//       panel,
//       1,
//       { y: 0, rotate: 0, opacity: 1 },
//       { y: 0, rotateX: 0, opacity: 0.5 },
//       0
//     ).to(panel, 0.1, { opacity: 0, duration: panel.offsetHeight });
//   });

//   // const triggers = [];

//   // const goToSection = (i, anim) => {
//   //   if (triggers[i]) {
//   //     // only if the trigger exists
//   //     gsap.to(window, {
//   //       scrollTo: { y: triggers[i].trigger, autoKill: false },
//   //       overwrite: true,
//   //       duration: 1
//   //     });
//   //     anim && anim.restart();
//   //   }
//   // };

//   // gsap.utils.toArray(".rovo-js-gsap-pin").forEach((panel, i) => {
//   //   const trigger = ScrollTrigger.create({
//   //     trigger: panel,
//   //     start: "top top",
//   //     end: "bottom bottom",
//   //     markers: true,
//   //     onEnter: () => goToSection(i),
//   //     onEnterBack: () => goToSection(i)
//   //   });
//   //   triggers.push(trigger);
//   // });
// }

// if (document.querySelector("#rovo-home-reels")) {
//   scrollPinHomeAnimation();
// }
