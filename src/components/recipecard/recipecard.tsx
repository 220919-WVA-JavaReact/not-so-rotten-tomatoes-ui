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
    <MDBCard>
      <MDBCardImage
        src={`https://nsrt-public-images.s3.amazonaws.com/${props.filename}`}
        position="top"
        alt="..."
      />
      <MDBCardBody>
        <MDBCardTitle>{props.name}</MDBCardTitle>
        <MDBCardText>{props.category}</MDBCardText>
        <MDBCardText>{props.instructions}</MDBCardText>
        <Link to={`/recipes/${props.id}`}>
          <MDBBtn>See More</MDBBtn>
        </Link>
      </MDBCardBody>
    </MDBCard>
  );
}

export default RecipeCard;
