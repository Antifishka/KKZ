const {
    signup, 
    login,
    logout,
} = require('../services/authService')

const ctrlSignup = async (req, res) => { 
    const { email, password, subscription } = req.body;
    console.log("email, password", email, password)
    const user = await signup(email, password, subscription);

    res.status(201).json({user});
};

const ctrlLogin = async (req, res) => { 
    const { email, password, subscription } = req.body;

    const data = await login(email, password, subscription);

    res.status(201).json({data});
};

const ctrlLogout = async (req, res) => { 
    const { _id } = req.user;

    await logout(_id);

    res.status(204).json();
};

const ctrlCurrent = async (req, res) => { 
    const user = req.user;

    res.status(200).json({user});
};

module.exports = {
    ctrlSignup,
    ctrlLogin,
    ctrlLogout,
    ctrlCurrent
}