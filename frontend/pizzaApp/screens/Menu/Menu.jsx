import React, { useState } from 'react';
import FoodList from '../../components/FoodList';
import Navbar from '../../components/Navbar';

const Menu = () => {
  return (
    <div >
      <Navbar />      
      <FoodList/>
    </div>
  );
};

export default Menu;
