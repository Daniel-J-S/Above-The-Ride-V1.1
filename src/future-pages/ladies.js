// TODO: update to function component
import React from 'react';
import { Link } from 'gatsby';
import Seo from '../components/seo';
import StarRating from '../components/starRating';
import { GatsbyImage } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';
import { processSizeAndPrice } from '../utils/process-size-and-price';

class ClothingPost extends React.Component {
    state = {
      NoOfPost: 6
  };
 
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
   const lastScrollY = window.pageYOffset + 1100;

    if (lastScrollY > window.outerHeight) {
     const count = this.state.NoOfPost + 3;
      this.setState({
        NoOfPost: count
      });
    }
  };

  render() {

    const { data } = this.props;
    const { NoOfPost } = this.state;

    return (
      <>
      <div className="row product-main">
        {data.data.allContentfulClothing.edges.slice(0, NoOfPost).map(({ node }) => {
          const {5: minPrice, 4: maxPrice }  = processSizeAndPrice(node.sizesAndPrices);
          return (
          <Link key={node.id} className="Catalogue__item col-sm-12 col-md-6 col-lg-4" to={`/${node.slug}`}>
          <div>
            <div className="details_List">
              {node.image === null ? <div className="no-image">No Image</div> : <GatsbyImage key={node.image.id} image={node.image.gatsbyImageData} alt={node.image.title} />}
              <div className="details_inner">
                  {
                    node.name.length >= 30 
                    ? <h2>{node.name.split(' ').slice(0, 4).join(' ')}...</h2> 
                    : <h2>{node.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h2>
                  }
                <StarRating
                  rating={node.rating}
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
    </>
    );
  }
}

const WomensClothingPage = data => (

  <>
    <Seo 
      title="Ladies Apparel" 
      keywords={[`current inventory`, `jackets`, `vests`, `sewing`]} 
      description="Check out our current inventory for womens tshirts and hoodies"
      location={data.location}
    />
    <div className="container store-page mb-5">
      <div className="text-center mt-5">
          <h1 className="with-underline">Ladies Apparel</h1>
      </div>
      <ClothingPost data={data}></ClothingPost>
    </div>
  </>
);

export default WomensClothingPage;

export const query = graphql`
  query WomensQuery {
    allContentfulClothing (filter: {category: {name: {eq: "Ladies"}}}) {
      edges{
        node{
          id
          name
          slug
          rating
          discount
          sizesAndPrices
          description {
            childMarkdownRemark {
              excerpt(pruneLength: 140)
            }
          }
          image {
            gatsbyImageData(width: 1000, placeholder: BLURRED, formats: AUTO)
            title
            id
        }
      }
    }
  }
}`;

