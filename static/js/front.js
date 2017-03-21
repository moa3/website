var masonryGrid;

$(function () {
  masonryGrid = masonry();
  offCanvas();
  lightbox();
  carousels();
  utils();
  highlightCurrentPage();
  instagram();
  workshopsCarousel();
  styleTables();
});

function styleTables() {
  $('.rates table').addClass('table table-hover table-responsive table-condensed');
}

//clientId: 'a1c91ef47c814977b6a583db287563dc'
function instagram(){
  var d = document.getElementById('instafeed');
  if (d) {
    var feed = new Instafeed({
      get: 'user',
      userId: '1536428423',
      accessToken: '1536428423.a1c91ef.2ac9b8e2c4084c8fb4a374da05075277',
      resolution: 'standard_resolution',
      links: false,
      template: '<div><img src="{{image}}" /></div>',
      after: instaCarousel
    });
    feed.run();
  }
}

// Fix carousel images height to the height of the biggest one in the list
// do it whether they are loaded or not
function setCarouselImgsHeight(imgs) {
  var maxH = 0;
  var treatedImgs = 0;

  var getImgHeight = function (img) {
    var h = $(img).height();
    if (maxH < h) {
      maxH = h;
    }
    if(++treatedImgs == imgs.length) {
      imgs.css({height: '' + maxH + 'px'});
    }
  }

  imgs.each(function() {
    var img = this;
    if(typeof img.naturalWidth == "undefined" || img.naturalWidth === 0) {
      img.onload = function() {
        getImgHeight(img);
      }
    } else {
        getImgHeight(img);
    }
  });
}

function workshopsCarousel() {
  setCarouselImgsHeight($(".workshops-home img"));
  $(".workshops-home .owl-carousel").owlCarousel({
    items: 1,
    itemElements: 'img',
    nav: false,
    loop: true,
    autoplay: true,
    autoHeight: true,
    autoplaySpeed: 1000,
    autoplayTimeout: 3000
  });
}

function instaCarousel() {
  var changed = false;
  var owl = $("#instafeed.owl-carousel").owlCarousel({
    items: 5,
    nav: false,
    loop: true,
    autoplay: true,
    autoHeight: true,
    autoplaySpeed: 1000,
    autoplayTimeout: 3000,
    responsiveClass:true,
    autoplayHoverPause:true,
    responsive:{
        0:{
            items:1,
        },
        768:{
            items:2,
        },
        992:{
            items:3,
        },
        1200:{
            items:5,
        }
    },
    onTranslated: function(e) {
      if (!changed) {
        masonryGrid.masonry('layout');
        changed = true;
      }
    },
    onTranslate: function() {
      $('#instafeed').removeClass('hide');
      $('.center-loader').remove();
    }
  });
}

function highlightCurrentPage() {
  $("a[href='" + location.href + "']").parent().addClass("active");
}

/* =========================================
 *  carousels
 *  =======================================*/

function carousels() {

    $('#main-slider').owlCarousel({
	navigation: true, // Show next and prev buttons
	slideSpeed: 300,
	paginationSpeed: 400,
	autoPlay: true,
	stopOnHover: true,
	singleItem: true,
	afterInit: ''
    });

}

/* =========================================
 *  masonry
 *  =======================================*/

function masonry() {

    var $grid = $('.grid').masonry({
        itemSelector: ".masonry-item",
        percentPosition: true,
        columnWidth: '.masonry-sizer'
    });

    $grid.imagesLoaded().progress(function () {
        $grid.masonry('layout');
    });
    return $grid;
}

/* =========================================
 *  Off-canvas menu
 *  =======================================*/

function offCanvas() {

    $(document).ready(function () {
        $('[data-toggle="offcanvas"]').click(function () {
            $('.row-offcanvas').toggleClass('active')
        });
    });

}


/* =========================================
 *  lightbox
 *  =======================================*/

function lightbox() {

    $(document).delegate('*[data-toggle="lightbox"]', 'click', function (event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });
}

/* =========================================
 *  utils
 *  =======================================*/

function utils() {

    /* tooltips */

    $('[data-toggle="tooltip"]').tooltip();

    /* click on the box activates the radio */

    $('#checkout').on('click', '.box.shipping-method, .box.payment-method', function (e) {
        var radio = $(this).find(':radio');
        radio.prop('checked', true);
    });
    /* click on the box activates the link in it */

    $('.box.clickable').on('click', function (e) {

        window.location = $(this).find('a').attr('href');
    });
    /* external links in new window*/

    $('.external').on('click', function (e) {

        e.preventDefault();
        window.open($(this).attr("href"));
    });
    /* animated scrolling */

    $('.scroll-to').click(function (event) {
        event.preventDefault();
        var full_url = this.href;
        var parts = full_url.split("#");
        var trgt = parts[1];

        $('body').scrollTo($('#' + trgt), 800, {offset: -80});

    });
}

/* product detail gallery */

function productDetailGallery(confDetailSwitch) {
    $('.thumb:first').addClass('active');
    timer = setInterval(autoSwitch, confDetailSwitch);
    $(".thumb").click(function (e) {

        switchImage($(this));
        clearInterval(timer);
        timer = setInterval(autoSwitch, confDetailSwitch);
        e.preventDefault();
    }
    );
    $('#mainImage').hover(function () {
        clearInterval(timer);
    }, function () {
        timer = setInterval(autoSwitch, confDetailSwitch);
    });
    function autoSwitch() {
        var nextThumb = $('.thumb.active').closest('div').next('div').find('.thumb');
        if (nextThumb.length == 0) {
            nextThumb = $('.thumb:first');
        }
        switchImage(nextThumb);
    }

    function switchImage(thumb) {

        $('.thumb').removeClass('active');
        var bigUrl = thumb.attr('href');
        thumb.addClass('active');
        $('#mainImage img').attr('src', bigUrl);
    }
}

/* product detail sizes */

function productDetailSizes() {
    $('.sizes a').click(function (e) {
        e.preventDefault();
        $('.sizes a').removeClass('active');
        $('.size-input').prop('checked', false);
        $(this).addClass('active');
        $(this).next('input').prop('checked', true);
    });
}


$.fn.alignElementsSameHeight = function () {
    $('.same-height-row').each(function () {

        var maxHeight = 0;
        var children = $(this).find('.same-height');
        children.height('auto');
        if ($(window).width() > 768) {
            children.each(function () {
                if ($(this).innerHeight() > maxHeight) {
                    maxHeight = $(this).innerHeight();
                }
            });
            children.innerHeight(maxHeight);
        }

        maxHeight = 0;
        children = $(this).find('.same-height-always');
        children.height('auto');
        children.each(function () {
            if ($(this).height() > maxHeight) {
                maxHeight = $(this).innerHeight();
            }
        });
        children.innerHeight(maxHeight);

    });
}

$(window).load(function () {

    windowWidth = $(window).width();

    $(this).alignElementsSameHeight();

});
$(window).resize(function () {

    newWindowWidth = $(window).width();

    if (windowWidth !== newWindowWidth) {
        setTimeout(function () {
            $(this).alignElementsSameHeight();
        }, 205);
        windowWidth = newWindowWidth;
    }

});
