import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from '../screens/Register/RegisterPage';
import HomePage from '../screens/Home/Homepage';
import LoginPage from '../screens/Login/LoginPage';
import AdminPage from "./../components/Admin/AdminPage"
import CreatePizza from "./../components/Admin/Createpizza/CreatePizza"
import AdminLogin from "./../components/Admin/AdminLogin"
import CustomPizzaPage from "../screens/CustomPizza/CustomPizza"
import DetailPizza from "./../components/DetailPizza/DetailPizza"
import Menu from "../screens/Menu/Menu"
import EditPizzaForm from '../components/DetailPizza/EditPizza';
import PizzaDetails from '../screens/PizzaDetails/PizzaDetails';
import { AdminAuthProvider } from './../components/Admin/AdminAuthContext';
import PrivateRoutes from './PrivateRoute';
import Orders from '../components/Admin/orders/Orders';
import { UserProvider } from '../components/UserContext';
import Cartuser from '../screens/CartUser/Cart';
import Cuspizza from '../components/Admin/Customized/Cuspizza';
import PaymentGateway from '../components/Razor/Razor';
import Profile from '../components/UserProfile/Profile';
const App = () => {

  return (
    <Router>
      <AdminAuthProvider>
      <UserProvider>
        <Routes>
        <Route element={<PrivateRoutes/>}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/edit-pizza/:id" element={<EditPizzaForm />} />
          <Route path="/createpizzaadmin" element={<CreatePizza />} />
          <Route path="/detailpizza/:id" element={<DetailPizza />} />
        </Route>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          {/* <Route path="/detailP/:id" element={<DetailP />} /> */}
          <Route path="/custompizza" element={<CustomPizzaPage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/singlepizza/:id" element={<PizzaDetails />} />
          <Route path="/adminorders" element={<Orders />} />
          <Route path="/usercart" element={<Cartuser/>} />
          <Route path="/admincus" element={<Cuspizza/>} />
          <Route path="/paymentgate" element={<PaymentGateway/>}/>
          <Route path="/userprofile" element={<Profile/>}/>
        </Routes>
        </UserProvider>
      </AdminAuthProvider>
    </Router>
  );
};

export default App;
