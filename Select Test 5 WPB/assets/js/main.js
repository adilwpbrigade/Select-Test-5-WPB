/* ---------------------------------------------
   NAVBAR + MOBILE MENU
--------------------------------------------- */
$(document).ready(function () {

  const $btn = $("#toggle-btn");
  const $navbar = $("#navbar");

  // Toggle mobile menu
  $btn.on("click", function () {
    $navbar.slideToggle(300, function () {

      // When navbar closes, close submenu also
      if (!$navbar.is(":visible")) {
        $(".sub-menu").slideUp(300);
        $(".arrow").removeClass("open");
      }
    });

    $("body").toggleClass("no-scroll");

    // Change hamburger icon
    if ($btn.hasClass("open")) {
      $btn.attr("src", "assets/images/hamburger.svg").removeClass("open");
    } else {
      $btn.attr("src", "assets/images/hamburger-cross.svg").addClass("open");
    }
  });

  // Mobile submenu toggle
  $(".arrow").click(function () {
    if ($(window).width() <= 767) {
      $(this).siblings(".sub-menu").stop(true, true).slideToggle(300);
      $(this).toggleClass("open");
    }
  });

  // Reset on resize
  $(window).on("resize", function () {
    if ($(window).width() > 767) {
      $navbar.show();
      $btn.attr("src", "assets/images/hamburger.svg").removeClass("open");
      $("body").removeClass("no-scroll");
    } else {
      if (!$btn.hasClass("open")) {
        $navbar.hide();
      }
    }
  }).trigger("resize");

});

// Extra resize cleanup
$(window).resize(function () {
  if ($(window).width() > 767) {
    $("#navbar, .sub-menu").removeAttr("style");
    $("body").removeClass("no-scroll");
    $(".arrow").removeClass("open");
  }
});


/* ---------------------------------------------
   NOTIFICATION BAR CLOSE
--------------------------------------------- */
function notificationbar() {
  document.getElementById("notification-bar").style.display = "none";
}


/* ---------------------------------------------
   FOOTER YEAR SET
--------------------------------------------- */
document.getElementById("year").textContent = new Date().getFullYear();


/* ---------------------------------------------
   ACCORDION (NORMAL)
--------------------------------------------- */
$(document).ready(function () {

  $(".accordion-item:first")
    .addClass("active")
    .find(".accordion-content")
    .slideDown(300);

  $(".accordion-header").on("click", function () {
    let $item = $(this).closest(".accordion-item");

    if ($item.hasClass("active")) {
      $item.removeClass("active").find(".accordion-content").slideUp(300);
    } else {
      $(".accordion-item").removeClass("active").find(".accordion-content").slideUp(300);
      $item.addClass("active").find(".accordion-content").slideDown(300);
    }
  });

});


/* ---------------------------------------------
   HANDSHAKE ACCORDION
--------------------------------------------- */
$(document).ready(function () {

  const $handshake = $("#handshake-accordion");

  $handshake.find(".handshake-accordion-content").last().slideDown(300);
  $handshake.find(".handshake-accordion-header").last().addClass("active");

  $(".handshake-accordion-header").on("click", function () {
    const $header = $(this);
    const $content = $header.next(".handshake-accordion-content");

    if ($header.hasClass("active")) {
      $header.removeClass("active");
      $content.slideUp(300);
    } else {
      $(".handshake-accordion-header").removeClass("active");
      $(".handshake-accordion-content").slideUp(300);

      $header.addClass("active");
      $content.slideDown(300);
    }
  });

});


/* ---------------------------------------------
   SELECT SWIPER
--------------------------------------------- */
const selectswiper = new Swiper(".selectSwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: false,
  navigation: {
    nextEl: '.selectswiper-button-next',
    prevEl: '.selectswiper-button-prev',
  },
  breakpoints: {
    600: { slidesPerView: 2 },
    768: { slidesPerView: 3, spaceBetween: 20 },
    1200: { slidesPerView: 4, spaceBetween: 30 }
  },
  on: {
    init() { toggleNav(this); },
    resize() { toggleNav(this); }
  }
});

// Hide navigation when not needed
function toggleNav(swiper) {
  const prev = document.querySelector('.selectswiper-button-prev');
  const next = document.querySelector('.selectswiper-button-next');

  const show = !swiper.isLocked;
  prev.style.display = show ? 'block' : 'none';
  next.style.display = show ? 'block' : 'none';
}


/* ---------------------------------------------
   PROPERTY SWIPER
--------------------------------------------- */
const propertySwiper = new Swiper('#propertySelection .property-swiper', {
  slidesPerView: 3,
  spaceBetween: 30,
  navigation: {
    nextEl: '#propertySelection .property-swiper-button-next',
    prevEl: '#propertySelection .property-swiper-button-prev',
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    601: { slidesPerView: 2, spaceBetween: 20 },
    768: { slidesPerView: 3, spaceBetween: 15 },
    1024: { slidesPerView: 3, spaceBetween: 30 }
  }
});


/* ---------------------------------------------
   APPOINTMENT SWIPER
--------------------------------------------- */
const appointmentswiper = new Swiper(".appointmentSwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: false,
  navigation: {
    nextEl: ".appointmentswiper-button-next",
    prevEl: ".appointmentswiper-button-prev",
  },
  pagination: {
    el: ".appointmentswiper-pagination",
    clickable: true,
  },
  breakpoints: {
    600: { slidesPerView: 1, spaceBetween: 10 },
    768: { slidesPerView: 2, spaceBetween: 20 },
    1170: { slidesPerView: 3, spaceBetween: 30 },
  },
  on: {
    init() {
      appointmenttoggleNav(this);
      appointmentDisableButtons(this);
    },
    slideChange() {
      appointmentDisableButtons(this);
    },
    resize() {
      appointmenttoggleNav(this);
      appointmentDisableButtons(this);
    },
  },
});

// SHOW/HIDE navigation if locked
function appointmenttoggleNav(swiper) {
  const prev = document.querySelector(".appointmentswiper-button-prev");
  const next = document.querySelector(".appointmentswiper-button-next");
  const pagination = document.querySelector(".appointmentswiper-pagination");

  const show = !swiper.isLocked;

  prev.style.display = show ? "block" : "none";
  next.style.display = show ? "block" : "none";
  if (pagination) pagination.style.display = show ? "flex" : "none";
}

// ENABLE/DISABLE buttons at edges
function appointmentDisableButtons(swiper) {
  const prev = document.querySelector(".appointmentswiper-button-prev");
  const next = document.querySelector(".appointmentswiper-button-next");

  if (!prev || !next) return;

  // prev button
  if (swiper.isBeginning) {
    prev.classList.add("disabled");
  } else {
    prev.classList.remove("disabled");
  }

  // next button
  if (swiper.isEnd) {
    next.classList.add("disabled");
  } else {
    next.classList.remove("disabled");
  }
}


/* ---------------------------------------------
   LOGO SWIPER
--------------------------------------------- */
const logoswiper = new Swiper(".logoSwiper", {
  slidesPerView: 1,
  spaceBetween: 0,
  navigation: {
    nextEl: '.logoswiper-button-next',
    prevEl: '.logoswiper-button-prev',
  },
  breakpoints: {
    600: { slidesPerView: 3 },
    768: { slidesPerView: 4 },
    1025: { slidesPerView: 5 },
    1200: { slidesPerView: 5 }
  }
});


/* ---------------------------------------------
   ZOOM SLIDER POPUP
--------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  const zoomSlider = new Swiper(".zoom-slider", {
    slidesPerView: 1,
    loop: false,
    navigation: {
      nextEl: ".zoom-swiper-button-next",
      prevEl: ".zoom-swiper-button-prev",
    },
    on: {
      init: function () {
        updateNavButtons(this);
      },
      slideChange: function () {
        updateNavButtons(this);
      }
    }
  });

  function updateNavButtons(swiper) {
    const prev = document.querySelector(".zoom-swiper-button-prev");
    const next = document.querySelector(".zoom-swiper-button-next");

    // Prev button
    if (swiper.isBeginning) {
      prev.classList.add("disabled");
    } else {
      prev.classList.remove("disabled");
    }

    // Next button
    if (swiper.isEnd) {
      next.classList.add("disabled");
    } else {
      next.classList.remove("disabled");
    }
  }

  const popup = document.getElementById("zoomPopup");
  const popupImg = document.getElementById("zoomPopupImg");
  const closeBtn = popup.querySelector(".zoom-close-popup");

  document.querySelectorAll(".zoom-slider .zoom-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const activeSlide = btn.closest(".swiper-slide").querySelector("img");
      popupImg.src = activeSlide.src;
      popup.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  closeBtn.addEventListener("click", () => {
    popup.classList.remove("active");
    document.body.style.overflow = "";
  });

  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});



/* ---------------------------------------------
   HANDSHAKE SWIPER (MOBILE ONLY)
--------------------------------------------- */
let handshakeSwiper;
const container = document.querySelector(".handshake-list");
const cards = [...document.querySelectorAll(".handshake-card-flex")];
const nextBtn = document.querySelector(".handshakeswiper-button-next");
const prevBtn = document.querySelector(".handshakeswiper-button-prev");

// Init on <768px
function initSwiper() {
  if (handshakeSwiper || window.innerWidth >= 768) return;

  container.classList.add("swiper");

  const wrapper = document.createElement("div");
  wrapper.classList.add("swiper-wrapper");

  cards.forEach(c => {
    c.classList.add("swiper-slide");
    wrapper.appendChild(c);
  });

  container.appendChild(wrapper);

  handshakeSwiper = new Swiper(container, {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: { nextEl: nextBtn, prevEl: prevBtn },
  });
}

// Destroy swiper on desktop
function destroySwiper() {
  if (!handshakeSwiper || window.innerWidth < 768) return;

  handshakeSwiper.destroy(true, true);
  handshakeSwiper = null;

  const wrapper = container.querySelector(".swiper-wrapper");

  [...wrapper.children].forEach(c => {
    c.classList.remove("swiper-slide");
    container.appendChild(c);
  });

  wrapper.remove();
  container.classList.remove("swiper");
}

// Toggle mobile/desktop swiper
const toggleSwiper = () =>
  window.innerWidth < 768 ? initSwiper() : destroySwiper();

window.addEventListener("load", toggleSwiper);
window.addEventListener("resize", toggleSwiper);
