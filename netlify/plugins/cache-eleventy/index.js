// Bewahrt die von eleventy-img erzeugten Bilder (.cache/media/generated) zwischen
// Netlify-Builds auf. Ohne diesen Cache würden bei jedem Deploy alle Bilder neu erzeugt.
// Bewusst nur dieser Unterordner: Die Daten von eleventy-fetch in .cache sollen bei
// jedem Build frisch geladen werden (z. B. _data/downloadablePrintEditions.js).
// Zurücksetzen: in Netlify „Clear cache and deploy site“.
const CACHE_DIR = ".cache/media/generated";

export const onPreBuild = async ({ utils }) => {
    const restored = await utils.cache.restore(CACHE_DIR);
    console.log(restored ? `${CACHE_DIR} aus dem Cache wiederhergestellt.` : `Kein Cache für ${CACHE_DIR} vorhanden.`);
};

export const onPostBuild = async ({ utils }) => {
    const saved = await utils.cache.save(CACHE_DIR);
    console.log(saved ? `${CACHE_DIR} im Cache gespeichert.` : `${CACHE_DIR} nicht gespeichert.`);
};
