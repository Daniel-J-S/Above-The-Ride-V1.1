import React, { Component } from 'react';
import { Link } from 'gatsby';
import tiktokLogo from '../static/tiktok-brands.svg';

class Footer extends Component {
    render() {
        return (
            <footer className="site-footer">
                <div className="footer_inner">
                    <div className="container">
                        <div className="footer-widget footer-content">
                            <section id="nav_menu-8" className="widget widget_nav_menu">
                                <div className="menu-main-container">
                                    <ul id="menu-main" className="menu">
                                        <li><Link to="/terms-of-service">Terms of Service</Link></li>
                                        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                                        <li><Link to="/return-policy">Return Policy</Link></li>
                                        <li><Link to="/contact-us">Contact</Link></li>
                                    </ul>
                                </div>
                            </section>
                        </div>
                        <div className="footer-bottom social-right-menu mt-5">
                            <div className="site-info">
                               <small>©{new Date().getFullYear()} Above the Ride. All rights reserved.</small>
                            </div>
                            <div className="site-info">
                               {/* TODO: uncomment once site is done <small>Custom Built By <a href="https://danieljs.io" target="_blank" rel="noopener noreferrer">DanielJS</a></small> */}
                               <small>Custom Built By DanielJS</small>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
