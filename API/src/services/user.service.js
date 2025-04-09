const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwtProvider = require('../config/jwtprovider');

const createUser = async (userData) => {
    try {
        let { firstName, lastName, email, password } = userData;
        const isUserExist =
            await User.findOne({ email });
        if (isUserExist) {
            throw new Error('User already exist with this email', email);
        }

        password = await bcrypt.hash(password, 8);
        const user = await User.create({
            firstName, lastName, email, password
        });
        console.log("created user ", user);

        return user;
    }

    catch (err) {
        throw new Error(err.message);
    }
}
const findUserById = async (userId) => {
    try {
        const user = await User.findById(userId).populate({ path: 'addresses', strictPopulate: false });
        if (!user) {
            throw new Error('User not found with this id', userId);
        }
        return user;
    } catch (err) {
        throw new Error(err.message);
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found with this email', email);
        }
        return user;
    } catch (err) {
        throw new Error(err.message);
    }
}

const getUserProfileByToken = async (token) => {
    try {
        const userId = jwtProvider.getUserIdFromToken(token);
        const user = await findUserById(userId);
        if (!user) {
            throw new Error('User not found with this id', userId);
        }
        else {

            return user;
        }
    }
    catch (err) {
        throw new Error(err.message);
    }
}

const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    }
    catch (err) {
        throw new Error(err.message);
    }
}
module.exports = {
    createUser, findUserById, getUserByEmail, getUserProfileByToken, getAllUsers
};