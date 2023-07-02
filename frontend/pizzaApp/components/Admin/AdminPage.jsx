import React, { useEffect, useState, useContext } from 'react'
import "./adminpage.css"
import axios from 'axios'
import DetailPizza from '../DetailPizza/DetailPizza';
import { Link } from 'react-router-dom';
import pizzaig from './../../assets/images/icons8-pizza-50.png'
import price from './../../assets/images/icons8-price-50.png'
import { AdminAuthContext } from './AdminAuthContext';
function AdminPage() {
  const { isadminauth } = useContext(AdminAuthContext);
console.log(isadminauth)
  const [userdetails, setUserdetails] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:3001/admin/allpizzas")
    .then((res)=>setUserdetails(res.data))
    .catch(err => console.log(err));

      },[])
      console.log(userdetails)
      return (
        <div className='body-admin'>
            {isadminauth}
          <nav className='nav-admin'>
            <Link className='spl' to="/admin">Admin</Link>
          <Link className='nav-t' to="/adminorders">my orders</Link>
          <Link className='nav-t' to="/createpizzaadmin">create pizza</Link>
          <Link className='nav-t' to="/admincus">Customized Pizza</Link>
          </nav>
          <div className='admin-contianer'>
           {userdetails.map(pizza => (
             <div key={pizza._id} className='pizza-block'>
            <img className='img-tag' width="100px" height="200px" src={`http://localhost:3001/images/` + pizza.image} alt='images' />
            <h1 className='name-pizza'  style={{color:"red"}}>{pizza.name}</h1>
            <h5 style={{ marginRight: 'auto', paddingLeft: '20px', fontSize: '20px' }}>
              Status: {pizza.status}
            </h5>
            <h5 style={{marginLeft:"auto",paddingRight:"20px",fontSize:"20px"}}>Type:{pizza.typeofpizza}</h5>
            <hr className='hrtag' />
            <div className='pqtype'>
            <h3 className='pqh3'><img width={"40px"} style={{position:"relative",left:"15%"}}  src={price}/> <br/>price: <span style={{color:"red",fontSize:"20px"}}>${pizza.price}</span></h3>
            <h3 className='pqh3'><img width={"40px"} style={{position:"relative",left:"15%"}} src={pizzaig}/> <br/>quantity:<span style={{color:"red",fontSize:"25px"}}>{pizza.quantity}</span></h3>
            <h3 className='pqh3'>tags: #{pizza.tags}</h3>
            </div>
            <h3 className='des'>{pizza.description}</h3>
            <Link key={pizza._id} to={`/detailpizza/${pizza._id}`} className='view-details'><h2>veiw details</h2></Link>            
          </div>
      ))}</div>
        </div>
      );
}

export default AdminPage
