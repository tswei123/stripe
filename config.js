const getCartDetailUrl = (email) => `${process.env.REACT_APP_SPRING_URL}/order/getIndividualServiceCart?${email}`;

module.exports = {
    getCartDetailUrl
}