import { MDBInput, MDBTextArea } from 'mdb-react-ui-kit';
import { SyntheticEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import { json } from 'stream/consumers';
import { User } from '../../models/user';

import './newrecipe.css';

interface IRegisterProps {
  currentUser: User | undefined;
}

function NewRecipe(props: IRegisterProps) {
  const [recipeName, setRecipeName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const author = props.currentUser?.id;

  const handleClick = () => {
    console.log({
      author,
      recipeName,
      instructions,
      category,
    });

    fetch(`http://localhost:8080/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },

      body: JSON.stringify({
        userid: author,
        title: recipeName,
        instructions,
        category,
      }),
    });
  };

  const handleRecipeNameChange = (e: SyntheticEvent): void => {
    setRecipeName((e.target as HTMLInputElement).value);
  };

  const handleInstructionsChange = (e: SyntheticEvent): void => {
    setInstructions((e.target as HTMLInputElement).value);
  };

  const handleCategoryChange = (e: SyntheticEvent): void => {
    setCategory((e.target as HTMLInputElement).value);
  };

  return (
    <>
      <div style={{ margin: 'auto', textAlign: 'center', width: '80%' }}>
        <MDBInput
          label="Recipe Name"
          type="text"
          id="recipe_name"
          className="small-top-margin"
          onChange={handleRecipeNameChange}
          required
          autoFocus
        />
        <MDBTextArea
          label="Instructions"
          id="instructions"
          rows={9}
          className="small-top-margin"
          required
          onChange={handleInstructionsChange}
        />
        <Form.Select
          value={category}
          onChange={handleCategoryChange}
          aria-label="Default select example"
          id="category"
          className="small-top-margin small-bottom-margin"
        >
          <option>Category</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Entree">Entree</option>
          <option value="Dessert">Dessert</option>
        </Form.Select>
        <span className="small-top-margin" id="image">
          {' '}
          Upload a Picture{' '}
        </span>{' '}
        <input type="file" className="form-control" id="customFile" />
        <button
          type="button"
          className="btn btn-primary small-top-margin"
          onClick={handleClick}
        >
          Create
        </button>
      </div>
    </>
  );
}

export default NewRecipe;
