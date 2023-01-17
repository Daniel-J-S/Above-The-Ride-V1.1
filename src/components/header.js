import {
  Link
} from 'gatsby';
import React, {
  useEffect,
  useState
} from 'react';
import whiteLogo from '../images/white-logo.svg';
import blackLogo from '../images/black-logo.svg';
import Burger from './burger';
import NavDrawer from './navDrawer';
import useScrollFromTopDetected from '../hooks/useScrollFromTopDetected';
import {
  useLocation
} from '@reach/router';

const Header = ({
    navOpen,
    setNavOpen,
    isSmallScreen,
    isSmallerScreen,
    itemsCount,
    showItemsCount,
  }) => {

    const location = useLocation();
    const isPastTop = useScrollFromTopDetected();
    const [cartOpen, setCartOpen] = useState(false);

    const handleClick = () => {
      if (cartOpen && typeof window !== 'undefined') {
        window.Snipcart.api.theme.cart.close()
      }
    }

    const styles = {
      headerStyles: {
        backgroundColor: isPastTop ? '#fff' : navOpen ? '#000000' : 'transparent',
        borderBottom: isPastTop ? '1px solid #808080' : 'none',
        boxShadow: isPastTop ? '1px 1px 10px 1px #333' : 'none',
      },
      linkStyles: {
        cart: {
          cursor: 'pointer',
          color: isPastTop ? '#000' : '#fff'
        },
        link: {
          color: isPastTop ? '#000' : '#fff'
        }
      },
      logo: {
        whiteLogo: {
          display: 'block'
        },
        blackLogo: {
          display: 'block'
        },
      }
    };

    if (!isPastTop) {
      Object.assign(styles.logo.blackLogo, {
        display: 'none'
      });
    } else if (!cartOpen) {
      Object.assign(styles.logo.whiteLogo, {
        display: 'none'
      });
    }

    if (navOpen) {
      Object.assign(styles.headerStyles, {
        boxShadow: 'none',
      });
      Object.assign(styles.logo.blackLogo, {
        display: 'none'
      });
    }

    if (cartOpen) {
      Object.assign(styles.headerStyles, {
        backgroundColor: '#000000',
        borderBottom: 'none',
        boxShadow: '1px 1px 10px 1px #333',
      });
      Object.assign(styles.linkStyles, {
        cart: {
          cursor: 'pointer',
          color: '#fff'
        },
        link: {
          color: '#fff'
        }
      });
      Object.assign(styles.logo.blackLogo, {
        display: 'none'
      });
    }

    if (location.pathname !== '/') {
      Object.assign(styles.headerStyles, {
        backgroundColor: '#000000',
        borderBottom: 'none',
      });
      Object.assign(styles.linkStyles, {
        cart: {
          color: '#fff'
        },
        link: {
          color: '#fff'
        }
      });
      Object.assign(styles.logo.blackLogo, {
        display: 'none'
      });
    }

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
            cartOpen={cartOpen}
            location={location}
          />
          :
          <nav>
            <Link activeStyle={{textDecoration: 'underline'}} style={styles.linkStyles.link} to="/about-us">About</Link>
            <Link activeStyle={{textDecoration: 'underline'}} style={styles.linkStyles.link} to="/contact-us">Contact</Link>
          </nav>
      }
      </section>
      <section>
        <Link onClick={() => setNavOpen(false)} className="header-logo" to="/">
          <img style={styles.logo.whiteLogo} src={whiteLogo} alt="Above the ride"></img>
          <img style={styles.logo.blackLogo} src={blackLogo} alt="Above the ride"></img>
        </Link>
      </section>
      <section>
        <div className="header-cart">
        <span className="Header__summary snipcart-summary snipcart-checkout">
          <div style={{visibility: showItemsCount ? 'visible' : 'hidden'}} ref={itemsCount} className="snipcart-items-count" />
          <i style={styles.linkStyles.cart} className="fas fa-sm fa-shopping-bag" />
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
