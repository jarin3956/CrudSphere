
import './App.css';
import Register from './Container/register';
import Login from './Container/login';
import AdminRegister from './AdminContainer/AdminRegister';
import AdminLogin from './AdminContainer/AdminLogin';
import AdminDashboard from './AdminContainer/AdminDashboard';
import Dashboard from './Container/Dashboard';
import UserTable from './AdminContainer/UserTable';
import EditUser from './AdminContainer/EditUser';
import Edit from './Container/Edit'
import NewUser from './AdminContainer/NewUser';
import AllHome from './Container/AllHome';
import ChangePassword from './Container/ChangePassword';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import RequireUser from './Auth/RequireUser';
import CheckUser from './Auth/CheckUser';
import RequireAdmin from './Auth/RequireAdmin';
import CheckAdmin from './Auth/CheckAdmin';
import { useEffect } from 'react';
function App() {
  useEffect(() => {

  },[])
  return (

    <div className="App">
      <BrowserRouter>

        <Routes>
        <Route path='/'element={<AllHome/>} />
        
          <Route element={<CheckUser/>} >
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<RequireUser/>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/edit" element={<Edit/>} />
            <Route path="/changepassword/:userId" element={<ChangePassword />} />
          </Route>
          
          <Route element={<CheckAdmin/>}>
            <Route path="/adminregister" element={<AdminRegister/>} />
            <Route path="/adminlogin" element={<AdminLogin/>} />
          </Route>

          <Route element={<RequireAdmin/>}>
            <Route path="/admindashboard" element={<AdminDashboard/>} />
            <Route path="/usertable" element={<UserTable/>} />
            <Route path="/edituser" element={<EditUser/>} />
            <Route path="/adduser" element={<NewUser/>} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
