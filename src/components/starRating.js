import React from 'react';

const StarRating = ({ rating }) => {
    return (
      <div className="star-rating mt-3 mb-3">
        {[...Array(rating)].map((star, i) => {        
          return (         
            <span style={{color: '#E5C100'}} key={i} className="star">&#9733;</span>        
          );
        })}
      </div>
    );
};

export default StarRating;