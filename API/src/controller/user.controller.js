const userService = require('../services/user.service');
const getUserProfile = async (req, res) => {
    try {

        const jwt = req.headers.authorization?.split(' ')[1];

        if (!jwt) {
            return res.status(401).send({ error: 'token not found' });
        }
        const user = await userService.getUserProfileByToken(jwt);
        return res.status(200).send(user);
    }
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
}

const getAllUsers = async (req, res) => {   // This function is called to get all users.
    try {
        const users = await userService.getAllUsers();
        return res.status(200).send(users);
    }
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
}

module.exports = { getUserProfile, getAllUsers };
