import React from 'react';
import Seo from '../components/seo';
import Banner from '../components/banner';
import { Link, graphql } from 'gatsby';

const NotFoundPage = ({ location, data: { bannerData } }) => (
  <>
    <Seo 
      title="404: Not found" 
      keywords={[`not found`, `404`, `page not available`]} 
      description="Sorry, the page you requested was not found"
      location={location}
    />
    <Banner isIndex={false} bannerData={bannerData} />
    <div className="container not-found">
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <Link style={{border: 'none', color: '#000', marginBottom: '5rem', display: 'block'}} to="/">Go Back Home</Link>
    </div>
  </>
);

export const query = graphql`
query NotFoundPageQuery {
    bannerData: contentfulHeaderBanner(page: {eq: "not found"}) {
        title
        subHeading
        buttonLink
        images {
            gatsbyImageData(width: 1800, placeholder: BLURRED, formats: AUTO)
            title
            id
        }
    }
}`;

export default NotFoundPage
