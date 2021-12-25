import React from 'react';
import Seo from '../components/seo';
import { graphql } from 'gatsby';
import Banner from '../components/banner';

function StorePolicy({
        data: {
            terms,
            contentfulHeaderBanner
        },
        location
    }) {
        return ( 
            <>
            <Seo 
                title="Store Policy" 
                keywords={[`returns`, `store policies`, `terms of service`, `biker gear`, `vests`]} 
                description="40 years experience in leather goods, sewing and passing on the best prices to customers. Looking for Biker Gear, accessories or just need your patches sewn on? We specialize in exceptional quality and precision to ensure they are done right the first time."
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
query StorePolicyQuery {
    terms: contentfulPageInfoSection(name: {eq: "TERMS OF SERVICE"}) {
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
    }
}`;

export default StorePolicy;