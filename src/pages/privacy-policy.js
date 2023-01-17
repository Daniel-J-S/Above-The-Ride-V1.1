import React from 'react';
import Seo from '../components/seo';
import { graphql } from 'gatsby';

function PrivacyPolicy({
        data: {
            terms,
        },
    }) {
        return ( 
            <>
            <Seo 
                title="Privacy Policy" 
                keywords={[`privacy`, `consumer rights`, `privacy policy`]} 
                description="This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from abovetheride.com (the “Site”)."
            />
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
query PrivacyPolicyQuery {
    terms: contentfulPageInfoSection(name: {eq: "Privacy Policy"}) {
      body {
        childMarkdownRemark {
          html
        }
      }
      name
    }
}`;

export default PrivacyPolicy;