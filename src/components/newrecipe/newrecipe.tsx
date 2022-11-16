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
  const navigate = useNavigate();
  const [recipeName, setRecipeName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('Appetizer');
  const [filename, setFilename] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const author = props.currentUser?.id;
  let { recipe } = useParams();

  const handleClick = () => {
    if (recipeName.trim() === '') {
      setErrorMsg('Recipe name cannot be blank');
      return;
    }

    if (instructions.trim() === '') {
      setErrorMsg('Instructions cannot be blank');
      return;
    }

    if (category === '') {
      setErrorMsg('Please choose a category');
      return;
    }

    setErrorMsg('');

    recipe = `{"userid": ${author}, "title": "${recipeName}", "instructions": "${instructions}", "category": "${category}"}`;
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

  const handleRecipeNameChange = (e: SyntheticEvent): void => {
    setRecipeName((e.target as HTMLInputElement).value);
  };

  const handleInstructionsChange = (e: SyntheticEvent): void => {
    setInstructions((e.target as HTMLInputElement).value);
  };

  const handleCategoryChange = (e: SyntheticEvent): void => {
    setCategory((e.target as HTMLInputElement).value);
  };
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
        <div className="small-top-margin">Category</div>
        <Form.Select
          value={category}
          onChange={handleCategoryChange}
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
