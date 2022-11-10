import {SyntheticEvent, useState} from 'react';

//INITIAL RECIPE:: BLANK
//TODO: MAKE A FETCH REQUESTY FOR RECIPE BY ID
const initialRecipe = {
    id: 1,
    author: 1,
    recipe_name: 'Bratwursten',
    instructions: 'Just?? Cook them????',
    category: 'Fruestueck',
}

interface IUpdateProps{
    id: number,
    author: number,
    recipe_name: String | any,
    instructions: any,
    category: any
    
}

function Update(props: IUpdateProps){
    
    //...recall unit 3 final project, use that for stuff
    //finally, send PATCH request with the updated info
    const [editing, setEditing] = useState(true); //I initialize to false, which means, on every re-render, I should be false.
   
    const [recipe, setRecipe] = useState(props); //I SHOULD work.

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

    //TODO: MAKE SURE I WORK WKHFAKSDNFSDKF
    function handleSubmit(e: SyntheticEvent){
        fetch(`http://localhost:8080/recipes/${props.id}`, { //TODO: DOUBLE CHECK THIS URL
        method: 'PATCH',
    body: JSON.stringify({ //TODO: MAKE SURE THIS WORKS!!
    recipe
  }),
  headers: { //TODO: ADD AUTH !
    'Content-type': 'application/json',
  },
})
  .then((response) => response.json()
   // setRecipe(response.body); //TODO:: WHY NO WORKY?
  );
  
    }

    return(
        <div>
            <h2>You found the EDIT component!</h2>
            {editing ? 
            <div className='edit-true'> 
            
            <p>You are EDITING an existant RECIPE. with ID {props.id}</p> 

            <form onSubmit={handleSubmit}>
            <label>Recipe name</label>
            <input 
            value={props.recipe_name}
            id="recipe-name"
            name="recipe_name"
            onChange={handleChange}
            />

            <label>Instructions</label>
            <input 
            value={props.instructions}
            id="instructions"
            name="instructions"
            onChange={handleChange}
            />

            <label>Category</label>
            <input 
            value={props.category}
            id="category"
            name="category"
            onChange={handleChange}
            />

            </form>

            <button>Cancel your CHANGES!</button>
            {/*TODO: UPDATE ME TO WORK!!!*/}
            <button onClick={handleSubmit}>SAVE your CHANGES!</button>
            </div> 
            : 
            <></>}
                
                
            
            {/*NOTE: I ABOVE COME FROM PROPS, DO NOT CREATE HERE!*/}
        </div>
    )
}

export default Update;