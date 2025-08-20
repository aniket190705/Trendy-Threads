const paymentService = require("../services/payment.service.js")
const createPaymentLink = async (req, res) => {
    try {
        const paymentLink = await paymentService.createPaymentLink(req.params.id);
        console.log("payment link: ", paymentLink);
        return res.status(200).json({ paymentLink: paymentLink });

    } catch (error) {

        return res.status(500).send(error.message);
    }
}

// payment.controller.js
const updatePaymentInformation = async (req, res) => {
    try {
        const result = await paymentService.updatePaymentInformation(req.body);  // ✅ use req.body
        return res.status(200).send(result);  // return the service response
    } catch (error) {
        return res.status(500).send(error.message);
    }
};


module.exports = {
    createPaymentLink,
    updatePaymentInformation
}