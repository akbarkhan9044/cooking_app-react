import './RecipeList.css'
import {Link} from 'react-router-dom'
import  trashCan from '../assets/trashCan.svg'
import { projectFirestore } from "../firebase/config";
export default function RecipeList({recipes}) {
    if(recipes.length === 0)
    {
        return(
        <div className="error">
            No recipes to load ...
        </div>)
    }
    const handleClick =(id)=>{
    projectFirestore.collection('receipes').doc(id).delete()
    }
  return (
    <div className="recipe-list">
        {recipes.map((recipe)=>(
       <div className="card" key={recipe.id}>
       <h3>{recipe.title}</h3>
       <p>{recipe.cookingTime} to make.</p>
       <div>{recipe.method.substring(0,100)}.....</div>
       <Link to={`/recipes/${recipe.id}`}> Cook This</Link>
       <img
          className="delete"
           src={trashCan}
           onClick={() =>handleClick(recipe.id)}
           alt="no"
       />
       </div>
        ))}
    </div>
  )
}
