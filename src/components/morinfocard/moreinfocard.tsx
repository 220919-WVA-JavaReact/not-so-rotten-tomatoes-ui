import {
  MDBBtn,
  MDBCard,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBRipple,
  MDBRow,
  MDBTextArea,
  MDBInput,
} from 'mdb-react-ui-kit';
<<<<<<< HEAD
import { useEffect, useState } from 'react';
=======
import { useEffect, useState, SyntheticEvent } from 'react';
>>>>>>> 79fbb9ae9f9bdcbf92a60067f640567c2b605cac
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
  const [editing, setEditing] = useState(false);

  let { id } = useParams();

  function handleEditClick() {
    setEditing(!editing);
<<<<<<< HEAD
  }

  function handleEditSubmit() {
=======
>>>>>>> 79fbb9ae9f9bdcbf92a60067f640567c2b605cac
    getRecipe();
      //@DOCS: THIS WAY, OUR CHANGES ARE ERASED ON HITTING 'CANCEL', BUT PERSISTED IF 
      //WE HIT SAVE.
  }


  function handleChange(e: SyntheticEvent){
    setRecipe({
        ...recipe,
        [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value
    })
}

  function handleSubmit(){
    fetch(`http://localhost:8080/recipes/${id}`, { 
    method: 'PATCH',
    headers: { 
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': "*"
      },
    body: JSON.stringify( {...recipe}  ),
}).then((res) => {
    const newData = res.json();
    setRecipe(recipe); //@DOCS: THIS IS THE MAGIC BIT. 
                      // DO NOT CHANGE ME OR BAD UGLY THINGS
                     //  WILL HAPPEN!
})
setEditing(!editing);
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
  });

 

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
              src={`https://nsrt-public-images.s3.amazonaws.com/${recipe.filename}`}
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
<<<<<<< HEAD
          <MDBBtn style={{ width: '12.5%' }} onClick={handleEditClick}>
            {' '}
            {editing ? 'CANCEL' : 'EDIT'}
          </MDBBtn>
          {editing ? (
            <Update
              id={id}
              author={recipe.author}
              recipe_name={recipe.recipe_name}
              instructions={recipe.instructions}
              category={recipe.category}
              editing={editing}
              recipe={recipe}
              setRecipe={setRecipe}
              handleSubmitClick={handleEditSubmit}
            />
          ) : (
            <></>
          )}
=======
          <MDBBtn style={{width: '12.5%'}} onClick={handleEditClick}> {editing ? 'CANCEL' : 'EDIT'}</MDBBtn>
          <div style={{ margin: 'auto', textAlign: 'center', width: '80%' }}>
             {editing &&
             <div className='edit-true'> 
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
 
             <label>Category</label>
             <input 
             value={recipe.category}
             id="category"
             name="category"
             onChange={handleChange}
             />
 
             </form>
 
             <MDBBtn className="small-top-margin" onClick={handleSubmit}>SAVE your CHANGES!</MDBBtn>
             <br></br>
             </div> 
             }
            
        </div>
>>>>>>> 79fbb9ae9f9bdcbf92a60067f640567c2b605cac
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
