import { MDBInput, MDBTextArea } from 'mdb-react-ui-kit';
import { SyntheticEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { User } from '../../models/user';

import './newrecipe.css';

interface IRegisterProps {
  currentUser: User | undefined;
}




function NewRecipe(props: IRegisterProps) {

  const author = props.currentUser?.id;
  let initialRecipe = 
  {
    userid: author,
    recipe_name: "",
    instructions: "",
    category: "Appetizer"
  }

  const navigate = useNavigate();
  const [newRecipe, setRecipe] = useState<any>(initialRecipe);
  const [filename, setFilename] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  let { recipe } = useParams();
  




  const handleClick = () => {
    if (newRecipe.recipe_name.trim() === '') {
      setErrorMsg('Recipe name cannot be blank');
      return;
    }

    if (newRecipe.instructions.trim() === '') {
      setErrorMsg('Instructions cannot be blank');
      return;
    }

    if (newRecipe.category === '') {
      setErrorMsg('Please choose a category');
      return;
    }

    setErrorMsg('');
    //TODO: I SHOULD BE AN ACTUAL OBJECT,
    //NOT A STRING!
    //`{"userid": ${author}, --here for posterity, etc
    //"title": "${recipeName}", "instructions": "${instructions}", "category": "${category}"}`

    recipe = {...newRecipe};
    let formData = new FormData();

    formData.append('file', filename);
    formData.append('recipe', recipe);
    // console.log(formData);

    fetch(`${process.env.REACT_APP_API_URL}/recipes`, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data; boundary=$boundary',  --not necessary when sending over S3 file.
        'Access-Control-Allow-Origin': '*',
      },

      body: formData, 
    });

    navigate('/recipes');
  };

  //TODO: I SHOULD ONLY NEED ONE CHANGE HANDLER

  function handleChange(e: SyntheticEvent) {
    setRecipe({
      ...newRecipe,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    });
  }

  //...except me, I should be seperate
  const handleFileChange = (event: any): void => {
    setFilename(event.target.files[0]);
  };

  return (
    <>
      <form style={{ margin: 'auto', textAlign: 'center', width: '80%' }}>
        <MDBInput
          label="Recipe Name"
          type="text"
          id="recipe_name"
          value={newRecipe.recipe_name}
          name="recipe_name"
          className="small-top-margin"
          onChange={handleChange}
          required
          autoFocus
        />
        <MDBTextArea
          label="Instructions"
          id="instructions"
          value={newRecipe.instructions}
          name="instructions"
          rows={9}
          className="small-top-margin"
          required
          onChange={handleChange}
        />
        <div className="small-top-margin">Category</div>
        <Form.Select
          value={newRecipe.category}
          name="category"
          onChange={handleChange}
          aria-label="Default select example"
          id="category"
          className="small-bottom-margin"
        >
          <option value="Appetizer">Appetizer</option>
          <option value="Entree">Entree</option>
          <option value="Dessert">Dessert</option>
        </Form.Select>
        <span className="small-top-margin" id="image">
          {' '}
          Upload a Picture{' '}
        </span>{' '}
        <input
          type="file"
          className="form-control"
          id="customFile"
          onChange={handleFileChange}
        />
        <button
          type="button"
          className="btn btn-primary small-top-margin"
          onClick={handleClick}
        >
          Create
        </button>
        <div className="form-error">{errorMsg}</div>
      </form>
    </>
  );
}

export default NewRecipe;
