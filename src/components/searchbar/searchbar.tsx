import { MDBBtn, MDBIcon, MDBInput, MDBInputGroup } from 'mdb-react-ui-kit';

function SearchBar() {
  function handleClick(): any {
    console.log('Search clicked');
  }

  return (
    <MDBInputGroup style={{ paddingTop: '20px' }}>
      <MDBInput label="Search" />
      <MDBBtn rippleColor="dark" onClick={handleClick}>
        <MDBIcon icon="search" />
      </MDBBtn>
    </MDBInputGroup>
  );
}

export default SearchBar;
