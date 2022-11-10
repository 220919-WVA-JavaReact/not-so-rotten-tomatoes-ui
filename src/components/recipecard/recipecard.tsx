import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';

interface IRecipeCardProps{
  id: number
  name: String,
  category: String,
  instructions: String
}


function RecipeCard(props: IRecipeCardProps) {
    return(
        <MDBCard>
        <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/184.webp' position='top' alt='...' />
        <MDBCardBody>
          <MDBCardTitle>{props.name}</MDBCardTitle>
          <MDBCardText>
            {props.category}
          </MDBCardText>
          <MDBCardText>
            {props.instructions}
          </MDBCardText>
          <MDBBtn href={`/recipes/${props.id}`}>See More</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    );
}

export default RecipeCard;