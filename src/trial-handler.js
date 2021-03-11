/*
 *  Author: Anthony Mesa
 *  Date: 14/12/2020
 * 
 */

const paypal = require('./paypal');

module.exports = {
    updateTrials: function (bot) {
      pg_client.query("SELECT discord_server_id FROM payment_success", (err, res) => {
        if(err) {
            console.log(err.stack);
        } else {
            console.log("reached db");
            console.log(res.rows[0]);
        }
      });
    },
};