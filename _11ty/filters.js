import { DateTime } from "luxon";
import CleanCSS from "clean-css";
import UglifyJS from "uglify-es";
import path from "path";
export const head = function (array, n) {
    if (n < 0) {
        return array.slice(n);
    }
    return array.slice(0, n);
};
export const cleanupCharactersNotAllowedInXML = function (code) {
    // eslint-disable-next-line no-control-regex
    var replacementExpression = /\u0008/g;
    var replacedCode = code.replace(replacementExpression, "");
    return replacedCode;
};
export const descriptionOfPrintEditionFilename = function (printeditionFileName) {
    var filenameWithoutExtension = path.parse(printeditionFileName).name;
    return DateTime.fromISO(filenameWithoutExtension).setLocale('de').toFormat("dd.LL.");
};
export const validDateStringOfPrintEditionFilename = function (printeditionFileName) {
    var filenameWithoutExtension = path.parse(printeditionFileName).name;
    return machineDate(new Date(filenameWithoutExtension));
};
export const startsWithString = function (array, otherString) {
    return array.filter(string => string.startsWith(otherString));
};
export const readableDate = function (dateObj) {
    return DateTime.fromJSDate(dateObj).setLocale('de').toFormat("d. L. yyyy");
};
export const machineDate = function (dateObj) {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
};
export const cssmin = function (code) {
    return new CleanCSS({}).minify(code).styles;
};
export const jsmin = function (code) {
    let minified = UglifyJS.minify(code);
    if (minified.error) {
        // eslint-disable-next-line no-console
        console.log("UglifyJS error: ", minified.error);
        return code;
    }
    return minified.code;
};
export const excerpt = function (content) {
    const excerptMinimumLength = 80;
    const findExcerptEnd = content => {
        if (content === '') {
            return 0;
        }
        const paragraphEnd = content.indexOf('</p>', 0) + 4;
        if (paragraphEnd < excerptMinimumLength) {
            return (paragraphEnd +
                findExcerptEnd(content.substring(paragraphEnd), paragraphEnd));
        }
        return paragraphEnd;
    };
    if (!content) {
        return;
    }
    if (content.length <= excerptMinimumLength) {
        return content;
    }
    const excerptEnd = findExcerptEnd(content);
    return content.substring(0, excerptEnd);
};
export default {
    head,
    cleanupCharactersNotAllowedInXML,
    descriptionOfPrintEditionFilename,
    validDateStringOfPrintEditionFilename,
    startsWithString,
    readableDate,
    machineDate,
    cssmin,
    jsmin,
    excerpt
};
