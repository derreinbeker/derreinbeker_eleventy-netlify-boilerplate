const Image = require("@11ty/eleventy-img");
const markdownIt = require('./markdown.js');

/*
Beispiel:
{% imageWithCaption "static/media/2023-20-11-Neugebauer-Beate.jpg", "", "Sterbebegleiterin Beate Neugebauer: »Dieses Ehrenamt macht für mich Sinn.«" %}
*/
const imageWithCaption = async function (
	src,
	alt,
	figcaption, 
	widths = [400, 800, 1280],
	formats = ['webp', 'jpeg'],
	sizes = '100vw'
  ) {
	let metadata = await Image(src, {
	  widths: [...widths, null],
	  formats: [...formats, null],
	  outputDir: '_site/static/media/generated',
	  urlPath: '/static/media/generated',
	});
  
	let imageAttributes = {
	  alt,
	  sizes,
	  loading: "lazy",
	  decoding: "async",
	};
  
	const imageHTML = Image.generateHTML(metadata, imageAttributes);

	let figcaptionVal = "";
	if (figcaption !== undefined) {
		const figcaptionHTMl = markdownIt.renderInline(figcaption);
		figcaptionVal = `<figcaption>${figcaptionHTMl}</figcaption>`;
	}
	return `<figure>${imageHTML}${figcaptionVal}</figure>`;
}

module.exports = {
	imageWithCaption
};
