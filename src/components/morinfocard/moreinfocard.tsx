import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBRipple,
  MDBBtn
} from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isPropertySignature } from 'typescript';
import Update from '../updaterecipe/update';



function MoreInfoCard() {
  //TODO: SET EDITING TRUE HERE.
const [editing, setEditing] = useState(false);
  const [recipe, setRecipe] = useState<any>({});
  let {id} = useParams();

  async function getRecipe() {
    const res = await fetch(`http://localhost:8080/recipes/${id}`, { 
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "*"
      }})
      const data = await res.json();
      setRecipe(Object.assign(data));
  }

  useEffect( () => {
    getRecipe();
  }, []);

    function editToggle(){
      setEditing(!editing);
      setRecipe(recipe);
    }

  return (
    <div>
    {recipe ?
    <>
    <MDBCard>
      <MDBRow>
      <MDBCol>
        <MDBRipple rippleColor='dark' rippleTag='div' className='bg-image hover-overlay'>
          <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/111.webp' fluid style={{ maxHeight: '300px'}} alt='...' />
          <a>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
        </a>
        </MDBRipple>
        <MDBCardTitle>{recipe.recipe_name} - {id}</MDBCardTitle>
        <MDBCardText>
          {recipe.instructions}
        </MDBCardText>
        <MDBBtn onClick={()=>editToggle}>Edit</MDBBtn>
      </MDBCol>
      <MDBCol>
        <h2>Reviews</h2>
      </MDBCol>
    </MDBRow>
  </MDBCard>
  </>
    :
    
    <div>Loading Recipe...</div> 
  }
    
    
    
    {editing ? <Update 
    id={recipe.id} 
    author={recipe.author} 
    recipe_name={recipe.recipe_name}
    instructions={recipe.instructions}
    category={recipe.category}
    /> : <></>}
    
    </div>
  );
}

export default MoreInfoCard;