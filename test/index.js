var test = require('tape')
var insertStylesheet = require('../')
var resolve = require('url').resolve

test('it returns the created link `Element`', function (t) {
  t.plan(2)

  var stylesheet = insertStylesheet(resolve(location.href, '/element.css'))
  t.ok(stylesheet instanceof Element, 'Link is an `Element`')
  t.ok(document.contains(stylesheet), 'Link added to `document`')
})

test('it adds stylesheets', function (t) {
  t.plan(1)

  insertStylesheet(resolve(location.href, '/green.css'))
  .addEventListener('load', function(e) {
    t.equal(
      window
        .getComputedStyle(document.body)
        .getPropertyValue('background-color'),
      'rgb(0, 255, 0)',
      'Body is all green'
    )
  })
})

test('it provides a callback', function (t) {
  t.plan(2)

  insertStylesheet(resolve(location.href, '/blue.css'), function blueLoaded(err, link) {
    t.error(err)
    t.equal(
      window
        .getComputedStyle(document.body)
        .getPropertyValue('background-color'),
      'rgb(0, 0, 255)',
      'Body is all blue'
    )
  })
})

test('it handles load errors', function (t) {
  t.plan(1)

  insertStylesheet(resolve(location.href, '/404.css'), function blueLoaded(err, link) {
    if (err === null) {
      return t.fail('We should get an error')
    }

    t.pass('We received an error while loading a non existent style sheet')
  })
})

test('it supports preprend', function(t) {
  var isBlackCss = /black\.css$/
  t.plan(3)

  t.notOk(isBlackCss.test(document.styleSheets[0].href), 'First stylesheet is not `black.css`')

  insertStylesheet(resolve(location.href, '/blue.css'), function blueLoaded() {
    insertStylesheet(resolve(location.href, '/black.css'), { prepend: true}, function blackLoaded() {
      t.ok(isBlackCss.test(document.styleSheets[0].href), 'First stylesheet is black.css')
      t.equal(
        window
          .getComputedStyle(document.body)
          .getPropertyValue('background-color'),
        'rgb(0, 0, 255)',
        'Body is still blue'
      )
    })
  })
})
