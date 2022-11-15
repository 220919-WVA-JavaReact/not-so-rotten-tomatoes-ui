import { useState } from 'react';
import { User } from '../../models/user';
import RecipeCard from '../recipecard/recipecard';
import SearchBar from '../searchbar/searchbar';
import './recipes.style.css';

interface IRecipeProps {
  currentUser: User | undefined;
}

function Recipes(props: IRecipeProps) {
  const [recipes, setRecipes] = useState([]);
  const [authUser] = useState<User>();

  return (
    <>
      <header>
        <SearchBar recipes={recipes} setRecipes={setRecipes} />
      </header>
      <div className="grid">
        {recipes.map((recipe: any) => {
          return (
            <div className="g-col-4" key={recipe.recipe_id}>
              {' '}
              <RecipeCard
                currentUser={authUser}
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
  );
}

export default Recipes;
