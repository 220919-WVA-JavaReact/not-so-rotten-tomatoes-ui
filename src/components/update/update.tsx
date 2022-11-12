import {SyntheticEvent, useState} from 'react';
import { useParams } from 'react-router-dom';

//NOTE: YOU NEED TO CHANGE THESE PROPS, CLAIRE!
interface IUpdateProps{ //WHEN THIS ID WAS STRING | UNDEFINED , YOU GOT THAT 400
                        //ALSO AUTHOR WAS NUMBER. TRY TO CHANGE THESE, BUT STILL
                        //PULL IN THE PATH'S ID FROM PARAMS?
    id: number | any,
    author: number,
    recipe_name: String | any,
    instructions: String | any,
    category: String | any
    
}

function Update(props: IUpdateProps){

    //HEY FUTURE CLAIRE: YOU ARE GETTING THE ERROR BECAUSE THIS APP IS NOT
    //CORRECTLY PASSING ALL THE INFO YOU NEED.
    //START BY CONSOLE LOGGING YOUR SUBMIT HANDLER
    //AND CHECK REACT DEV TOOLS
    //HINT: 'INSTRUCTIONS' APPEARS TO BE MISSING FIRST. 
    //

    let {id} = useParams(); //ID NOW FROM PROPS 
    const initialRecipe = { //ADDED BACK ID, AUTHOR
        id: props.id,
        author: props.author,
        recipe_name: props.recipe_name,
        instructions: props.instructions,
        category: props.category,
    }

    //...recall unit 3 final project, use that for stuff
    //finally, send PATCH request with the updated info
    const [editing, setEditing] = useState(true); //I initialize to false, which means, on every re-render, I should be false.
   
    const [recipe, setRecipe] = useState(initialRecipe); //I MIGHT HAVE TO OVERRIDE

    function editToggle(){
        setEditing(!editing);
        //setRecipe(props);
      }

    function handleChange(e: SyntheticEvent){
        setRecipe({
            ...recipe,
            [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value
        })
    }

    //TODO: I AM NOT PASSING CORRECT CREDENTIALS? FIX
 function handleSubmit(e: SyntheticEvent){
        fetch(`http://localhost:8080/recipes/${id}`, { //id from PARAMS
        method: 'PATCH',
        headers: { //TODO: ADD AUTH !
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': "*"
          },
        body: JSON.stringify( {recipe}  ),
})
  .then((response) => response.json())
  .then((response)=> setRecipe(response)); //LETS HOPE YOU WORK!
  
    }
// TODO: DEPRECATE ID IN 'YOU ARE EDITING' MESSAGE?
    return(
        <div>
            <h2>You found the EDIT component!</h2>
            {editing ? 
            <div className='edit-true'> 
            
            <p>You are EDITING an existant RECIPE. with ID {id}</p> 

            <form onSubmit={handleSubmit}>
            <label>Recipe name</label>
            <input 
            value={recipe.recipe_name}
            id="recipe-name"
            name="recipe_name"
            onChange={handleChange}
            />

            <label>Instructions</label>
            <input 
            value={recipe.instructions}
            id="instructions"
            name="instructions"
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

            <button>Cancel your CHANGES!</button>
            {/*TODO: UPDATE ME TO WORK!!!*/}
            <button onClick={handleSubmit}>SAVE your CHANGES! XXX NOT WORKING XXX</button>
            </div> 
            : 
            <></>}
                
                
            
            {/*NOTE: I ABOVE COME FROM PROPS, DO NOT CREATE HERE!*/}
        </div>
    )
}

export default Update;