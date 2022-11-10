import { MDBInput } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';

interface IAddReviewProps {
  id: number;
}

function AddReview(props: IAddReviewProps) {
  const [reviews, setReviews] = useState([]);

  async function postReview() {
    const result = await fetch(`http://localhost:8080/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
    const data = await result.json();
    // console.log(data);
    setReviews(Object.assign(data));
  }

  useEffect(() => {
    postReview();
  }, []);

  return (
    <MDBInput
      wrapperClass="mb-4"
      placeholder="Type comment..."
      label="+ Add a note"
      onSubmit={postReview}
    />
  );
}

export default AddReview;
