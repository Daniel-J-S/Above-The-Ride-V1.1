import React from 'react';
import Seo from '../components/seo';
import Banner from '../components/banner';
import { graphql } from 'gatsby';
import ProductDetail from '../components/product-detail';
import CookieBanner from '../components/cookieBanner';

const IndexPage = ({data: { contentfulHeaderBanner }}) => {
  return (
    <>
      <Seo 
        title="Home" 
        keywords={[`Motorcycle Rider Apparel`, `t-shirts`, `hoodies`, `hats`, `accessories`]}
        description="Welcome to Above the Ride, your one-stop shop for all things motorcycling! We offer a range of high-quality t-shirts and accessories designed with the modern rider in mind. Our products are made from durable materials and feature bold designs that capture the spirit of the open road. Whether you're a seasoned pro or a beginner, we have something for everyone. So rev up your engines and visit us today to see our full selection of t-shirts and accessories."
      />
      <Banner isIndex={true} bannerData={contentfulHeaderBanner} />
      <ProductDetail />
      <div style={{margin: '7rem 0'}} />
      <CookieBanner />
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
