const fetch = require("node-fetch");

module.exports = async function() {
  console.log( "Fetching Print-Ausgaben..." );

  return fetch("https://downloads.derreinbeker.de/ausgaben.json")
    .then(res => res.json()) // node-fetch option to transform to json
    .then(json => {
      // prune the data to return only what we want
      return json;
    });
};