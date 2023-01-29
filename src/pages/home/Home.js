// styles
import './Home.css'
import  RecipeList from '../../components/RecipeList'
import { useEffect,useState } from 'react'
import {projectFirestore} from '../../firebase/config'

export default function Home() {
 const [recipes,setRecipies] = useState(null)
 const [isPending,setIsPending]=useState(false)
 const [error,setError] = useState(false)
useEffect(()=>{
  setIsPending(true)
 const unsub= projectFirestore
    .collection("receipes")
    .onSnapshot((snapshot) => {
      console.log(snapshot);
      if (snapshot.empty) {
        setError("No recipes found");
        setIsPending(false);
      } else {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({id: doc.id,...doc.data()})
        })
        setIsPending(false)
        setRecipies(results)
      }
    },(err)=>{
      setError(err.message)
      setIsPending(false)
    })
   return ()=>unsub()
    
    
},[])
  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipes && <RecipeList recipes={recipes} />}
    </div>
  )
}
