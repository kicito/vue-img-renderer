const vueImgRenderer = require('..');
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