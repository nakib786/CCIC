var THEMEMASCOT = {};
(function ($) {
	("use strict");

	/* ---------------------------------------------------------------------- */
	/* --------------------------- Start Demo Switcher  --------------------- */
	/* ---------------------------------------------------------------------- */
	var showSwitcher = true;
	var $body = $("body");
	var $style_switcher = $("#style-switcher");
	if (!$style_switcher.length && showSwitcher) {
		$.ajax({
			url: "color-switcher/style-switcher.html",
			success: function (data) {
				$body.append(data);
			},
			dataType: "html",
		});
	}
	/* ---------------------------------------------------------------------- */
	/* ----------------------------- En Demo Switcher  ---------------------- */
	/* ---------------------------------------------------------------------- */

	THEMEMASCOT.isRTL = {
		check: function () {
			if ($("html").attr("dir") === "rtl") {
				return true;
			} else {
				return false;
			}
		},
	};

	THEMEMASCOT.isLTR = {
		check: function () {
			if ($("html").attr("dir") !== "rtl") {
				return true;
			} else {
				return false;
			}
		},
	};

	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if ($(".preloader").length) {
			$(".preloader").delay(200).fadeOut(500);
		}
	}
	$(document).ready(function () {
		$(".preloader-loaded").addClass("loaded");
		if ($(".preloader-loaded").hasClass("loaded")) {
			$("#preloader")
				.delay(750)
				.queue(function () {
					$(this).remove();
				});
		}
	});


    /* ================================
        Back To Top Button Js Start
    ================================ */
    var stickyHeaderActive = false;

    function getScrollTop() {
        if (typeof ScrollSmoother !== "undefined" && ScrollSmoother.get()) {
            return Math.abs(ScrollSmoother.get().scrollTop());
        }
        return $(window).scrollTop();
    }

    function handleBackToTop() {
        var scrollTop = getScrollTop();
        if (
            scrollTop + $(window).height() >= $(document).height() - 10
        ) {
            $('#back-top').addClass('show');
        } else {
            $('#back-top').removeClass('show');
        }
    }

	//Update Header Style and Scroll to Top
	function headerStyle() {
		if ($(".main-header").length) {
			var windowpos = getScrollTop();
			var scrollLink = $(".scroll-to-top");
			var sticky_header = $(".main-header .sticky-header");
			if (windowpos > 120 && !stickyHeaderActive) {
				stickyHeaderActive = true;
				sticky_header.addClass("fixed-header animated slideInDown");
				scrollLink.fadeIn(300);
			} else if (windowpos <= 80 && stickyHeaderActive) {
				stickyHeaderActive = false;
				sticky_header.removeClass("fixed-header animated slideInDown");
				scrollLink.fadeOut(300);
			}
		}
	}
	headerStyle();

	$(document).on('click', '#back-top', function (e) {
		e.preventDefault();
		if (typeof ScrollSmoother !== "undefined" && ScrollSmoother.get()) {
			ScrollSmoother.get().scrollTo(0, true);
		} else {
			$('html, body').animate({ scrollTop: 0 }, 800);
		}
	});

	//Submenu Dropdown Toggle
	if ($(".main-header li.dropdown ul").length) {
		$(".main-header .navigation li.dropdown").append(
			'<div class="dropdown-btn"><i class="fa fa-angle-down"></i></div>'
		);
	}

	//Mobile Nav Hide Show
	if ($(".mobile-menu").length) {
		var mobileMenuContent = $(".main-header .main-menu .navigation").html();

		$(".mobile-menu .navigation").append(mobileMenuContent);
		$(".sticky-header .navigation").append(mobileMenuContent);
		$(".mobile-menu .close-btn").on("click", function () {
			$("body").removeClass("mobile-menu-visible");
		});

		//Dropdown Button
		$(".mobile-menu li.dropdown .dropdown-btn").on("click", function () {
			$(this).prev("ul").slideToggle(500);
			$(this).toggleClass("active");
		});

		//Menu Toggle Btn
		$(".mobile-nav-toggler").on("click", function () {
			$("body").addClass("mobile-menu-visible");
		});

		//Menu Toggle Btn
		$(".mobile-menu .menu-backdrop, .mobile-menu .close-btn").on(
			"click",
			function () {
				$("body").removeClass("mobile-menu-visible");
			}
		);
	}

	//Header Search
	if ($(".search-btn").length) {
		$(".search-btn").on("click", function () {
			$(".main-header").addClass("moblie-search-active");
		});
		$(".close-search, .search-back-drop").on("click", function () {
			$(".main-header").removeClass("moblie-search-active");
		});
	}

	if ($('.testi-swiper-two').length) {
		var swiper = new Swiper(".testi-swiper-two", {
			speed:1200,
			loop: true,
			slidesPerView: 4,
			spaceBetween: 24,
			// autoplay: true,
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				1200: {
					slidesPerView: 3,
				},
				1400: {
					slidesPerView: 4,
				},
			},
      scrollbar: {
        el: ".swiper-scrollbar",
        draggable: false
      },
      on: {
        init: function () {
          var total = this.slides.length;
          $(".slide-total").text(('0' + total).slice(-2));
        },
        slideChange: function () {
          var current = this.realIndex + 1;
          $(".slide-current").text(('0' + current).slice(-2));
        }
      },
		});
	}

	// Home 2 banner Slider
	if ($(".banner2-slider").length) {
		var swiper = new Swiper(".banner2-slider", {
			slidesPerView: 1,
			spaceBetween: 0,
			speed: 600,
			loop: true,
		  navigation: {
		    nextEl: ".custom-next",
		    prevEl: ".custom-prev",
		  },
		  pagination: {
		    el: ".swiper-pagination",
		    type: "fraction",
		  },
		});
	}

	// Testinomials Carousel
	if ($(".testimonial-three-slider-top").length) {
		var swiper = new Swiper(".testimonial-three-slider-top", {
			slidesPerView: 2,
			spaceBetween: 24,
			speed: 500,
			loop: true,
			navigation: {
				nextEl: ".testimonial-ai-arry-next",
				prevEl: ".testimonial-ai-arry-prev",
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				991: {
					slidesPerView: 1,
				},
				1199: {
					slidesPerView: 2,
				},
			},
		});
	}

	if ($(".testimonial-three-slider-bottom").length) {
		var swiper = new Swiper(".testimonial-three-slider-bottom", {
			slidesPerView: 4,
			spaceBetween: 24,
			speed: 500,
			loop: true,
			// autoplay: true,
			centeredSlides: true,
			autoplay: {
				disableOnInteraction: true,
				reverseDirection: true,
			},

			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				767: {
					slidesPerView: 2,
				},
				991: {
					slidesPerView: 3,
				},
			},
		});
	}

	//testimonial-carousel Two
	if ($(".three-grid-slider").length) {
		var swiper = new Swiper(".three-grid-slider", {
			slidesPerView: "auto",
			spaceBetween: 30,
			speed:2000,
			loop: true,
			// autoplay: true,
			freeMode: true,
			freeModeMomentum: false,
			freeModeMomentumBounce: false,
			grabCursor: true,
			delay: 0,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 1,
				},
				991: {
					slidesPerView: 2,
				},
				1200: {
					slidesPerView: 3,
				},
				1400: {
					slidesPerView: 3,
				},
				1600: {
					slidesPerView: 3,
				},
			},
		});
	}

	var swiper = new Swiper(".case-sliderh4", {
	  slidesPerView: 2.5,
	  spaceBetween: 20,
	  loop: true,
	  navigation: {
	    nextEl: ".next-btn",
	    prevEl: ".prev-btn",
	  },
	  breakpoints: {
	    320: {
	      slidesPerView: 1
	    },
	    768: {
	      slidesPerView: 2
	    },
	    1200: {
	      slidesPerView: 2.5
	    }
	  }
	});

	// Home 5 Case Slider
	const caseSlider = new Swiper(".case-slider-home5", {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: ".caseh5-next",
      prevEl: ".caseh5-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 2,
      }
    }
	});

	// Home 5 Gallery Slider
	(function () {
	  const gallerySwiper = new Swiper(".gallery-slider-home5", {
		  slidesPerView: 2.7,
		  spaceBetween: 20,
		  centeredSlides: true,
		  loop: true,
		//   autoplay: {
		//     delay: 2500,
		//     disableOnInteraction: false,
		//   },
		  pagination: {
		    el: ".swiper-pagination",
		    clickable: true,
		  },
		  breakpoints: {
		    0: { slidesPerView: 1.2 },
		    576: { slidesPerView: 1.5 },
		    768: { slidesPerView: 2 },
		    1024: { slidesPerView: 2.7 },
		  },
		});
	})();


	// home 5 Testimonial Slider
  // Thumbnails slider
  var thumbsSwiper = new Swiper(".swiper-pagination-thumbs", {
    slidesPerView: 3,
    spaceBetween: 10,
    watchSlidesProgress: true,
  });
  // Main slider with fade + autoplay
  var mainSwiper = new Swiper(".testimonial-slider", {
    // effect: "fade",
    fadeEffect: { crossFade: true },
    speed: 800,
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },
    loop: true, // infinite loop
    thumbs: { swiper: thumbsSwiper },
    pagination: {
	    el: ".swiper-pagination",
	    clickable: true,
	  },
  });

	// Home 4 Tab Custom Script Start
  const tabBtns = document.querySelectorAll('.mission-tabh4-outer .tab-btn');
  const tabContents = document.querySelectorAll('.mission-tabh4-outer .tab-content');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      const targetId = this.getAttribute('data-tab');

      // remove active from all buttons
      tabBtns.forEach((item) => item.classList.remove('active'));

      // hide all tab contents
      tabContents.forEach((content) => {
        content.classList.remove('active');

        const inner = content.querySelector('.content-inner');
        if (inner) {
          inner.classList.remove('animate');
        }
      });

      // activate clicked button
      this.classList.add('active');

      // show target content
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');

        const targetInner = targetContent.querySelector('.content-inner');
        if (targetInner) {
          setTimeout(() => {
            targetInner.classList.add('animate');
          }, 10);
        }
      }
    });
  });
	// Home 4 Tab Custom Script End

	if ($(".product-details .bxslider").length) {
		$(".product-details .bxslider").bxSlider({
			nextSelector: ".product-details #slider-next",
			prevSelector: ".product-details #slider-prev",
			nextText: '<i class="fa fa-angle-right"></i>',
			prevText: '<i class="fa fa-angle-left"></i>',
			mode: "fade",
			auto: "true",
			speed: "700",
			pagerCustom: ".product-details .slider-pager .thumb-box",
		});
	}

	$(".quantity-box .add").on("click", function () {
		if ($(this).prev().val() < 999) {
			$(this)
				.prev()
				.val(+$(this).prev().val() + 1);
		}
	});

	$(".quantity-box .sub").on("click", function () {
		if ($(this).next().val() > 1) {
			if ($(this).next().val() > 1)
				$(this)
					.next()
					.val(+$(this).next().val() - 1);
		}
	});

	// Donation Price Reciver
	if ($(".donation-form").length) {
		let defaultAmount = $(".amount-btn.active").data("amount");
		if (defaultAmount) {
			$("#donationAmount").val("$" + defaultAmount);
		}

		$(".amount-btn").on("click", function () {
			$(".amount-btn").removeClass("active");
			$(this).addClass("active");

			if ($(this).hasClass("custom-btn")) {
				$("#donationAmount").prop("readonly", false).val("").focus();
			} else {
				let amount = $(this).data("amount");
				$("#donationAmount")
					.prop("readonly", true)
					.val("$" + amount);
			}
		});
	}

	//Price Range Slider
	if ($(".price-range-slider").length) {
		$(".price-range-slider").slider({
			range: true,
			min: 10,
			max: 99,
			values: [10, 60],
			slide: function (event, ui) {
				$("input.property-amount").val(ui.values[0] + " - " + ui.values[1]);
			},
		});

		$("input.property-amount").val(
			$(".price-range-slider").slider("values", 0) +
				" - $" +
				$(".price-range-slider").slider("values", 1)
		);
	}

	//Accordion Box
	if ($(".accordion-box, .accordion-box2, .accordion-box3, .accordion-box4").length) {
		$(".accordion-box, .accordion-box2, .accordion-box3, .accordion-box4").on("click", ".acc-btn", function () {
			var outerBox = $(this).parents(".accordion-box, .accordion-box2, .accordion-box3, .accordion-box4");
			var target = $(this).parents(".accordion");

			if ($(this).hasClass("active") !== true) {
				$(outerBox).find(".accordion .acc-btn").removeClass("active ");
			}

			if ($(this).next(".acc-content").is(":visible")) {
				return false;
			} else {
				$(this).addClass("active");
				$(outerBox).children(".accordion").removeClass("active-block");
				$(outerBox)
					.find(".accordion")
					.children(".acc-content")
					.slideUp(300);
				target.addClass("active-block");
				$(this).next(".acc-content").slideDown(300);
			}
		});
	}


	// home 2 tab custom script
    const tabImages = {
      zakat: 'images/resource/faq-2-1.jpg',
      sadaqah: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80'
    };
    $('.tab-btn').on('click', function () {
      var tab = $(this).data('tab');
      // Update active button
      $('.tab-btn').removeClass('active');
      $(this).addClass('active');
      // Update image
      $('#tab-image').attr('src', tabImages[tab]);
      // Restart fadeInUp animation
      $('#tab-card').removeClass('fadeInUp');
      setTimeout(function () {
        $('#tab-card').addClass('fadeInUp');
      }, 10);
    });


	if ($(".hzAccordion-section").length) {
		const $options = $(".hzAccordion-section .option");

		$options.on("click", function () {
			if ($(this).hasClass("active")) return;

			$options.removeClass("active");
			$(this).addClass("active");
		});
	}

	//Jquery Knob animation  // Pie Chart Animation
	if ($(".dial").length) {
		$(".dial").appear(
			function () {
				var elm = $(this);
				var color = elm.attr("data-fgColor");
				var perc = elm.attr("value");

				elm.knob({
					value: 0,
					min: 0,
					max: 100,
					skin: "tron",
					readOnly: true,
					thickness: 0.15,
					dynamicDraw: true,
					displayInput: false,
				});

				$({ value: 0 }).animate(
					{ value: perc },
					{
						duration: 2000,
						easing: "swing",
						progress: function () {
							elm.val(Math.ceil(this.value)).trigger("change");
						},
					}
				);

				//circular progress bar color
				$(this).append(function () {
					// elm.parent().parent().find('.circular-bar-content').css('color',color);
					//elm.parent().parent().find('.circular-bar-content .txt').text(perc);
				});
			},
			{ accY: 20 }
		);
	}

	//Fact Counter + Text Count
	if ($(".count-box").length) {
	    $(".count-box").appear(
	        function () {
	            var $t = $(this),
	                n = $t.find(".count-text").attr("data-stop"),
	                // Fix: Use data-count-speed instead of data-speed
	                r = parseInt($t.find(".count-text").attr("data-count-speed"), 10);

	            if (!$t.hasClass("counted")) {
	                $t.addClass("counted");
	                $({
	                    countNum: parseFloat($t.find(".count-text").text()) || 0, // Added parseFloat and default
	                }).animate(
	                    {
	                        countNum: n,
	                    },
	                    {
	                        duration: r,
	                        easing: "linear",
	                        step: function () {
	                            $t.find(".count-text").text(Math.floor(this.countNum));
	                        },
	                        complete: function () {
	                            $t.find(".count-text").text(this.countNum);
	                        },
	                    }
	                );
	            }
	        },
	        { accY: 0 }
	    );
	}

	//Tabs Box
	if ($(".tabs-box").length) {
		$(".tabs-box .tab-buttons .tab-btn").on("click", function (e) {
			e.preventDefault();
			var target = $($(this).attr("data-tab"));

			if ($(target).is(":visible")) {
				return false;
			} else {
				target
					.parents(".tabs-box")
					.find(".tab-buttons")
					.find(".tab-btn")
					.removeClass("active-btn");
				$(this).addClass("active-btn");
				target
					.parents(".tabs-box")
					.find(".tabs-content")
					.find(".tab")
					.fadeOut(0);
				target
					.parents(".tabs-box")
					.find(".tabs-content")
					.find(".tab")
					.removeClass("active-tab animated fadeIn");
				$(target).fadeIn(300);
				$(target).addClass("active-tab animated fadeIn");
			}
		});
	}

	//Progress Bar
	if ($(".progress-line").length) {
		$(".progress-line").appear(
			function () {
				var el = $(this);
				var percent = el.data("width");
				$(el).css("width", percent + "%");
			},
			{ accY: 0 }
		);
	}

	// Process active in click function
	if ($(".process-list-crm").length) {
		$(".process-list-crm li").on("click", function () {
			// Active class for li
			$(".process-list-crm li").removeClass("active");
			$(this).addClass("active");

			// Get index of clicked li
			let index = $(this).index();

			// Active class for blocks
			$(".process-block-crm").removeClass("active-block");
			$(".process-block-crm").eq(index).addClass("active-block");
		});
	}

	$(".process-block-two").hover(function () {
		$(".process-block-two .inner-block").removeClass("active"); // remove from all
		$(this).find(".inner-block").addClass("active"); // add to hovered
	});

	//LightBox / Fancybox
	if ($(".lightbox-image").length) {
		$(".lightbox-image").fancybox({
			openEffect: "fade",
			closeEffect: "fade",
			helpers: {
				media: {},
			},
		});
	}

	// Scroll to a Specific Div
	if ($(".scroll-to-target").length) {
		$(".scroll-to-target").on("click", function () {
			var target = $(this).attr("data-target");
			if (typeof ScrollSmoother !== "undefined" && ScrollSmoother.get()) {
				ScrollSmoother.get().scrollTo(target, true);
			} else {
				$("html, body").animate({
					scrollTop: $(target).offset().top,
				});
			}
		});
	}

	// Aos Animation
	AOS.init();

	// Elements Animation
	if($('.wow').length){
		var wow = new WOW(
		  {
			boxClass:     'wow',      // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset:       0,          // distance to the element when triggering the animation (default is 0)
			mobile:       false,       // trigger animations on mobile devices (default is true)
			live:         true       // act on asynchronously loaded content (default is true)
		  }
		);
		wow.init();
	}


	// count Bar
	if ($(".count-bar").length) {
		$(".count-bar").appear(
			function () {
				var el = $(this);
				var percent = el.data("percent");
				$(el).css("width", percent).addClass("counted");
			},
			{
				accY: -50,
			}
		);
	}

	//Image Reveal Animation
	if ($(".reveal").length) {
		gsap.registerPlugin(ScrollTrigger);
		let revealContainers = document.querySelectorAll(".reveal");
		revealContainers.forEach((container) => {
			let image = container.querySelector("img");
			let tl = gsap.timeline({
				scrollTrigger: {
					trigger: container,
					toggleActions: "play none none none",
				},
			});
			tl.set(container, { autoAlpha: 1 });
			tl.from(container, 1.5, {
				xPercent: -100,
				ease: Power2.out,
			});
			tl.from(image, 1.5, {
				xPercent: 100,
				scale: 1.3,
				delay: -1.5,
				ease: Power2.out,
			});
		});
	}

	document.querySelectorAll(".scroll-text").forEach((section) => {
		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: section,
				start: "top 100%",
				end: "bottom top",
				scrub: 1,
				markers: false,
			},
		});
		tl.from(section.querySelector(".text1"), { xPercent: 20 }).from(
			section.querySelector(".text2"),
			{ xPercent: -20 },
			0
		);
		tl.from(
			section.querySelector(".scroll-anim-top"),
			{ yPercent: 10 },
			0
		).from(
			section.querySelector(".scroll-anim-bottom"),
			{ yPercent: -10 },
			0
		);
	});

	//Bg Parallax
	if ($(".bg-parallax").length) {
		gsap.to(".bg-parallax", {
			backgroundPosition: "70% 75%",
			ease: "ease1",
			scrollTrigger: {
				trigger: ".bg-parallax",
				start: "top bottom",
				end: "bottom top",
				scrub: 1,
			},
		});
	}

	// Select2 Dropdown
	$(".custom-select").select2({
		minimumResultsForSearch: 7,
	});

	//Gallery Filters
	if ($(".filter-list").length) {
		$(".filter-list").mixItUp({});
	}

	//Custom Data Attributes
	if ($("[data-tm-bg-color]").length) {
		$("[data-tm-bg-color]").each(function () {
			$(this).css(
				"cssText",
				"background-color: " + $(this).data("tm-bg-color") + " !important;"
			);
		});
	}

	// Background image
	if ($("[data-background]").length) {
		$("[data-background]").each(function () {
			$(this).css(
				"background-image",
				"url(" + $(this).attr("data-background") + ")"
			);
		});
	}

	/* ---------------------------------------------------------------------- */
	/* ----------- Activate Menu Item on Reaching Different Sections ---------- */
	/* ---------------------------------------------------------------------- */
	var $onepage_nav = $(".onepage-nav");
	var $sections = $("section");
	var $window = $(window);
	function TM_activateMenuItemOnReach() {
		if ($onepage_nav.length > 0) {
			var cur_pos = getScrollTop() + 2;
			var nav_height = $onepage_nav.outerHeight();
			$sections.each(function () {
				var top = $(this).offset().top - nav_height - 80,
				bottom = top + $(this).outerHeight();
				if (cur_pos >= top && cur_pos <= bottom) {
					$onepage_nav
					.find("a")
					.parent()
					.removeClass("current")
					.removeClass("active");
					$sections.removeClass("current").removeClass("active");
					$onepage_nav
					.find('a[href="#' + $(this).attr("id") + '"]')
					.parent()
					.addClass("current")
					.addClass("active");
				}
				if (cur_pos <= nav_height && cur_pos >= 0) {
					$onepage_nav
					.find("a")
					.parent()
					.removeClass("current")
					.removeClass("active");
					$onepage_nav
					.find('a[href="#header"]')
					.parent()
					.addClass("current")
					.addClass("active");
				}
			});
		}
	}

	/* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */

	function onPageScroll() {
		headerStyle();
		handleBackToTop();
		TM_activateMenuItemOnReach();
	}

	if (typeof ScrollTrigger !== "undefined") {
		ScrollTrigger.addEventListener("scroll", onPageScroll);
	} else {
		$(window).on("scroll", onPageScroll);
	}

	/* ==========================================================================
   When document is loading, do
   ========================================================================== */

	$(window).on("load", function () {
		handlePreloader();
	});
})(window.jQuery);
