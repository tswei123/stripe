const axios = require('axios');

const paymentDetails = async (email) => {
    try {
        const paymentResponse = await axios.get(`https://tic4902-backend-9892fd41cb23.herokuapp.com/api/order/getIndividualServiceCart?email=${email}`);
        return paymentResponse.data;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    paymentDetails
};