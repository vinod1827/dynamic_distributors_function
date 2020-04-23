const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.sendAdminNotification = functions.database.ref('/orders_table/{pushId}').onWrite(event => {

	console.log("triggered");

	const order = event.after.val();

	console.log("order Value = "+String(order.key));
  console.log("Customer Name = "+String(order.customerName));
	const orderStatus = parseInt(order.orderStatus);
	console.log("order status = "+orderStatus);

if(orderStatus === 0){

	const payload = {

					notification: {
						title: 'New Order',
						body: `New Order Received from ${String(order.customerName)}`
					}};


 return admin.messaging().sendToTopic("orders",payload)
		.then(function(response){
				 console.log('Notification sent successfully:',response);
				 return response
		})
		.catch(function(error){
				 console.log('Notification sent failed:',error);
		});

} else if(orderStatus === 1){

	var customerPayload = {

         data: {
           title: 'Order Accepted',
           description: `Your order has been accepted`,
           customer_name: `${String(order.customerName)}`,
         },
         topic: `${String(order.customerId)}`
         //token: registrationToken
  };

	var staffPayload = {

				 data: {
					 title: 'Order Accepted',
					 description: `New Order to process.. `,
				 },
				 topic: `staff`
	};

  admin.messaging().send(staff)

  return admin.messaging().send(customerPayload)
		.then((response) => {
			  console.log('Customer Notification Sent', response);
			  return response
		})
		.catch((error) => {
			  console.log('Customer : Error sending message: data message', error);
			             //  res.redirect('/');
	});

} else if(orderStatus === 2){

	var staffPayload1 = {

				 data: {
					 title: 'Order Accepted',
					 description: `New Order to process.. `,
				 },
				 topic: `staff`
	};

  return admin.messaging().send(staffPayload1)
		.then((response) => {
			  console.log('Staff Notification Sent', response);
			  return response
		})
		.catch((error) => {
			  console.log('Staff : Error sending message: data message', error);
			             //  res.redirect('/');
	});

} else if(orderStatus === 3){

	var ccc = {

         data: {
           title: 'Order Dispatched',
           description: `Your order has been Dispatched`,
           customer_name: `${String(order.customerName)}`,
         },
         topic: `${String(order.customerId)}`
         //token: registrationToken
       };

			 var ddd = {

							 data: {
								 title: 'Order Dispatched',
								 description: `Order has been Dispatched`,
							 },
							 topic: `delivery`
							 //token: registrationToken
						 };

 admin.messaging().send(ddd)
  return admin.messaging().send(ccc)
		.then((response) => {
			  console.log('Customer Notification Sent', response);
			  return response
	})
	.catch((error) => {
			  console.log('Customer : Error sending message: data message', error);
			             //  res.redirect('/');
	});

} else if(orderStatus === 5){

		var cc = {

				 data: {
					 title: 'Order Cancelled',
					 description: `Your order has been cancelled`,
					 customer_name: `${String(order.customerName)}`,
				 },
				 topic: `${String(order.customerId)}`
				 //token: registrationToken
			 };


		return admin.messaging().send(cc)
								 .then((response) => {
									 console.log('Customer Notification Sent', response);
									 return response
								 })
								 .catch((error) => {
									 console.log('Customer : Error sending message: data message', error);
									 //  res.redirect('/');
		  });

}else{

	const payload = {

					notification: {
						title: 'Order Status Changed',
						body: `Check Orders`
					}};


 return admin.messaging().sendToTopic("orders",payload)
		.then(function(response){
				 console.log('Notification sent successfully:',response);
				 return response
		})
		.catch(function(error){
				 console.log('Notification sent failed:',error);
		});
}

});

/*
exports.simpleDbFunction = functions.database.ref('/orders_table').onCreate((snap, context) => {
			  console.log("triggered");
				console.log("Data : "+snap.val().key);
    });
*/
