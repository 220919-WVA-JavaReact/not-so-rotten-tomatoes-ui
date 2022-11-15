import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import React from 'react';

function Home() {
  return (
    <MDBCarousel showIndicators dark fade>
      <MDBCarouselItem
        className="w-100 d-block"
        style={{
          maxHeight: '90vh',
        }}
        itemId={1}
        src="https://foodtank.com/wp-content/uploads/2022/05/Food-As-Medicine-Featured.jpg"
        alt="..."
      >
        {/* style={{ backgroundColor: '#777' }} */}
        <h3>
          <a
            href="/register"
            style={{ color: 'white', textDecoration: 'none' }}
          >
            Sign In For More
          </a>
        </h3>
      </MDBCarouselItem>
      <MDBCarouselItem
        className="w-100 d-block "
        style={{
          maxHeight: '90vh',
        }}
        itemId={2}
        src="https://www.refrigeratedfrozenfood.com/ext/resources/NEW_RD_Website/DefaultImages/default-pasta.jpg?1430942591"
        alt="..."
      >
        <h3>
          <a
            href="/register"
            style={{ color: 'white', textDecoration: 'none' }}
          >
            Sign In For More
          </a>
        </h3>
      </MDBCarouselItem>

      <MDBCarouselItem
        className="w-100 d-block"
        style={{
          maxHeight: '90vh',
        }}
        itemId={3}
        src="https://www.westcentralfoodservice.com/wp-content/uploads/2019/04/5-food-trends-2019-no-title.jpg"
        alt="..."
      >
        <h3>
          <a
            href="/register"
            style={{ color: 'white', textDecoration: 'none' }}
          >
            Sign In For More
          </a>
        </h3>
      </MDBCarouselItem>
    </MDBCarousel>
  );
}

export default Home;
