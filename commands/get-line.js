/*
 *  Author: Anthony Mesa
 *  Date: 14/12/2020
 * 
 */

const Axios = require('axios');
var url, user, api_key;

module.exports = {
  	name: 'get-line',
    description: 'Gets line from server chat.',
    args: false,
    multicraftApi: true,

    execute(bot, msg, request_data, args) {
        console.log("command &get-line ran")
        Axios.post('http://localhost/get-line.php', {
            responseType: 'text',
            url: `${request_data[0]}`,
            user: `${request_data[1]}`,
            api_key: `${request_data[2]}`,
            server_id: `${request_data[3]}`
        })
        .then(function (response) {
            msg.channel.send(response.data);
        });
	},
};
