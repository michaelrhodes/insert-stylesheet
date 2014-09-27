module.exports = function(href, opts, cb) {
  if (opts && typeof opts === 'function') {
    cb = opts
    opts = {}
  }

  opts = opts || {
    prepend: false
  }

  var head = document.getElementsByTagName('head')[0]
  var link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', href)

  if (cb) {
    link.addEventListener('error', function styleSheetFailed(err) {
      cb(err, link)
    });

    link.addEventListener('load', function styleSheetLoaded() {
      cb(null, link)
    });
  }

  if (opts.prepend) {
    head.insertBefore(link, head.childNodes[0]);
  } else {
    head.appendChild(link);
  }

  return link
}
