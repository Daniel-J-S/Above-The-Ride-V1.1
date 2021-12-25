import React from 'react';
import scrollTo from 'gatsby-plugin-smoothscroll';


const Burger = ({ navOpen, setNavOpen, isPastTop }) => {
    
    const handleClick = () => {
        scrollTo('#___gatsby')
        if(isPastTop) {
           setTimeout(() => {
               setNavOpen(!navOpen);
           }, 1200)
       } else {
           setNavOpen(!navOpen);
       }
    }

    return (
        <button 
            className="burger" 
            onClick={handleClick}
            >
            <div 
                style={{
                    backgroundColor: isPastTop ? '#000': '#fff',
                    margin: navOpen ? 0 : '.35rem',
                    transform: navOpen ? 'rotate(45deg)' : 'rotate(0)',
                }} 
            />
            <div 
                style={{
                    backgroundColor: isPastTop ? '#000': '#fff',
                    margin: navOpen ? 0 : '.35rem',
                    transform: navOpen ? 'translateX(20px)' : 'translateX(0)',
                    opacity: navOpen ? 0 : 1
                }} 
            />
            <div 
                style={{
                    backgroundColor: isPastTop ? '#000': '#fff',
                    margin: navOpen ? 0 : '.35rem',
                    transform: navOpen ? 'rotate(-45deg)' : 'rotate(0)',
                }} 
                />
        </button>
    )
};

export default Burger;