const orderService = require('../services/order.service');

const createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(req.body);
        console.log("callled")
        return res.status(200).json({
            message: "Order created successfully",
            order: order || {},
        });


    }

    catch (error) {
        console.log("Error creating order:", error);
        return res.status(500).json({ error: "Error creating order: " + error.message });
    }

}

const getOrderId = async (req, res) => {
    try {
        const orderId = await orderService.findOrderById(req.body.orderId);
        console.log("orderId: ", orderId);
        return res.status(200).send({ message: "Order found successfully: ", orderId });
    }
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
}
module.exports = {
    createOrder,
    getOrderId
}   