# insert-stylesheet
insert-stylesheet is a companion to substack’s [insert-css](https://github.com/substack/insert-css) module that inserts a stylesheet `<link>` into the `<head>`, instead of a css string.

[![Browser support](https://ci.testling.com/michaelrhodes/insert-stylesheet.png)](https://ci.testling.com/michaelrhodes/insert-stylesheet)

## Install
```sh
$ npm install insert-stylesheet
```

## API
```
  insert(stylesheet-href, options, cb)
```

### Usage
```js
var insert = require('insert-stylesheet')

insert('/styles/mine.css')
insert('http://your-site.com/stylesheet.css')
var link = insert('/styles/yours.css')

insert('/styles/well.css', function loaded(err, link) {
  // err and link populated accordingly
})

insert('/styles/widget.css', { prepend: true }) // prepend style sheet to othe style sheets
```

### License
[MIT](http://opensource.org/licenses/MIT)
