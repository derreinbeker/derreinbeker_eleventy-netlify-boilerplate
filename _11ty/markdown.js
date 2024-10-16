import markdownItDefault from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
let options = {
    html: true,
    breaks: true,
    linkify: true
};
let opts = {
    permalink: false
};
const markdownIt = markdownItDefault(options).use(markdownItAnchor, opts);
export default markdownIt;
