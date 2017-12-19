# vue-img-renderer
NPM library to convert vue to image it use combination of vueify and puppeteer to create image from vue template file

# usage

``` js
  const vueImgRenderer = require('vue-img-renderer');
```

## vueImgRenderer(jspath, outputpath, options)

* `jspath` &lt;string&gt; javascipt of main vue element currently accepts only script that inject to #app
* `outputpath` &lt;string&gt; path for the image eg. 'test.png'
* `option` &lt;object&gt; options object
* `return` &lt;Promise&gt; a promise

# example 
``` js
const vueImgRenderer = require('vue-img-renderer');

const path = require('path');
vueImgRenderer(path.resolve(__dirname, './TestD3/main.js'), 'test.png', {
    fileType: 'png',
    width: 500,
    height: 500
  }).then(() => {
    console.log("finished");
  }).catch((err) => {
    console.log(err);
  });

```
