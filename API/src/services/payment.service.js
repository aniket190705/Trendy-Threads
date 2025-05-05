const razorpay = require('../config/razorpayclient.js');
const orderService = require('./order.service.js');
const createPaymentLink = async (orderId) => {
    try {
        const order = await orderService.findOrderById(orderId)
        console.log("\n\nfound order from backend: ", order)
        if (!order) {
            throw new Error("Order not found");
        }
        const paymentLinkRequest = {
            amount: order.totalDiscountedPrice * 100,
            currency: "INR",
            // customer: {
            //     name: order.user.firstName + " " + order.user.lastName,
            //     contact: order.user.mobile,
            //     email: order.user.email
            // },
            notify: {
                sms: true,
                email: true
            },
            reminder_enable: true,
            callback_url: `https://trendy-threads-jsld.onrender.com/payment/${orderId}`,
            callback_method: 'get'
        };
        const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);
        const paymentLink_Id = paymentLink.id;
        const payment_link_url = paymentLink.short_url;
        const resData = {
            paymentLink_Id,
            payment_link_url
        }

        return resData;
    } catch (error) {
        console.error("Error creating payment linked:", error);
        throw new Error("Error creating payment linkkk: " + error.message);
    }
}
const updatePaymentInformation = async (reqData) => {
    const paymentId = reqData.payment_id;
    const orderId = reqData.order_id;
    try {
        const order = await orderService.findOrderById(orderId);
        const payment = await razorpay.payments.fetch(paymentId);
        if (payment.status == "captured") {
            order.paymentDetails.paymentId = paymentId;
            order.paymentDetails.status = "COMPLETED"
            order.orderStatus = "PLACED";
            await order.save();
        }
        const resData = { message: "Your order is placed", success: true }
        return resData;
    }
    catch (error) {
        throw new Error("Error updating payment information: ", error.message);
    }
}
module.exports = {
    createPaymentLink,
    updatePaymentInformation
}