import { request } from 'https';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { User } from '../../models/user';
import RecipeCard from '../recipecard/recipecard';
import Reviews from '../reviews/reviews';
import SearchBar from '../searchbar/searchbar';
import './recipes.style.css';

interface IRecipeProps {
  currentUser: User | undefined;
}

enum status {
  LOADING,
  FAILED,
  DONE,
}

function Recipes(props: IRecipeProps) {
  const [recipes, setRecipes] = useState([]);
  const [fetchStatus, setfetchStatus] = useState(status.LOADING);

  async function getRecipes(currentUser: number | undefined) {
    const res = await fetch(`http://localhost:8080/recipes/`, {
      // ${currentUser}
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
    const data = await res.json();
    setRecipes(Object.assign(data));
    setfetchStatus(status.DONE);
  }

  useEffect(() => {
    getRecipes(1); // props.currentUser?.getId
    setfetchStatus(status.DONE);
  }, []);

  return fetchStatus === status.DONE ? (
    <>
      <header>
        <SearchBar />
      </header>
      <div className="grid">
        {recipes.map((recipe: any) => {
          return (
            <div className="g-col-4" key={recipe.recipe_id}>
              {' '}
              <RecipeCard
                name={recipe.recipe_name}
                key={recipe.author.id}
                category={recipe.category}
                instructions={recipe.instructions}
              />
            </div>
          );
        })}
      </div>
    </>
  ) : fetchStatus === status.FAILED ? (
    <>
      <h2>ERROR GETTING DATA FROM API...</h2>
    </>
  ) : (
    <>
      <h2>LOADING...</h2>
    </>
  );
}
export default Recipes;
