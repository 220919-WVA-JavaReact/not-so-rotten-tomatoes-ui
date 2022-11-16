import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
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
  recipe: Recipe;
}

function Reviews(props: IReviewProps) {
  const [reviews, setReviews] = useState([]);
  // const [authUser, setAuthUser] = useState<User>();

  async function getReviews() {
    const result = await fetch(
      `${process.env.REACT_APP_API_URL}/reviews/recipe/${props.id}`,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <AddReview
                currentUser={props.currentUser}
                recipe_id={props.recipe.id}
                recipe={props.recipe}
                getReviews={getReviews}
              />
              {reviews.map((review: any) => {
                return (
                  <ReviewCard
                    currentUser={props.currentUser}
                    author={review.author.username}
                    text={review.review_text}
                    id={review.review_id}
                    key={review.review_id}
                    getReviews={getReviews}
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
// test comment

export default Reviews;
