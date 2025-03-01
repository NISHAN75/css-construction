(function ($) {
	$(document).ready(function () {


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
			keyboard: {
				enabled: true,
			},
			freeMode: true, // Allow smooth dragging
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
		let textWrappers = $(".animation-text");

		// Split text into lines and letters
		let mainTitleSplit = new SplitText(textWrappers, {
			type: "lines,chars",
			linesClass: "line-wrapper overflow-hidden",
			charsClass: "letter",
			tag: "span"
		});

		// Animate each line's letters
		$(".line-wrapper").each(function () {
			let letters = $(this).find(".letter");
			gsap.from(letters, {
				scrollTrigger: {
					trigger: this,
					start: "top bottom",
					end: "bottom top",
					toggleActions: "play none none reverse",
				},
				y: 50,
				opacity: 0,
				duration: 0.5,
				stagger: 0.04,
				ease: "power3.inOut"
			});
		});
		// animation line
		gsap.utils.toArray(".animation-line").forEach((element) => {
			gsap.fromTo(
				element, {
					y: 100,
					opacity: 0,
				}, {
					y: 0,
					opacity: 1,
					duration: 1.5,
					ease: "power2.out",
					scrollTrigger: {
						trigger: element,
						start: "top 90%",
						toggleActions: "play none none reverse",

					},
				}
			);
		});
		// animation

		// qualitySlider animation
		function initQualitySlider() {
			if ($(window).width() >= 992) {
				let items = gsap.utils.toArray(".quality-img-item");
		
				let qualitySlider = new Swiper('.quality-slider-wrapper', {
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
		
				let tl = gsap.timeline({
					scrollTrigger: {
						trigger: ".pin",
						start: "top 20%",
						end: "+=500%",
						pin: true,
						scrub: 1,
						scrub: true,
						// markers: true,
					}
				});
		
				items.forEach((item, index) => {
					tl.to(item, {
						y: 0,
						scale: 0.9,
						duration: 1
					}, "<");
		
					// Target the inner <img> for opacity transition
					tl.to(item.querySelector("img"), {
						opacity: 0.7,
						duration: 0.5,
						delay: 0.5
					}, "<+=0.3");
		
					tl.add(() => {
						// Change the slide only when the y transform reaches 0
						if (qualitySlider.activeIndex !== index) {
							qualitySlider.slideTo(index);
						}
					});
				});
		
				tl.to(".pin", {
					pin: false
				});
			}
		}
		
		// **Run on Page Load**
		initQualitySlider();
		
		// **Run on Window Resize**
		$(window).on("resize", function () {
			gsap.killTweensOf(".quality-img-item"); // Kill previous animations
			ScrollTrigger.getAll().forEach(st => st.kill()); // Kill previous ScrollTriggers
			$(".quality-slider-wrapper")[0].swiper?.destroy(true, true); // Destroy previous Swiper instance
			initQualitySlider();
		});


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


	});
})(jQuery);