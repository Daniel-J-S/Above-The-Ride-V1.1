import React from 'react';

const StarRating = ({ rating }) => {
    return (
      <div className="star-rating">
        {[...Array(rating)].map((star, i) => {        
          return (         
            <span style={{color: 'gold'}} key={i} className="star">&#9733;</span>        
          );
        })}
      </div>
    );
};

export default StarRating;