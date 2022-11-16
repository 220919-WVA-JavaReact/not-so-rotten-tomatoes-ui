import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { SyntheticEvent, useState } from 'react';
import { Recipe } from '../../models/recipe';
import { User } from '../../models/user';

interface IAddReviewProps {
  currentUser: User | undefined;
  recipe_id: number | string | undefined;
  recipe: Recipe;
  getReviews: Function;
}

function AddReview(props: IAddReviewProps) {
  const [reviews, setReviews] = useState([]);
  const [review_text, setReviewText] = useState('');

  let updateReviewText = (e: SyntheticEvent) => {
    setReviewText((e.target as HTMLInputElement).value);
  };

  async function postReview() {
    console.log(props.currentUser?.id);
    const authorid = props.currentUser?.id;
    const recipe_id = props.recipe;
    const token = sessionStorage.getItem('token');

    const result = await fetch(
      `${process.env.REACT_APP_API_URL}/reviews/recipe/${props.recipe.id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `${token}`,
        },
        body: JSON.stringify({ authorid, review_text, recipe_id }),
      }
    );
    const data = await result.json();
    // console.log(review_text);
    setReviewText('');
    // console.log(review_text);
    setReviews(Object.assign(data));
    props.getReviews(reviews);
  }

  return (
    <>
      <MDBInput
        style={{ marginBottom: '0px' }}
        wrapperClass="mb-4"
        placeholder="Type comment..."
        label="+ Add a note"
        onChange={updateReviewText}
        value={review_text}
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
