// styles
import './Search.css'
import { useLocation } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import RecipeList from '../../components/RecipeList'
export default function Search() {
const queryString =useLocation().search
const queryParams= new URLSearchParams(queryString)
const query =queryParams.get('q')
const url = "http://localhost:3000/recipes?q=" + query;

const {data,error,pending}=useFetch(url)
 console.log(query)
  return (
    <div>
     <h2 className="page-title">Recipes including "{query}"</h2>
     {error && <p>{error}</p>}
     {pending && <p className="loading">Loading...</p>}
     {data && <RecipeList recipes={data}/>}
    </div>
  )
}
