const Order = require("../models/order.model");
async function createOrder(data) {
    console.log("\n\norder data: ", data);
    try {
        const order = new Order({

            user: data.userId,  // Assuming userId is passed in data
            totalPrice: data.totalPrice, // Assuming totalPrice is passed in data
            totalItem: data.totalItem, // Assuming totalItem is passed in data
            shippingAddress: data.shippingAddress.Address,
            totalDiscountedPrice: data.discountedPrice,
        });
        await order.save();
        console.log("created order: ", order);
        return order;
    }
    catch (err) {
        console.error("Error creating order:", err);
        throw new Error(err.message);
    }
}

async function findOrderById(orderId) {
    console.log("\n\norder iddd: ", orderId);
    try {
        const order = await Order.findById(orderId).populate({ path: 'paymentDetails', strictPopulate: false });
        return order;
    }

    catch (error) {
        console.log(error)
        throw new Error("Error finding order");
    }
}


module.exports = {
    createOrder,
    findOrderById
};