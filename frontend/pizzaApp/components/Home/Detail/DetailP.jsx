import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function DetailP() {
    const [detailpizza, setDetailPizza] = useState(null);
    const { id } = useParams();
    const history = useNavigate();
    useEffect(() => {
        axios
          .get(`http://localhost:3001/admin/detailpizzaadmin/${id}`)
          .then((res) => setDetailPizza(res.data))
          .catch((err) => console.log(err));
      }, [id]);
    
      if (!detailpizza) {
        return <p>Loading...</p>;
      }
  return (
    <div>
    <img src={`http://localhost:3001/images/${detailpizza.image}`} alt={detailpizza.name} />
    <h2>Pizza Details</h2>
    <h3>{detailpizza.name}</h3>
    <p>{detailpizza.description}</p>
    <p>Price: ${detailpizza.price}</p>
    <p>Quantity: {detailpizza.quantity}</p>
    <p>Base: {detailpizza.base}</p>
    <p>Sauce: {detailpizza.sauce}</p>
    <p>Size: {detailpizza.size}</p>
    <p>Toppings: {detailpizza.toppings}</p>
    <p>Type of Pizza: {detailpizza.typeofpizza}</p>
    <p>Tags: {detailpizza.tags}</p>
    <p>Discount: {detailpizza.discount}</p>
    <p>status: {detailpizza.status}</p>
  </div>
  )
}

export default DetailP
