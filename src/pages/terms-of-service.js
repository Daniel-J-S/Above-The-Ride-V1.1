import React from 'react';
import Seo from '../components/seo';
import { graphql } from 'gatsby';
import Banner from '../components/banner';

function TermsOfService({
        data: {
            terms,
            contentfulHeaderBanner
        },
        location
    }) {
        return ( 
            <>
            <Seo 
                title="Terms of Service" 
                keywords={[`store policies`, `terms of service`]} 
                description="This website is operated by Above The Ride. Throughout the site, the terms “we”, “us” and “our” refer to Above The Ride."
                location={location}
            />
            <Banner isIndex={false} bannerData={contentfulHeaderBanner} />
            <div className="store-Policies">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="container">
                                <div
                                    dangerouslySetInnerHTML={{
                                    __html: terms.body.childMarkdownRemark.html
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
query termsOfServiceQuery {
    terms: contentfulPageInfoSection(name: {eq: "Terms of Service"}) {
      body {
        childMarkdownRemark {
          html
        }
      }
      name
    }
    contentfulHeaderBanner(page: {eq: "terms"}) {
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

export default TermsOfService;