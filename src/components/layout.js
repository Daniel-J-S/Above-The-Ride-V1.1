import React, {
  useState,
  useEffect,
  useRef
} from 'react';
import PropTypes from 'prop-types';
import {
  StaticQuery,
  graphql
} from 'gatsby';

import Header from './header';
import Footer from './footer';



const Layout = ({
    children
  }) => {
    const [isSmallerScreen, setIsSmallerScreen] = useState(false);
    const [isNavVisible, setNavVisibility] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(true);
    const [showItemsCount, setShowItemsCount] = useState(false);
    const [navOpen, setNavOpen] = useState(false);
    const [isPastTop, setPastTop] = useState(false);

    const itemsCount = useRef();
    const handleWheelCallback = useRef();
    const handleScrollCallback = useRef();
  

    const handleMutations = function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.target.innerHTML === "0") {
          setShowItemsCount(false)
        } else {
          setShowItemsCount(true)
        }
      });
    }

    if (typeof window !== "undefined") {
      const observer = new MutationObserver(handleMutations);

      if (itemsCount.current) {
        observer.observe(itemsCount.current, {
          childList: true
        });
      }
    }

    function handleMediaQueryChangeSmaller(mediaQuery) {
      if (mediaQuery.matches) {
        setIsSmallerScreen(true);
      } else {
        setIsSmallerScreen(false);
      }
    };

    const handleWheel = (e) => {
      if(e.deltaY >= 10) {
        setNavOpen(false);
      }
    }
    const handleScroll = () => {
      if(window.scrollY > 10) {
        setNavOpen(false);
        setPastTop(true);
      } else {
        setPastTop(false);
      }
    }


    const handleMediaQueryChange = mediaQuery => {
      if (mediaQuery.matches) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };


    useEffect(() => {
      const mediaQuery = window.matchMedia("(max-width: 768px)");
      mediaQuery.addEventListener('change', handleMediaQueryChangeSmaller);
      handleMediaQueryChangeSmaller(mediaQuery);
      return () => {
        mediaQuery.removeEventListener('change', handleMediaQueryChangeSmaller);
      };
    }, []);

    useEffect(() => {
      const mediaQuery = window.matchMedia('(max-width: 1065px)');
      mediaQuery.addEventListener('change', handleMediaQueryChange);
      handleMediaQueryChange(mediaQuery);

      return () => {
        mediaQuery.removeEventListener('change', handleMediaQueryChange);
      };
    }, []);

    useEffect(() => {
      handleWheelCallback.current = handleWheel
      handleScrollCallback.current = handleScroll
    })
  
  
    useEffect(() => {
      window.addEventListener('wheel', handleWheelCallback.current);
      return () => {
        window.removeEventListener('wheel', handleWheelCallback.current);
      }
    }, []);
  
    useEffect(() => {
      window.addEventListener('scroll', handleScrollCallback.current);
      return () => {
        window.removeEventListener('scroll', handleScrollCallback.current);
      }
    }, []);
  

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <Header 
            siteTitle={data.site.siteMetadata.title}
            isSmallerScreen={isSmallerScreen}
            setIsSmallerScreen={setIsSmallerScreen}
            isNavVisible={isNavVisible}
            setNavVisibility={setNavVisibility}
            isSmallScreen={isSmallScreen}
            setIsSmallScreen={setIsSmallScreen}
            showItemsCount={showItemsCount}
            setShowItemsCount={setShowItemsCount}
            navOpen={navOpen}
            setNavOpen={setNavOpen}
            itemsCount={itemsCount}
            isPastTop={isPastTop}
          />
          <div className="main-container" style={{
              opacity: navOpen ? '.2' : '1',
              minHeight: '100vh',
              backgroundColor: 'white',
              zIndex: 9999,
              width: '100vw',
              animation: navOpen ? 'fadeOut 500ms ease-out backwards':'none'
            }}>
            <main>
              {children}
            </main>
          </div>
          <Footer />
        </>
      )}
    />
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
