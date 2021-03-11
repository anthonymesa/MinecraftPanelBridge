/*
 *  Author: Anthony Mesa
 *  Date: 14/12/2020
 * 
 */

 const Axios = require('axios');

module.exports = {
    name: 'run',
    description: 'Runs command in connected multicraft server.',
    args: true,
    multicraftApi: true,
    
    execute(bot, msg, request_data, args) {
        var command = args.join(' ');

        Axios.post('http://localhost/run.php', {
            responseType: 'text',
            url: `${request_data[0]}`,
            user: `${request_data[1]}`,
            api_key: `${request_data[2]}`,
            server_id: `${request_data[3]}`,
            command: `${command}`
        }).then(function (response) {
            getLine(bot, msg, request_data, args, function (response2) {
                msg.channel.send(response2);
            });
        });
    }
};

function getLine(bot, msg, request_data, args, cb) {
    Axios.post('http://localhost/get-line.php', {
        responseType: 'text',
        url: `${request_data[0]}`,
        user: `${request_data[1]}`,
        api_key: `${request_data[2]}`,
        server_id: `${request_data[3]}`
    })
    .then(function (response) {
        cb(response.data);
    });
}