// styles
import './Recipe.css'
import {useState,useEffect} from 'react'
import { projectFirestore } from "../../firebase/config";
 import {useParams} from 'react-router-dom'


export default function Recipe() {
  const {id}=useParams()
  const [recipe, setRecipies] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  

  useEffect(()=>{
    setIsPending(true)
    const unsub=projectFirestore.collection('receipes').doc(id).onSnapshot((doc)=>{
      if(doc.exists)
      {
        setRecipies(doc.data())
        setIsPending(false)
      }
      else{
        setIsPending(false)
        setError('Could not find the recipe')
      }
    },(err)=>{
       setIsPending(false);
       setError("Could not find the recipe");
    })
    return ()=>unsub()
  },[])

  const handleClick=() => {

    projectFirestore.collection('receipes').doc(id).update(
      {
        title:'Something updated'
      }
    )
  }
  return (
    <div className="recipe">
      {error && <p>{error.message}</p>}
      {isPending && <p>Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map(ing=><li key={ing}>{ing}</li>)}
          </ul>
          <p className="method">{recipe.method}</p>
          <button onClick={handleClick}>Update</button>
        </>
      )}
    </div>
  )
}