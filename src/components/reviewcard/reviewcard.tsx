import { MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { User } from '../../models/user';

interface IReviewCardProps {
  currentUser: User | undefined;
  author: String;
  text: String;
  id: Number;
  getReviews: Function;
}

function ReviewCard(props: IReviewCardProps) {
  const [reviews, setReviews] = useState([]);

  async function deleteReview() {
    const result = await fetch(
      `${process.env.REACT_APP_API_URL}/reviews/${props.id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `${sessionStorage.getItem('token')}`,
        },
      }
    );
    const data = await result.json();
    // console.log(data);
    setReviews(Object.assign(data));
    props.getReviews(reviews);
  }

  return (
    <MDBCard className="mb-4">
      <MDBCardBody>
        {/* add your review input here from the fetch*/}
        <p>{props.text}</p>

        <div className="d-flex justify-content-between">
          <div className="d-flex flex-row align-items-center">
            {/* figure out a way to change to username with props */}
            <p className="small mb-0 ms-2">{props.author}</p>
          </div>
          {props.currentUser?.role === 'ADMIN' ? (
            <div className="d-flex flex-row align-items-center">
              <p className="small text-muted mb-0">
                <Button onClick={deleteReview}>Delete</Button>
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </MDBCardBody>
    </MDBCard>
  );
}

export default ReviewCard;
