const SECRET_KEY = "sk_test_51Mp5t5CLkU3mcD9JP6kBulS4REKjwuUtiGMwGEcl37X8ged6788gEarXHdB0R9qnrUhiwyvOEr7nOcvjine6Aumh00P5Vrwzrc";
const stripe = require('stripe')(SECRET_KEY);

function getTotalPrice(data) {
    const prices = data.map((item) => item.totalprice);
    const totalPrice = prices.reduce((total, nextItem) => total + nextItem, 0);
    return totalPrice;
}

const getPaymentIntent = async (data) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: getTotalPrice(data) * 100,
            currency: 'sgd',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return paymentIntent;
    } catch (error) {
        return error;
    }
};

const getRefund = async (payment_intent, amount) => {
    try {
        const refund = await stripe.refunds.create({
            payment_intent: payment_intent,
            amount: amount * 100,
          });
        return refund;
    } catch (error) {
        return error;
    }
};

module.exports = {
    getPaymentIntent,
    getRefund
};