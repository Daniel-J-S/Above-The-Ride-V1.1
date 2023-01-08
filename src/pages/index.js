import React from 'react';
import Seo from '../components/seo';
import Banner from '../components/banner';
import { graphql } from 'gatsby';
import { productFilter } from '../utils/product-filter';
import ProductDetail from '../components/product-detail';

const IndexPage = data => {
  const mens = productFilter(data.data.allContentfulClothing.edges, 'Mens');
  return (
    <>
      <Seo 
        title="Home" 
        keywords={[`Motorcycle Rider Apparel`, `t-shirts`, `hoodies`, `hats`, `accessories`]}
        description="We bring life back to the motorcycle rider's lifestyle. Freshen up your look with one of our t-shirts"
        location={data.location}
      />
      <Banner isIndex={true} bannerData={data.data.contentfulHeaderBanner} />
      {
        mens.length > 0 &&
        <div className="container mt-5 mb-5">
          <ProductDetail />
          {/* <div className="mb-5">
            <Link className="text-dark" to="/mens">
              <h3 className="text-center text-md-left">Mens Apparel</h3>
            </Link>
          </div> */}
          {/* <IndexPost linkData="mens" data={mens}></IndexPost> */}
        </div>
      }
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
    allContentfulClothing(sort:{fields:createdAt, order: ASC}) {
      edges{
        node{
          id
          name
          slug
          rating
          discount
          category {
            name
          }
          image {
            gatsbyImageData(width: 1000, placeholder: BLURRED, formats: AUTO)
            title
            id
          }
          productMorePhotos {
            gatsbyImageData(width: 1120, placeholder: BLURRED, formats: AUTO)
            title
            id
          }
          sizesAndPrices
          description {
            childMarkdownRemark {
              excerpt(pruneLength: 140)
            }
          }
        }
      }
    }
    contentfulDealCountDown {
      title
      date(formatString: "D MMMM, YYYY")
    }
  }
`;
