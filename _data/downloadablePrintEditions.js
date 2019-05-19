const request = require('request');

function getRemoteData () {
    return new Promise((resolve, reject) => {
        const options = {  
            url: 'https://downloads.derreinbeker.de/ausgaben.json',
            json: true
        };
        request(options, (err, res, body) => {
            if (err) {
                reject(err); return;
            }
                resolve(body);
            });
        });
}
   
module.exports = async function() {
    let json = await getRemoteData();
    return json;
};
