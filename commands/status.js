/*
 *  Author: Anthony Mesa
 *  Date: 14/12/2020
 * 
 */

 const Axios = require('axios');
var url, user, api_key;

module.exports = {
	name: 'status',
    description: 'Gets online/offline status of server.',
    args: false,
    multicraftApi: true,
    
    execute(bot, msg, request_data, args) {
        Axios.post('http://localhost/status.php', {
            responseType: 'text',
            url: `${request_data[0]}`,
            user: `${request_data[1]}`,
            api_key: `${request_data[2]}`,
            server_id: `${request_data[3]}`
        })
        .then(function (response) {
            if(response.data.includes('failed to open stream')){
                msg.channel.send('An error occured, I was not able to reach the server (It may be offline).');
            } else {
                msg.channel.send('Your server is ' + response.data);
            }
        });
	},
};