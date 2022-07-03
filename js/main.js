//handle active status
function currentActive(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (event) => {
      elements.forEach((ele) => {
        ele.classList.remove("active");
      });
      event.currentTarget.classList.add("active");
    });
  });
}
//---------------------------------------------------------------------------------

//show and hide menu links --------------------------------------------------------
let burgerMenu = document.querySelector("header nav .menu");
burgerMenu.addEventListener("click", (ev) => {
  ev.target.previousElementSibling.style.display =
    ev.target.previousElementSibling.style.display === "flex" ? "none" : "flex";
});
document.addEventListener("click", (e) => {
  if (
    burgerMenu.previousElementSibling.style.display === "flex" &&
    e.target !== burgerMenu &&
    e.target !== burgerMenu.previousElementSibling
  ) {
    window.setTimeout(() => {
      burgerMenu.previousElementSibling.style.display = "none";
    }, 10);
  }
});
//---------------------------------------------------------------------------------

// opening and closing setting box ------------------------------------------------
let gear = document.querySelector(".set-box .gear");
gear.parentElement.addEventListener("click", (ev) => {
  if (ev.target === gear || ev.target === gear.firstChild) {
    gear.firstElementChild.classList.toggle("fa-spin");
    gear.parentElement.classList.toggle("open");
  } else {
    ev.stopPropagation();
  }
});
document.addEventListener("click", (e) => {
  if (
    gear.parentElement.classList.contains("open") &&
    e.target !== gear &&
    e.target !== gear.firstElementChild
  ) {
    window.setTimeout(() => {
      gear.firstElementChild.classList.toggle("fa-spin");
      gear.parentElement.classList.toggle("open");
    }, 10);
  }
});
//---------------------------------------------------------------------------------

// changing main color according to color options in setting box ------------------
let colorOptions = document.querySelectorAll(".set-box .colors .content span");
let aboutImg = document.querySelector(".about .container .figure img");
currentActive(colorOptions);
colorOptions.forEach((color) => {
  color.addEventListener("click", (ev) => {
    document.documentElement.style.setProperty(
      "--main-color",
      ev.target.dataset.color
    );
    window.localStorage.setItem("mainColor", ev.target.dataset.color);
    switchHue(ev.target.dataset.color);
  });
});
// getting mainColor from LocalStorage
if (localStorage.mainColor) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.mainColor
  );
  colorOptions.forEach((color) => {
    color.dataset.color === localStorage.mainColor
      ? color.classList.add("active")
      : color.classList.remove("active");
  });
  switchHue(localStorage.mainColor);
}
function switchHue(mainColor) {
  switch (mainColor) {
    case "#a327b8":
      aboutImg.style.filter = "hue-rotate(45deg)";
      break;
    case "#e91e63":
      aboutImg.style.filter = "hue-rotate(100deg)";
      break;
    case "#ff9800":
      aboutImg.style.filter = "hue-rotate(195deg)";
      break;
    default:
      aboutImg.style.filter = "hue-rotate(0deg)";
      break;
  }
}
//---------------------------------------------------------------------------------

//changing the background randomly ------------------------------------------------
let bgOption = localStorage.bgOption ? localStorage.bgOption : "yes";
let bgNum = localStorage.lastBg ? +localStorage.lastBg.slice(10, 12) : 1;
let bgInterval;
let bgChoices = document.querySelectorAll(".set-box > .backs .content span");
let header = document.getElementsByTagName("header")[0];
header.style.backgroundImage = window.localStorage.lastBg || "";
changeBg();
function changeBg() {
  bgChoices.forEach((choice) => {
    choice.dataset.bg === bgOption
      ? choice.classList.add("active")
      : choice.classList.remove("active");
  });
  if (bgOption === "yes") {
    clearInterval(bgInterval);
    bgInterval = setInterval(() => {
      bgNum = bgNum + 1 > 5 ? 1 : ++bgNum;
      header.style.backgroundImage = `url("imgs/0${bgNum}.jpg")`;
      window.localStorage.setItem("lastBg", header.style.backgroundImage);
    }, 5000);
    // /*another way to change backgrounds*/
    // let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
    // bgInterval = setInterval(() => {
    //   header.style.backgroundImage = `url("imgs/${
    //     imgsArray[Math.trunc(Math.random() * imgsArray.length)]
    //   }")`;
    // }, 5000);
  } else {
    clearInterval(bgInterval);
  }
}
bgChoices.forEach((choice) => {
  choice.addEventListener("click", (event) => {
    bgOption = event.currentTarget.dataset.bg;
    window.localStorage.setItem("bgOption", bgOption);
    window.localStorage.setItem("lastBg", header.style.backgroundImage);
    changeBg();
  });
});
//---------------------------------------------------------------------------------

//animating progress bars in our skills section -----------------------------------
let skillSec = document.getElementsByClassName("our-skills")[0];
let progBars = document.querySelectorAll(".our-skills .skill .level span");
window.addEventListener("scroll", (event) => {
  if (window.scrollY >= skillSec.offsetTop) {
    progBars.forEach((bar) => {
      bar.style.width = bar.dataset.prog;
    });
  }
});
//---------------------------------------------------------------------------------

//create pop up window on image click ---------------------------------------------
let pics = document.querySelectorAll(".gallery .pics .pic");
pics.forEach((pic) => {
  pic.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);
    let imgTitle = pic.firstElementChild.dataset.title;
    let popWindow = document.createElement("div");
    popWindow.className = "popup-window";
    popWindow.innerHTML = `
    ${imgTitle ? `<h3>${imgTitle}</h3>` : ""}
    <img src='${pic.firstElementChild.src}' alt='${
      pic.firstElementChild.alt
    }' />
    <span class='close'>X</span>
    `;
    document.body.appendChild(popWindow);
    document
      .querySelector(".popup-window .close")
      .addEventListener("click", (e) => {
        e.target.parentElement.remove();
        document.querySelector(".popup-overlay").remove();
      });
  });
});
//---------------------------------------------------------------------------------

// show and hide navigation bullets  ----------------------------------------------
let bulletOptions = window.localStorage.showBullets
  ? window.localStorage.showBullets
  : "yes";
let spans = document.querySelectorAll(".set-box > .bullets .content span");
let navBulletsDiv = document.querySelector(".nav-bullets");
showOrHide();
currentActive(spans);
spans.forEach((span) => {
  span.addEventListener("click", (e) => {
    bulletOptions = span.dataset.show;
    window.localStorage.showBullets = span.dataset.show;
    showOrHide();
  });
});
function showOrHide() {
  spans.forEach((span) => {
    span.dataset.show === bulletOptions
      ? span.classList.add("active")
      : span.classList.remove("active");
  });
  bulletOptions === "no"
    ? navBulletsDiv.style.setProperty("display", "none")
    : navBulletsDiv.style.removeProperty("display");
}
//change active on bullets when scrolling
let sections = document.querySelectorAll("section[id]");
let bullets = document.querySelectorAll(".nav-bullets a");
window.addEventListener("scroll", () => {
  sections.forEach((section) => {
    let secRect = section.getBoundingClientRect();
    let relatedBullet = document.querySelector(
      `.nav-bullets a[href="#${section.id}"]`
    );
    if (
      secRect.top < (window.innerHeight * 2) / 3 &&
      secRect.bottom > (window.innerHeight * 2) / 3
    ) {
      relatedBullet.classList.add("active");
    } else {
      relatedBullet.classList.remove("active");
    }
  });
  0;
});
//---------------------------------------------------------------------------------

// setting box reset button -------------------------------------------------------
document.querySelector(".set-box .reset").onclick = function () {
  document
    .querySelectorAll(".set-box .content span:first-child")
    .forEach((span) => {
      span.click();
    });
};
//---------------------------------------------------------------------------------
