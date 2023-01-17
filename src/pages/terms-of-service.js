import React from 'react';
import Seo from '../components/seo';
import { graphql } from 'gatsby';

function TermsOfService({
        data: {
            terms
        }
    }) {
        return ( 
            <>
            <Seo 
                title="Terms of Service" 
                keywords={[`store policies`, `terms of service`]} 
                description="This website is operated by Above The Ride. Throughout the site, the terms “we”, “us” and “our” refer to Above The Ride."
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
query termsOfServiceQuery {
    terms: contentfulPageInfoSection(name: {eq: "Terms of Service"}) {
      body {
        childMarkdownRemark {
          html
        }
      }
      name
    }
}`;

export default TermsOfService;