const { User } = require('../model/user');

const findByEmail = async (email) => {
    return await User.findOne({ email });
};

const create = async (options) => {
    const user = new User(options);
    return await user.save();
};

const updateToken = async (id, token) => {
    return await User.updateOne({ _id: id }, { token });
};

const findById = async (id) => {
    return await User.findById(id);
};

module.exports = {
    findByEmail,
    create,
    updateToken,
    findById,
};