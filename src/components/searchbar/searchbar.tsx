import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';

 function SearchBar() {
  
  function handleClick(): any {
    console.log('Search clicked');
  }


  return (
    <MDBInputGroup>
      <MDBInput label='Search' />
      <MDBBtn rippleColor='dark' onClick={handleClick}>
        <MDBIcon icon='search' />
      </MDBBtn>
    </MDBInputGroup>

  );
}

export default SearchBar;