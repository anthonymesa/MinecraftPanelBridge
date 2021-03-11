/*
 *  Author: Anthony Mesa
 *  Date: 14/12/2020
 * 
 */

// Get sensitive variables from file
const {
    database_user,
    database_password,
    database_host,
    database_port,
    database_db } = require('../res/config.json');

const {Client} = require('pg');
const client = new Client({
    user: database_user,
    password: database_password,
    host: database_host,
    port: database_port,
    database: database_db
});

module.exports = {
	name: 'show-table',
    description: 'FOR DEBUGGING PURPOSES ONLY',
    args: false,
    multicraftApi: false,

	execute(bot, msg, request_data, args) {
        msg.channel.send('displaying tables...');
        pg_client.query('SELECT discord_server_id FROM payment_success', (err, res) => {
            if(err) {
                console.log(err.stack);
            } else {
                console.log("reached db");
                console.log(res.rows[0]);
            }
        });
	},
};