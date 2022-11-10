import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { SyntheticEvent, useEffect, useState } from 'react';
import { User } from '../../models/user';

interface IAddReviewProps {
  currentUser: User | undefined;
  recipe_id: number | string | undefined;
}

function AddReview(props: IAddReviewProps) {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');

  let updateReviewText = (e: SyntheticEvent) => {
    setReviewText((e.target as HTMLInputElement).value);
  };

  async function postReview() {
    const author = props.currentUser?.id;
    const recipeid = Number(props.recipe_id);

    const result = await fetch(`http://localhost:8080/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ author, reviewText, recipeid }),
    });
    const data = await result.json();
    // console.log(data);
    setReviews(Object.assign(data));
  }

  return (
    <>
      <MDBInput
        style={{ marginBottom: '0px' }}
        wrapperClass="mb-4"
        placeholder="Type comment..."
        label="+ Add a note"
        onChange={updateReviewText}
      />
      <MDBBtn
        style={{ marginBottom: '25px', alignContent: 'right' }}
        onClick={postReview}
      >
        Submit
      </MDBBtn>
    </>
  );
}

export default AddReview;
