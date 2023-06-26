const axios = require('axios');

const paymentDetails = async (email) => {
    try {
        const paymentResponse = await axios.get(`${process.env.REACT_APP_SPRING_URL}/order/getIndividualServiceCart?email=${email}`);
        return paymentResponse.data;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    paymentDetails
};