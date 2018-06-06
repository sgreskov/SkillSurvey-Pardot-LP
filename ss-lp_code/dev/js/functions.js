var doc = document;

var ANIMATION_DELAY = 400;

var bars = doc.querySelectorAll('.js-bar');
var navDots = doc.querySelectorAll('.vert-dot-nav a');
var navDotLinks = doc.querySelectorAll('.js-scroll-link');

for (var k = 0; k < navDotLinks.length; k++) {
  navDotLinks[k].addEventListener('click', function (e) {
    e.preventDefault();
   // window.scroll({ top: doc.querySelector(this.getAttribute('href')).getBoundingClientRect().top + window.scrollY, behavior: 'smooth'});

    scrollToItem(doc.querySelector(this.getAttribute('href')));

  });
}

window.addEventListener('scroll', function() {
  var scrollPos = document.documentElement.scrollTop + (window.innerHeight / 2);

  // adjust bar width if bar is in view
  for (var i = 0; i < bars.length; i++) {
    if (isInViewport(bars[i])) {
      if(bars[i].getAttribute('data-value')) {
        doSetTimeout(bars[i], i);
      }
    }
  }

  // update nav dot when scrolling through secions
  for (var j = 0; j < navDots.length; j++) {
    var self = navDots[j];
    var section = doc.querySelector(self.getAttribute('href'));
    var sectionTop = getPosition(section).y;

    if(sectionTop <= scrollPos && sectionTop + section.offsetHeight > scrollPos) {
      if(doc.querySelector('.vert-dot-nav a.active')) {
        doc.querySelector('.vert-dot-nav a.active').classList.remove('active');
      }

      navDots[j].classList.add('active');
    }

  }

});

function doSetTimeout(bar, index) {
  setTimeout(function () {
    bar.style.width = bar.getAttribute('data-value');
    //bars.splice(index, 1);
  }, ANIMATION_DELAY);
}

function isInViewport(elem) {
  var bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}


function getPosition(element) {
  var xPosition = 0;
  var yPosition = 0;

  while(element) {
    xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
    yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
    element = element.offsetParent;
  }

  return { x: xPosition, y: yPosition };
}

function scrollToItem(item) {
  var diff = (item.offsetTop-window.scrollY)/7;
  if (Math.abs(diff)>1) {
    window.scrollTo(0, (window.scrollY+diff));
    clearTimeout(window._TO);
    window._TO=setTimeout(scrollToItem, 20, item);
  } else {
    window.scrollTo(0, item.offsetTop);
  }
}