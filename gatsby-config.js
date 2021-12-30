require("dotenv").config();

const { spaceId, accessToken, snipcart, websiteId } = process.env;

module.exports = {
  siteMetadata: {
    title: `Above The Ride`,
    description: `Above the Ride brings life to your lifestyle.`,
    author: `DanielJS`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-smoothscroll`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Above the Ride`,
        short_name: `Above the Ride`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#000000`,
        display: `minimal-ui`,
        icon: `src/images/logo.svg`,
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId,
        accessToken
      }
    },
    {
      resolve: "gatsby-plugin-snipcartv3",
      options: {
        apiKey: snipcart,
        autopop: true,
        language: null
      },
    },
    // {
    //   resolve: `gatsby-plugin-gdpr-cookies`,
    //   options: {
    //     googleAnalytics: {
    //       trackingId: 'YOUR_GOOGLE_ANALYTICS_TRACKING_ID',
    //       // Setting this parameter is optional
    //       anonymize: true
    //     },
    //     facebookPixel: {
    //       pixelId: 'YOUR_FACEBOOK_PIXEL_ID'
    //     },
    //     // Defines the environments where the tracking should be available  - default is ["production"]
    //     environments: ['production', 'development']
    //   },
    // },
  ],
}
