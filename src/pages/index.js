import React from 'react';
import Seo from '../components/seo';
import Banner from '../components/banner';
import { graphql } from 'gatsby';
import ProductDetail from '../components/product-detail';


const IndexPage = ({ location, data: { contentfulHeaderBanner }}) => {
  return (
    <>
      <Seo 
        title="Home" 
        keywords={[`Motorcycle Rider Apparel`, `t-shirts`, `hoodies`, `hats`, `accessories`]}
        description="We bring life back to the motorcycle rider's lifestyle. Freshen up your look with one of our t-shirts"
        location={location}
      />
      <Banner isIndex={true} bannerData={contentfulHeaderBanner} />
      <div className="container mt-5 mb-5">
        <ProductDetail />
      </div>
      <div style={{margin: '7rem 0'}} />
    </>
  );
}

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    contentfulHeaderBanner(page: {eq: "home"}) {
      subHeading
      buttonLink
      title
      images {
        gatsbyImageData(width: 1800, formats: AUTO)
        title
        id
      }
    }
  }
`;
