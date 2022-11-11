import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBRipple,
  MDBRow,
} from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import { useParams } from 'react-router-dom';
import { Recipe } from '../../models/recipe';
import { User } from '../../models/user';
import Reviews from '../reviews/reviews';

interface IMoreInfoProps {
  currentUser: User | undefined;
  setCurrentUser: (nextUser: User | undefined) => void;
  recipe: Recipe | undefined;
  setRecipe: (setRecipe: Recipe) => void;
}

function MoreInfoCard(props: IMoreInfoProps) {
  const [authUser, setAuthUser] = useState<User>();
  const [recipe, setRecipe] = useState<any>({});
  let { id } = useParams();

  async function getRecipe() {
    const res = await fetch(`http://localhost:8080/recipes/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
    const data = await res.json();
    setRecipe(Object.assign(data));
  }

  useEffect(() => {
    getRecipe();
  }, []);

  return recipe ? (
    <MDBCard>
      <MDBRow>
        <MDBCol>
          <MDBRipple
            rippleColor="dark"
            rippleTag="div"
            className="bg-image hover-overlay"
          >
            <MDBCardImage
              src="https://mdbootstrap.com/img/new/standard/nature/111.webp"
              fluid
              style={{ maxHeight: '300px' }}
              alt="..."
            />
            <a>
              <div
                className="mask"
                style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}
              ></div>
            </a>
          </MDBRipple>
          <MDBCardTitle>
            {recipe.recipe_name} - {id}
          </MDBCardTitle>
          <MDBCardText>{recipe.instructions}</MDBCardText>
        </MDBCol>
        <MDBCol>
          <h2>Reviews</h2>
          <Reviews
            id={id}
            currentUser={props.currentUser}
            setCurrentUser={setAuthUser}
            recipe={recipe}
          />
        </MDBCol>
      </MDBRow>
    </MDBCard>
  ) : (
    <div>Loading Recipe...</div>
)}

export default MoreInfoCard;
