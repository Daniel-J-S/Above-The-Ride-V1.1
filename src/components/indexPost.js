// TODO: this component will break on render; I only made a partial fix, object returned grapql hook is not referenced properly
import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { processSizeAndPrice } from '../utils/process-size-and-price';

function IndexPost(props) {
    const data = useStaticQuery(graphql`
    query {
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
    }`);
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
       <Link className="text-dark" to={`/#`}>See More <i className="fa fa-arrow-right"></i></Link>
      </>
    );
}

export default IndexPost;