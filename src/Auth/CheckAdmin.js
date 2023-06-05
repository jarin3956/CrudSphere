import { useLocation,Navigate,Outlet } from "react-router-dom";

function CheckAdmin() {
    // const {admin} = useContext(authContext);
    const admin = localStorage.getItem('admintoken')
    const location = useLocation();
  return (
    admin ? <Navigate to={'/admindashboard'} state={{from:location}} replace ></Navigate> : <Outlet/>
  )
}

export default CheckAdmin