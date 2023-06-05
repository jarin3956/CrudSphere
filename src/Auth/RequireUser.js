import { useLocation,Navigate,Outlet } from "react-router-dom";



function RequireUser() {
    // const {user}= useContext(authContext);
    const user = localStorage.getItem('token')
    const location = useLocation();
  return (
    user ? <Outlet/> : <Navigate to={'/login'} state={{from:location}} replace></Navigate>
  )
}

export default RequireUser