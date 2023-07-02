import React from 'react';
// import Img"
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import NavbarComponent from "./Navbar"
import "./hero.css";
import IMG1 from '../assets/images/bannerimg1.jpg'
import { useNavigate } from 'react-router-dom';



function Hero() {
  const navigate = useNavigate()
  const handleOrderClick = () =>{
    navigate('/menu')
  }

  return (
    <>
    <div className='bannerStyle' >
      <div className="home_nav_component">
      <NavbarComponent/>
      </div>

      <Carousel autoPlay infiniteLoop interval={3000} showThumbs={false} className='home_carousel'>
      <div className='carousel_container'>
        <img className="carousel_img" src="../assets/images/bannerimg10.jpg" alt="Image 1" />
      </div>
      <div className='carousel_container'>
        <img className="carousel_img" src="../assets/images/bannerimg8.jpg" alt="Image 2" />
      </div>
      <div className='carousel_container'>
        <img className="carousel_img" src="../assets/images/bannerimg9.jpg" alt="Image 3" />
        <button onClick={handleOrderClick} className='carousel-button1'>Order Now</button>
      </div>
    </Carousel>
{/* 
      <h1 id="home_title">Delicious Pizzas, Delivered to Your Doorstep!</h1>

      <br/><br/><br/><br/>
      <div className="home_ban_text">
      Crave-Worthy Pizzas, Delivered Hot and Fresh to Your Doorstep!
      </div> */}
    </div>
    {/* <div className='bannerbottom'>
        <span className='spanStyle'>2000+ Users</span>
        <span className='spanStyle'>100+ Chefs</span>
        <span className='spanStyle'>500+ Pizzas</span>
    </div> */}
    <section className="home_varieties">
      <h2 id="otrd">Our Top Rated Dishes</h2>
      <div className="home_varieties_container">
        <article className="home_variety">
          <div className="home_variety-img">
            <img id='imgid' src="../../assets/images/img/pizza1.jpg" alt="cardimg" />
          </div>
          <div className="home_variety-info">
            <h4 className="home_variety-info-head" style={{fontWeight:"bold"}}>Chicken Tikka</h4>
            <p className="home_variety-info-para">Flavorful, spicy, and satisfying. Marinated chicken tikka on a crispy crust.</p> 
          </div>
        </article>
        <article className="home_variety">
          <div className="home_variety-img">
            <img id='imgid' src="../../assets/images/img/pizza2.jpg" alt="cardimg" />
          </div>
          <div className="home_variety-info">
            <h4 className="home_variety-info-head" style={{fontWeight:"bold"}}>PeriPeri Pizza</h4>
            <p className="home_variety-info-para">Flavorful, spicy, and satisfying. Marinated chicken tikka on a crispy crust.</p> 
          </div>
        </article>
        <article className="home_variety">
          <div className="home_variety-img">
            <img id='imgid' src="../../assets/images/img/pizza3.jpg" alt="cardimg" />
          </div>
          <div className="home_variety-info">
            <h4 className="home_variety-info-head" style={{fontWeight:"bold"}}>Raspberry Dessert Pizza</h4>
            <p className="home_variety-info-para">Flavorful, spicy, and satisfying. Marinated chicken tikka on a crispy crust.</p> 
          </div>
        </article>
        <article className="home_variety">
          <div className="home_variety-img">
            <img id='imgid' src="../../assets/images/img/pizza4.jpg" alt="cardimg" />
          </div>
          <div className="home_variety-info">
            <h4 className="home_variety-info-head" style={{fontWeight:"bold"}}>Chicken Alfredo Pizza</h4>
            <p className="home_variety-info-para">Flavorful, spicy, and satisfying. Marinated chicken tikka on a crispy crust.</p> 
          </div>
        </article>
        <article className="home_variety">
          <div className="home_variety-img">
            <img id='imgid' src="../../assets/images/img/pizza5.jpg" alt="cardimg" />
          </div>
          <div className="home_variety-info">
            <h4 className="home_variety-info-head" style={{fontWeight:"bold"}}>Sunchoke Pizza</h4>
            <p className="home_variety-info-para">Flavorful, spicy, and satisfying. Marinated chicken tikka on a crispy crust.</p> 
          </div>
        </article>
        <article className="home_variety">
          <div className="home_variety-img">
            <img id='imgid' src="../../assets/images/img/pizza6.jpg" alt="cardimg" />
          </div>
          <div className="home_variety-info">
            <h4 className="home_variety-info-head" style={{fontWeight:"bold"}}>Buffalo Chicken Sticks</h4>
            <p className="home_variety-info-para">Flavorful, spicy, and satisfying. Marinated chicken tikka on a crispy crust.</p> 
          </div>
        </article>
      </div>
    </section>
    
    </>
  );
}

export default Hero;

