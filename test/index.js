var test = require('tape')
var computed = require('computed-style')
var insertStylesheet = require('../')
var resolve = (function(base) {
  base = base.replace(/^(.+\/\/[^\/#\?]+).*$/, '$1')
  return function(segment) {
   return base + segment 
  }
})(location.href)

test('it returns the created link `Element`', function (t) {
  t.plan(2)

  var stylesheet = insertStylesheet(resolve('/element.css'))
  t.ok(stylesheet instanceof Element, 'Link is an `Element`')
  t.ok(stylesheet.parentNode !== null, 'Link added to `document`')
})

test('it adds stylesheets', function (t) {
  t.plan(1)

  insertStylesheet(resolve('/green.css')).onload = function(e) {
    var color = computed(document.body, 'background-color')
    var isGreen = color === 'rgb(0, 255, 0)' || color === '#00ff00'
    t.ok(isGreen, 'Body is all green')
  }
})

test('it provides a callback', function (t) {
  t.plan(2)

  insertStylesheet(resolve('/blue.css'), function blueLoaded(err, link) {
    t.error(err)
    var color = computed(document.body, 'background-color')
    var isBlue = color === 'rgb(0, 0, 255)' || color === '#0000ff'
    t.ok(isBlue, 'Body is all blue')
  })
})

test('it handles load errors', function (t) {
  t.plan(1)

  insertStylesheet(resolve('/404.css'), function blueLoaded(err, link) {
    if (!err) {
      return t.fail('We should get an error')
    }

    t.pass('We received an error while loading a non existent style sheet')
  })
})

test('it supports preprend', function(t) {
  var isBlackCss = /black\.css$/
  var head = document.getElementsByTagName('head')[0]
  t.plan(3)

  t.notOk(isBlackCss.test(head.childNodes[0].href), 'First stylesheet is not `black.css`')

  insertStylesheet(resolve('/blue.css'), function blueLoaded() {
    insertStylesheet(resolve('/black.css'), { prepend: true }, function blackLoaded() {
      t.ok(isBlackCss.test(head.childNodes[0].href), 'First stylesheet is black.css')
      var color = computed(document.body, 'background-color')
      var isBlue = color === 'rgb(0, 0, 255)' || color === '#0000ff'
      t.ok(isBlue, 'Body is still blue')
    })
  })
})
