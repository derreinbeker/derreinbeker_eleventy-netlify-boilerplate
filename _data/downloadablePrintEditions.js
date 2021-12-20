const fetch = require("node-fetch");

module.exports = async function() {
  // return fetch("http://makai.local/ausgaben.json")
  return fetch("https://downloads.derreinbeker.de/ausgaben.json")
  .then(res => res.json())
  .then(json => {
    return json;
  });
};