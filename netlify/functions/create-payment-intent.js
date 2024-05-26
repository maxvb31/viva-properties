// functions/create-payment-intent.js
const stripe = require('stripe')('sk_test_51PKQUQP2WcwkR8ROapfMjr9U9oKP0m2LD2d1kjl5xLIU3pNUabufJ5n5Ye5FJ7FnT03zXBY8sJ1tM4XTSlX08rEb00zMpvOa7Z');

exports.handler = async (event) => {
  const { amount } = JSON.parse(event.body);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
