// styles
import './Create.css'
import { projectFirestore } from "../../firebase/config";
import {useState,useRef,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
export default function Create() {
  const [title,setTitle] = useState('')
  const [method,setMethod] = useState('')
  const [cookingTime,setCookingTime] = useState('')
  const [newIngredient,setNewIngredient]=useState('')
  const [ingredients,setIngredients] = useState([])
  const  ingredientInput =useRef(null)
   
  const  history = useHistory()
  
  const  handleSubmit=async(e)=>{
  e.preventDefault()
  console.log(title,method,cookingTime,ingredients)
  const postData= {title,ingredients,method,cookingTime:cookingTime + ' minutes '}
  try{
  await projectFirestore.collection('receipes').add(postData)
  history.push('/')
  } catch(err)
  {
    console.error(err)
  }
  }


  const handleAdd=(e)=>{
    e.preventDefault()
    const ing=newIngredient.trim()
    if(ing && !ingredients.includes(ing))    {
    setIngredients(prevIngredient=>[...prevIngredient,ing])
    }
    setNewIngredient('')
    ingredientInput.current.focus()
  }

 
  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title</span>
          <input
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            required
          />
        </label>
        <label>
          <span>Recipe Ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => {
                setNewIngredient(e.target.value);
              }}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button className="btn" onClick={handleAdd}>
              add
            </button>

          </div>
        </label>
        <p>Current Ingredients:{ingredients.map(i=><em key={i}>{i}, </em>)}</p>
        <label>
          <span>Recipe Method</span>
          <textarea
            onChange={(e) => {
              setMethod(e.target.value);
            }}
            value={method}
            required
          />
        </label>
        <label>Cooking time (minute):</label>
        <input
          type="number"
          onChange={(e) => {
            setCookingTime(e.target.value);
          }}
          value={cookingTime}
          required
        />
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
