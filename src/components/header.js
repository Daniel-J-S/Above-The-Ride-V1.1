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
    isPastTop,
  }) => {
  
  const styles = { 
      headerStyles: {
        backgroundColor: isPastTop ? '#f7f4f4': navOpen ? '#000000' : 'transparent', 
        borderBottom: isPastTop ? '1px solid #808080': 'none',
        boxShadow: isPastTop ? '1px 1px 10px 1px #333': 'none',
      },
      logoLinkStyles: {
        logo: { filter: isPastTop ? 'invert(1)': 'drop-shadow(0 0 0.85rem #000)'},
        cart: {cursor: 'pointer', color: isPastTop ? '#000': '#fff'},
        link: { color: isPastTop ? '#000': '#fff'}
      }
  };

    
  return (
    <>
    <header
      className="site-header" 
      style={styles.headerStyles}
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
            <Link activeStyle={{textDecoration: 'underline'}} style={styles.logoLinkStyles.link} to="/about-us">About</Link>
            <Link activeStyle={{textDecoration: 'underline'}} style={styles.logoLinkStyles.link} to="/contact-us">Contact</Link>
          </nav>
      }
      </section>
      <section>
        <Link className="header-logo" to="/"><img style={styles.logoLinkStyles.logo} src={logo} alt="logo"></img></Link>
      </section>
      <section>
        {
          !isSmallScreen &&
          <nav>
            <Link activeStyle={{textDecoration: 'underline'}} style={styles.logoLinkStyles.link} to="/shop">Shop</Link>
          </nav>
        }
        <div className="header-cart">
        <span className="Header__summary snipcart-summary snipcart-checkout">
          <div style={{visibility: showItemsCount ? 'visible' : 'hidden'}} ref={itemsCount} className="snipcart-items-count" />
          <i style={styles.logoLinkStyles.cart} className="fas fa-sm fa-shopping-bag" />
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
