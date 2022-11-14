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
import Update from '../update/update';

interface IMoreInfoProps {
  currentUser: User | undefined;
  setCurrentUser: (nextUser: User | undefined) => void;
  recipe: Recipe | undefined;
  setRecipe: (setRecipe: Recipe) => void;
}

function MoreInfoCard(props: IMoreInfoProps) {
  const [authUser, setAuthUser] = useState<User>();
  const [recipe, setRecipe] = useState<any>({});
  const [editing, setEditing] = useState(false); //needed for conditional rendering of update component
  let { id } = useParams();

  function handleEditClick(){
    setEditing(!editing);
  }

   function handleEditSubmit(){
    getRecipe();
  }

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
            {recipe.recipe_name} - {recipe.category}
          </MDBCardTitle>
          <MDBCardText>{recipe.instructions}</MDBCardText>
          <MDBBtn style={{width: '12.5%'}} onClick={handleEditClick}> {editing ? 'CANCEL' : 'EDIT'}</MDBBtn>
          {editing ? <Update 
        id={id}
        author={recipe.author}
        recipe_name={recipe.recipe_name}
        instructions={recipe.instructions}
        category={recipe.category}
        editing={editing}
        recipe={recipe}
        setRecipe={setRecipe}
        handleSubmitClick={handleEditSubmit}
        /> : <></>}
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
