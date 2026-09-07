/* Central Cariboo Islamic Center — site interactions */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initPreloader();
    initStickyHeader();
    initMobileMenu();
    initDropdowns();
    initSmoothScroll();
    initFaqAccordion();
    initDonationAmounts();
    initSwipers();
    initBackToTop();
    initReveal();
  });

  function initReveal() {
    var els = document.querySelectorAll(".wow");
    els.forEach(function (el) {
      var delay = el.getAttribute("data-wow-delay");
      if (delay) el.style.transitionDelay = delay;
    });
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("wow-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("wow-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
    // Safety net: force-reveal anything an observer edge case might miss.
    setTimeout(function () {
      document.querySelectorAll(".wow:not(.wow-in)").forEach(function (el) { el.classList.add("wow-in"); });
    }, 4000);
  }

  function initPreloader() {
    var pre = document.querySelector(".preloader");
    if (!pre) return;
    window.addEventListener("load", function () {
      pre.classList.add("preloader-hidden");
      setTimeout(function () { pre.style.display = "none"; }, 400);
    });
  }

  function initStickyHeader() {
    var sticky = document.querySelector(".sticky-header");
    if (!sticky) return;
    var toggle = function () {
      if (window.scrollY > 200) sticky.classList.add("fixed-header");
      else sticky.classList.remove("fixed-header");
    };
    window.addEventListener("scroll", toggle, { passive: true });
    toggle();
  }

  function initMobileMenu() {
    var togglers = document.querySelectorAll(".mobile-nav-toggler");
    var closeBtn = document.querySelector(".mobile-menu .close-btn");
    var backdrop = document.querySelector(".mobile-menu .menu-backdrop");
    var open = function () { document.body.classList.add("mobile-menu-visible"); };
    var close = function () { document.body.classList.remove("mobile-menu-visible"); };
    togglers.forEach(function (t) { t.addEventListener("click", open); });
    if (closeBtn) closeBtn.addEventListener("click", close);
    if (backdrop) backdrop.addEventListener("click", close);
  }

  function initDropdowns() {
    document.querySelectorAll(".mobile-menu .dropdown-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var li = btn.closest("li");
        var submenu = li.querySelector(":scope > ul");
        var isOpen = btn.classList.contains("active");
        li.parentElement.querySelectorAll(":scope > li > .dropdown-btn.active").forEach(function (openBtn) {
          if (openBtn !== btn) {
            openBtn.classList.remove("active");
            var sib = openBtn.closest("li").querySelector(":scope > ul");
            if (sib) sib.style.display = "none";
          }
        });
        btn.classList.toggle("active", !isOpen);
        if (submenu) submenu.style.display = isOpen ? "none" : "block";
      });
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href*="#"]').forEach(function (link) {
      var url = link.getAttribute("href");
      if (!url) return;
      var hashIndex = url.indexOf("#");
      if (hashIndex === -1) return;
      var hash = url.slice(hashIndex + 1);
      var path = url.slice(0, hashIndex);
      var samePage = path === "" || path === window.location.pathname.split("/").pop();
      if (!samePage || !hash) return;
      var target = document.getElementById(hash);
      if (!target) return;
      link.addEventListener("click", function (e) {
        e.preventDefault();
        document.body.classList.remove("mobile-menu-visible");
        var headerOffset = 110;
        var top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: top, behavior: "smooth" });
      });
    });
  }

  function initFaqAccordion() {
    document.querySelectorAll(".accordion-box3 .acc-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var block = btn.closest(".accordion");
        var list = block.closest(".accordion-box3");
        var wasActive = block.classList.contains("active-block");
        list.querySelectorAll(".accordion").forEach(function (b) {
          b.classList.remove("active-block");
          b.querySelector(".acc-btn").classList.remove("active");
          b.querySelector(".acc-content").classList.remove("current");
        });
        if (!wasActive) {
          block.classList.add("active-block");
          btn.classList.add("active");
          block.querySelector(".acc-content").classList.add("current");
        }
      });
    });
  }

  function initDonationAmounts() {
    document.querySelectorAll(".donation-form").forEach(function (form) {
      var input = form.querySelector(".donation-input");
      var buttons = form.querySelectorAll(".amount-btn");
      if (!input || !buttons.length) return;
      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          buttons.forEach(function (b) { b.classList.remove("active"); });
          if (btn.classList.contains("custom-btn")) {
            var val = window.prompt("Enter your donation amount (CAD)", "");
            var num = parseFloat(val);
            if (!isNaN(num) && num > 0) {
              btn.classList.add("active");
              input.value = "$" + num;
            }
            return;
          }
          btn.classList.add("active");
          input.value = "$" + btn.dataset.amount;
        });
      });
    });
  }

  function initSwipers() {
    if (typeof Swiper === "undefined") return;
    document.querySelectorAll(".inspiration-swiper").forEach(function (el) {
      new Swiper(el, {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        autoplay: { delay: 6000, disableOnInteraction: false },
        pagination: { el: el.querySelector(".swiper-pagination"), clickable: true },
        breakpoints: { 992: { slidesPerView: 2 } }
      });
    });
    document.querySelectorAll(".gallery-swiper").forEach(function (el) {
      new Swiper(el, {
        slidesPerView: 1.15,
        spaceBetween: 20,
        loop: true,
        autoplay: { delay: 3500, disableOnInteraction: false },
        breakpoints: { 576: { slidesPerView: 2.2 }, 992: { slidesPerView: 3.2 }, 1300: { slidesPerView: 4 } }
      });
    });
  }

  function initBackToTop() {
    var btn = document.querySelector(".back-to-top");
    if (!btn) return;
    window.addEventListener("scroll", function () {
      btn.classList.toggle("show", window.scrollY > 500);
    }, { passive: true });
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
