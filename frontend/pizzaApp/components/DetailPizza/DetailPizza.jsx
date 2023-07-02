import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminAuthContext } from '../Admin/AdminAuthContext';
import './detailpizza.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function DetailPizza() {
  const [detailpizza, setDetailPizza] = useState(null);
  const { id } = useParams();
  const history = useNavigate();
  const { isadminauth } = useContext(AdminAuthContext);
console.log(isadminauth,"from detail")
  const handleedit=()=>{
    // <Route path="/edit-pizza/:id" component={EditPizzaForm} />
    history(`/edit-pizza/${id}`);

  }
  const handledelete=()=>{
    axios
    .delete(`http://localhost:3001/admin/detailpizzaadmin/${id}`)
    .then(() => {
      history('/admin');
    })
    .catch((err) => console.log(err));
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3001/admin/detailpizzaadmin/${id}`)
      .then((res) => setDetailPizza(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!detailpizza) {
    return <p>Loading...</p>;
  }

  return (
    <div className='detail_card'>
      <div className="detail_card_container">
        <div className="card_img">
          <img src={`http://localhost:3001/images/${detailpizza.image}`} alt={detailpizza.name} /> 
        </div>
        <div className="card_content">
          <div className="card_pizza_name">
            <h3><span style={{color:"red"}}>{detailpizza.name}</span></h3>
          </div>
          <div className="card_details">
            <p>{detailpizza.description}</p>
            <p>Price: <span style={{color:"red"}}>${detailpizza.price}</span></p>
            <p>Quantity: <span style={{color:"red"}}>{detailpizza.quantity}</span></p>
            <p>Base:<span style={{color:"red"}}>{detailpizza.base}</span></p>
            <p>Sauce: <span style={{color:"red"}}>{detailpizza.sauce}</span></p>
            <p>Size <span style={{color:"red"}}>{detailpizza.size}</span></p>
            <p>Price: <span style={{color:"red"}}>{detailpizza.toppings}</span></p>
            <p>Type of pizza: <span style={{color:"red"}}>{detailpizza.typeofpizza}</span></p>
            <p>Tags <span style={{color:"red"}}>{detailpizza.tags}</span></p>
            <p>Price: <span style={{color:"red"}}>{detailpizza.discount}</span></p>
            <p>Status: <span style={{color:"red"}}>{detailpizza.status}</span></p>
          </div>
          <div className="detail_footer">
            <button onClick={handleedit} className='edit-btn'>edit</button>
            <button onClick={handledelete}className='del-btn'>delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPizza;
{/*  */}
{/*  */}