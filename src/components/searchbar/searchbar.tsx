import { MDBBtn, MDBIcon, MDBInput, MDBInputGroup } from 'mdb-react-ui-kit';
import { SyntheticEvent, useState } from 'react';

interface ISearchBarProps {
  recipes: any;
  setRecipes: (newRecipes: any) => void;
}

function SearchBar(props: ISearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  async function searchRecipes(searchTerm: String) {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/recipes/search/${searchTerm}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
    const data = await res.json();
    props.setRecipes(Object.assign(data));
  }

  async function handleClick() {
    await searchRecipes(searchTerm);
  }

  function handleChange(e: SyntheticEvent): void {
    setSearchTerm((e.target as HTMLInputElement).value);
  }

  return (
    <MDBInputGroup style={{ marginTop: '2rem' }}>
      <MDBInput label="Search" onChange={handleChange} />
      <MDBBtn rippleColor="dark" onClick={handleClick}>
        <MDBIcon icon="search" />
      </MDBBtn>
    </MDBInputGroup>
  );
}

export default SearchBar;
