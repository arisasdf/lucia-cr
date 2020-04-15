~function() {

  let leftArrow = document.querySelector('[data-slideshow-go-left]'),

    rightArrow = document.querySelector('[data-slideshow-go-right]'),

    showFooter = function() {
      let last_known_scroll_position = window.scrollY;

      if (last_known_scroll_position > 300){
        document.getElementsByTagName('footer')[0].classList.add('shown');
        window.removeEventListener('scroll', showFooter);
      }
    },

    // I'm sorry this code is a disaster, it was midnight and I really wanted to get it working.
    // I'll fix it Soon™️.
    slideshowGo = function(left) {
      let slideshowInner = document.getElementsByClassName('section__slideshow-inner')[0],
        currentLeft = parseInt(slideshowInner.style.left);

      currentLeft = isNaN(currentLeft) ? 0 : currentLeft;

      if ((currentLeft < 0) && left) {
        newLeft = (currentLeft + 31);
      } else if ((currentLeft > -62) && !left) {
        newLeft = (currentLeft - 31);
      }

      leftArrow.classList.remove('disabled');
      rightArrow.classList.remove('disabled');

      if (newLeft >= 0) {
        leftArrow.classList.add('disabled');
      } else if (newLeft <= -62) {
        rightArrow.classList.add('disabled');
      }

      slideshowInner.style.left = newLeft + 'em';
    };

  window.addEventListener('scroll', showFooter);

  leftArrow.addEventListener('click', function() {
    if (this.classList.contains('disabled')) {
      return;
    }
    slideshowGo(true);
  });

  rightArrow.addEventListener('click', function() {
    if (this.classList.contains('disabled')) {
      return;
    }
    slideshowGo();
  });

  /* Auto-slideshow ? */
  // window.setInterval(function() {
  //   let slideshowInner = document.getElementsByClassName('section__slideshow-inner')[0],
  //     currentLeft = parseInt(slideshowInner.style.left);

  //     currentLeft = isNaN(currentLeft) ? 0 : currentLeft;

  //   if (currentLeft <= -62) {
  //     slideshowInner.style.left = 0
  //   } else {
  //     slideshowInner.style.left = (currentLeft - 31) + 'em';
  //   }
  // }, 4000);
}();


