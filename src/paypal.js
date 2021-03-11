/*
 *  Author: Anthony Mesa
 *  Date: 14/12/2020
 * 
 */

const paypal = require('@paypal/checkout-server-sdk');

const { paypal_client_id, paypal_client_secret } = require('../res/config.json');

let environment = new paypal.core.SandboxEnvironment(paypal_client_id, paypal_client_secret);
let client = new paypal.core.PayPalHttpClient(environment);

let captureOrder = async function(orderId) {
    request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    // Call API with your client and get a response for your call
    let response = await client.execute(request);

    //console.log(`Response: ${JSON.stringify(response)}`);
    // If call returns body in response, you can get the deserialized version from the result attribute of the response.
    //console.log(`Capture: ${JSON.stringify(response.result)}`);

    return response.result.status;
};

module.exports = {
    getOrder: async function(server_id){
        let request = new paypal.orders.OrdersCreateRequest();

        const return_url = "http://35.222.112.14/paypal_landing_page.php?dsid=" + server_id
    
        request.requestBody({
            "intent": "AUTHORIZE",
            "application_context": {
                "return_url": return_url
            },
            "purchase_units": [
                {
                    "amount": {
                        "currency_code": "USD",
                        "value": "2.00"
                    }
                }
            ]
        });
    
        let response = await client.execute(request);
        //console.log(`Response: ${JSON.stringify(response)}`);
        // If call returns body in response, you can get the deserialized version from the result attribute of the response.
       //console.log(`Order: ${JSON.stringify(response.result)}`);
       for(let i = 0; i < response.result.links.length; i++){
          if(response.result.links[i].rel === 'approve'){
             link = response.result.links[i].href;
          }
       }
    
       id = response.result.id;
       
       console.log(link);
       console.log(id);

       return { 
           link, 
           id 
        };
    },

    completeOrder: async function(approved_order){
        let capture = await captureOrder(approved_order.id);
      
        console.log(capture);
        process.exit();
    }
};
