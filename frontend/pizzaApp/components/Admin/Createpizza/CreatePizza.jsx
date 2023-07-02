import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './CreatePizza.css';

const PizzaForm = () => {
  const history=useNavigate();
  

  const [pizzaData, setPizzaData] = useState({
    name: "",
    description: "",
    quantity: 1,
    tags: "",
    price: 0,
    size: "small",
    toppings: "",
    discount: "10%",
    typeofpizza: "veg",
    base: "thin crust",
    sauce: "marinara",
  });

  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPizzaData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
    console.log({
        name: pizzaData.name,
        description: pizzaData.description,
        quantity: pizzaData.quantity,
        tags: pizzaData.tags,
        price: pizzaData.price,
        size: pizzaData.size,
        toppings: pizzaData.toppings,
        discount: pizzaData.discount,
        typeofpizza: pizzaData.typeofpizza,
        base: pizzaData.base,
        sauce: pizzaData.sauce,
        file: file,
      })
      const formdata=new FormData()
      formdata.append("file",file)
      formdata.append("name",pizzaData.name)
      formdata.append("description",pizzaData.description)
      formdata.append("quantity",pizzaData.quantity)
      formdata.append("tags",pizzaData.tags)
      formdata.append("price",pizzaData.price)
      formdata.append("size",pizzaData.size)
      formdata.append("toppings",pizzaData.toppings)
      formdata.append("discount",pizzaData.discount)
      formdata.append("typeofpizza",pizzaData.typeofpizza)
      formdata.append("base",pizzaData.base)
      formdata.append("sauce",pizzaData.sauce)
      axios
      .post("http://localhost:3001/admin/createpizza",formdata)
      .then((response) => {
        console.log(response.data);
        history("/admin"); 

      })
      .catch((error) => {
        console.error(error);
      });

    } else {
      console.log("Please select an image");
    }
  };

  return (
    <div className="body-createpizza">
    <div className="create_container">
      <div className="header">
        <h2>Create Pizzas</h2>
      </div>
      <h2 className="Create_desc"> Create the pizza with Lots of Love and add Flavours and Toppings that feels Tastier</h2>
      <div className="create_pizza">
        <form onSubmit={handleSubmit} className="create_form">
        <label className="create_label">
          Name:
          <br/>
          <input id="create_input_field" type="text" name="name" value={pizzaData.name} onChange={handleInputChange} />
        </label>
        <br />
        <label className="create_label">
          Description:
          <br/>
          <textarea className="desc" name="description" value={pizzaData.description} onChange={handleInputChange} />
        </label>
        <br />
        <label className="create_label">
          Quantity:
          <br/>
          <input type="number"  id="create_input_field" name="quantity" value={pizzaData.quantity} onChange={handleInputChange} />
        </label>
        <br />
        <label className="create_label">
          Tags:
          <br/>
          <input type="text" id="create_input_field" name="tags" value={pizzaData.tags} onChange={handleInputChange} />
        </label>
        <br />
        <label className="create_label">
          Price:
          <br/>
          <input type="number" id="create_input_field" name="price" value={pizzaData.price} onChange={handleInputChange} />
        </label>
        <br />
        <label className="create_label">
        Size:
          <br/>
        <input
          id="create_input_field"
          type="checkbox"
          name="size"
          value="small"
          checked={pizzaData.size === "small"}
          onChange={handleInputChange}
          />
        <span>Small</span>
          <br/>

        <input
          id="create_input_field"
          type="checkbox"
          name="size"
          value="medium"
          checked={pizzaData.size === "medium"}
          onChange={handleInputChange}
        />
        <span>Medium</span>

        <input
          id="create_input_field"
          type="checkbox"
          name="size"
          value="large"
          checked={pizzaData.size === "large"}
          onChange={handleInputChange}
        />
        <span>Large</span>
      </label>


        {/* <label>
          Size:
          <select name="size" value={pizzaData.size} onChange={handleInputChange}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label> */}
        <br />
        <label className="create_label">
          Toppings:
          <br />
          <input type="text" id="create_input_field" name="toppings" value={pizzaData.toppings} onChange={handleInputChange} />
        </label>
        <br />
        <label className="create_label">
          Discount:
          <br />
          <input type="text" id="create_input_field" name="discount" value={pizzaData.discount} onChange={handleInputChange} />
        </label>
        <br />

        <label className="create_label">
        Type of Pizza:
        <br />
        <input
          id="create_input_field"
          type="checkbox"
          name="type"
          value="Veg"
          checked={pizzaData.type === "Veg"}
          onChange={handleInputChange}
        />
        <span>Veg</span>

        <input
          id="create_input_field"
          type="checkbox"
          name="type"
          value="Non-veg"
          checked={pizzaData.type === "Non-veg"}
          onChange={handleInputChange}
        />
        <span>Non-Veg</span>

        <input
          id="create_input_field"
          type="checkbox"
          name="type"
          value="cheese"
          checked={pizzaData.type === "cheese"}
          onChange={handleInputChange}
        />
        <span>Cheese</span>
      </label>
        {/* <label>
          Type of Pizza:
          <select name="typeofpizza" value={pizzaData.typeofpizza} onChange={handleInputChange} >
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
            <option value="cheese">Cheese</option>
          </select>
        </label> */}
        <br />
        <label className="create_label">
          Crust:
          <br />
          <select name="base" value={pizzaData.base} onChange={handleInputChange} className="drop-down">
            <option value="thin crust">Thin Crust</option>
            <option value="thick crust">Thick Crust</option>
            <option value="deep dish">Deep Dish</option>
            <option value="whole wheat">Whole Wheat</option>
            <option value="gluten-free">Gluten-Free</option>
          </select>
        </label>
        <br />
        <label className="create_label">
          Sauce:
          <br />
          <select name="sauce" value={pizzaData.sauce} onChange={handleInputChange}className="drop-down">
            <option value="marinara">Marinara</option>
            <option value="barbecue">Barbecue</option>
            <option value="alfredo">Alfredo</option>
            <option value="pesto">Pesto</option>
            <option value="ranch">Ranch</option>
          </select>
        </label>
        <br />
        <label className="create_label">
          Image:
          <br />
          <input type="file" id="create_input_field" onChange={handleFileChange} />
        </label>
        <br />
        <button type="submit"  id="create_input_field" className="Create_btn">Submit</button>
      </form>
      </div>
    </div>
    </div>
  );
};

export default PizzaForm;
