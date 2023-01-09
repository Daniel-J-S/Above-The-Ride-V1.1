import { Link } from 'gatsby';
import React, { useEffect, useState } from 'react';
import logo from '../images/new-logo.svg';
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

  const [isProductPage, setIsProductPage] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const handleClick = () => {
    if(cartOpen && typeof window !== 'undefined') {
      window.Snipcart.api.theme.cart.close()
    }
  }
  
  const styles = { 
      headerStyles: {
        backgroundColor: isPastTop ? '#fff': navOpen ? '#000000' : 'transparent', 
        borderBottom: isPastTop ? '1px solid #808080': 'none',
        boxShadow: isPastTop ? '1px 1px 10px 1px #333': 'none',
      },
      logoLinkStyles: {
        logo: { filter: isPastTop ? 'invert(0)': 'invert(1)'},
        cart: {cursor: 'pointer', color: isPastTop ? '#000': '#fff'},
        link: { color: isPastTop ? '#000': '#fff'}
      }
  };

  if(isProductPage || cartOpen) {
    Object.assign(styles.headerStyles, {
      backgroundColor: '#000000', 
      borderBottom: 'none',
      boxShadow: '1px 1px 10px 1px #333',
    });
    Object.assign(styles.logoLinkStyles, {
      logo: { filter: 'invert(0)'},
      cart: {cursor: 'pointer', color: '#fff'},
      link: { color: '#fff'}
    });
  }

  useEffect(() => {
    const condition = [
      '/', 
      '/contact-us', 
      '/about-us', 
      '/terms-of-service', 
      '/privacy-policy', 
      '/return-policy', 
      '/shop', 
      '/mens', 
      '/ladies'
    ].includes(location.pathname);
    setIsProductPage(!condition);
  }, [location]);

  useEffect(() => {
    const condition = ['#/cart'].includes(location.hash);
    setCartOpen(condition);
  }, [location.hash]);

  return (
    <>
    <header
      className="site-header" 
      style={styles.headerStyles}
      onClickCapture={handleClick}
      >
      <section style={{ justifyContent: isSmallScreen ? 'flex-start': 'center'}}>
      {
        isSmallScreen ?
        <Burger 
            navOpen={navOpen} 
            setNavOpen={setNavOpen} 
            isSmallScreen={isSmallScreen} 
            isPastTop={isPastTop}
            isProductPage={isProductPage}
          />
          :
          <nav>
            <Link activeStyle={{textDecoration: 'underline'}} style={styles.logoLinkStyles.link} to="/about-us">About</Link>
            <Link activeStyle={{textDecoration: 'underline'}} style={styles.logoLinkStyles.link} to="/contact-us">Contact</Link>
          </nav>
      }
      </section>
      <section>
        <Link onClick={() => setNavOpen(false)} className="header-logo" to="/"><img style={styles.logoLinkStyles.logo} src={logo} alt="Above the ride"></img></Link>
      </section>
      <section>
        {/* { TODO: Remove once more products are added
          !isSmallScreen &&
          <nav>
            <Link activeStyle={{textDecoration: 'underline'}} style={styles.logoLinkStyles.link} to="/shop">Shop</Link>
          </nav>
        } */}
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
