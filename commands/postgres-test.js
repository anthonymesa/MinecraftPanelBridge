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
	name: 'postgres-test',
    description: 'FOR DEBUGGING PURPOSES ONLY.',
    args: false,
    multicraftApi: false,

	execute(bot, msg, request_data, args) {
        client.connect()
        .then(() => msg.channel.send("Connected successfully!"))
        .catch(e => console.log)
        .finally(() => client.end());
	},
};