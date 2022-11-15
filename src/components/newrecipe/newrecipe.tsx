import { MDBInput, MDBTextArea } from 'mdb-react-ui-kit';
import { SyntheticEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { json } from 'stream/consumers';
import { useParams } from 'react-router-dom';
import { User } from '../../models/user';

import './newrecipe.css';

interface IRegisterProps {
  currentUser: User | undefined;
}

function NewRecipe(props: IRegisterProps) {
  const navigate = useNavigate();
  const [recipeName, setRecipeName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const [filename, setFilename] = useState('');
  const author = props.currentUser?.id;
  let { recipe } = useParams();

  const handleClick = () => {
    // console.log({
    //   author,
    //   recipeName,
    //   instructions,
    //   category,
    //   filename,
    // });
    recipe = `{"userid": ${author}, "instructions": "${instructions}", "title": "${recipeName}", "category": "${category}"}`;
    let formData = new FormData();
    // const myFile = document.querySelector('input[type=file]').files[0];
    // formData.append(
    //   'recipe',
    //   `{"userid": ${author}, "instructions": "${instructions}", "title": "${recipeName}", "category": "${category}"}`
    // );
    formData.append('file', filename);
    formData.append('recipe', recipe);
    console.log(formData);
    // const formDataURL = new URLSearchParams(formData);

    fetch(`http://localhost:8080/recipes`, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data; boundary=$boundary',
        'Access-Control-Allow-Origin': '*',
      },

      body: formData,
      // JSON.stringify({
      //   recipe: recipe,
      //   file: filename,
      //   // userid: author,
      //   // title: recipeName,
      //   // instructions,
      //   // category,
      // }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
      navigate('/dashboard');
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
      </form>
    </>
  );
}

export default NewRecipe;
