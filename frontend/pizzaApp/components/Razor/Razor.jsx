import React from 'react';
import './payment.css';
import pay from "./../../assets/pay.jpeg"
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import axios from 'axios';
const PaymentGateway = () => {
    const location = useLocation();
    const history=useNavigate(); 
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    const searchParams = new URLSearchParams(location.search);
    const totalAmount = searchParams.get('totalAmount');
    const [message,setmessage]=useState("")

    const [showPopup, setShowPopup] = useState(false);

    const handlebtn = () => {
      setShowPopup(true);
    };
  
    const closePopup = () => {
      setShowPopup(false);
      history('/home')
    };
  
    const popupStyles = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#4BB543',
        color: '#FFF',
        padding: '40px',
        borderRadius: '8px',
        textAlign: 'center',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      };
    
      const iconStyles = {
        fontSize: '48px',
        marginBottom: '20px',
      };
    const handsub=(e)=>{
        e.preventDefault()
    }
  return (
    <div className='payment-bg'>
        <div className="container">
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        {message && <h1 style={{backgroundColor:"#cb9797",width:"fit-content",padding:"7px",borderRadius:"10px",textTransform:"capitalize",position:"relative",top:"-30px"}} >{message} ❌</h1>}
      </div>
            <form action="" onSubmit={handsub}>
                <div className="row">
                    <div className="col">
                        <h3 className="title">billing address</h3>
                        <div className="inputBox">
                            <span>full name :</span>
                            <input type="text" placeholder="john deo" />
                        </div>
                        <div className="inputBox">
                            <span>email :</span>
                            <input type="email" placeholder="example@example.com" />
                        </div>
                        <div className="inputBox">
                            <span>address :</span>
                            <input type="text" placeholder="room - street - locality" />
                        </div>
                        <div className="inputBox">
                            <span>city :</span>
                            <input type="text" placeholder="mumbai" />
                        </div>
                        <div className="flex">
                            <div className="inputBox">
                                <span>state :</span>
                                <input type="text" placeholder="india" />
                            </div>
                            <div className="inputBox">
                                <span>zip code :</span>
                                <input type="text" placeholder="123 456" />
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <h3 className="title">payment</h3>
                        <div className="inputBox">
                            <span>cards accepted :</span>
                            <img src={pay} alt="" />
                        </div>
                        <div className="inputBox">
                            <span>name on card :</span>
                            <input type="text" placeholder="mr. john deo" />
                        </div>
                        <div className="inputBox">
                            <span>credit card number :</span>
                            <input type="number" placeholder="1111-2222-3333-4444" />
                        </div>
                        <div className="inputBox">
                            <span>exp month :</span>
                            <input type="text" placeholder="january" />
                        </div>
                        <div className="flex">
                            <div className="inputBox">
                                <span>exp year :</span>
                                <input type="number" placeholder={2022} />
                        </div>
                        <div className="inputBox">
                            <span>CVV :</span>
                            <input type="text" placeholder={1234} />
                        </div>
                        </div>
                    </div>
                </div>

                {showPopup && (
        <div style={popupStyles}>
          <AiOutlineCheckCircle style={iconStyles} />
          <p style={{ fontSize: '24px', marginBottom: '20px' }}>
            Successful transaction!
          </p>
          <button onClick={closePopup}>Close</button>
        </div>
      )}
               <button
                type="submit"
                className="submit-btn"
                onClick={handlebtn}
                
                >{`Pay ${totalAmount}`}</button>
            </form>
        </div>
    </div>
  )
}

export default PaymentGateway;