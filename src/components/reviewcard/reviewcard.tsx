import { MDBCard, MDBCardBody } from 'mdb-react-ui-kit';

interface IReviewCardProps {
  author: String;
  text: String;
}

function ReviewCard(props: IReviewCardProps) {
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
        </div>
      </MDBCardBody>
    </MDBCard>
  );
}

export default ReviewCard;
