const express = require('express');
const user_route = express();
const { validateToken } = require('../Middleware/middleware');

const userController = require('../Controller/userController');


const multer = require("multer");
const upload = multer({ dest: '../public/UserImages' });

user_route.post('/api/register', upload.single('image') , userController.userRegister);
user_route.post('/api/login', userController.userLogin);
user_route.get('/api/dashboard', validateToken, userController.findUser );
user_route.get('/api/editdetails',validateToken,userController.editDetails);
user_route.put('/api/saveUser/:userId',upload.single('image'),userController.saveUser);
user_route.put('/api/changepassword/:userId',userController.changePassword)
module.exports = user_route;
