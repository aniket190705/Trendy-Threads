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

const updatePaymentInformation = async (req, res) => {
    try {
        paymentService.updatePaymentInformation(req.query);
        return res.status(200).send({ message: "Payment information updated", status: true });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    createPaymentLink,
    updatePaymentInformation
}