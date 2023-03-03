// This function helps add and remove js and css files during a page transition
// function loadjscssfile(filename, filetype) {
//   if (filetype == "js") {
//     //if filename is a external JavaScript file
//     const existingScript = document.querySelector('script[src="${filename}"]');
//     if (existingScript) {
//       existingScript.remove();
//     }
//     var fileref = document.createElement("script");
//     fileref.setAttribute("type", "text/javascript");
//     fileref.setAttribute("src", filename);
//   }
//   // else if (filetype == "css") {
//   //   //if filename is an external CSS file
//   //   const existingCSS = document.querySelector(`link[href='${filename}']`);
//   //   if (existingCSS) {
//   //     existingCSS.remove();
//   //   }
//   //   var fileref = document.createElement("link");
//   //   fileref.setAttribute("rel", "stylesheet");
//   //   fileref.setAttribute("type", "text/css");
//   //   fileref.setAttribute("href", filename);
//   // }
//   if (typeof fileref != "undefined")
//     document.getElementsByTagName("head")[0].appendChild(fileref);
// }

const resetWebflow = (next) => {
  const store = window.Webflow.require("ix2").store;

  let oldState;
  store.subscribe(() => {
    const ixSession = store.getState().ixSession;
    const eventState = ixSession.eventState;
    if (oldState !== eventState) {
      console.log(eventState);
      oldState = eventState;
    }
  });
  // let js = next.container.querySelectorAll("script");
  // if (js != null) {
  //   js.forEach((item) => {
  //     console.log(js);
  //     eval(item.innerHTML);
  //   });
  // }

  // const js = next.container.querySelectorAll("script");
  // console.log(js);
  // [].forEach.call(js, function (script) {
  //   console.log(script);
  //   window.eval(script.innerHTML);
  // });

  window.Webflow.push(function () {
    let parser = new DOMParser();
    let dom = parser.parseFromString(next.html, "text/html");
    let webflowPageId = $(dom).find("html").attr("data-wf-page");
    $("html").attr("data-wf-page", webflowPageId);
    window.Webflow && window.Webflow.destroy();
    window.Webflow && window.Webflow.ready();
    window.Webflow && window.Webflow.require("ix2").init();
    document.dispatchEvent(new Event("readystatechange"));
  });
};

const delayTransition = (n) => {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
};

const handleLeaveAboutOrContactPage = (currentContainer) => {
  const main = currentContainer.querySelector("main");

  // courtine white container going up
  const animatedDiv = document.createElement("div");
  animatedDiv.classList.add("rovo-main__animation");
  main.appendChild(animatedDiv);

  gsap.to(animatedDiv, {
    duration: 0.3,
    transform: "translateY(0)"
  });

  // fade out rovo-header-anchor__nav-wrapper
  const navWrapper = currentContainer.querySelector(
    ".rovo-header-anchor__list"
  );

  gsap.to(navWrapper, {
    duration: 0.5,
    opacity: 0
  });
};

const handleEnterAboutOrContactPage = (currentContainer) => {
  //const firstElementsOnPage = currentContainer.querySelector(".rovo-jumbotron");

  // fade out rovo-header-anchor__nav-wrapper
  const navWrapper = currentContainer.querySelector(
    ".rovo-header-anchor__list"
  );

  // const navItem = currentContainer.querySelectorAll(
  //   ".rovo-header-anchor__item"
  // );

  // navItem.forEach((el, index) => {
  //
  //
  // });

  gsap.to(navWrapper, {
    opacity: 1,
    duration: 0.1
  });

  gsap.to(currentContainer, {
    opacity: 1,
    duration: 0.1
  });
};

barba.hooks.before(() => {
  //window.Webflow && window.Webflow.destroy();
  window.scrollTo(0, 0);
  document.body.classList.add("overflow-hidden");
  document.querySelector("html").classList.add("overflow-hidden");
});

// barba.hooks.beforeEnter(({ current, next }) => {
//   const headerHeightScriptSrc =
//     "https://jz2oq8.csb.app/src/methods/asideHeaderHeightOnScroll.js";
//   // current.container
//   //   .querySelector(`script[src="${headerHeightScriptSrc}"]`)
//   //   .remove();
//   resetWebflow(current);
//   resetWebflow(next);
//   document.querySelector(`script[src="${headerHeightScriptSrc}"]`).remove();
//   const newScript = document.createElement("script");
//   newScript.src = headerHeightScriptSrc;
//   //newScript.async = true;
//   document.head.append(newScript);

//   // const currentScripts = current.container.querySelector(".w-embed.w-script");

//   // if (currentScripts) {

//   //   currentScripts.remove();
//   // }
//   // const nextEl = next.container;
//   // if (nextEl) {
//   //   //Just a little check to make sure we don't run this on an error
//   //   // Find all scripts in the next container
//   //   const nextScripts = nextEl.querySelectorAll("script");

//   //   //Iterate over incoming script tags
//   //   nextScripts.forEach((nextScript) => {
//   //     const src = nextScript.src;
//   //     //Duplicate check - no need to re-execute scripts that are already loaded.
//   //     if (
//   //       document.head.querySelector(`script[src="${src}"]`) == undefined
//   //     ) {
//   //       //Have to create a new script element in order for the browser to execute the code
//   //       const newScript = document.createElement("script");
//   //       newScript.src = src;
//   //       newScript.async = false;
//   //       document.head.append(newScript);

//   //       nextScript.remove(); // Cleaning up the script in the container;
//   //     }
//   //   });
//   //   nextEl.querySelector(".w-embed.w-script").remove();
//   //   resetWebflow(next);
//   // }
// });

barba.hooks.afterEnter(({ next }) => {
  window.scrollTo(0, 0);
  document.body.classList.remove("overflow-hidden");
  document.querySelector("html").classList.remove("overflow-hidden");
  //resetWebflow(next);
});

function handleDesktopPageTransitions() {
  if (window.innerWidth >= 768) {
    barba.init({
      views: [
        {
          namespace: "contact",
          after({ next }) {
            // do something before entering the `contact` namespace
            eval(
              next.container
                .querySelectorAll("script")
                .forEach((el) => el.innerHTML)
            );
          }
        }
      ],
      transitions: [
        {
          name: "curtain-transition",
          to: ["contact", "about"],
          async leave({ current }) {
            const done = this.async();
            //call page transition function
            handleLeaveAboutOrContactPage(current.container);
            //give a small delayTransition
            await delayTransition(500);
            done();
          },
          async enter({ next }) {
            const done = this.async();
            //call page transition function
            handleEnterAboutOrContactPage(next.container);
            //give a small delayTransition
            resetWebflow(next);
            await delayTransition(500);
            done();
          }
        }
      ]
    });
  }
}

// const customTransitionAnimation = () => {
//   const pageRouterLink = document.querySelectorAll(".rovo-js-nav-page");

//   const handleGSAPAnimation = (element, transformValue, duration) => {
//     const timeLine = new TimelineMax({ paused: true });
//     const animation = timeLine.to(element, {
//       duration,
//       transform: `${transformValue}`
//     });

//     animation.play();
//   };

//   pageRouterLink.forEach((el) => {
//     el.addEventListener("click", (evt) => {
//       evt.preventDefault();
//       // avoid scroll page
//       document.body.classList.add("overflow-hidden");
//       document.querySelector("html").classList.add("overflow-hidden");

//       let nextPageRoute = el.firstChild.getAttribute("href");

//       fetch(nextPageRoute, {
//         method: "GET"
//       })
//         .then((response) => {
//           if (response.status === 200) {
//             return response.text();
//           }
//         })
//         .then((data) => {
//           const getCurrentMain = document.querySelector(".rovo-main");
//           // create a div inside the main element
//           const animatedDiv = document.createElement("div");
//           animatedDiv.classList.add("rovo-main__animation");
//           getCurrentMain.appendChild(animatedDiv);
//           handleGSAPAnimation(animatedDiv, "translateY(0)", 0.3);

//           // fade out rovo-header-anchor__nav-wrapper
//           const getCurrentHeader = document.querySelector(
//             ".rovo-header-anchor__nav-wrapper"
//           );
//           gsap
//             .timeline({
//               paused: true,
//               defaults: { duration: 0.3 }
//             })
//             .to(getCurrentHeader, { opacity: 0 });

//           // parse body
//           const parser = new DOMParser();
//           const htmlDoc = parser.parseFromString(data, "text/html");
//           const body = htmlDoc.querySelector("body");

//           // select elements to animate
//           const navDesktop = document.querySelector(".rovo-js-nav-desktop");
//           const navMobile = document.querySelector(".rovo-js-nav-mobile");
//           const main = document.querySelector(".rovo-js-main");

//           // animate elements
//           handleGSAPAnimation(navDesktop, "translateX(-105%)", 0.5);
//           handleGSAPAnimation(navMobile, "translateX(105%)", 0.5);
//           handleGSAPAnimation(main, "translateX(-105%)", 0.5);

//           // wait for animation to finish
//           setTimeout(() => {
//             // remove old content
//             document.querySelector("body").remove();

//             // add new content
//             document.querySelector("html").appendChild(body);

//             // // reinitialize scripts
//             // handleDesktopPageTransitions();
//             // handleMobileNav();
//             // handleMobilePageTransitions();
//             // handleMobileNav();
//             // handleMobilePageTransitions();
//             // handleMobileNav();
//             // handleMobilePageTransitions();

//             // animate elements back in
//             handleGSAPAnimation(navDesktop, "translateX(0%)", 0.5);

//             handleGSAPAnimation(navMobile, "translateX(0%)", 0.5);

//             handleGSAPAnimation(main, "translateX(0%)", 0.5);

//             // reset scroll page
//             document.body.classList.remove("overflow-hidden");
//             document.querySelector("html").classList.remove("overflow-hidden");
//           }, 500);
//         })
//         .catch((err) => {
//           console.log(err);
//           // reset scroll page
//           document.body.classList.remove("overflow-hidden");
//           document.querySelector("html").classList.remove("overflow-hidden");
//         });
//     });
//   });
// };

// customTransitionAnimation();

// window.barba.hooks.ready(() => {
//   window.Webflow.require("ix2").init();
// });

handleDesktopPageTransitions();

window.addEventListener("resize", () => {
  handleDesktopPageTransitions();
});
