import React, { useContext } from 'react'
import SignInPage from '../modules/auth/SignInPage'
import AuthContext from '../config/context/auth-context';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import AdminLayout from '../modules/admin/AdminLayout';
import UserPage from '../modules/admin/users/UserPage';
import AdminPage from '../modules/admin/users/components/AdminPage'
import ClientPage from '../modules/admin/users/components/ClientPage'

const AppRouter = () => {
  const { user } = useContext(AuthContext);
  const rol = localStorage.getItem("role");
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {
        user.signed && rol == "ADMIN_ROLE"? (
        <>
            <Route path='/' element={<AdminLayout/>} >
              <Route path='admin' element={<AdminPage/>} />
            </Route>
          </>
          ) : user.signed && rol == "USER_ROLE" ?(<>
              <Route path='/' element={<AdminLayout/>} >
              <Route path='user' element={<UserPage/>} />
            </Route>
          </>)
          :  user.signed && rol == "CLIENT_ROLE" ?(<>
            <Route path='/' element={<AdminLayout/>} >
            <Route path='client' element={<ClientPage/>} />
          </Route>
        </>) : (
            
        <Route path='/' element={<SignInPage />} />
          )
        } {}
       <Route path='/*' element={<>404 NOT FOUND</>} />
      </>
    )
  );
  return <RouterProvider router={router} />;

}
export default AppRouter

