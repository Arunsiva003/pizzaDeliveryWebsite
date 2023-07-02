import React from 'react';
import './footer.css'

function Footer() {
  return (
    <section className="footerbody">
    <footer className="footer">
      <div className="footerbox">
        <h2 id="links">Links</h2>
       
          <a id='atag' href="/">Home</a>
          <a id='atag' href="/menu">Menu</a>
          <a id='atag' href="/custompizza">custompizza</a>
          <a id='atag' href="/usercart">Cart</a>
          <a id='atag' href="/">Logout</a>
        
      </div>
        <div className="footerbox">
          <h2>News Letter</h2>
          <form action="" className='footerregistration'>
            <input type="email" name='email' id='email' placeholder='Enter your email ID'/>
            <button id='footerbutton' type='submit'>Subscibe Now</button>
          </form>
          <div><h3 id="copyrights">@copyrights Pizza_Delight</h3></div>
        </div>
        <div className="footerbox">
          <h2>Contact</h2>
          <p className="footeraddress">123, xyz Road, ABC 20 <br />
          Chennai, Tamil Nadu, India</p>
          <ul className="footersocial">
            <li><i className="fa-brands fa-facebook"></i></li>
            <li><i className="fa-brands fa-instagram"></i></li>
            <li><i className="fa-brands fa-twitter"></i></li>
          </ul>
          </div>
    </footer>
          
    </section>
);
}

    

export default Footer;
