const { DateTime } = require("luxon");
const CleanCSS = require("clean-css");
const UglifyJS = require("uglify-es");

module.exports = {
    // Date formatting (human readable)
    readableDate: function(dateObj) {
    return DateTime.fromJSDate(dateObj).setLocale('de').toFormat("d. L. yyyy");
    },

    // Date formatting (machine readable)
    machineDate: function(dateObj) {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
    },

    // Minify CSS
    cssmin: function(code) {
    return new CleanCSS({}).minify(code).styles;
    },

    // Minify JS
    jsmin: function(code) {
    let minified = UglifyJS.minify(code);
    if (minified.error) {
        // eslint-disable-next-line no-console
        console.log("UglifyJS error: ", minified.error);
        return code;
    }
    return minified.code;
    },

    excerpt: function(content) {
        const excerptMinimumLength = 80
        const findExcerptEnd = content => {
            if (content === '') {
                return 0
            }

            const paragraphEnd = content.indexOf('</p>', 0) + 4
            if (paragraphEnd < excerptMinimumLength) {
                return (
                    paragraphEnd +
                    findExcerptEnd(
                        content.substring(paragraphEnd),
                        paragraphEnd
                    )
                )
            }

            return paragraphEnd
        }

        if (!content) {
            return
        }

        if (content.length <= excerptMinimumLength) {
            return content
        }

        const excerptEnd = findExcerptEnd(content)
        return content.substring(0, excerptEnd)
    }

}