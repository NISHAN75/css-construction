(function ($) {
	$(document).ready(function () {
        // title set
        let offcanvasElement = $(".header-offcanvas");
        offcanvasElement.on("show.bs.offcanvas", function () {
            $(".menu-icon").addClass("open");
            $(".close-icon span:nth-child(1)").css({
                transform: "rotate(45deg)"
            });
            $(".close-icon span:nth-child(2)").css({
                transform: "rotate(-45deg)",
                marginTop: "-1px"
            });
        });
        offcanvasElement.on("hide.bs.offcanvas", function () {
            $(".menu-icon").removeClass("open");
            $(".close-icon span:nth-child(1)").css({
                transform: ""
            });
            $(".close-icon span:nth-child(2)").css({
                transform: "",
                marginTop: ""
            });
        });


		// banner slider
		var bannerSlider = new Swiper(".banner-slider-wrapper", {
			loop: true,
			// autoplay: {
			//     delay: 5000,
			//     disableOnInteraction: false,
			// },
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			speed: 1000,
		});

		bannerSlider.on("slideChange", function () {
			var activeIndex = bannerSlider.realIndex;
			$(".slider-navigator ul li").removeClass("active");
			$(".slider-navigator ul li").eq(activeIndex).addClass("active");
		});
		// Click event for the navigator dots
		$(".slider-navigator ul li").each(function (index) {
			$(this).on("click", function () {
				bannerSlider.slideToLoop(index);
			});
		});
        // project slider
        var projectSlider = new Swiper(".project-slider-wrapper", {
            slidesPerView: 3,
            spaceBetween: 24,
			breakpoints: {
				0: {
					slidesPerView: 1,
                    spaceBetween: 17,
				},
				480: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 2,
                    spaceBetween: 26,
				},
			},
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                type: "progressbar",
              },
          });


		// nice select
		$('select').niceSelect();


		// Magnific popup
		// $('.trigger-popup').magnificPopup({
		// 	type: 'iframe',
		// 	iframe: {
		// 		markup: '<div class="mfp-iframe-scaler">' +
		// 			'<div class="mfp-close"></div>' +
		// 			'<iframe class="mfp-iframe" frameborder="0" allowfullscreen allow="autoplay *; fullscreen *"></iframe>' +
		// 			'</div>',
		// 		patterns: {
		// 			youtube: {
		// 				index: 'youtube.com/',
		// 				id: function (url) {
		// 					var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
		// 					if (!m || !m[1]) return null;
		// 					return m[1];
		// 				},
		// 				src: '//www.youtube.com/embed/%id%?autoplay=1&iframe=true'
		// 			},
		// 			vimeo: {
		// 				index: 'vimeo.com/',
		// 				id: function (url) {
		// 					var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
		// 					if (!m || !m[5]) return null;
		// 					return m[5];
		// 				},
		// 				src: '//player.vimeo.com/video/%id%?autoplay=1'
		// 			}
		// 		}
		// 	},
		// });


		// animation
		gsap.registerPlugin(SplitText, ScrollTrigger);
		// heading animation 
		$('[class*="hero-heading"]').each(function () {
			let $heading = $(this); 
			let delay = "<"; 
			// Split text for animation
			let typeSplit2 = new SplitType($heading, {
				types: "lines, chars, words"
			});
			$heading.find(".line").each(function () {
				$(this).wrap('<div class="line-wrapper">');
			});
			let tl = gsap.timeline({
				scrollTrigger: {
					trigger: $heading, // Each heading triggers its own animation
					start: "top 80%", // Start animation when heading is 80% into viewport
					end: "bottom 60%",
					toggleActions: "play none none reverse", // Reverse animation when scrolling back
					markers: false // Set to true for debugging
				}
			});
		
			tl.from($heading.find('.word'), {
				yPercent: 200,
				stagger: { each: 0.025, ease: "power1.out" },
				duration: 1.55,
				ease: "power4.out"
			}, delay)
			.from($heading.find('.word'), {
				stagger: { each: 0.045, ease: "power1.out" },
				opacity: 0,
				duration: 1.55,
				ease: "power4.out"
			}, "<")
			.from($heading.find('.char'), {
				stagger: { each: 0.015, ease: "power1.out" },
				opacity: 0,
				duration: 1.55,
				ease: "power4.out"
			}, "<")
			.from($heading.find('.char'), {
				stagger: { each: 0.015, ease: "power1.out" },
				scale: 0.8,
				duration: 1.55,
				ease: "power4.out"
			}, "<")
			.from($heading.find('.line'), {
				yPercent: 100,
				stagger: { each: 0.01, ease: "power1.out" },
				duration: 0.4
			}, "<");
		});
		// animation




		function initQualitySlider2() {
			if ($(window).width() <= 991) {
				qualitySlider2 = new Swiper('.quality-slider-wrapper', {
					loop: true,
					slidesPerView: 1,
					spaceBetween: 10,
					pagination: {
						el: ".swiper-pagination",
					},
					navigation: {
						nextEl: ".swiper-button-next",
						prevEl: ".swiper-button-prev",
					},
				});
			} 
		}
		
		// Initialize on load
		initQualitySlider2();
		
		// Call on resize
		$(window).on('resize', function () {
			initQualitySlider2();
		});
		
		


		// OverlayScrollbars
		const {
			OverlayScrollbars,
			ClickScrollPlugin
		} = OverlayScrollbarsGlobal;
		// Initialize the ClickScrollPlugin
		OverlayScrollbars.plugin(ClickScrollPlugin);
		$("body").each(function () {
			OverlayScrollbars(this, {
				scrollbars: {
					clickScroll: true,
					autoHide: "leave",
					dragScrolling: true,
					clickScrolling: true,
				},
				scrollBehavior: 'smooth',
			});
		});
		// lenis
		// Initialize a new Lenis instance for smooth scrolling
		const lenis = new Lenis();

		// Listen for the 'scroll' event and log the event data to the console
		// lenis.on('scroll', (e) => {
		//     console.log(e);
		// });

		// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
		lenis.on('scroll', ScrollTrigger.update);

		// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
		// This ensures Lenis's smooth scroll animation updates on each GSAP tick
		gsap.ticker.add((time) => {
			lenis.raf(time * 1000); // Convert time from seconds to milliseconds
		});

		// Disable lag smoothing in GSAP to prevent any delay in scroll animations
		gsap.ticker.lagSmoothing(0);
		// lenis

		//   testing

		// qualitySlider animation
		function initQualitySlider() {
			if ($(window).width() >= 992) {
				let cards = gsap.utils.toArray(".quality-img-item");
				let lastCard = cards[cards.length - 1];
				let scrollSwiper = new Swiper(".quality-slider-wrapper", {
					loop: false,
					slidesPerView: 1,
					spaceBetween: 10,
					pagination: {
						el: ".swiper-pagination",
					},
					navigation: {
						nextEl: ".swiper-button-next",
						prevEl: ".swiper-button-prev",
					},
				});
				
				let tl = gsap.timeline({
					scrollTrigger: {
						trigger: ".pin",
						start: "top 20%",
						end: "+=300%",
						pin: true,
						scrub: 1,
						markers: true,
						toggleActions: "play reverse play reverse",
					}
				});
				
				cards.forEach((card, index) => {
					gsap.set(cards[0], { y: 0, scale: 1 });
					tl.to(card, {
						y: 0,
						duration: 1,
						onComplete: () => {
							gsap.to(card, { scale: 0.8, duration: 1 });
							if (card === lastCard) {
								gsap.to(".pin", { pin: false });
								gsap.to(card, { scale: 1, y: 0, duration: 1 });
							}
						},
					}, "<");
					
				
					// Sync Swiper slide changes
					tl.add(() => {
						if (scrollSwiper.activeIndex !== index) {
							scrollSwiper.slideTo(index);
						}
					});
				});
			}
		}
		
		// **Run on Page Load**
		initQualitySlider();
		
		// **Run on Window Resize**
		$(window).on("resize", function () {
			initQualitySlider();
		});

		// card animation
		function getScrollAmount(element) {
			let divContainer = $(".pin-div-wrapper-info .container");
			var cardProjectDiv = $('.project-card-wrapper').width();
			let offset = divContainer.offset();
			let containerLeftOffset = offset ? offset.left : 0;

			let $element = $(element);
			if ($element.length === 0) {
				console.warn(`${element} not found`);
				return 0;
			}

			let racesWidth = $element[0].scrollWidth;
			let innerWidth = $(window).innerWidth();
			let scrollAmount = (racesWidth - innerWidth) + (2 * containerLeftOffset) + cardProjectDiv;

			return scrollAmount;
		}

		function createGSAPTween(target, scrollAmount) {
			return gsap.to(target, {
				x: () => -scrollAmount,
				duration: 3,
				ease: "none",
				paused: true,
			});
		}

		function createScrollTrigger(triggerElement, targetElement) {
			let scrollAmount = getScrollAmount(targetElement); 
			let tween = createGSAPTween(targetElement, scrollAmount); 
			
			ScrollTrigger.create({
				trigger: triggerElement,
				start: "top 100px",
				end: () => `+=${scrollAmount}`,
				pin: true, 
				animation: tween, 
				scrub: 1, 
				invalidateOnRefresh: true, 
				onEnter: () => {
					tween.play();
					tween.pause();
				},
				onLeave: () => tween.pause(),
				onLeaveBack: () => tween.pause(),
				onUpdate: (self) => {
					let progress = self.progress;
					let slideIndex = Math.floor(progress * projectSlider.slides.length);
					projectSlider.slideTo(slideIndex); 
					console.log(self);
				},
			});
		}

		function initializeScrollTriggers() {
			if ($(window).width() > 991) { 
				$(".pin-div-wrapper-info").each(function () {
					let targetElement = $(this).find(".card-move-info").first();
					createScrollTrigger(this, targetElement);
				});
			}
		}

		function handleResize() {
			if ($(window).width() >= 991) {
				ScrollTrigger.getAll().forEach(trigger => trigger.kill());
				initializeScrollTriggers();
			} else {
			}
		}
		// Initialize on page load
		initializeScrollTriggers();

		// Update ScrollTrigger on window resize
		$(window).on('resize', handleResize);
		// card animation


		// let logoContainer = $(".company-logo-container");
		// if (logoContainer.length > 0) {
		// 	let showingLogos = logoContainer.data("logos");

		// 	let logoitems = $(".logo-item");

		// 	function fadeOutRandomLogo() {
		// 		alert("hi")
		// 		if (showingLogos.length > logoitems.length) {
		// 			let filteredLogos = showingLogos.filter(function (item) {
		// 				return !logoitems.toArray().some(function (display) {
		// 					return $(display).find("img").attr('src') === item.logo;
		// 				});
		// 			});
		// 			if (filteredLogos.length > 0) {
		// 				let randomIndex = Math.floor(Math.random() * filteredLogos.length);
		// 				let randomLogoItem = filteredLogos[randomIndex];

		// 				let itemIndex = Math.floor(Math.random() * logoitems.length);
		// 				$(logoitems[itemIndex]).fadeOut("fast", function () {
		// 					let html = "";
		// 					if (randomLogoItem.website != "") {
		// 						html += '<a href="' + randomLogoItem.website + '" target="_blank">';
		// 						html += '<img src="' + randomLogoItem.logo + '" alt="Logo">';
		// 						html += '</a>';
		// 					} else {
		// 						html += '<div target="_blank">';
		// 						html += '<img src="' + randomLogoItem.logo + '" alt="Logo">';
		// 						html += '</div>';
		// 					}
		// 					$(logoitems[itemIndex]).html(html).fadeIn("fast");
		// 				});
		// 			}
		// 		}
		// 	}

		// 	setInterval(function () {
		// 		fadeOutRandomLogo();
		// 	}, 2000);
		// }



		
		//   testing
		let
		showAnim,
		mm = gsap.matchMedia();
		$("[home-hero-anim]").each(function () {
			mm.add("(min-width: 576px)", () => {
				gsap.set(".card-animhero-03 .graphic-img-width", { width: "0rem" }, "<"),
					gsap.set(".card-animhero-03 .card-img-wrap", { paddingBottom: "0%" }, "<"),
					gsap.set(".card-animhero-01 .graphic-img-width", { width: "17.5rem" }, "<"),
					gsap.set(".card-animhero-01 .card-img-wrap", { paddingBottom: "120%" }, "<"),
					gsap.set(".card-animhero-02 .graphic-img-width", { width: "10rem" }, "<"),
					gsap.set(".card-animhero-02 .card-img-wrap", { paddingBottom: "100%" }, "<"),
					gsap.set(".card-animhero-04 .graphic-img-width", { width: "15rem" }, "<"),
					gsap.set(".card-animhero-04 .card-img-wrap", { paddingBottom: "140%" }, "<");
				gsap.timeline({ defaults: { duration: 1.2, ease: "expo.inOut" }, repeat: -1 })
					.to(".card-animhero-01 .graphic-img-width", { width: "0rem" }, "<4")
					.to(".card-animhero-01 .card-img-wrap", { paddingBottom: "0%" }, "<")
					.to(".card-animhero-01", { scale: 0, transformOrigin: "bottom right" }, "<")
					.to(".card-animhero-02 .card-img-wrap", { paddingBottom: "120%" }, "<")
					.to(".card-animhero-02 .graphic-img-width", { width: "17rem" }, "<")
					.to(".card-animhero-02 .img-abs.is-01", { opacity: 0, duration: 0.8 }, "<")
					.to(".card-animhero-02 .img-abs.is-02", { opacity: 1, duration: 0.8 }, "<")
					.to(".card-animhero-03 .graphic-img-width", { width: "11rem" }, "<")
					.to(".card-animhero-03 .card-img-wrap", { paddingBottom: "70%" }, "<")
					.to(".card-animhero-04 .graphic-img-width", { width: "15rem" }, "<")
					.to(".card-animhero-04 .card-img-wrap", { paddingBottom: "120%" }, "<")
					.to(".card-animhero-04 .img-abs.is-01", { opacity: 0, duration: 0.8 }, "<")
					.to(".card-animhero-04 .img-abs.is-02", { opacity: 1, duration: 0.8 }, "<")
					.to(".card-animhero-01 .graphic-img-width", { width: "17rem" }, "<4")
					.to(".card-animhero-01 .card-img-wrap", { paddingBottom: "110%" }, "<")
					.to(".card-animhero-01", { scale: 1, transformOrigin: "bottom right" }, "<")
					.set(".card-animhero-01 .img-abs.is-01", { opacity: 0 }, "<")
					.set(".card-animhero-01 .img-abs.is-02", { opacity: 1 }, "<")
					.to(".card-animhero-02 .graphic-img-width", { width: "8rem" }, "<")
					.to(".card-animhero-02 .card-img-wrap", { paddingBottom: "100%" }, "<")
					.to(".card-animhero-02 .img-abs.is-02", { opacity: 0, duration: 0.8 }, "<")
					.to(".card-animhero-02 .img-abs.is-03", { opacity: 1, duration: 0.8 }, "<")
					.to(".card-animhero-03 .graphic-img-width", { width: "0rem" }, "<")
					.to(".card-animhero-03 .card-img-wrap", { paddingBottom: "0%" }, "<")
					.to(".card-animhero-03", { scale: 0, transformOrigin: "bottom left" }, "<")
					.to(".card-animhero-04 .graphic-img-width", { width: "14rem" }, "<")
					.to(".card-animhero-04 .card-img-wrap", { paddingBottom: "80%" }, "<")
					.to(".card-animhero-04 .img-abs.is-02", { opacity: 0, duration: 0.8 }, "<")
					.to(".card-animhero-04 .img-abs.is-03", { opacity: 1, duration: 0.8 }, "<")
					.to(".card-animhero-01 .graphic-img-width", { width: "17.5rem" }, "<4")
					.to(".card-animhero-01 .card-img-wrap", { paddingBottom: "120%" }, "<")
					.to(".card-animhero-01 .img-abs.is-02", { opacity: 0, duration: 0.8 }, "<")
					.to(".card-animhero-01 .img-abs.is-01", { opacity: 1, duration: 0.8 }, "<")
					.to(".card-animhero-02 .graphic-img-width", { width: "10rem" }, "<")
					.to(".card-animhero-02 .card-img-wrap", { paddingBottom: "100%" }, "<")
					.to(".card-animhero-02 .img-abs.is-03", { opacity: 0, duration: 0.8 }, "<")
					.to(".card-animhero-02 .img-abs.is-01", { opacity: 1, duration: 0.8 }, "<")
					.to(".card-animhero-04 .graphic-img-width", { width: "15rem" }, "<")
					.to(".card-animhero-04 .card-img-wrap", { paddingBottom: "140%" }, "<")
					.to(".card-animhero-04 .img-abs.is-02", { opacity: 0, duration: 0.8 }, "<")
					.to(".card-animhero-04 .img-abs.is-01", { opacity: 1, duration: 0.8 }, "<");
			});
			mm.add("(max-width: 575px)", () => {
				gsap.set(".card-animhero-03 .graphic-img-width", { width: "0rem" }, "<"),
					gsap.set(".card-animhero-03 .card-img-wrap", { paddingBottom: "0%" }, "<"),
					gsap.set(".card-animhero-01 .graphic-img-width", { width: "7rem" }, "<"),
					gsap.set(".card-animhero-01 .card-img-wrap", { paddingBottom: "120%" }, "<"),
					gsap.set(".card-animhero-02 .graphic-img-width", { width: "7rem" }, "<"),
					gsap.set(".card-animhero-02 .card-img-wrap", { paddingBottom: "100%" }, "<"),
					gsap.set(".card-animhero-04 .graphic-img-width", { width: "7rem" }, "<"),
					gsap.set(".card-animhero-04 .card-img-wrap", { paddingBottom: "140%" }, "<");
				gsap.timeline({ defaults: { duration: 1.2, ease: "expo.inOut" }, repeat: -1 })
					.to(".card-animhero-01 .graphic-img-width", { width: "0rem" }, "<4")
					.to(".card-animhero-01 .card-img-wrap", { paddingBottom: "0%" }, "<")
					.to(".card-animhero-01", { scale: 0, transformOrigin: "bottom right" }, "<")
					.to(".card-animhero-02 .card-img-wrap", { paddingBottom: "120%" }, "<")
					.to(".card-animhero-02 .graphic-img-width", { width: "7rem" }, "<")
					.to(".card-animhero-02 .img-abs.is-01", { opacity: 0, duration: 0.8 }, "<")
					.to(".card-animhero-02 .img-abs.is-02", { opacity: 1, duration: 0.8 }, "<")
					.to(".card-animhero-03 .graphic-img-width", { width: "7rem" }, "<")
					.to(".card-animhero-03 .card-img-wrap", { paddingBottom: "70%" }, "<")
					.to(".card-animhero-04 .graphic-img-width", { width: "7rem" }, "<")
					.to(".card-animhero-04 .card-img-wrap", { paddingBottom: "120%" }, "<")
					.to(".card-animhero-04 .img-abs.is-01", { opacity: 0, duration: 0.8 }, "<")
					.to(".card-animhero-04 .img-abs.is-02", { opacity: 1, duration: 0.8 }, "<")
					.to(".card-animhero-01 .graphic-img-width", { width: "7rem" }, "<4")
					.to(".card-animhero-01 .card-img-wrap", { paddingBottom: "110%" }, "<")
					.to(".card-animhero-01", { scale: 1, transformOrigin: "bottom right" }, "<")
					.set(".card-animhero-01 .img-abs.is-01", { opacity: 0 }, "<")
					.set(".card-animhero-01 .img-abs.is-02", { opacity: 1 }, "<")
					.to(".card-animhero-02 .graphic-img-width", { width: "7rem" }, "<")
					.to(".card-animhero-02 .card-img-wrap", { paddingBottom: "100%" }, "<")
					.to(".card-animhero-02 .img-abs.is-02", { opacity: 0, duration: 0.8 }, "<")
					.to(".card-animhero-02 .img-abs.is-03", { opacity: 1, duration: 0.8 }, "<")
					.to(".card-animhero-03 .graphic-img-width", { width: "0rem" }, "<")
					.to(".card-animhero-03 .card-img-wrap", { paddingBottom: "0%" }, "<")
					.to(".card-animhero-03", { scale: 0, transformOrigin: "bottom left" }, "<")
					.to(".card-animhero-04 .graphic-img-width", { width: "7rem" }, "<")
					.to(".card-animhero-04 .card-img-wrap", { paddingBottom: "80%" }, "<")
					.to(".card-animhero-04 .img-abs.is-02", { opacity: 0, duration: 0.8 }, "<")
					.to(".card-animhero-04 .img-abs.is-03", { opacity: 1, duration: 0.8 }, "<")
					.to(".card-animhero-01 .graphic-img-width", { width: "7rem" }, "<4")
					.to(".card-animhero-01 .card-img-wrap", { paddingBottom: "120%" }, "<")
					.to(".card-animhero-01 .img-abs.is-02", { opacity: 0, duration: 0.8 }, "<")
					.to(".card-animhero-01 .img-abs.is-01", { opacity: 1, duration: 0.8 }, "<")
					.to(".card-animhero-02 .graphic-img-width", { width: "7rem" }, "<")
					.to(".card-animhero-02 .card-img-wrap", { paddingBottom: "100%" }, "<")
					.to(".card-animhero-02 .img-abs.is-03", { opacity: 0, duration: 0.8 }, "<")
					.to(".card-animhero-02 .img-abs.is-01", { opacity: 1, duration: 0.8 }, "<")
					.to(".card-animhero-04 .graphic-img-width", { width: "7rem" }, "<")
					.to(".card-animhero-04 .card-img-wrap", { paddingBottom: "140%" }, "<")
					.to(".card-animhero-04 .img-abs.is-02", { opacity: 0, duration: 0.8 }, "<")
					.to(".card-animhero-04 .img-abs.is-01", { opacity: 1, duration: 0.8 }, "<");
			});
		})
	});
})(jQuery);