import { MDBBtn } from 'mdb-react-ui-kit';
import { Link, Navigate } from 'react-router-dom';
import { User } from '../../models/user';
import Reviews from '../reviews/reviews';

interface IDashProps {
  currentUser: User | undefined;
}

function Dashboard(props: IDashProps) {
  return props.currentUser ? (
    <>
      <p>Welcome to the dashboard, {props.currentUser?.username}!</p>
      {/* <Reviews id={1} /> */}
      <Link to={`/recipes/new`}>
        <MDBBtn>Create New Recipe</MDBBtn>
      </Link>
    </>
  ) : (
    <Navigate to="/login" />
  );
}
export default Dashboard;
