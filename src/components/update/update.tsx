import { MDBInput, MDBTextArea } from 'mdb-react-ui-kit';
import { Form } from 'react-bootstrap';
import {SyntheticEvent, useState} from 'react';
import { useParams } from 'react-router-dom';


interface IUpdateProps{
    id: number | any,
    author: number,
    recipe_name: String | any,
    instructions: String | any,
    category: String | any
    editing: Boolean
    
}

function Update(props: IUpdateProps){

    let {id} = useParams(); 
    const initialRecipe = { 
        id: props.id,
        author: props.author,
        recipe_name: props.recipe_name,
        instructions: props.instructions,
        category: props.category,
    }

    const [editing, setEditing] = useState(props.editing);
    const [recipe, setRecipe] = useState(initialRecipe); //I MIGHT HAVE TO OVERRIDE

    // function editToggle(){
    //     setEditing(!editing);
    //     //TODO:: I SHOULD UNMOUNT / I SHOULD RELOAD PAGE.
    //   }


    function handleChange(e: SyntheticEvent){
        setRecipe({
            ...recipe,
            [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value
        })
    }

 function handleSubmit(e: SyntheticEvent){ //TODO: I SHOULD REFRESH PAGE!
        fetch(`http://localhost:8080/recipes/${id}`, { 
        method: 'PATCH',
        headers: { //TODO: ADD AUTH !
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': "*"
          },
        body: JSON.stringify( {...recipe}  ),
})
  .then((response) => response.json())
  .then((response)=> setRecipe(response));

  setEditing(false);

}
// @DOCS: YOU NEED THE _ENTIRE_ RECIPE OBJECT TO SEND TO BACKEND, HENCE THE SPREAD OPERATOR 
//...RECIPE, IN THE BODY. 
//TODO: STYLING TIME BABY!!

    return(
        <div style={{ margin: 'auto', textAlign: 'center', width: '80%' }}>
            {editing ? 
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

            <button onClick={handleSubmit}>SAVE your CHANGES!</button>
            <button onClick={()=>setEditing(false)}>CANCEL your CHANGES</button>

            </div> 
            : 
            <></>}
                
                
            
            {/*NOTE: I ABOVE COME FROM PROPS, DO NOT CREATE HERE!*/}
        </div>
    )
}

export default Update;