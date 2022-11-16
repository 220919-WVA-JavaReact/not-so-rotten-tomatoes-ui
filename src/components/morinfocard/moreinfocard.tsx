import {
  MDBBtn,
  MDBCard,
  MDBCardHeader,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBInput,
  MDBRipple,
  MDBRow,
  MDBTextArea,
} from 'mdb-react-ui-kit';
import { Form, FormSelect } from 'react-bootstrap';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Recipe } from '../../models/recipe';
import { User } from '../../models/user';
import Reviews from '../reviews/reviews';
import './moreinfocard.style.css';

interface IMoreInfoProps {
  currentUser: User | undefined;
  setCurrentUser: (nextUser: User | undefined) => void;
  recipe: Recipe | undefined;
  setRecipe: (setRecipe: Recipe) => void;
}

function MoreInfoCard(props: IMoreInfoProps) {
  const [, setAuthUser] = useState<User>();
  const [recipe, setRecipe] = useState<any>({});
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');

  let { id } = useParams();

  function handleEditClick() {
    setEditing(!editing);
    getRecipe();
    //@DOCS: THIS WAY, OUR CHANGES ARE ERASED ON HITTING 'CANCEL', BUT PERSISTED IF
    //WE HIT SAVE.
  }

  function handleChange(e: SyntheticEvent) {
    setRecipe({
      ...recipe,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    });
  }

  function handleSubmit() {
    if (props.currentUser?.id !== recipe.author.user_id) {
      setError("Unable to edit someone ELSE's recipe, please try again.");
      //@DOCS: front end validation AND back end validation both
      //prevent a user from editing someone ELSE's recipe.
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/recipes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ ...recipe }),
      }).then((res) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const newData = res.json();
        if (res.status === 400) {
          setError('Unable to update the RECIPE, please try again');
        } else {
          setRecipe(recipe); //@DOCS: THIS IS THE MAGIC BIT.
          // DO NOT CHANGE ME OR BAD UGLY THINGS
          //  WILL HAPPEN!
        }
      });
      setEditing(!editing);
    }
  }
  async function getRecipe() {
    setError('');
    const res = await fetch(`${process.env.REACT_APP_API_URL}/recipes/${id}`, {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
//{recipe.author.username}
  return recipe ? (
    <MDBCard>
      <MDBRow>
        <MDBCol style={{ display: 'grid', justifyContent: 'center' }}>
          <MDBRipple
            rippleColor="dark"
            rippleTag="div"
            className="bg-image hover-overlay"
          >
            <MDBCardImage
              src={`https://nsrt-public-images.s3.amazonaws.com/${recipe.filename}`}
              fluid
              style={{
                maxHeight: '300px',
                minHeight: '300px',
                paddingTop: '20px',
              }}
              alt="..."
            />
            <a>
              <div
                className="mask"
                style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}
              ></div>
            </a>
          </MDBRipple>
          <MDBCardTitle
            style={{
              display: 'grid',
              justifyContent: 'center',
              paddingTop: '10px',
            }}
          >
            {recipe.recipe_name} - {recipe.category}
          </MDBCardTitle>
          <MDBCardText>{recipe.instructions}</MDBCardText>
          <MDBCardText style={{ color: 'red' }}>{error}</MDBCardText>
          <MDBBtn style={{ width: '30%', margin:'auto'}} onClick={handleEditClick}>
            {editing ? 'CANCEL' : 'EDIT'}
          </MDBBtn>
          <div style={{ margin: 'auto', textAlign: 'center', width: '80%' }}>
            {editing && (
              <div className="edit-true">
                <form onSubmit={handleSubmit}>
                  <label>Recipe name</label>
                  <MDBInput
                    value={recipe.recipe_name}
                    id="recipe-name"
                    name="recipe_name"
                    className="small-top-margin"
                    onChange={handleChange}
                  />

                  <label>Instructions</label>
                  <MDBTextArea
                    value={recipe.instructions}
                    id="instructions"
                    name="instructions"
                    className="small-top-margin"
                    rows={9}
                    onChange={handleChange}
                  />

                  <Form.Select
                  value={recipe.category}
                  onChange={handleChange}
                  aria-label="Default select example"
                  id="category"
                  name="category"
                  className="small-top-margin small-bottom-margin"
        >
          <option>Category</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Entree">Entree</option>
          <option value="Dessert">Dessert</option>
        </Form.Select>

                </form>

                <MDBBtn className="small-top-margin" onClick={handleSubmit}>
                  SAVE your CHANGES!
                </MDBBtn>
                <br></br>
              </div>
            )}
          </div>
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
  );
}

export default MoreInfoCard;
