module.exports = function(href, options, callback) {
  if (options && typeof options === 'function') {
    callback = options
    options = {}
  }

  options = options || {
    prepend: false
  }

  var head = document.getElementsByTagName('head')[0]
  var link = document.createElement('link')

  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', href)

  if (callback) {
    link.onerror = function(error) {
      callback(error, link)
    }

    link.onload = function() {
      callback(null, link)
    }
  }

  options.prepend ?
    head.insertBefore(link, head.childNodes[0]) :
    head.appendChild(link)

  return link
}
