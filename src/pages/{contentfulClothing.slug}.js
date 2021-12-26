import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import StarRating from '../components/starRating';
import Banner from '../components/banner';
import { graphql, Link } from 'gatsby';
import Seo from '../components/seo';
import { processSizeAndPrice } from '../utils/process-size-and-price';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const ClothingDetails = data => {
  const [
    weightCodes,
    lookup,
    prices,
    sizes,
    maxPrice,
    minPrice,
    sizeAndPriceStr, getSizePriceStr] = processSizeAndPrice(data.data.contentfulClothing.sizesAndPrices);
  
  const [selectState, setSelectState] = useState({
    value: 'Choose Size',
    userSelection: false,
    sizeAndPriceStr,
  });


  function handleChange(e) {
    e.persist()
    setSelectState(prevState => ({
      ...prevState,
      value: e.target.value, 
      userSelection: true,
      sizeAndPriceStr: getSizePriceStr(e.target.value)
    }));
  }
  const image = getImage(data.data.contentfulClothing.image);
  const { slug } = data.data.contentfulClothing;
  const url = `https://wilsonbikergear.com/.netlify/functions/checkout?id=${slug}&price=${lookup[selectState.value]}&weight=${selectState.userSelection ? weightCodes[selectState.value] : 2}`
  return (
    <>
      <Seo 
        title={data.data.contentfulClothing.name} 
        keywords={[`Clothing`, `${data.data.contentfulClothing.name}`, `Jackets`, `Vests`]} 
        description={`Check out our ${data.data.contentfulClothing.name} currently starting at $${minPrice}`}
        location={data.location}
      />
      <Banner isIndex={false} bannerData={data.data.contentfulHeaderBanner} productName={data.data.contentfulClothing.name} />
      <div className="container details-page">
        <div className="product-details">
          <div className="row">
            <div className="col-md-6">
              <div className="Product-Screenshot">
              {data.data.contentfulClothing.productMorePhotos === null ? <div className="no-image">No Image</div> :
                <Tabs>
                  {data.data.contentfulClothing.productMorePhotos.map(image => (
                    <TabPanel key={image.id}>
                      <Tab><GatsbyImage key={image.id} image={image.gatsbyImageData} alt={image.title} /></Tab>
                    </TabPanel>
                  ))}
                  <TabList>
                    {data.data.contentfulClothing.productMorePhotos.map(image => (
                      <Tab key={image.id}><GatsbyImage style={{ height: 150, width: 150 }} key={image.id} image={image.gatsbyImageData} alt={image.title} /></Tab>
                    ))}
                  </TabList>
                </Tabs>}
              </div>
            </div>
          <div className="col-md-6 container">
            <div>
              <h2>{data.data.contentfulClothing.name}</h2>
             </div>
              <StarRating
                rating={data.data.contentfulClothing.rating}
              />
              <div className="row buynowinner">
                <div className="col-sm-4 col-md-3">
                  <span className="price"><small>${minPrice}</small></span>
                </div>
              <div className="col-sm-12 col-md-12 text-left">
                <p style={{fontStyle: 'italic', fontSize: '.8rem'}} className="mt-2 mb-4">Shipping costs may vary based on volume</p>
                <div className="row container mb-3">
                <button
                  style={{opacity: !selectState.userSelection ? .5: 1}}
                  className="Product snipcart-add-item btn-danger"
                  data-item-id={data.data.contentfulClothing.slug}
                  data-item-image={image === undefined ? "" : image.images.fallback.src}
                  data-item-price={selectState.userSelection ? lookup[selectState.value] : minPrice}
                  data-item-custom1-name="Size"
                  data-item-custom1-options={selectState.sizeAndPriceStr}
                  data-item-name={data.data.contentfulClothing.name}
                  data-item-url={url}
                  data-item-weight={selectState.userSelection ? weightCodes[selectState.value] : 2}
                  >
                  <i className="fas fa-tags" />
                  Add to Cart
                </button> 
                </div>
                <div className="row container mt-3">
                  {
                    selectState.userSelection ?
                    <Link
                    state={{ 
                      itemName: data.data.contentfulClothing.name,
                      itemPrice: lookup[selectState.value],
                      itemSize: selectState.value
                    }} className="btn btn-primary" to="/contact-us">Contact Us</Link>
                    :
                    <Link className="btn btn-primary" to="/contact-us">Contact Us</Link>
                  }
                </div>
              </div>  
            </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.data.contentfulClothing.description.childMarkdownRemark.html
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClothingDetails;

export const query = graphql`
  query clothingDetailsQuery($slug: String!) {
    contentfulHeaderBanner(page: {eq: "product"}) {
      subHeading
      buttonLink
      title
      images {
        gatsbyImageData(width: 1800, placeholder: BLURRED, formats: AUTO)
        title
        id
      }
    }
    contentfulClothing(slug: {eq: $slug }) {
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
`;