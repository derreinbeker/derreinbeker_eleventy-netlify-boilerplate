const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function() {
  let url = "https://downloads.derreinbeker.de/ausgaben.json";

  /* This returns a promise */
  return EleventyFetch(url, {
    type: "json"
  });
};