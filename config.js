const getCartDetailUrl = (email) => `https://tic4902-backend-9892fd41cb23.herokuapp.com/api/order/getIndividualServiceCart?${email}`;

module.exports = {
    getCartDetailUrl
}