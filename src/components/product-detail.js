import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import StarRating from '../components/starRating';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { processSizeAndPrice } from '../utils/process-size-and-price';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const ProductDetail = () => {
    const { contentfulClothing } = useStaticQuery(graphql`
        query ProductDetailQuery {
            contentfulClothing(identifier: {eq: "front-page-feature"}) {
            id
            name
            slug
            discount
            sizesAndPrices
            image {
              gatsbyImageData(width: 1120, placeholder: BLURRED, formats: AUTO)
                title
                id
            }
            productMorePhotos {
              gatsbyImageData(width: 1120, placeholder: BLURRED, formats: AUTO)
                title
                id
            }
            rating
            description {
              childMarkdownRemark {
                html
              }
            }
          }
        }
    `);
  const {
    0: weightCodes,
    1: lookup,
    3: sizes,
    5: minPrice,
    6: sizeAndPriceStr, 
    7: getSizePriceStr} = processSizeAndPrice(contentfulClothing.sizesAndPrices);
  
  const [sizeSelection, setSizeSelection] = useState('Choose Size');


  function handleClick(e) {
    setSizeSelection(e.target.id);
  }

  const image = getImage(contentfulClothing.image);
  const { slug } = contentfulClothing;
  const url = `https://abovetheride.com/.netlify/functions/checkout?id=${slug}&price=${lookup[sizeSelection.value]}&weight=${sizeSelection.userSelection ? weightCodes[sizeSelection.value] : 2}`

  return (
        <div id="product-details-on-index" className="container details-page">
        <div className="product-details pt-5">
          <div className="row">
            <div className="col-md-6">
              <div className="Product-Screenshot">
              {contentfulClothing.productMorePhotos === null ? <div className="no-image">No Image</div> :
                <Tabs>
                  {contentfulClothing.productMorePhotos.map(image => (
                    <TabPanel key={image.id}>
                      <Tab><GatsbyImage key={image.id} image={image.gatsbyImageData} alt={image.title} /></Tab>
                    </TabPanel>
                  ))}
                  <TabList>
                    {contentfulClothing.productMorePhotos.map(image => (
                      <Tab key={image.id}><GatsbyImage style={{ height: 100, width: 100 }} key={image.id} image={image.gatsbyImageData} alt={image.title} /></Tab>
                    ))}
                  </TabList>
                </Tabs>}
              </div>
              <div className="mb-3">
                <h3>{contentfulClothing.rating}.0</h3>
                <StarRating
                  rating={contentfulClothing.rating}
                />
                <h4 className="mt-3">Based on 76 reviews</h4>
            </div>
            </div>
          <div className="col-md-6 container mt-3">
            <div>
              <h2>{contentfulClothing.name}</h2>
             </div>
              <div className="row buynowinner">
                <div className="col-sm-4 col-md-3">
                  <span className="price"><small>${minPrice}</small></span>
                </div>
              <hr className="mt-3 mb-3" />
              <small>Size</small>
              <div className="d-flex justify-content-start mt-3 mb-3">
                {
                  sizes.map((s, i ) => (
                    <button onClick={handleClick} id={s} style={{marginRight: '1rem'}} className={`btn ${sizeSelection === s ? 'btn-primary' : 'btn-default'} border border-dark rounded`} key={i}>{s}</button>
                  ))
                }
              </div>
              <div className="col-sm-12 col-md-12 text-left">
                <p style={{fontStyle: 'italic', fontSize: '.8rem'}} className="mt-2 mb-4">Shipping costs may vary based on volume</p>
                <div className="row container mb-3">
                <button
                  className="Product snipcart-add-item btn btn-success w-50"
                  data-item-id={contentfulClothing.slug}
                  data-item-image={image === undefined ? "" : image.images.fallback.src}
                  data-item-price={sizeSelection !==  'Choose Size' ? lookup[sizeSelection] : minPrice}
                  data-item-custom1-name="Size"
                  data-item-custom1-options={sizeSelection !== 'Choose Size' ? getSizePriceStr(sizeSelection) : sizeAndPriceStr}
                  data-item-name={contentfulClothing.name}
                  data-item-url={url}
                  data-item-weight={sizeSelection !==  'Choose Size' ? weightCodes[sizeSelection] : 2}
                  >
                  <i className="fas fa-tags" />
                  Add to Cart
                </button> 
                </div>
                <div className="row container mt-3">
                  {
                    sizeSelection !==  'Choose Size' ?
                    <Link
                    state={{ 
                      itemName: contentfulClothing.name,
                      itemPrice: lookup[sizeSelection],
                      itemSize: sizeSelection
                    }} className="btn btn-default border border-dark w-50" to="/contact-us">
                      Ask A Question
                    </Link>
                    :
                    <Link className="btn btn-default border border-dark w-50" to="/contact-us">
                      Contact Us
                    </Link>
                  }
                </div>
              </div>  
            </div>
              <div
                className="mt-5 mb-5"
                dangerouslySetInnerHTML={{
                  __html: contentfulClothing.description.childMarkdownRemark.html
                }}
              />
            </div>
          </div>
        </div>
      </div>
  );
}

export default ProductDetail;