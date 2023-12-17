const Image = require("@11ty/eleventy-img");
const markdownIt = require('./markdown.js');

/*
Beispiel:
{% imageWithCaption "media/uploads/2023-20-11-Neugebauer-Beate.jpg" "Matze ist \"auch\" da" "Ich kann es nicht mehr \"sagen\"" %}
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
	  widths: [...widths],
	  formats: [...formats],
	  outputDir: '_site/media/generated',
	  urlPath: '/media/generated',
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
