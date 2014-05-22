module.exports = function(href) {
  var head = document.getElementsByTagName('head')[0]
  var link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', href)
  head.appendChild(link)
}
