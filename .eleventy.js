import pluginRss from "@11ty/eleventy-plugin-rss";
import * as htmlmin from "html-minifier";
import filters from "./_11ty/filters.js";
import shortcodes from "./_11ty/shortcodes.js";
import markdownIt from "./_11ty/markdown.js";
import getTags from "./_11ty/getTags.js";
import getCategories from "./_11ty/getCategories.js";
import makeCategoriesMap from "./_11ty/makeCategoriesMap.js";
export default (function (eleventyConfig) {
    eleventyConfig.addAsyncShortcode("imageWithCaption", shortcodes.imageWithCaption);
    eleventyConfig.addLayoutAlias("post", "layouts/post.njk");
    // Filters
    eleventyConfig.addFilter('head', filters.head);
    eleventyConfig.addFilter('validDateStringOfPrintEditionFilename', filters.validDateStringOfPrintEditionFilename);
    eleventyConfig.addFilter('cleanupCharactersNotAllowedInXML', filters.cleanupCharactersNotAllowedInXML);
    eleventyConfig.addFilter('descriptionOfPrintEditionFilename', filters.descriptionOfPrintEditionFilename);
    eleventyConfig.addFilter('startsWithString', filters.startsWithString);
    eleventyConfig.addFilter('cssmin', filters.cssmin);
    eleventyConfig.addFilter('jsmin', filters.jsmin);
    eleventyConfig.addFilter('machineDate', filters.machineDate);
    eleventyConfig.addFilter('readableDate', filters.readableDate);
    
    // Minify HTML output
    eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
        if (outputPath.indexOf(".html") > -1) {
            let minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true
            });
            return minified;
        }
        return content;
    });
    // only content in the `posts/` directory
    eleventyConfig.addCollection("posts", function (collection) {
        return collection.getAllSorted().filter(function (item) {
            return item.inputPath.match(/^\.\/posts\//) !== null;
        });
    });
    eleventyConfig.addCollection("tagList", getTags);
    eleventyConfig.addCollection("categories", getCategories);
    eleventyConfig.addCollection("categoriesMap", makeCategoriesMap);
    eleventyConfig.addPassthroughCopy("media/favicons");
    eleventyConfig.addPassthroughCopy("media/uploads");
    eleventyConfig.addPassthroughCopy("media/DerReinbekerLogo.svg");
    eleventyConfig.addPassthroughCopy("media/open_graph_logo.png");
    eleventyConfig.addPassthroughCopy("admin");
    eleventyConfig.addPassthroughCopy("_includes/assets/");
    eleventyConfig.addPassthroughCopy("_redirects");
    // eleventy-plugins-rss
    eleventyConfig.addPlugin(pluginRss);
    /* Markdown Plugins */
    eleventyConfig.setLibrary("md", markdownIt);
    return {
        pathPrefix: "/",
        dir: {
            input: ".",
            includes: "_includes",
            data: "_data",
            output: "_site"
        }
    };
});
