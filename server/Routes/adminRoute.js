const express = require('express');
const admin_route = express();
const { validateAdminToken } = require('../Middleware/AdminMiddleware');



const adminController = require('../Controller/adminController');

admin_route.post('/api/register',adminController.adminRegister);
admin_route.post('/api/login',adminController.adminLogin);
admin_route.get('/api/dashboard',validateAdminToken,adminController.findAdmin);
admin_route.get('/api/userdetails',adminController.loadUsers);
admin_route.put('/api/changeStatus/:id',adminController.changeStatus);
admin_route.get('/api/changeData/:id',adminController.changeData);
admin_route.put('/api/saveUser/:id',adminController.saveUser);
admin_route.delete('/api/deleteUser/:id',adminController.deleteUser)

module.exports = admin_route;
