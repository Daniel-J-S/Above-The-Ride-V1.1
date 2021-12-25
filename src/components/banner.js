import React from 'react';
import Slider from 'react-slick';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';



export default function Banner ({ bannerData, isIndex, customTitle }) {

    const settings = {
      dots: false,
      speed: 3500,
      infinite: false,
      autoplay: false,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <div className="slider-section">
        <Slider {...settings}>
            <div className="item">
              <div className="site-Banner">
                {bannerData.images.map( image => (
                  <GatsbyImage loading="eager" key={image.id} image={image.gatsbyImageData} alt={image.title} />
                ))}
                <div style={{textAlign: !isIndex && 'center'}} className="Banner-details">
                  <div>
                    <h1 style={{textAlign: !isIndex && 'center'}}>{customTitle ? customTitle : bannerData.title}</h1>
                    {
                      isIndex &&
                      <Link to="/store">{bannerData.buttonLink}</Link>
                    }
                  </div>
                </div>
              </div>
            </div>
        </Slider>
      </div>
  );
}