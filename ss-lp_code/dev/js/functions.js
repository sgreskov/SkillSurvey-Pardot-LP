var doc = document;

var ANIMATION_DELAY = 400;

var bars = doc.querySelectorAll('.js-bar');

window.addEventListener('scroll', function() {
  for (var i = 0; i < bars.length; i++) {
    if (isInViewport(bars[i])) {
      if(bars[i].getAttribute('data-value')) {
        doSetTimeout(bars[i], i);
      }
    }
  }
});

function doSetTimeout(bar, index) {
  setTimeout(function () {
    bar.style.width = bar.getAttribute('data-value');
    bars.splice(index, 1);
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