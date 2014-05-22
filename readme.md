# insert-stylesheet
insert-stylesheet is a companion to substack’s [insert-css](https://github.com/substack/insert-css) module that inserts a stylesheet `<link>` into the `<head>`, instead of a css string.

[![Browser support](https://ci.testling.com/michaelrhodes/insert-stylesheet.png)](https://ci.testling.com/michaelrhodes/insert-stylesheet)

## Install
```sh
$ npm install insert-stylesheet
```

## API
```
  insert(stylesheet-href)
```

### Usage
```js
var insert = require('insert-stylesheet')

insert('/styles/mine.css')
insert('http://your-site.com/stylesheet.css')
```

### License
[MIT](http://opensource.org/licenses/MIT)
