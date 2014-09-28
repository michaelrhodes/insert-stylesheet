# insert-stylesheet
insert-stylesheet is a companion to substack’s [insert-css](https://github.com/substack/insert-css) module that inserts a stylesheet `<link>` into the `<head>`, instead of a css string.

[![Browser support](https://ci.testling.com/michaelrhodes/insert-stylesheet.png)](https://ci.testling.com/michaelrhodes/insert-stylesheet)

## Install
```sh
$ npm install insert-stylesheet
```

## API
```
  insert(stylesheet-href, [options, cb])
```

### Usage
```js
var insert = require('insert-stylesheet')

insert('/styles/mine.css')
insert('http://your-site.com/stylesheet.css')

// Returns the element
var link = insert('/styles/yours.css')

insert('/styles/well.css', function (err, link) {
})

// Add stylesheet at the top of <head>
insert('/styles/widget.css', { prepend: true }) 
```

### License
[MIT](http://opensource.org/licenses/MIT)
