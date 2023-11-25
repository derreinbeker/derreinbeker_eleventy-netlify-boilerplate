const Image = require("@11ty/eleventy-img");

const image = async function (
	src,
	alt,
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
  
	// You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
	return Image.generateHTML(metadata, imageAttributes);
  }

const figure = function (content, caption, className) {
	let classVal = "";
	let captionVal = "";
	if (className !== undefined) {
		classVal = `class=${className}`;
	}
	if (caption !== undefined) {
		captionVal = `<figcaption>${caption}</figcaption>`;
	}
	return `<figure ${classVal}>${content}${captionVal}</figure>`;
};

module.exports = {
	image,
	figure,
};
