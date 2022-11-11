import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Recipe } from '../../models/recipe';
import { User } from '../../models/user';

interface IAddReviewProps {
  currentUser: User | undefined;
  recipe_id: number | string | undefined;
  recipe: Recipe;
}

function AddReview(props: IAddReviewProps) {
  const [reviews, setReviews] = useState([]);
  const [review_text, setReviewText] = useState('');

  let updateReviewText = (e: SyntheticEvent) => {
    setReviewText((e.target as HTMLInputElement).value);
  };

  async function postReview() {
    const author = props.currentUser;
    const recipe_id = props.recipe;
    const token = sessionStorage.getItem('token');
    console.log(author);

    const result = await fetch(
      `http://localhost:8080/reviews/recipe/${props.recipe.id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `${token}`,
        },
        body: JSON.stringify({ review_text, author, recipe_id }),
      }
    );
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
