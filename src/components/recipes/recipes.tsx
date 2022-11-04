import React from 'react';
import { User } from "../../models/user";
import RecipeCard from "../recipecard/recipecard";
import SearchBar from "../searchbar/searchbar";
import './recipes.style.css';

interface IRecipeProps{
    currentUser: User | undefined;
}

function Recipes(props: IRecipeProps){
    return(
        <>
        <header>
        <SearchBar/>
        </header>
        <div className='grid'>
            <div className='g-col-4'> <RecipeCard/></div>
            <div className='g-col-4'> <RecipeCard/></div>
            <div className='g-col-4'> <RecipeCard/></div>
        </div>
        </>
    );
}
export default Recipes;