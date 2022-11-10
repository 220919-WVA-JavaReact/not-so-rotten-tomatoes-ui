import { ResultType } from '@remix-run/router/dist/utils';
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
} from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { Recipe } from '../../models/recipe';
import { User } from '../../models/user';
import AddReview from '../addreview/addreview';
import ReviewCard from '../reviewcard/reviewcard';

interface IReviewProps {
  id: number | string | undefined;
  currentUser: User | undefined;
  setCurrentUser: (nextUser: User | undefined) => void;
}

function Reviews(props: IReviewProps) {
  const [reviews, setReviews] = useState([]);
  const [authUser, setAuthUser] = useState<User>();

  async function getReviews() {
    const result = await fetch(
      `http://localhost:8080/reviews/recipe/${props.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
    const data = await result.json();
    // console.log(data);
    setReviews(Object.assign(data));
  }

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <MDBContainer className="mt-5" style={{ maxWidth: '1000px' }}>
      <MDBRow className="justify-content-center">
        <MDBCol md="8" lg="6">
          <MDBCard
            className="shadow-0 border"
            style={{ backgroundColor: '#f0f2f5' }}
          >
            <MDBCardBody>
              {/* <MDBInput
                wrapperClass="mb-4"
                placeholder="Type comment..."
                label="+ Add a note"
              /> */}
              <AddReview currentUser={authUser} recipe_id={props.id} />
              {reviews.map((review: any) => {
                return (
                  <ReviewCard
                    author={review.author.username}
                    text={review.review_text}
                    key={review.review_id}
                  />
                );
              })}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Reviews;
