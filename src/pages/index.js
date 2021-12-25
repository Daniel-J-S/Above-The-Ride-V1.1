import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import Seo from '../components/seo';
import Banner from '../components/banner';
import StarRatingComponent from 'react-star-rating-component';
import { graphql } from 'gatsby';
import { productFilter } from '../utils/product-filter';
import { processSizeAndPrice } from '../utils/process-size-and-price';


function IndexPost ({ data, linkData }) {
    return (
      <React.Fragment>
        <div className="row product-main">
          {data.map(({ node }) => {
            const {5: minPrice, 4: maxPrice }  = processSizeAndPrice(node.sizesAndPrices);
            return (
            <Link key={node.id} className="Catalogue__item col-sm-12 col-md-6 col-lg-4" to={`${node.slug}`}>
            <div>
              <div className="details_List">
                {node.image === null ? <div className="no-image">No Image</div> : <GatsbyImage key={node.image.id} image={node.image.gatsbyImageData} alt={node.image.title} />}
                <div className="details_inner">
                    {
                      node.name.length >= 30 
                      ? <h2>{node.name.split(' ').slice(0, 4).join(' ')}...</h2> 
                      : <h2>{node.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h2>
                    }
                  <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={node.rating}
                  />
                  <p>{node.description.childMarkdownRemark.excerpt.substr(0, 50)}...</p>
                  <div className="row">
                    <div className="col-sm-7 align-self-center">
                      <small>{`$${minPrice} - $${maxPrice}`}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </Link>
        )})}
        </div>
       <Link className="text-dark" to={`/${linkData}`}>See More <i className="fa fa-arrow-right"></i></Link>
      </React.Fragment>
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
          <div>
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
    allContentfulBlogs(limit: 3,sort:{fields:createdAt,order: DESC}) {
      edges {
        node {
          id
          title
          slug
        }
      }
    }
  }
`;
