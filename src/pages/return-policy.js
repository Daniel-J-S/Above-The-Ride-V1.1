import React from 'react';
import Seo from '../components/seo';
import { graphql } from 'gatsby';
import Banner from '../components/banner';

function ReturnPolicy({
        data: {
            terms,
            contentfulHeaderBanner
        },
        location
    }) {
        return ( 
            <>
            <Seo 
                title="Return Policy" 
                keywords={[`returns`, `return policy`]} 
                description="Our return policy lasts 14 days from the day you receive your order. If 14 days have passed since receipt of your order, we cannot offer you a refund or exchange."
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
query ReturnPolicyQuery {
    terms: contentfulPageInfoSection(name: {eq: "Return Policy"}) {
      body {
        childMarkdownRemark {
          html
        }
      }
      name
    }
    contentfulHeaderBanner(page: {eq: "returns"}) {
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

export default ReturnPolicy;