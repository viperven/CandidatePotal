"use strict";
$('.client-slider').slick({
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: true,
  centerPadding: '60px',
  loop: true,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        infinite: true,
        arrows: false,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        arrows: false,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        arrows: false,
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});

$(function () {
  $('.datepicker').datepicker();
});