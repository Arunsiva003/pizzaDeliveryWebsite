import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react';
import { AdminAuthContext } from './../components/Admin/AdminAuthContext';
const PrivateRoutes = () => {
    const { isadminauth } = useContext(AdminAuthContext);
    console.log(isadminauth,"from private")
return (
    isadminauth? <Outlet/> : <Navigate to='/adminlogin'/>
  )
}

export default PrivateRoutes;