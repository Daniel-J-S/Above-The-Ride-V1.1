require('dotenv').config();

const { spaceId, accessToken, snipcart, googleAnalyticsId, facebookPixelId } = process.env;

module.exports = {
  siteMetadata: {
    title: `Above The Ride`,
    description: `Welcome to Above the Ride! We are a lifestyle brand and e-commerce store that caters to the motorcycling community. Our mission is to provide high-quality t-shirts and accessories that not only look great, but also reflect the unique culture and spirit of motorcycling.`,
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
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId,
        accessToken
      }
    },
    {
      resolve: 'gatsby-plugin-snipcartv3',
      options: {
        apiKey: snipcart,
        autopop: true,
        language: null
      },
    },
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: googleAnalyticsId,
          // Setting this parameter is optional
          anonymize: true
        },
        facebookPixel: {
          pixelId: facebookPixelId
        },
        // Defines the environments where the tracking should be available  - default is ['production']
        environments: ['production', 'development']
      },
    },
  ],
};