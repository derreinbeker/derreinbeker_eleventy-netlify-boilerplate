const pluginRss = require('@11ty/eleventy-plugin-rss')
const htmlmin = require("html-minifier");
const filters = require('./_11ty/filters.js')
const shortcodes = require("./_11ty/shortcodes.js");
const markdownIt = require('./_11ty/markdown.js');

module.exports = function(eleventyConfig) {
  eleventyConfig.addAsyncShortcode("imageWithCaption", shortcodes.imageWithCaption);
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

  eleventyConfig.addPassthroughCopy("media/favicons");
  eleventyConfig.addPassthroughCopy("media/uploads");
  eleventyConfig.addPassthroughCopy("media/DerReinbekerLogo.svg");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("_includes/assets/");
  eleventyConfig.addPassthroughCopy("_redirects");

  // eleventy-plugins-rss
  eleventyConfig.addPlugin(pluginRss)

  /* Markdown Plugins */
  eleventyConfig.setLibrary("md", markdownIt);

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
