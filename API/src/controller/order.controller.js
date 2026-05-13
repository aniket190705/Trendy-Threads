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

const getOrdersByUser = async (req, res) => {
    try {
        const orders = await orderService.getOrdersByUser(req.params.userId);
        return res.status(200).json({ orders });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getOrderById = async (req, res) => {
    try {
        const order = await orderService.findOrderById(req.params.orderId);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        return res.status(200).json({ order });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const cancelOrder = async (req, res) => {
    try {
        const order = await orderService.cancelOrder(req.params.orderId);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        return res.status(200).json({
            message: "Order cancelled successfully",
            order,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createOrder,
    getOrderId,
    getOrdersByUser,
    getOrderById,
    cancelOrder
}
