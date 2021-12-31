import React from 'react';
import CookieConsent from 'react-cookie-consent';

const CookieBanner = () => {
    return (
        <CookieConsent
            enableDeclineButton
            flipButtons
            location="bottom"
            buttonText="Accept"
            declineButtonText="Decline"
            cookieName="gatsby-gdpr-google-analytics"
            disableButtonStyles
            containerClasses="col-lg-12 bg-dark cookie-consent-container p-2"
            buttonClasses="btn btn-light d-inline-block m-2"
            declineButtonClasses="btn btn-light d-inline-block m-2"
            contentClasses="small"
        >
            This website stores cookies on your computer. These cookies are used to collect information about how you interact with this website and allow us to remember you.
            We use this information in order to improve and customize your browsing experience and for analytics and metrics about our visitors on this website.
            If you decline, your information won’t be tracked when you visit this website. A single cookie will be used in your browser to remember your preference not to be tracked.
        </CookieConsent>
    )
}

export default CookieBanner;