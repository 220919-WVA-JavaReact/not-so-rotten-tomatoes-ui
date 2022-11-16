import { MDBBtn } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { User } from '../../models/user';
import RecipeCard from '../recipecard/recipecard';
import './dashboard.style.css';

interface IDashProps {
  currentUser: User | undefined;
}

function Dashboard(props: IDashProps) {
  const [recipes, setRecipes] = useState([]);
  async function getUserRecipes() {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/recipes/users/${props.currentUser?.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
    const data = await res.json();
    setRecipes(Object.assign(data));
  }

  useEffect(() => {
    getUserRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return props.currentUser ? (
    <>
      <p>Welcome to the dashboard, {props.currentUser?.username}!</p>
      {/* <Reviews id={1} /> */}
      <Link to={`/recipes/new`}>
        <MDBBtn style={{ marginLeft: '2rem' }}>Create New Recipe</MDBBtn>
      </Link>

      <div className="dash-grid">
        {recipes?.map((recipe: any) => {
          return (
            <div className="g-col-4" key={recipe.recipe_id}>
              {' '}
              <RecipeCard
                currentUser={props.currentUser}
                id={recipe.recipe_id}
                name={recipe.recipe_name}
                key={recipe.author.id}
                category={recipe.category}
                instructions={recipe.instructions}
                filename={recipe.filename}
              />
            </div>
          );
        })}
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
}
export default Dashboard;
