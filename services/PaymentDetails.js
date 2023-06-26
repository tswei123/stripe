const axios = require('axios');

const paymentDetails = async (email) => {
    try {
        const paymentResponse = await axios.get(`https://tic4902-stripe-backend-ca3a56671ba8.herokuapp.com/order/getIndividualServiceCart?email=${email}`);
        return paymentResponse.data;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    paymentDetails
};