import React from 'react';
import {
  MDBCarousel,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';


function Home() {


    return(
        <MDBCarousel showControls showIndicators dark fade>
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={1}
        src='https://foodtank.com/wp-content/uploads/2022/05/Food-As-Medicine-Featured.jpg'
        alt='...'
      >
        <h3>Sign In For More</h3>
      </MDBCarouselItem>
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={2}
        src='https://www.refrigeratedfrozenfood.com/ext/resources/NEW_RD_Website/DefaultImages/default-pasta.jpg?1430942591'
        alt='...'
      >
        <h3>Sign In For More</h3>
      </MDBCarouselItem>

      <MDBCarouselItem
        className='w-100 d-block'
        itemId={3}
        src='https://www.westcentralfoodservice.com/wp-content/uploads/2019/04/5-food-trends-2019-no-title.jpg'
        alt='...'
      >
        <h3>Sign In For More</h3>
      </MDBCarouselItem>
    </MDBCarousel>
    );
}

export default Home