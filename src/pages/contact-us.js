import React from 'react';
import { Link, graphql } from 'gatsby';
import Form from '../components/form';
import Banner from '../components/banner';
import Seo from '../components/seo';

function Contact ({ location, data }) {
    function getItemDetails() {
        if(location.state && location.state.itemName && location.state.itemPrice) {
            const {itemName, itemPrice, itemSize} = location.state
            return `Hello there, I'm interested in purchasing your "${itemName}" available for $${itemPrice} in a size "${itemSize}".`
        } else {
            return false
        }
    }

    return (
        <>
            <Seo 
                title="Contact Us" 
                keywords={[`Let us hear from you`, `contact us`, `reach out to us`]} 
                description="Please contact us for any questions regarding our current inventory or if you just want to say hello"
                location={location}
            />
            <Banner isIndex={false} bannerData={data.contentfulHeaderBanner} />
            <div className="Contact-us">
                <div className="container">
                    <p className="mb-5 mt-5"><small>Question about returning an item? See our <Link to="/terms-of-service">Terms of Service</Link> page before contacting us</small></p>
                    <Form message={getItemDetails()} />
                </div>
            </div>
        </>
    )
}

export const query = graphql`
    query {
        contentfulHeaderBanner(page: {eq: "contact us"}) {
            title
            subHeading
            buttonLink
        }
    }
`;


export default Contact;
