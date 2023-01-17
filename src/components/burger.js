import React from 'react';
import scrollTo from 'gatsby-plugin-smoothscroll';
import { useLocation } from '@reach/router';

const Burger = ({ navOpen, setNavOpen, isPastTop, cartOpen }) => {

    const location = useLocation();
    
    const handleClick = () => {
        scrollTo('#___gatsby');
        if(isPastTop) {
           setTimeout(() => {
               setNavOpen(!navOpen);
           }, 900)
       } else {
           setNavOpen(!navOpen);
       }
    }

    const uniformStyles = {
        backgroundColor: isPastTop ? '#000' : '#fff',
        margin: navOpen ? 0 : '.35rem'
    };

    if(location.pathname !== '/') {
        Object.assign(uniformStyles, {
            backgroundColor: '#fff'
        })
    }
    
    return (
        <button 
            className="burger" 
            onClick={handleClick}
            style={{display: cartOpen ? 'none' : 'block'}}
            >
            <div 
                style={{
                    ...uniformStyles,
                    transform: navOpen ? 'rotate(45deg)' : 'rotate(0)',
                }} 
            />
            <div 
                style={{
                    ...uniformStyles,
                    transform: navOpen ? 'translateX(20px)' : 'translateX(0)',
                    opacity: navOpen ? 0 : 1,
                }} 
            />
            <div 
                style={{
                    ...uniformStyles,
                    transform: navOpen ? 'rotate(-45deg)' : 'rotate(0)',
                }} 
                />
        </button>
    );
};

export default Burger;