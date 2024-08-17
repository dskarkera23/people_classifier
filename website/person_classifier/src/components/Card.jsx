// src/components/Card.jsx
import React from 'react';

function Card({ title, imgSrc }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-48">
      <img src={imgSrc} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
    </div>
  );
}

export default Card;
