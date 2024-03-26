//  === MARISSA ===
$(document).ready(function () {
  // FIXED HEADER
  function fixNav() {
    if (!$(".cart-menu").length && !$(".-g-template-black-friday").length) {
      var nav = $(".main-header");
      var pos = 10;
      var posDelay = nav.height() * 2;
      var prevScroll = 0;

      nav.addClass("fix-nav");

      $(window).scroll(function () {
        var fix = $(this).scrollTop() > posDelay ? true : false;
        if (fix) {
          nav.addClass("fade-menu", fix);
          if ($(this).scrollTop() > prevScroll) {
            nav.removeClass("active-menu");
          } else {
            nav.addClass("active-menu");
          }
        } else {
          nav.removeClass("fade-menu ", fix);
        }
        prevScroll = $(this).scrollTop();
      });
    }
  }
  $.Gomag.bind("Widget/Add/After", function () {
    fixNav();
  });

  // FASHION MENU ==========
  function Menu() {
    $(".menu-dd").each(function () {
      var $this = $(this);
      var Nli = $this.find("li").length;
      var Nlink = $this.find("a").length;
      var Ncol = Math.ceil(Nlink / 15);
      var Mbanner = $this.find(".cat-img").length;

      Ncol = Ncol == 0 ? 1 : Ncol;
      col = Nli > Ncol ? Ncol : Nli;
      col = col + (Mbanner ? 1 : 0) > 4 ? 4 : col;
      $this.addClass("column" + col);
      if (Mbanner) {
        $this.addClass("banner");
      }
      if ($this.find("li span > a").length == 0) {
        $this.addClass("no-sub");
      }
      if ($this.hasClass("column4")) {
        $this.parent().addClass("initial-h");
      }
    });
  }
  Menu();

  $(".main-header .menu-drop").hover(
    function () {
      $(".main-header .menu-drop .menu-dd").removeClass("open");
      $(this).children(".menu-dd").stop().addClass("open");
      if ($(".slide-item-menu").length) {
        $(".slide-item-menu").owlCarousel({
          items: 1,
          navigation: !0,
          pagination: !1,
        });
        var owl = $(".slide-item-menu");
        var owlInstance = owl.data("owlCarousel");
        if (owlInstance != null) owlInstance.reinit();
      }
    },
    function () {
      $(".main-header .menu-drop .menu-dd").removeClass("open");
    }
  );

  $(document).on("click", ".search-m", function () {
    $(".search-toggle").toggleClass("visible");
    $(".main-header").toggleClass("search-active");
  });

  $(".search-form-box.search-toggle").prepend(
    '<a class="search-modal" href="javascript:void(0)"><i style="" class="fa fa-times search-close" aria-hidden="true"></i></a>'
  );

  $(document).on("click", ".search-modal", function (event) {
    event.preventDefault();
    $(".main-header .acount-section .search-m").click();
    $("#_autocompleteSearchMobileToggle").val("");
  });

  // DISABLE DETAIL SLIDER
  if ($(window).width() > 767) {
    $(".prod-lg-sld").slick("unslick");
    $(".thumb-sld").slick("unslick");
    $.Gomag.bind("Product/Details/After/Ajax/Load", function (response) {
      $(".prod-lg-sld").slick("unslick");
      $(".thumb-sld").slick("unslick");
    });
  }

  $.Gomag.bind("Widget/Add/After", function () {
    // BF SIDEBAR + MENU STICKY
    if ($(".-g-template-black-friday").length) {
      $(".main-header").css({ top: "-" + $(".discount-tape").height() + "px" });
    }
    if ($(window).width() > 991 && $(".-g-template-black-friday").length) {
      $(".landing-h .side-menu.fixed").css({
        top: $(".main-header .top-head-bg").outerHeight() + 20 + "px",
      });
    }
    // DETAIL SLIDER + INFO STICKY
    /*if($( window ).width() > 768 && $('.product-page-holder').length){
			$('.product-page-holder .detail-slider-holder').css({'top' : $('.main-header').outerHeight() + 10 + 'px'});
		}*/
  });

  // DETAIL SLIDER + INFO STICKY
  $.Gomag.bind("Gomag/Product/Detail/Loaded", function () {
    if ($(window).width() > 768 && $(".product-page-holder").length) {
      var header = $(".main-header");
      var stickySlider = $(".product-page-holder .detail-slider-holder");
      var stickyDetail = $(".product-page-holder .-g-product-details-holder");
      var prevScroll = $(window).scrollTop();

      function adjustSticky() {
        var sliderOffsetTop = stickySlider.height();
        var stickyOffsetTop = stickyDetail.height();
        var windowHeight = $(window).height();
        var currentScroll = $(this).scrollTop();

        if (
          stickyOffsetTop >= windowHeight &&
          stickyOffsetTop < sliderOffsetTop
        ) {
          if (currentScroll < prevScroll) {
            if ($(".main-header.active-menu").length) {
              var headerHeight = header.height() + 25;
              stickyDetail.css("top", headerHeight + "px");
            } else {
              stickyDetail.css("top", "");
            }
          } else {
            var negativeOffset = stickyOffsetTop - windowHeight;
            stickyDetail.css("top", "-" + negativeOffset + "px");
          }

          prevScroll = currentScroll;
        } else {
          if (currentScroll < prevScroll) {
            if ($(".main-header.active-menu").length) {
              var headerHeight = header.height() + 25;
              stickySlider.css("top", headerHeight + "px");
              stickyDetail.css("top", headerHeight + "px");
            } else {
              stickySlider.css("top", "");
              stickyDetail.css("top", "");
            }
          } else {
            stickySlider.css("top", "");
            stickyDetail.css("top", "");
          }

          prevScroll = currentScroll;
        }
      }

      adjustSticky();

      $(window).scroll(function () {
        adjustSticky();
      });

      $(window).resize(function () {
        adjustSticky();
      });
    }
  });
});

/**
 * Scrie aici codul tau Javascript...
 */
let logoContainer = document.querySelector(".logo-h");
let logoImg = document.querySelector(".img-responsive");
logoImg.src =
  "https://ik6o4g.bn.files.1drv.com/y4moxo-VhnK__HBtfM2uP7RS6Tf9LsCd94vbi1rQSiJp7v4K5UjesTVp0j6s4N4qSyzJcld8fkU2e1Cw1JkRavm6TgXwg1eCoYuI0Xq8xZOq8JZf4vsCp5eYNY-eZMaqonyGLOvCrtQlYLqzYuyLP69NnfTPvzgvuju1xPazZx3ubypYBeE-sj8JRINIKGhl-gvt788kLzIpf7HJ3IPv0mDv64_QLh5zlissf6IHqeVEPg?encodeFailures=1&width=3839&height=1752";
logoContainer.classList.remove("col-sm-2", "col-xs-12");
logoContainer.classList.add("col-xs-4");
console.log(logoContainer);
const row = document.querySelector(".top-head.container-h");
row.classList.add("pl-2");

console.log(row);

const searchContainer = document.querySelector(
  ".col-sm-4.col-xs-7.main.search-form-box"
);
searchContainer.classList.remove("col-xs-7", "col-sm-4");
searchContainer.classList.add("col-xs-4");

const rightMenu = document.querySelector(".col-xs-5.acount-section");
rightMenu.classList.remove("col-xs-5");
rightMenu.classList.add("col-xs-4");
