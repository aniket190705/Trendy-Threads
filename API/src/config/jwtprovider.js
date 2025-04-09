const jwt = require('jsonwebtoken');

const SECRET_KEY = "jalkghlahdglkajgkladglkagjiojoegbjdngncvkxabi"
const generateToken = (userId) => {
    const token = jwt.sign({ userId }, SECRET_KEY, {
        expiresIn: "48h"
    });
    return token;
}

const getUserIdFromToken = (token) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded.userId;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    generateToken,
    getUserIdFromToken
}