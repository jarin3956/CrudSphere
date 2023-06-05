const Admin = require('../Model/adminModel')
const Users = require('../Model/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const securePassword = async (password) => {

    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    } catch (error) {
        console.log(error.message);
    }
}

const adminRegister = async (req, res) => {
    try {
        const spassword = await securePassword(req.body.password);
        const admin = new Admin({
            name: req.body.name,
            email: req.body.email,
            password: spassword
        });

        if (req.body.password === req.body.repassword) {
            const adminData = await admin.save();
            res.json({ status: 'ok' });
        } else {
            res.json({ status: 'incorrectpassword' });
        }
    } catch (error) {
        res.json({ status: 'error', error: 'duplicate email' });
    }
};


const adminLogin = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const admin = await Admin.findOne({ email: email })
        if (admin) {
            const passwordMatch = await bcrypt.compare(password, admin.password)
            if (passwordMatch) {
                const admintoken = jwt.sign({ adminId: admin._id }, process.env.ADMIN_SECRET);
                return res.json({ status: 'ok', admin: admintoken })
            } else {
                return res.json({ status: 'passworderror', admin: false })
            }
        } else {
            return res.json({ status: 'error', admin: false })
        }
    } catch (error) {
        console.log(error.message);
    }
}

const findAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById({ _id: req.params.adminId })
        if (admin) {
            res.status(200).json({
                name: admin.name,
                email: admin.email
            });
        }
    } catch (error) {
        console.log(error.message);
    }
}

const loadUsers = async (req, res) => {
    try {
        const userData = await Users.find({});
        if (userData) {
            res.status(200).json(userData); // Set response status to 200 and send userData directly
        } else {
            res.status(404).json({ error: 'No users found' }); // Handle case when no users are found
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal server error' }); // Handle server error
    }
};

const changeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.status = !user.status;
        await user.save();
        return res.status(200).json(user);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const changeData = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await Users.findById(userId);
        if (user) {
            res.status(200).json({
                user_id: user._id,
                name: user.name,
                email: user.email,
            })
        }

    } catch (error) {
        console.log(error.message);
    }
}
const saveUser = async (req, res) => {
    try {
        const id = req.params.id
        const { name, email } = req.body;
        const user = await Users.findById(id);
        user.name = name;
        user.email = email;
        await user.save();
        res.status(200).json({ message: 'User data saved successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error saving user data' });
    }
}

const deleteUser = async (req,res) => {
    try {
        const { id } = req.params;
        const user = await Users.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {
    adminRegister,
    adminLogin,
    findAdmin,
    loadUsers,
    changeStatus,
    changeData,
    saveUser,
    deleteUser
}