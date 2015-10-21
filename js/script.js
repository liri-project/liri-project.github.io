var Q = document.querySelector.bind(document);
var Qq = document.querySelectorAll.bind(document);
HTMLElement.prototype.Q = HTMLElement.prototype.querySelector;
HTMLElement.prototype.Qq = HTMLElement.prototype.querySelectorAll;
var b_hgt, b_wth;
getViewport();

function posTop() {
  return typeof window.pageYOffset != 'undefined' ? window.pageYOffset : document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0;
}

function animation(effectFrame, duration, from, to, easing, framespacing) {
  var start = Date.now(),
    change = to - from;
  duration = duration || 1000;
  if (typeof from === 'function') {
    easing = from;
    from = 0;
  }
  easing = easing || function(x, t, b, c, d) {
    return c * t / d + b;
  };
  from = from || 0;
  to = to || 1;
  framespacing = framespacing || 1;

  (function interval() {
    var time = (Date.now() - start);
    if (time < duration) {
      effectFrame(easing(0, time, from, change, duration));
      scrolling = true;
      window.setTimeout(interval, framespacing);
    } else {
      effectFrame(to);
      scrolling = false;
    }
  }());
}

window.smoothScrollTo = function(target, duration) {
  var start = window.pageYOffset;
  duration = duration || 500;
  animation(function(position) {
    window.scroll(0, position);
  }, duration, start, target);
};

function detectIE() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }
  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }
  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // IE 12 => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }
  // other browser
  return false;
}

function getViewport() {
  if (typeof window.innerWidth != 'undefined') {
    b_wth = window.innerWidth,
      b_hgt = window.innerHeight
  } else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth !=
    'undefined' && document.documentElement.clientWidth != 0) {
    b_wth = document.documentElement.clientWidth,
      b_hgt = document.documentElement.clientHeight
  }
}

var mouse_x_pos = 0;
var mouse_y_pos = 0;

window.onmousemove = getMousePosition;

function getMousePosition(e) {
  if (e == undefined) e = window.event;
  if (e.pageX || e.pageY) {
    mouse_x_pos = e.pageX;
    mouse_y_pos = e.pageY;
  } else if (e.clientX || e.clientY) {
    mouse_x_pos = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    mouse_y_pos = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
}
