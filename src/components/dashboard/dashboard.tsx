import { MDBBtn } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { User } from '../../models/user';
import RecipeCard from '../recipecard/recipecard';
import Reviews from '../reviews/reviews';
import './dashboard.style.css';

interface IDashProps {
  currentUser: User | undefined;
}

function Dashboard(props: IDashProps) {
  const [recipes, setRecipes] = useState([]);

  async function getUserRecipes() {
    const res = await fetch(
      `http://localhost:8080/recipes/users/${props.currentUser?.id}`,
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
  });

  return props.currentUser ? (
    <>
      <p>Welcome to the dashboard, {props.currentUser?.username}!</p>
      {/* <Reviews id={1} /> */}
      <Link to={`/recipes/new`}>
        <MDBBtn>Create New Recipe</MDBBtn>
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
