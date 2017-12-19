const fs = require('fs');

// vue complier
const browserify = require('browserify');
const vueify = require('vueify');

// headless browser
const puppeteer = require('puppeteer');

// html template string, used for injecting script in to it and render
const { htmlTemplateString } = require('./constant');

/**
 * replace String function as a promise
 * @param {string, string|regex, string} object 
 */
function replaceStringAsync({
  original,
  replaceRegex,
  replacingString
}) {
  return new Promise((resolve, reject) => {
    if (!original || !replaceRegex || !replacingString) {
      reject(new Error("missing Argrument { original, replaceRegex, replacingString}"));
      return;
    } else {
      resolve(original.replace(replaceRegex, replacingString));
      return;
    }
  });
}

/**
 * render function takes html String to inject to puppeteer and render it
 * @param {string} htmlString htmlstring to inject to puppeteer
 * @param {renderOptions } opts rendering options
 */
function render(htmlString, output, opts = {}) {
  return new Promise(async (resolve, reject) => {
    if (!htmlString || !opts.width || !opts.height) {
      reject(new Error("missing Argrument { htmlString, opts.width, opts.height }"));
      return;
    } else {
      try {
        const browser = await puppeteer.launch({
          headless: true,
        });
        const page = await browser.newPage();
        page.setViewport({ width: opts.width, height: opts.height });
        await page.setContent(htmlString);
        await page.screenshot({ type: opts.fileType, path: output });
        await browser.close();
      } catch (e) {
        reject(e);
      }
      return;
    }
  });
}

/**
 * vueifyFile function takes main javascipt path to transform it to script 
 * @param {string} mainJSPath 
 */
function vueifyFile(mainJSPath) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(mainJSPath)) {
      reject(new Error(mainJSPath, "is not exists"));
      return;
    } else {
      let vueifiedString = "";
      browserify(mainJSPath)
        .transform(vueify)
        .bundle()
        .on('data', (data) => {
          vueifiedString += data;
        }).on('end', () => {
          resolve(vueifiedString);
          return;
        });
    }
  });
}

// exports function
module.exports = function vueImgRenderer(jsPath, output, renderOption) {
  return vueifyFile(jsPath).then((vueifiedString) => {
    return replaceStringAsync({
      original: htmlTemplateString,
      replaceRegex: /{{JS_STRING}}/i,
      replacingString: vueifiedString
    });
  }).then((vueifiedHtml) => {
    return render(vueifiedHtml, output, renderOption);
  });
}
