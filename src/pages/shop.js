// TODO: update to function component
import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import Seo from '../components/seo';
import Banner from '../components/banner';
import StarRating from '../components/starRating';
import { graphql } from 'gatsby';
import { processSizeAndPrice } from '../utils/process-size-and-price';

class IndexPost extends React.Component {
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

    const { clothing } = this.props;
    const { NoOfPost } = this.state;

    return (
      <>
      <div className="row product-main">
        {clothing.edges.slice(0, NoOfPost).map(({ node }) => {
          const {5: minPrice }  = processSizeAndPrice(node.sizesAndPrices);
          return (
          <Link key={node.id} className="Catalogue__item col-sm-12 col-md-6 col-lg-3" to={`/${node.slug}`}>
          <div>
            <div className="details_List">
            {node.image === null ? <div className="no-image">No Image</div> : <GatsbyImage key={node.image.id} image={node.image.gatsbyImageData} alt={node.image.title} />}
              <div className="details_inner">
                  {
                    node.name.length >= 30 
                    ? <h2>{node.name.split(' ').slice(0, 4).join(' ')}...</h2> 
                    : <h2>{node.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h2>
                  }
                <StarRating
                  rating={node.rating}
                />
                <p>{node.description.childMarkdownRemark.excerpt.substr(0, 50)}...<br /><Link to={`/${node.slug}`}><small>click for more details</small></Link></p>
                <div className="row">
                  <div className="col-sm-7 align-self-center">
                    <small>${minPrice}</small>
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

const ShopPage = ({ location, data: { clothing, bannerData }}) => { 
  return (
  <>
    <Seo 
      title="Store" 
      keywords={[`current inventory`, `jackets`, `vests`, `sewing`]} 
      description="Check out our current inventory of t-shirts and hoodies"
      location={location}
    />
    <Banner isIndex={false} bannerData={bannerData} />
    <div className="container store-page mb-5">
      <div className="text-center mt-5">
          <h1 className="with-underline">All Apparel</h1>
      </div>
      <IndexPost clothing={clothing}></IndexPost>
    </div> 
  </>
  );
}

export default ShopPage;

export const query = graphql`
  query ShopQuery {
    clothing: allContentfulClothing {
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
  bannerData: contentfulHeaderBanner(page: {eq: "shop"}) {
    title
    subHeading
    buttonLink
    images {
      gatsbyImageData(width: 1800, formats: AUTO)
      title
      id
    }
  }
}`;

