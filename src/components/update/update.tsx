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
        //TODO:: I SHOULD UNMOUNT / I SHOULD RELOAD PAGE.
      }

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
}
// @DOCS: YOU NEED THE _ENTIRE_ RECIPE OBJECT TO SEND TO BACKEND, HENCE THE SPREAD OPERATOR 
//...RECIPE, IN THE BODY. 
//TODO: STYLING TIME BABY!!

    return(
        <div>
            {editing ? 
            <div className='edit-true'> 
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

            <button onClick={handleSubmit}>SAVE your CHANGES!</button>
            <button onClick={editToggle}>CANCEL your CHANGES</button>

            </div> 
            : 
            <></>}
                
                
            
            {/*NOTE: I ABOVE COME FROM PROPS, DO NOT CREATE HERE!*/}
        </div>
    )
}

export default Update;