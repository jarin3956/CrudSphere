import { useLocation,Navigate,Outlet } from "react-router-dom";



function RequireAdmin() {
    //const {admin} = useContext(authContext)
    const admin = localStorage.getItem('admintoken')
    const location = useLocation()
  return (
    admin ? <Outlet/> : <Navigate to={'adminlogin'} state={{from:location}} replace ></Navigate>
  )
}

export default RequireAdmin