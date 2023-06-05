
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const user_route = require('./Routes/userRoute')
const admin_route = require('./Routes/adminRoute')

app.use(cors())
app.use(express.json());
app.use('/',user_route);
app.use('/admin',admin_route);

mongoose.connect('mongodb://127.0.0.1:27017/reactappdata');

app.listen(3003, () => {
    console.log("server started");
})
