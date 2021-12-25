import { Link } from 'gatsby';
import React from 'react';
import logo from '../images/banner-logo.svg';
import Burger from './burger';
import NavDrawer from './navDrawer';


const Header = ({
    navOpen,
    setNavOpen,
    isSmallScreen,
    location,
    isSmallerScreen,
    itemsCount,
    showItemsCount,
    isPastTop
  }) => {
  return (
    <>
    <header
      key={isPastTop} 
      className="site-header" 
      style={{ 
        backgroundColor: isPastTop ? '#f7f4f4': 
        navOpen ? '#000000' : 'transparent', 
        borderBottom: isPastTop ? '1px solid #808080': 'none',
        boxShadow: isPastTop ? '1px 1px 10px 1px #333': 'none',
      }}
      >
      <section style={{ justifyContent: isSmallScreen ? 'flex-start': 'center'}}>
      {
        isSmallScreen ?
        <Burger 
            navOpen={navOpen} 
            setNavOpen={setNavOpen} 
            isSmallScreen={isSmallScreen} 
            isPastTop={isPastTop}
          />
          :
          <nav>
            <Link style={{ color: isPastTop ? '#000': '#fff'}} to="/about-us">About</Link>
            <Link style={{ color: isPastTop ? '#000': '#fff'}} to="/contact-us">Contact</Link>
          </nav>
      }
      </section>
      <section>
        <Link className="header-logo" to="/"><img style={{ filter: isPastTop ? 'invert(1)': 'invert(0)'}} src={logo} alt="logo"></img></Link>
      </section>
      <section>
        {
          !isSmallScreen &&
          <nav>
            <Link style={{ color: isPastTop ? '#000': '#fff'}} to="/store">Store</Link>
          </nav>
        }
        <div className="header-cart">
        <span className="Header__summary snipcart-summary snipcart-checkout">
          <div style={{visibility: showItemsCount ? 'visible' : 'hidden'}} ref={itemsCount} className="snipcart-items-count" />
          <i style={{cursor: 'pointer', color: isPastTop ? '#000': '#fff'}} className="fas fa-sm fa-shopping-bag" />
        </span>
      </div>
      </section>

    </header>
    <NavDrawer
      location={location} 
      navOpen={navOpen}
      setNavOpen={setNavOpen} 
      isSmallScreen={isSmallScreen}
      isSmallerScreen={isSmallerScreen}
    />
    </>
  );
}

export default Header;
