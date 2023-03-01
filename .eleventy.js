const pluginRss = require('@11ty/eleventy-plugin-rss')
const htmlmin = require("html-minifier");
const filters = require('./_11ty/filters.js')
const Image = require('@11ty/eleventy-img');


async function imageShortcode(
  src,
  alt,
  className = undefined,
  widths = [400, 800, 1280],
  formats = ['webp', 'jpeg'],
  sizes = '100vw'
) {
  let metadata = await Image(src, {
    widths: [...widths, null],
    formats: [...formats, null],
    outputDir: '_site/static/media/images/generated',
    urlPath: '/static/media/images/generated',
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

/*
Beispiel:

Original-Bilder nach: "static/assets/originalImages/" und dann:

<figure>
    {% image "static/assets/originalImages/BigBison.jpg", "Ein Bison auf einer Wiese vor mit Abendsonne beschienener Bergkulisse" %}
  <figcaption>
    Ein Bison auf einer Wiese vor mit Abendsonne beschienener Bergkulisse.
  </figcaption>
</figure>
*/



module.exports = function(eleventyConfig) {
  eleventyConfig.addAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk")

  // Filters
  Object.keys(filters).forEach(filterName => {
    eleventyConfig.addFilter(filterName, filters[filterName])
  })

  // Minify HTML output
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if (outputPath.indexOf(".html") > -1) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  })

  // only content in the `posts/` directory
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getAllSorted().filter(function(item) {
      return item.inputPath.match(/^\.\/posts\//) !== null;
    });
  });
  
  eleventyConfig.addCollection("tagList",    require("./_11ty/getTags"))
  eleventyConfig.addCollection("categories",    require("./_11ty/getCategories"))
  eleventyConfig.addCollection("categoriesMap", require("./_11ty/makeCategoriesMap"))

  // Don't process folders with static assets e.g. images
  eleventyConfig.addPassthroughCopy("static/favicons");
  eleventyConfig.addPassthroughCopy("static/media");
  eleventyConfig.addPassthroughCopy("static/DerReinbekerLogo.svg");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("_includes/assets/");
  eleventyConfig.addPassthroughCopy("_redirects");

  // eleventy-plugins-rss
  eleventyConfig.addPlugin(pluginRss)

  /* Markdown Plugins */
  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let opts = {
    permalink: false
  };

  eleventyConfig.setLibrary("md", markdownIt(options)
    .use(markdownItAnchor, opts)
  );

  return {
    templateFormats: ["md", "njk", "html"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    htmlTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
