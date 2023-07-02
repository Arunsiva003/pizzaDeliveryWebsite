import React, { useState } from 'react';
import FoodList from '../../components/FoodList';
import Navbar from '../../components/Navbar';

const Menu = () => {
  return (
    <>
      <Navbar />      
      <FoodList />
    </>
  );
};

export default Menu;
