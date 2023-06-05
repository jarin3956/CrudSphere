import { useLocation,Navigate,Outlet } from "react-router-dom";



function CheckUser() {

    // const {user}= useContext(authContext);
    const user = localStorage.getItem('token')
    const location = useLocation();
    console.log(user);
  return (
    user ? <Navigate to={'/dashboard'} state={{from:location}} replace ></Navigate> : <Outlet/>
  )
}

export default CheckUser