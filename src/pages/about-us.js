import React from 'react';
import Seo from '../components/seo';
import Banner from '../components/banner';
import { graphql } from 'gatsby';

function AboutUs({
        data: {
            aboutUs,
            bannerData
        },
        location
    }) {
        return ( 
            <>
            <Seo 
                title="About" 
                keywords={[`about us`, `our story`, `motorcyclist apparel`, `t-shirts`, `hoodies`]} 
                description="We bring life back to the motorcyclist lifestyle"
                location={location}
            />
            <Banner isIndex={false} bannerData={bannerData} />
            <div className="site-About">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="container">
                                <div
                                    dangerouslySetInnerHTML={{
                                    __html: aboutUs.body.childMarkdownRemark.html
                                    }}
                                />
                            </div> 
                        </div>
                    </div>
                </div> 
            </div> 
        </>
    );
}

export const query = graphql`
query AboutPageQuery {
    aboutUs: contentfulPageInfoSection(name: {eq: "About Us"}) {
      body {
        childMarkdownRemark {
          html
        }
      }
      name
    }
    bannerData: contentfulHeaderBanner(page: {eq: "about us"}) {
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

export default AboutUs;

