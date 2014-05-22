var run = require('tape')
var insert = require('../')

run('it works', function (test) {
  test.plan(1)

  var head = document.getElementsByTagName('head')[0]  
  insert('one.css')
  insert('two.css')

  var links = head.getElementsByTagName('link')
  var matches = []
 
  for (var i = 0, l = links.length; i < l; i++) {
    if (links[i].getAttribute('rel') === 'stylesheet') {
      var href = links[i].getAttribute('href')
      if (href && /(one|two).css$/.test(href)) {
        matches.push(href)
      }
    }
  }

  test.equal(matches.length, 2)
})
