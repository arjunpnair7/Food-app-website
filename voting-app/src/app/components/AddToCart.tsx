'use client';
import React from 'react'

const AddToCart = () => {
    const handleClick = () => {
        console.log('Button clicked!');
      };
  return (
    <div>
        <button className ='btn btn-primary btn-xl' onClick={handleClick}>Create new party</button>
    </div>
  )
}

export default AddToCart