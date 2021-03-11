/*
 *  Author: Anthony Mesa
 *  Date: 14/12/2020
 * 
 */

const paypal = require('../src/paypal');
const fs = require('fs');

/*
 * Allows the handling of donations through paypal API.
 * 
 * The paypal functionality is defined in paypal.js, and is 
 * called here when a donate command is sent to any 
 * channel to which discraft is connected and listening.
 */
module.exports = {
  	name: 'donate',
    description: 'Allows users to donate using paypal.',
    args: false,
    multicraftApi: false,

    /*
     * This needs to be async because it needs to wait on the paypal promises
     */
    async execute(bot, msg, request_data, args) {

      try{
        
        /* Create order request */
        var order = await paypal.getOrder(msg.guild);

        /* Send message to caller with embedded link to follow for donation */
        msg.channel.send({embed: {
          color: 3447003,
          author: {
            name: bot.user.username,
            icon_url: bot.user.avatarURL
          },
          title: "Donate Here",
          url: order.link,
          timestamp: new Date(),
          footer: {
            icon_url: bot.user.avatarURL,
            text: "© Example"
          }
        }}); 
        
      } catch (error){
        throw error;
      }
    },
    
    // // async function gets database ORDERS table and iterates through each one making requests. if requests are good, remove them from database and set trials to -1
    // checkOrders: async function(){
    //   console.log("running");
    //   var delta = true;
    
    //   while(true){
    
    //     if(delta){
    //       delta = false;
    //       console.log("test");
    //       await setTimeout((() => {
    //         // /* if ORDERS table has values in it */
    //         // if( true){
    //         //   // get length of table
    //         //   var table_length = 0;
    //         //   // over that length
    //         //   for(var i = 0; i < table_length; i++){
    //         //     // var server = get table entry i's servername
    //         //     // var order_id = get table entry i's order_id
    //         //     var server = "";
    //         //     var order_id = "";
    //         //     var status = paypal.completeOrder(order_id);
    //         //     if(status == "COMPLETE"){
    //         //       // set servername's trial to -1
    //         //       // remove table entry from database
    //         //     }
    //         //   }
    //         // } 
    //         let rawdata = fs.readFileSync(__dirname + '/../data.json');
    //         let orders = JSON.parse(rawdata);

    //         for (var server_name in orders) {
    //           if (paypal.completeOrder(orders[server_name]) == "COMPLETE") {
    //             console.log("Order Captured!");
    //           } else {
    //             console.log("No Orders Captured...");
    //           }
    //         }

    //         console.log("test2");
    //         delta = true;
    //       }), 100);
    //     }
    //   }
    // }
};