const markdownItDefault = require('markdown-it');
const markdownItAnchor = require("markdown-it-anchor");
let options = {
  html: true,
  breaks: true,
  linkify: true
};
let opts = {
  permalink: false
};

const markdownIt = markdownItDefault(options).use(markdownItAnchor, opts)

module.exports = markdownIt;