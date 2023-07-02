import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './editpizza.css';

function EditPizzaForm() {
  const [pizza, setPizza] = useState({});
  const [mesg,setmsg]=useState("")
  const [file, setFile] = useState(null);
  const { id } = useParams();
  const history = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/admin/detailpizzaadmin/${id}`)
      .then((res) => setPizza(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  
  const handleSubmit = (e) => {
    // e.preventDefault();
    // axios
    //   .put(`http://localhost:3001/admin/editpizzaadmin/${id}`, pizza)
    //   .then(() => {
    //     // Redirect to a success page or go back to the pizza details
    //     history.push(`/detailpizza/${id}`);
    //   })
    //   .catch((err) => console.log(err));
    e.preventDefault();
    if (file) {
    console.log({
        name: pizza.name,
        description: pizza.description,
        quantity: pizza.quantity,
        tags: pizza.tags,
        price: pizza.price,
        size: pizza.size,
        toppings: pizza.toppings,
        discount: pizza.discount,
        typeofpizza: pizza.typeofpizza,
        base: pizza.base,
        sauce: pizza.sauce,
        file: file,
      })
      const formdata=new FormData()
      formdata.append("file",file)
      formdata.append("name",pizza.name)
      formdata.append("description",pizza.description)
      formdata.append("quantity",pizza.quantity)
      formdata.append("tags",pizza.tags)
      formdata.append("price",pizza.price)
      formdata.append("size",pizza.size)
      formdata.append("toppings",pizza.toppings)
      formdata.append("discount",pizza.discount)
      formdata.append("typeofpizza",pizza.typeofpizza)
      formdata.append("base",pizza.base)
      formdata.append("sauce",pizza.sauce)
      axios
      .put(`http://localhost:3001/admin/editpizzaadmin/${id}`,formdata)
      .then((res) => {
        setmsg(res.data.message)
        setInterval(() => {
          
          history("/admin")
        }, 1000);
      })
      .catch((error) => {
        console.log(error)
      });
}}
  ;

  const handleChange = (e) => {
    setPizza({ ...pizza, [e.target.name]: e.target.value });
  };

  if (!pizza) {
    return <p>Loading...</p>;
  }

  return (
    <div className='edit-pizza-bg'>
      <div className="edit-form-box">
          {mesg && <h1>{mesg}</h1>}
          <h2>Edit Pizza</h2>
          <form onSubmit={handleSubmit}>
            <div className="edit-form-field">
              <label>
                Name:
                <input type="text" name="name" value={pizza.name} onChange={handleChange} />
              </label>
              <br />
              <label>
                Description:
                <textarea name="description" value={pizza.description} onChange={handleChange} />
              </label>
              <br />
              <label>
                Quantity:
                <input type="number" name="quantity" value={pizza.quantity} onChange={handleChange} />
              </label>
              <br />
              <label>
                Tags:
                <input type="text" name="tags" value={pizza.tags} onChange={handleChange} />
              </label>
              <br />
              <label>
                Price:
                <input type="number" name="price" value={pizza.price} onChange={handleChange} />
              </label>
              <br />
              <label>
                Size:
                <select name="size" value={pizza.size} onChange={handleChange}>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </label>
              <br />
              <label>
                Toppings:
                <input type="text" name="toppings" value={pizza.toppings} onChange={handleChange} />
              </label>
              <br />
              <label>
                Discount:
                <input type="text" name="discount" value={pizza.discount} onChange={handleChange} />
              </label>
              <br />
              <label>
                Type of Pizza:
                <select name="typeofpizza" value={pizza.typeofpizza} onChange={handleChange}>
                  <option value="veg">Veg</option>
                  <option value="non-veg">Non-Veg</option>
                  <option value="cheese">Cheese</option>
                </select>
              </label>
              <br />
              <label>
                Base:
                <select name="base" value={pizza.base} onChange={handleChange}>
                  <option value="thin crust">Thin Crust</option>
                  <option value="thick crust">Thick Crust</option>
                  <option value="deep dish">Deep Dish</option>
                  <option value="whole wheat">Whole Wheat</option>
                  <option value="gluten-free">Gluten-Free</option>
                </select>
              </label>
              <br />
              <label>
                Sauce:
                <select name="sauce" value={pizza.sauce} onChange={handleChange}>
                  <option value="marinara">Marinara</option>
                  <option value="barbecue">Barbecue</option>
                  <option value="alfredo">Alfredo</option>
                  <option value="pesto">Pesto</option>
                  <option value="ranch">Ranch</option>
                </select>
              </label>
              <br />
              <label>
                Image:
                <input type="file" onChange={handleFileChange} />
              </label>
            <button type="submit" className='edit-form-btn'>Submit</button>
            </div>
          </form>
        </div>
    </div>
  );
}

export default EditPizzaForm;
