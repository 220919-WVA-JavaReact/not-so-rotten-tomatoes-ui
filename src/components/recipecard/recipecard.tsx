import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { User } from '../../models/user';

interface IRecipeCardProps {
  currentUser: User | undefined;
  id: number;
  name: String;
  category: String;
  instructions: String;
  filename: String;
}

function RecipeCard(props: IRecipeCardProps) {
  return (
    <MDBCard className="g-col-4">
      <MDBCardImage
        src={`https://nsrt-public-images.s3.amazonaws.com/${props.filename}`}
        position="top"
        alt="..."
        style={{
          maxHeight: '150px',
          minHeight: '150px',
          maxWidth: '190px',
          minWidth: '190px',
        }}
      />
      <MDBCardBody>
        <MDBCardTitle
          style={{
            display: 'grid',
            justifyContent: 'center',
            fontSize: '25px',
            textDecoration: 'underline',
            height: '60px',
          }}
        >
          {props.name}
        </MDBCardTitle>
        <MDBCardText
          style={{
            fontSize: '18px',
            paddingTop: '1px',
          }}
        >
          {props.category}
        </MDBCardText>
        <MDBCardText
          style={{
            fontSize: '15px',
            justifyContent: 'left',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            height: '100px',
          }}
        >
          {props.instructions}
        </MDBCardText>
        <Link to={`/recipes/${props.id}`}>
          <MDBBtn>See More</MDBBtn>
        </Link>
      </MDBCardBody>
    </MDBCard>
  );
}

export default RecipeCard;
