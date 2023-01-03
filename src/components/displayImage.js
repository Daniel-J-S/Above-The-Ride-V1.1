import React, { useState } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';


function DisplayImage ({ image, altPhoto }) {
    const [ isHovering, setIsHovering ] = useState(true);
    const handleHover = () => {
      setIsHovering(!isHovering)
    }
    return isHovering ? 
        (
        <GatsbyImage 
            image={image.gatsbyImageData}
            onMouseOver={handleHover} 
            key={altPhoto.id}  
            alt={altPhoto.title} 
            />
            ) : (
        <GatsbyImage 
            onMouseLeave={handleHover}  
            key={image.id}  
            image={altPhoto.gatsbyImageData} 
            alt={image.title} 
        />
    );
}

export default DisplayImage;