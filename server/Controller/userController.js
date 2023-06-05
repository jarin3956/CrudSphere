
const User = require('../Model/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
require('dotenv').config()

const securePassword = async (password) => {

    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    } catch (error) {
        console.log(error.message);
    }
}

const userRegister = async (req, res) => {
    console.log(req.body);

    try {
        const spassword = await securePassword(req.body.password);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: spassword,
            image: req.file.filename
        })
        if (req.body.password === req.body.repassword) {
            const userData = await user.save();
            res.json({ status: 'ok' });
        } else {
            res.json({ status: 'incorrectpassword' });
        }
    } catch (error) {
        res.json({ status: 'error', error: 'duplicate email' })
    }
}
const userLogin = async (req, res) => {
    try {
        let blocked = true
        const email = req.body.email
        const password = req.body.password
        const user = await User.findOne({ email: email })
        if (user && user.status === false) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                const token = jwt.sign({ userId: user._id }, process.env.USER_SECRET);
                return res.json({ status: 'ok', user: token })
            } else {
                return res.json({ status: 'passworderror', user: false })
            }
        } else {
            if (!user) {
                return res.json({ status: 'usernotfound', user: false })
            } else {
                return res.json({ status: 'userblocked' })
            }

        }
    } catch (error) {
        console.log(error.message);
    }
}


const findUser = async function (req, res) {
    try {
        const user = await User.findById({ _id: req.params.userId });
        if (user) {
            res.status(200).json({
                _id: user._id,
                username: user.name,
                email: user.email,
                image: user.image,
            });
        }
    } catch (error) {
        console.log(error.message);
    }  
}

const editDetails = async function (req, res) {
    try {

        const user = await User.findById({ _id: req.params.userId })
        if (user) {
            res.status(200).json({
                user_id: user._id,
                name: user.name,
                email: user.email,
                image: user.image
            })
        }
    } catch (error) {
        console.log(error.message);
    }

}
const saveUser = async function (req, res) {
    try {
        const id = req.params.userId
        const { name, email } = req.body;
        const user = await User.findById({ _id: id });

        if (req.file) {
            user.image = req.file.filename
        }
        user.name = name;
        user.email = email;
        await user.save();
        res.status(200).json({ message: 'User data saved successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Error saving user data' });

    }
}
const changePassword = async function(req,res){
    try {
        const userId = req.params.userId;
        const { oldpassword, password, repassword } = req.body;
        const user = await User.findById(userId);
        const passwordMatch = await bcrypt.compare(oldpassword, user.password);
        if(!passwordMatch){
            return res.json({ status: 'usererror' })
        }
        if(password !== repassword){
            return res.json({ status: 'didnotmatch' })
        }
        const spassword = await securePassword(password)
        user.password = spassword;
        await user.save()
        res.json({ status: 'success' })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    userRegister,
    userLogin,
    findUser,
    editDetails,
    saveUser,
    changePassword
}