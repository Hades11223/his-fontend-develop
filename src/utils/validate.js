String.prototype.getQueryStringHref = function (name, href) {
  var match = RegExp("[?&]" + name + "=([^&]*)").exec(
    href ? href : window.location.href
  );
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
};
