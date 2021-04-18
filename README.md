# flob

Make html files from markdown files

## install

```
npm install -S @nichoth/flob
```

## example

```js
var hyperstream = require('hyperstream')
var matter = require('gray-matter')
var { buildThem } = require('@nichoth/flob')

var inputDir = __dirname + '/src/_pages'
var outputDir = __dirname + '/public'
var templateFile = __dirname + '/src/_index.html'

buildThem(inputDir, outputDir, templateFile, makeHs)

// a fn that returns a hs instance
function makeHs (file, baseName) {
    return hyperstream({
        body: {
            class: { append: baseName }
        },
        '#content': {
            _appendHtml: matter(file).content
        }
    })
}
```
