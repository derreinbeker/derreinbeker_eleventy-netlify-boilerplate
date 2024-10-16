import EleventyFetch from "@11ty/eleventy-fetch";
export default (async function () {
    let url = "https://downloads.derreinbeker.de/ausgaben.json";
    /* This returns a promise */
    return EleventyFetch(url, {
        type: "json"
    });
});
