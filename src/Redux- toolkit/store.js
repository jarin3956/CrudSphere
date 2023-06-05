import { configureStore } from "@reduxjs/toolkit";
import userSlice  from '../Redux- toolkit/authslice'

const store = configureStore({
    reducer:{
        user : userSlice
    }
});

export default store