import React, { useState } from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import Seo from '../components/seo';
import Banner from '../components/banner';
import { graphql } from 'gatsby';
import { productFilter } from '../utils/product-filter';
import { processSizeAndPrice } from '../utils/process-size-and-price';

function DisplayImage ({ image, altPhoto }) {
  const [ isHovering, setIsHovering ] = useState(true);
  const handleHover = () => {
    setIsHovering(!isHovering)
  }
  return isHovering ? 
  (
    <GatsbyImage 
      image={image.gatsbyImageData}
      onMouseOver={handleHover} 
      key={altPhoto.id}  
      alt={altPhoto.title} 
      />
      ) : (
    <GatsbyImage 
      onMouseLeave={handleHover}  
      key={image.id}  
      image={altPhoto.gatsbyImageData} 
      alt={image.title} 
    />
  )
  
}


function IndexPost ({ data, linkData }) {
    
    return (
      <>
        <div className="row product-main mb-5 container">
          {data.map(({ node }) => {
            const {5: minPrice }  = processSizeAndPrice(node.sizesAndPrices);
            return (
            <Link key={node.id} className="Catalogue__item col-sm-12 col-md-6 col-lg-3" to={`/${node.slug}`}>
            <div>
              <div className="details_List">
                {node.image === null 
                  ? <div className="no-image">No Image</div> 
                  : <DisplayImage image={node.image} altPhoto={node.productMorePhotos[node.productMorePhotos.length - 1]} />
                }
                <div className="container text-center mt-3 p-2">
                  <h3>{node.name}</h3>
                  <h5>${minPrice}</h5>
                </div>  
              </div>
            </div>
            </Link>
        )})}
        </div>
       <Link className="text-dark" to={`/${linkData}`}>See More <i className="fa fa-arrow-right"></i></Link>
      </>
    );
}

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
          <div className="mb-5">
            <Link className="text-dark" to="/mens">
              <h3 className="text-center text-md-left">Mens Apparel</h3>
            </Link>
          </div>
          <IndexPost linkData="mens" data={mens}></IndexPost>
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
        gatsbyImageData(width: 1800, placeholder: BLURRED, formats: AUTO)
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
