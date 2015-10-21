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

function resetCircle(interval) {
  var circle = Q('#circle_anim');
  setTimeout(function() {
    circle.style.background = 'transparent';
    circle.style.left = 0;
    circle.style.top = 0;
    circle.style.transition = "none";
    circle.style.transform = 'scale3d(0,0,0) translateZ(0)';
    circle.style.WebkitTransform = 'scale3d(0,0,0) translateZ(0)';
  }, interval);
}

function checkScroll(to_tab) {
  if (posTop() != 0) {
    smoothScrollTo(0, 200);
    setTimeout(function() {
      addTag(to_tab);
    }, 200);
  } else {
    addTag(to_tab);
  }
}

function openTab(to_tab) {
  if (to_tab == "discover")
    openDiscoverPage(mouse_x_pos, mouse_y_pos);
  else if (to_tab == "download")
    openDownloadPage();
  else if (to_tab == "code")
    openCodePage();
  else if (to_tab == "about")
    openAboutPage();
}

function openDownloadPage() {
  Q('#discover_tab').className = "";
  Q('#code_tab').className = "";
  Q('#about_tab').className = "";
  Q('#download_tab').className = "selected";
  Q('#download_icon').className = "material-icons md-18 md-light";
  Q('#discover_icon').className = "material-icons md-18 md-light md-inactive";
  Q('#code_icon').className = "material-icons md-18 md-light md-inactive";
  Q('#about_icon').className = "material-icons md-18 md-light md-inactive";
  var circle = Q('#circle_anim');
  circle.style.background = "#546E7A";
  circle.style.left = mouse_x_pos;
  circle.style.top = mouse_y_pos;
  circle.style.transition = "transform 1s";
  circle.style.transform = 'scale3d(1000,1000,1000) translateZ(0)';
  circle.style.WebkitTransform = 'scale3d(1000,1000,1000) translateZ(0)';
  var download = Q('#download_section'),
    discover = Q('#discover_section'),
    code = Q('#code_section'),
    about = Q('#about_section');
  download.style.zIndex = 20;
  download.style.minHeight = b_hgt - Q('#top_menu').offsetHeight;
  download.style.top = Q('#top_menu').offsetHeight;
  download.style.display = "block";
  setTimeout(function() {
    download.style.opacity = 1;
  }, 100);
  setTimeout(function() {
    download.style.zIndex = 5;
    discover.style.display = "none";
    discover.style.opacity = 0;
    discover.style.zIndex = 0;
    code.style.display = "none";
    code.style.opacity = 0;
    code.style.zIndex = 0;
    about.style.display = "none";
    about.style.opacity = 0;
    about.style.zIndex = 0;
  }, 500);
  resetCircle(500);
}

function openCodePage() {
  Q('#discover_tab').className = "";
  Q('#code_tab').className = "selected";
  Q('#about_tab').className = "";
  Q('#download_tab').className = "";
  Q('#download_icon').className = "material-icons md-18 md-light md-inactive";
  Q('#discover_icon').className = "material-icons md-18 md-light md-inactive";
  Q('#code_icon').className = "material-icons md-18 md-light";
  Q('#about_icon').className = "material-icons md-18 md-light md-inactive";
  var circle = Q('#circle_anim');
  circle.style.background = "#26A69A";
  circle.style.left = mouse_x_pos;
  circle.style.top = mouse_y_pos;
  circle.style.transition = "transform 1s";
  circle.style.transform = 'scale3d(1000,1000,1000) translateZ(0)';
  circle.style.WebkitTransform = 'scale3d(1000,1000,1000) translateZ(0)';
  var download = Q('#download_section'),
    discover = Q('#discover_section'),
    code = Q('#code_section'),
    about = Q('#about_section');
  code.style.zIndex = 20;
  code.style.minHeight = b_hgt - Q('#top_menu').offsetHeight;
  code.style.top = Q('#top_menu').offsetHeight;
  code.style.display = "block";
  setTimeout(function() {
    code.style.opacity = 1;
  }, 100);
  setTimeout(function() {
    code.style.zIndex = 5;
    discover.style.display = "none";
    discover.style.opacity = 0;
    discover.style.zIndex = 0;
    download.style.display = "none";
    download.style.opacity = 0;
    download.style.zIndex = 0;
    about.style.display = "none";
    about.style.opacity = 0;
    about.style.zIndex = 0;
  }, 500);
  resetCircle(500);
}

function openAboutPage() {
  Q('#discover_tab').className = "";
  Q('#code_tab').className = "";
  Q('#about_tab').className = "selected";
  Q('#download_tab').className = "";
  Q('#download_icon').className = "material-icons md-18 md-light md-inactive";
  Q('#discover_icon').className = "material-icons md-18 md-light md-inactive";
  Q('#code_icon').className = "material-icons md-18 md-light md-inactive";
  Q('#about_icon').className = "material-icons md-18 md-light";
  var circle = Q('#circle_anim');
  circle.style.background = "#FAFAFA";
  circle.style.left = mouse_x_pos;
  circle.style.top = mouse_y_pos;
  circle.style.transition = "transform 1s";
  circle.style.transform = 'scale3d(1000,1000,1000) translateZ(0)';
  circle.style.WebkitTransform = 'scale3d(1000,1000,1000) translateZ(0)';
  var download = Q('#download_section'),
    discover = Q('#discover_section'),
    code = Q('#code_section'),
    about = Q('#about_section');
  about.style.zIndex = 20;
  about.style.minHeight = b_hgt - Q('#top_menu').offsetHeight;
  about.style.top = Q('#top_menu').offsetHeight;
  about.style.display = "block";
  setTimeout(function() {
    about.style.opacity = 1;
  }, 100);
  setTimeout(function() {
    about.style.zIndex = 5;
    discover.style.display = "none";
    discover.style.opacity = 0;
    discover.style.zIndex = 0;
    download.style.display = "none";
    download.style.opacity = 0;
    download.style.zIndex = 0;
    code.style.display = "none";
    code.style.opacity = 0;
    code.style.zIndex = 0;
  }, 500);
  resetCircle(500);
}

function openDiscoverPage(x, y) {
  Q('#discover_tab').className = "selected";
  Q('#download_tab').className = "";
  Q('#code_tab').className = "";
  Q('#about_tab').className = "";
  Q('#download_icon').className = "material-icons md-18 md-light md-inactive";
  Q('#code_icon').className = "material-icons md-18 md-light md-inactive";
  Q('#about_icon').className = "material-icons md-18 md-light md-inactive";
  Q('#discover_icon').className = "material-icons md-18 md-light";
  var circle = Q('#circle_anim');
  circle.style.background = "#EF5350";
  circle.style.left = x;
  circle.style.top = y;
  circle.style.transition = "transform 1s";
  circle.style.transform = 'scale3d(1000,1000,1000) translateZ(0)';
  circle.style.WebkitTransform = 'scale3d(1000,1000,1000) translateZ(0)';
  var download = Q('#download_section'),
    discover = Q('#discover_section'),
    code = Q('#code_section'),
    about = Q('#about_section');
  discover.style.minHeight = b_hgt - Q('#top_menu').offsetHeight;
  discover.style.top = Q('#top_menu').offsetHeight;
  discover.style.zIndex = 20;
  discover.style.transition = "opacity 0.5s";
  discover.style.display = "block";
  setTimeout(function() {
    discover.style.opacity = 1;
  }, 100);
  setTimeout(function() {
    download.style.display = "none";
    download.style.opacity = 0;
    code.style.display = "none";
    code.style.opacity = 0;
    about.style.display = "none";
    about.style.opacity = 0;
  }, 500);
  setTimeout(function() {
    discover.style.zIndex = 5;
  }, 500);
  resetCircle(500);
}

var nav_top_offset = Q('#top_menu_nav').offsetTop;

function updateTopMenu() {
  var top_menu = Q('#top_menu');
  if (posTop() > nav_top_offset) {
    if (b_wth > 800) {
      top_menu.style.transform = "translateY(-" + (nav_top_offset - 25) + "px)";
      top_menu.style.WebkitTransform = "translateY(-" + (nav_top_offset - 25) + "px)";
    } else {
      top_menu.style.transform = "translateY(-" + (nav_top_offset - 8) + "px)";
      top_menu.style.WebkitTransform = "translateY(-" + (nav_top_offset - 8) + "px)";
    }
    top_menu.style.position = "fixed";
    if (b_wth > 800)
      Q('#second_nav_img').style.opacity = 1;
  } else {
    top_menu.style.transform = "translateY(0px)";
    top_menu.style.WebkitTransform = "translateY(0px)";
    top_menu.style.position = "relative";
    if (b_wth > 800)
      Q('#second_nav_img').style.opacity = 0;
  }
}

if (b_wth <= 800)
  document.body.style.overflowX = "hidden";

var features = Qq('.feature');
for (i in features) {
  try {
    features[i].style.height = b_hgt;
  } catch (e) {
    console.log("")
  }
}

var index = ("" + window.location + "").indexOf("#");
var root;

function router() {
  if (("" + window.location + "").indexOf("#") == -1 && ("" + window.location + "").indexOf("#download") == -1 && ("" + window.location + "").indexOf("#code") == -1 && ("" + window.location + "").indexOf("#about") == -1 && ("" + window.location + "").indexOf("#discover") == -1)
    window.location += "#discover";
  index = ("" + window.location + "").indexOf("#");
  if (index != -1)
    root = ("" + window.location + "").substring(0, index);
  else
    root = ("" + window.location + "")
  if (("" + window.location + "") == root + "#discover")
    openDiscoverPage(mouse_x_pos, mouse_y_pos);
  if (("" + window.location + "") == root + "#download")
    openDownloadPage();
  if (("" + window.location + "") == root + "#code")
    openCodePage();
  if (("" + window.location + "") == root + "#about")
    openAboutPage();
}

function addTag(tag) {
  window.location = root + "#" + tag;
  router();
  openTab(tag);
}
