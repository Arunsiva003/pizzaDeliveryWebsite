import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';


const CustomPizzaPage = () => {
  const [selectedBase, setSelectedBase] = useState('');
  const [selectedSauce, setSelectedSauce] = useState('');
  const [selectedCheese, setSelectedCheese] = useState('');
  const [selectedVeggies, setSelectedVeggies] = useState([]);
  const [message,setmessage]=useState("")

  const User = JSON.parse(localStorage.getItem('user'));
  // const User = user._id;

  const baseOptions = ['Thin Crust', 'Thick Crust', 'Whole Wheat', 'Gluten-Free', 'Cauliflower Crust'];
  const sauceOptions = ['Marinara', 'Alfredo', 'Pesto', 'BBQ', 'Garlic Butter'];
  const cheeseOptions = ['Mozzarella', 'Cheddar', 'Parmesan', 'Gouda', 'Feta'];
  const veggieOptions = ['Tomatoes', 'Onions', 'Bell Peppers', 'Mushrooms', 'Olives', 'Spinach', 'Pineapple'];

  const handleBaseSelection = (base) => {
    setSelectedBase(base);
    console.log(User.id)
  };

  const handleSauceSelection = (sauce) => {
    setSelectedSauce(sauce);
  };

  const handleCheeseSelection = (cheese) => {
    setSelectedCheese(cheese);
  };

  const handleVeggieSelection = (veggie) => {
    if (selectedVeggies.includes(veggie)) {
      setSelectedVeggies(selectedVeggies.filter((item) => item !== veggie));
    } else {
      setSelectedVeggies([...selectedVeggies, veggie]);
    }
  };

  const renderOptions = (options, selectedOption, handleSelection) => {
    return (
      <ul style={styles.optionsContainer}>
        {options.map((option) => (
          <li key={option} style={styles.optionItem}>
            <label style={styles.optionLabel}>
              <input
                type="checkbox"
                checked={selectedOption === option}
                onChange={() => handleSelection(option)}
                style={styles.optionCheckbox}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
    );
  };

  const handleOrder = () => {
    // Implement order functionality
    const customizedPizza = {
      base: selectedBase,
      sauce: selectedSauce,
      cheese: selectedCheese,
      veggies: selectedVeggies,
      user:User,
    };
    console.log('Pizza ordered!',customizedPizza);
    axios
      .post('http://localhost:3001/user/custompizza', customizedPizza)
      .then((response) => {
        console.log('Pizza ordered!', response.data);
        setmessage("Pizza ordered and email sent to admin ✅")
        setTimeout(() => {
          setmessage("");
          navigate("/menu");
        }, 3000); 
        // Reset the form or show a success message
      })
      .catch((error) => {
        console.error('An error occurred while ordering the pizza.', error);
        setmessage("Error occured ❌")
        setTimeout(() => {
          setmessage("");
          // navigate("/menu");
        }, 3000); 
        // Show an error message to the user
      });

      setSelectedBase('');
    setSelectedSauce('');
    setSelectedCheese('');
    setSelectedVeggies([]);
  };


  

  const handleCancel = () => {
    // Implement cancel functionality
    setSelectedBase('');
    setSelectedSauce('');
    setSelectedCheese('');
    setSelectedVeggies([]);
  };

  

  return (
    <>
      <Navbar/>
    <div style={styles.topcontainer}>
     <h2 style={styles.heading}>Customize Your Pizza</h2>
      {message && <h1 style={styles.mess}>{message}</h1>}
    <div style={styles.container}>
      <div style={styles.choicesContainer}>
        <div style={styles.choiceContainer}>
          <h3 style={styles.choiceHeading}>Select Pizza Base:</h3>
          {baseOptions.map((option) => (
            <label key={option} style={styles.optionLabel}>
              <input
                type="radio"
                checked={selectedBase === option}
                onChange={() => handleBaseSelection(option)}
                style={styles.optionRadio}
              />
              {option}
            </label>
          ))}
        </div>

        <div style={styles.choiceContainer}>
          <h3 style={styles.choiceHeading}>Select Sauce:</h3>
          {sauceOptions.map((option) => (
            <label key={option} style={styles.optionLabel}>
              <input
                type="radio"
                checked={selectedSauce === option}
                onChange={() => handleSauceSelection(option)}
                style={styles.optionRadio}
              />
              {option}
            </label>
          ))}
        </div>

        <div style={styles.choiceContainer}>
          <h3 style={styles.choiceHeading}>Select Cheese:</h3>
          {cheeseOptions.map((option) => (
            <label key={option} style={styles.optionLabel}>
              <input
                type="radio"
                checked={selectedCheese === option}
                onChange={() => handleCheeseSelection(option)}
                style={styles.optionRadio}
              />
              {option}
            </label>
          ))}
        </div>

        <div style={styles.choiceContainer}>
          <h3 style={styles.choiceHeading}>Select Veggies:</h3>
          <ul style={styles.optionsContainer}>
            {veggieOptions.map((veggie) => (
              <li key={veggie} style={styles.optionItem}>
                <label style={styles.optionLabel}>
                  <input
                    type="checkbox"
                    checked={selectedVeggies.includes(veggie)}
                    onChange={() => handleVeggieSelection(veggie)}
                    style={styles.optionCheckbox}
                  />
                  {veggie}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={styles.summaryContainer}>
        <h3 style={styles.summaryHeading}>Selected Pizza Configuration:</h3>
        <p style={styles.summaryHeading2}>Base: {selectedBase}</p>
        <p style={styles.summaryHeading2}>Sauce: {selectedSauce}</p>
        <p style={styles.summaryHeading2}>Cheese: {selectedCheese}</p>
        <p style={styles.summaryHeading2}>Veggies: {selectedVeggies.join(', ')}</p>
      </div>

    </div>
        <div style={styles.buttonsContainer}>
          <button style={styles.button} onClick={handleOrder}>
            Order
          </button>
          <button style={styles.button} onClick={handleCancel}>Cancel</button>
        </div>
      </div>
      </>
  );
};

const styles = {
  topcontainer: {
    backgroundImage:'url("../../assets/images/slider2.jpg")',
    backgroundSize:'cover'
  },
  heading: {
    textAlign: 'center',
    color: 'red',
    fontSize:'60px'
  },
  container: {
    maxWidth: '850px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  choicesContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '70%',
    color:'white'
  },
  mess:{
    backgroundColor:"#10b3ff",
    width:"fit-content",
    margin:"auto",
    borderRadius:"5px",
    padding:"10px",
    marginTop:"10px",
    opacity:"0.7"
 },
  choiceContainer: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
    width: '48%',
    minHeight:'100px'
  },
  choiceHeading: {
    marginBottom: '10px',
    fontSize: '18px',
  },
  optionsContainer: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  optionItem: {
    marginBottom: '10px',
  },
  optionLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    margin:'10px',
    padding:'7px'
  },
  optionRadio: {
    marginRight: '5px',
  },
  optionCheckbox: {
    marginRight: '5px',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:"center",
    alignItems: 'center',
    gap:'600px'
    // width: '28%',
  },
  button: {
    backgroundColor: 'red',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '10px',
    transition: 'background-color 0.3s ease',
  },
  summaryContainer: {
    color:'white',
    marginTop:'15%',
    marginLeft:'30px',
    textAlign: 'center',
    padding: '20px',
    // backgroundColor: '#E8E8E8',
    backgroundImage:"url('../../assets/images/potrait.jpg')",
    backgroundSize:'cover',
    borderRadius: '8px',
    width: '48%',
    height:"fit-content"
  },
  summaryHeading: {
    marginBottom: '10px',
    margin:'10px',
    color:'white',
    fontSize: '18px',
  },
  summaryHeading2: {
    margin:'10px',
    padding:'10px',
    color:'white',
    fontSize: '18px',
  },
};


export default CustomPizzaPage;
