const userService = require('../services/user.service');
const jwtProvider = require('../config/jwtprovider');
const cartSevice = require('../services/cart.service');
const bcrypt = require('bcrypt');
const register = async (req, res) => {  // This function is called when a new user registers.
    try {
        const user = await userService.createUser(req.body);
        if (!user) {
            return res.status(400).send({ error: "user not created" });
        }
        const jwt = jwtProvider.generateToken(user._id);
        // Create a cart for the user
        await cartSevice.createCart(user._id);
        console.log("user registered: ", user);
        return res.status(200).send({ jwt, message: "User registered successfully", user });

    }

    catch (err) {
        console.log("error in register: ", err);
        return res.status(500).send({ error: err.message });
    }
}

const login = async (req, res) => {  // This function is called when a user logs in.
    try {
        const { email, password } = req.body;
        console.log("email and password: ", email, password);
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(404).send({ error: "user not found with email: ", email });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ error: "Invalid email or password" });
        }
        const jwt = jwtProvider.generateToken(user._id);
        return res.status(200).send({ jwt, message: "User logged in successfully" });
    }
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
}

module.exports = { register, login };