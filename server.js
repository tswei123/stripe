const express = require('express');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json());
const cors = require('cors');

const { paymentDetails } = require('./services/PaymentDetails');
const { getPaymentIntent, getRefund } = require('./services/StripeFunctions');

app.use(cors({
    origin: '*'
}));

const port = process.env.PORT || 3001

app.get('/', (req,res) => {
    res.send('App is live')
})

app.post('/create-payment-intent', async (req, res) => {
    try {
        const { email } = req.body;
        const data = await paymentDetails(email);
        const paymentIntent = await getPaymentIntent(data);
        res.json({clientSecret: paymentIntent.client_secret});
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/refund', async (req,res) => {
    try {
        const { payment_intent, amount }  = req.body;
        console.log(req.body);
        const refund = await getRefund(payment_intent, amount);
        res.json(refund);
    } catch(error){
        console.error(error);
        res.status(500).send(error);
    }
});
/*
let email = "user123@u.nus.edu"
paymentDetails(email).then(data => {
    console.log(data)
    getPaymentIntent(data).then(paymentint => {
      console.log(paymentint.client_secret)
  })
})
*/
app.post('/test', async (req,res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1999,
            currency: 'sgd',
            automatic_payment_methods: {
                enabled: true,
            },
        });
        res.send({clientSecret: paymentIntent.client_secret})
    } catch (error) {
        return res.status(400).send({
            error: {
                message: error.message,
            },
        });
    }
})
app.listen(port, () => console.log(`app is running on ${port}`))