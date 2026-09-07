(function ($) {
    'use strict';

    /* ================================
       Smooth Scroller And Title Animation Js Start
    ================================ */
     if ($('#smooth-wrapper').length && $('#smooth-content').length) {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

        gsap.config({
            nullTargetWarn: false,
        });

        let smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 2,
            effects: true,
            smoothTouch: 0.1,
            normalizeScroll: false,
            ignoreMobileResize: true,
        });
    }


     /* ================================
       Text Anim Js Start
    ================================ */
    if ($(".wa_title_spilt_1").length) {

        gsap.registerPlugin(SplitText, ScrollTrigger);

        document.querySelectorAll(".wa_title_spilt_1").forEach((atEl) => {

            const atSplit = new SplitText(atEl, {
                type: "words,chars",
                wordsClass: "word",
                charsClass: "char",
            });

            let atDuration = parseFloat(atEl.getAttribute("data-speed")) || 1;
            let atDelay = parseFloat(atEl.getAttribute("data-delay")) || 0;

            if (window.innerWidth <= 768) {
                atDuration = atDuration * 0.3;
            }

            gsap.set(atSplit.words, {
                willChange: "transform",
                perspective: 1000,
                transformStyle: "preserve-3d",
            });

            gsap.set(atSplit.chars, {
                willChange: "transform",
                opacity: 0,
                rotateX: -80,
                transformOrigin: "center center -10px",
            });

            gsap.set(atEl, {
                perspective: 1000,
                transformStyle: "preserve-3d",
            });

            gsap.to(atSplit.chars, {
                scrollTrigger: {
                    trigger: atEl,
                    start: "top 80%",
                },
                opacity: 1,
                rotateX: 0,
                duration: atDuration,
                delay: atDelay,
                ease: "power3.out",
                stagger: {
                    each: 0.05,
                    from: "center",
                    grid: "auto",
                },
            });

        });

    }

    setTimeout(function() {
        gsap.registerPlugin(ScrollTrigger);

        // animation1
        const tm_gsap_split_text = document.querySelector(".tm-split-text");
        if(tm_gsap_split_text) {
            setTimeout(function () {
                var st = $('document').find(".tm-split-text");
                if(st.length == 0) return;
                gsap.registerPlugin(SplitText);
                st.each(function(index, el) {
                    el.split = new SplitText(el, {
                        type: "lines,words,chars",
                        linesClass: "split-line"
                    });
                    gsap.set(el, { perspective: 400 });

                    if( $(el).hasClass('split-in-fade') ){
                        $(el).addClass('active');
                        gsap.set(el.split.chars, {
                            opacity: 0,
                            ease: "Back.easeOut",
                        });
                    }
                    if( $(el).hasClass('split-in-right') ){
                        gsap.set(el.split.chars, {
                            opacity: 0,
                            x: "50",
                            ease: "Back.easeOut",
                        });
                    }
                    if( $(el).hasClass('split-in-left') ){
                        gsap.set(el.split.chars, {
                            opacity: 0,
                            x: "-50",
                            ease: "circ.out",
                        });
                    }
                    if( $(el).hasClass('split-in-up') ){
                        gsap.set(el.split.chars, {
                            opacity: 0,
                            y: "80",
                            ease: "circ.out",
                        });
                    }
                    if( $(el).hasClass('split-in-down') ){
                        gsap.set(el.split.chars, {
                            opacity: 0,
                            y: "-80",
                            ease: "circ.out",
                        });
                    }
                    if( $(el).hasClass('split-in-rotate') ){
                        gsap.set(el.split.chars, {
                            opacity: 0,
                            rotateX: "50deg",
                            ease: "circ.out",
                        });
                    }
                    if( $(el).hasClass('split-in-scale') ){
                        gsap.set(el.split.chars, {
                            opacity: 0,
                            scale: "0.5",
                            ease: "circ.out",
                        });
                    }
                    el.anim = gsap.to(el.split.chars, {
                        scrollTrigger: {
                            trigger: el,
                            toggleActions: "restart pause resume reverse",
                            start: "top 90%",
                        },
                        x: "0",
                        y: "0",
                        rotateX: "0",
                        scale: 1,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.02,
                    });
                });
            }, 200);
        }




        // animation1
        const tm_gsap_move_animation1 = document.querySelector(".tm-gsap-move-animation1");
        if(tm_gsap_move_animation1) {
            var tm_gsap_animation1 = gsap.timeline({
                scrollTrigger: {
                animation: tm_gsap_animation1,
                trigger: tm_gsap_move_animation1,
                start: "top 95%",
                end: "top -50%",
                scrub: 4,
                toggleActions: "play reverse play reverse",
                markers: false
                }
            });
            tm_gsap_animation1.from(tm_gsap_move_animation1, { xPercent: 50, });
        }




        // animation2
        const tm_gsap_move_animation2 = document.querySelector(".tm-gsap-move-animation2");
        if(tm_gsap_move_animation2) {
            var tm_gsap_animation2 = gsap.timeline({
                scrollTrigger: {
                    animation: tm_gsap_animation2,
                    trigger: tm_gsap_move_animation2,
                    start: "top 150%",
                    end: "top -50%",
                    scrub: 3,
                    toggleActions: "play reverse play reverse",
                    markers: false
                }
            });
            tm_gsap_animation2.from(tm_gsap_move_animation2, { xPercent: 50, yPercent: -10, scale: .3 }, "<=.5");
        }



        // animation3
        const tm_gsap_move_animation3 = document.querySelector(".tm-gsap-move-animation3");
        if(tm_gsap_move_animation3) {
            var tm_gsap_animation3 = gsap.timeline({
                scrollTrigger: {
                animation: tm_gsap_animation3,
                trigger: tm_gsap_move_animation3,
                start: "top 150%",
                end: "top -50%",
                scrub: 3,
                toggleActions: "play reverse play reverse",
                markers: false
                }
            });
            tm_gsap_animation3.from(tm_gsap_move_animation3, { xPercent: 70, yPercent: -50, scale: .3, rotate: -20, opacity: 0.3 }, "<=.5");
        }

    }, 2300);

     initRipples();

    /*=============================================
        =              Ripples Init               =
    =============================================*/
    function initRipples() {

        $(".ripple-image").each(function () {

            var $container = $(this);
            var $img = $container.find("img").first();

            if (!$img.length) return;

            var img = new Image();
            img.src = $img.attr("src");

            img.onload = function () {

                var imgURL = img.src;

                $container.css({
                    "background-image": "url(" + imgURL + ")",
                    "background-size": "cover",
                    "background-position": "center center"
                });

                if (typeof $container.ripples === "function") {
                    $container.ripples({
                        resolution: 400,
                        perturbance: 0.03,
                        imageUrl: imgURL
                    });
                }

                $img.hide();
            };

        });
    }


  /* ================================
       Text Anim Js Start
    ================================ */

      if (
    typeof SplitText !== "undefined" &&
        document.querySelectorAll(".split-title").length > 0
        ) {
    document.querySelectorAll(".split-title").forEach((title) => {

        // split by words + chars (IMPORTANT)
        const split = new SplitText(title, {
        type: "words,chars"
        });

        // add class to chars
        split.chars.forEach((char) => {
        char.classList.add("char");
        });

        // GSAP animation
        gsap.to(split.chars, {
        scrollTrigger: {
            trigger: title,
            start: "top 90%",
            toggleActions: "play none none none"
        },
        duration: 0.8,
        clipPath: "inset(0% 0% -15% 0%)",
        x: 0,
        opacity: 1,
        ease: "power4.out",
        stagger: 0.03
        });

    });
    }

     if (typeof gsap !== "undefined") {
          gsap.registerPlugin(ScrollTrigger, SplitText);

          let mm = gsap.matchMedia();

          mm.add("(min-width: 1200px)", () => {

              let splits = [];

              // ===== tz-sub-tilte =====
              $('.tz-sub-tilte').each(function (index, el) {

              let split = new SplitText(el, {
                  type: "lines,words,chars",
                  linesClass: "split-line"
              });

              splits.push(split);

              gsap.set(split.chars, {
                  opacity: 0,
                  x: 7
              });

              gsap.to(split.chars, {
                  scrollTrigger: {
                  trigger: el,
                  start: "top 90%",
                  end: "top 60%",
                  scrub: 1
                  },
                  x: 0,
                  opacity: 1,
                  duration: 0.7,
                  stagger: 0.2
              });
              });

              // ===== tz-itm-title =====
              $('.tz-itm-title').each(function (index, el) {

              let split = new SplitText(el, {
                  type: "lines,words,chars",
                  linesClass: "split-line"
              });

              splits.push(split);

              gsap.set(split.chars, {
                  opacity: 0.3,
                  x: -7
              });

              gsap.to(split.chars, {
                  scrollTrigger: {
                  trigger: el,
                  start: "top 92%",
                  end: "top 60%",
                  scrub: 1
                  },
                  x: 0,
                  opacity: 1,
                  duration: 0.7,
                  stagger: 0.2
              });
              });

              // ðŸ”¥ MOST IMPORTANT PART
              ScrollTrigger.refresh();

              // ðŸ”¥ cleanup on breakpoint change
              return () => {
              splits.forEach(split => split.revert());
              ScrollTrigger.getAll().forEach(st => st.kill());
              };

          });
    }

    

  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {

            gsap.registerPlugin(ScrollTrigger);

            const mm = gsap.matchMedia();

            mm.add("(min-width: 1199px)", () => {

                let panels = document.querySelectorAll('.oit-panel-pin');

                panels.forEach((section) => {

                    let startVal = section.dataset.start || 'top 30%';
                    let endVal = section.dataset.end || 'bottom 50%';

                    gsap.fromTo(
                        section,
                        {
                            transformOrigin: '100% 0% 0px',
                            x: 0,
                            y: 0,
                            rotate: 0,
                            scale: 1,
                        },
                        {
                            yPercent: 5,
                            rotate: 20,
                            scale: 0.75,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: section,
                                pin: section,
                                scrub: 1,
                                start: startVal,
                                end: endVal,
                                endTrigger: '.oit-panel-pin-area',
                                pinSpacing: false,
                                markers: false,
                            },
                        }
                    );

                });

            });

            console.log("GSAP panel animation loaded");

        }



    gsap.utils.toArray('.tm-gsap-animate-left').forEach((el, index) => {
        let tlcta = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                scrub: 2,
                start: "top 90%",
                end: "top 70%",
                toggleActions: "play none none reverse",
                markers: false
            }
        })

        tlcta
        .set(el, {transformOrigin: 'center center'})
        .from(el, { opacity: 1,  x: "-=150"}, {opacity: 1, x: 0, duration: 1, immediateRender: false})
    });
    gsap.utils.toArray('.tm-gsap-animate-right').forEach((el, index) => {
        let tlcta = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                scrub: 2,
                start: "top 90%",
                end: "top 70%",
                toggleActions: "play none none reverse",
                markers: false
            }
        })

        tlcta
        .set(el, {transformOrigin: 'center center'})
        .from(el, { opacity: 1,  x: "+=150"}, {opacity: 1, x: 0, duration: 1, immediateRender: false})
    });
    gsap.utils.toArray('.tm-gsap-animate-top').forEach((el, index) => {
        let tlcta = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                scrub: 2,
                start: "top 90%",
                end: "top 70%",
                toggleActions: "play none none reverse",
                markers: false
            }
        })

        tlcta
        .set(el, {transformOrigin: 'center center'})
        .from(el, { opacity: 1,  y: "+=150"}, {opacity: 1, y: 0, duration: 1, immediateRender: false})
    });
    gsap.utils.toArray('.tm-gsap-animate-bottom').forEach((el, index) => {
        let tlcta = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                scrub: 2,
                start: "top 90%",
                end: "top 70%",
                toggleActions: "play none none reverse",
                markers: false
            }
        })

        tlcta
        .set(el, {transformOrigin: 'center center'})
        .from(el, { opacity: 1,  y: "-=150"}, {opacity: 1, y: 0, duration: 1, immediateRender: false})
    });


    gsap.utils.toArray('.tm-gsap-animate-circle').forEach((el, index) => {
        let arspin = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                scrub: 1,
                start: "top 100%",
                end: "top -50%",
                toggleActions: "play none none reverse",
                markers: false
            }
        })

        arspin
        .set(el, {transformOrigin: 'center center'})
        .fromTo(el, { rotate: 0}, { rotate: 180, duration: 2, immediateRender: false})
    });

    gsap.utils.toArray('.tm-gsap-animate-horizontal').forEach((el, index) => {
        let arspin = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                scrub: 1,
                start: "top 100%",
                end: "top -50%",
                toggleActions: "play none none reverse",
                markers: false
            }
        })

        arspin
        .set(el, {transformOrigin: 'center center'})
        .fromTo(el, { xPercent: -20}, { xPercent: 50, duration: 2, immediateRender: false})
    });


    gsap.utils.toArray(".tm-gsap-img-parallax").forEach(function(container) {
      let image = container.querySelector("img");

      let tl = gsap.timeline({
          scrollTrigger: {
              trigger: container,
              scrub: .5,
          },
      });
      tl.from(image, {
          yPercent: -30,
          ease: "none",
      }).to(image, {
          yPercent: 30,
          ease: "none",
      });
    });

    if (typeof gsap !== "undefined" && $('.tm-itm-title').length) {
        gsap.registerPlugin(ScrollTrigger, SplitText);

        let mm = gsap.matchMedia();

        mm.add("(min-width: 1200px)", () => {
            let splits = [];

            $('.tm-itm-title').each(function (index, el) {
                let split = new SplitText(el, {
                    type: "lines,words,chars",
                    linesClass: "split-line"
                });

                splits.push(split);

                gsap.set(split.chars, {
                    opacity: 0.3,
                    x: -7
                });

                gsap.to(split.chars, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 92%",
                        end: "top 60%",
                        scrub: 1
                    },
                    x: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.2
                });
            });

            ScrollTrigger.refresh();

            return () => {
                splits.forEach(split => split.revert());
                ScrollTrigger.getAll().forEach(st => st.kill());
            };
        });
    }

     /* ================================
       Advance Ani Js Start
    ================================ */
	
	gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.matchMedia({

    "(min-width: 1200px)": function () {

        document.querySelectorAll(".advance-wrap").forEach((wrap) => {

            const items = wrap.querySelectorAll(".advance-item");

            if (items.length < 4) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrap,
                    start: "top 60%",
                    toggleActions: "play none none reverse",
                },
                defaults: {
                    ease: "power1.out",
                    duration: 1,
                },
            });

            tl
                .from(items[0], { xPercent: 100, rotate: -8 })
                .from(items[1], { xPercent: 30, rotate: 4.13 }, "<")
                .from(items[2], { xPercent: -30, rotate: -6.42 }, "<")
                .from(items[3], { xPercent: -60, rotate: -12.15 }, "<");
        });

        ScrollTrigger.refresh();
    }

});

 /* ================================
       Approach Anim Js Start
    ================================ */

    if (document.querySelectorAll(".approach-area").length > 0) {

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1199px)", () => {

        const boxes = document.querySelectorAll(".approach-area .approach-box");

        gsap.from(boxes, {
            x: "100%",
            duration: 1,
            stagger: 0.3,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".approach-wrapper-box",
                start: "top 100%",
                end: "bottom 40%",
                scrub: 2,
                toggleActions: "play none none reverse",
            },
        });

    });
    }

      /* ================================
       Card Animation Js Start
    ================================ */

   let pr = gsap.matchMedia();

    pr.add("(min-width: 1199px)", () => {

        const panels = gsap.utils.toArray('.tp-panel-pin');

        const triggers = panels.map((section) => {

            let defaultStart = "top 10%";
            let defaultEnd   = "bottom 55%";

            let startVal = section.dataset.start || defaultStart;
            let endVal   = section.dataset.end || defaultEnd;

            return ScrollTrigger.create({
                trigger: section,
                start: startVal,
                end: endVal,
                endTrigger: '.tp-panel-pin-area',
                pin: section,
                scrub: 1,
                pinSpacing: false,
                markers: false
            });

        });

        // IMPORTANT: cleanup for ThemeForest + matchMedia safety
        return () => {
            triggers.forEach(t => t.kill());
        };

    });
    

})(jQuery);